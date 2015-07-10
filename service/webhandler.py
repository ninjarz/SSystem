import json

from service.basehandler import *
from database.orm import *


class MainHandler(BaseHandler):
    def get(self):
        self.render("index.html")


class LoginHandler(BaseHandler):
    def get(self):
        if not self.get_secure_cookie("user"):
            self.set_secure_cookie("user", self.request.remote_ip)

        user = self.get_argument('user')
        password = self.get_argument('password')
        user_type = self.get_argument('type')

        # student
        if user_type == '1':
            self.redirect("/student")
        # teacher
        elif user_type == '2':
            self.redirect("/teacher")
        # admin
        elif user_type == '3':
            self.redirect("/admin")
        else:
            self.redirect("/")


class StudentHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self, action):
        action = action.split('/')
        action = action[len(action) - 1]
        if action == "":
            self.render("student.html")
        elif action == "score":
            courses = [
                {
                    'id': 12,
                    'name': 'computer',
                    'score': 100,
                    'status': 1
                }
            ]
            self.render("student_score.html", courses=courses)


class TeacherHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        self.render("teacher.html")


class AdminHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self, action):
        action = action.split('/')
        action = action[len(action) - 1]
        if action == "":
            self.render("admin.html")
        elif action == "user":
            students = Student.select_all()
            self.render("admin_user.html", students=students)

    @tornado.web.authenticated
    def post(self, action):
        action = action.split('/')
        action = action[len(action) - 1]

        # insert_student
        if action == "insert_student":
            sid = self.get_argument('sid')
            sname = self.get_argument('sname')
            spwd = self.get_argument('spwd')
            cid = self.get_argument('cid')
            student = Student.insert(sid, sname, spwd, cid)
            data = json.dumps({
                "student": None if student is None else student.dict()
            })
            self.write(data)
        elif action == "delete_student":
            sid = self.get_argument('id')

