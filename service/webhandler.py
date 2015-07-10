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
            teachers = Teacher.select_all()
            admins = Admin.select_all()
            self.render("admin_user.html", students=students, teachers=teachers, admins=admins)
        elif action == "course":
            classes = Class.select_all()
            courses = Course.select_all()
            student_courses = StudentCourse.select_all()
            self.render("admin_course.html", classes=classes, courses=courses, student_courses=student_courses)

    @tornado.web.authenticated
    def post(self, action):
        action = action.split('/')
        action = action[len(action) - 1]

        # student
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
        # teacher
        elif action == "insert_teacher":
            tid = self.get_argument('tid')
            tname = self.get_argument('tname')
            tpwd = self.get_argument('tpwd')
            teacher = Teacher.insert(tid, tname, tpwd)
            data = json.dumps({
                "teacher": None if teacher is None else teacher.dict()
            })
            self.write(data)
        # admin
        elif action == "insert_admin":
            aid = self.get_argument('aid')
            aname = self.get_argument('aname')
            apwd = self.get_argument('apwd')
            admin = Admin.insert(aid, aname, apwd)
            data = json.dumps({
                "admin": None if admin is None else admin.dict()
            })
            self.write(data)
        # class
        elif action == "insert_class":
            cid = self.get_argument('cid')
            class_obj = Class.insert(cid)
            data = json.dumps({
                "class": None if class_obj is None else class_obj.dict()
            })
            self.write(data)
        # course
        elif action == "insert_course":
            cid = self.get_argument('cid')
            cname = self.get_argument('cname')
            tid = self.get_argument('tid')
            course = Course.insert(cid, cname, tid)
            data = json.dumps({
                "course": None if course is None else course.dict()
            })
            self.write(data)
        # student_course
        elif action == "insert_student_course":
            sid = self.get_argument('sid')
            cid = self.get_argument('cid')
            score = self.get_argument('score')
            student_course = StudentCourse.insert(sid, cid, score)
            data = json.dumps({
                "student_course": None if student_course is None else student_course.dict()
            })
            self.write(data)


