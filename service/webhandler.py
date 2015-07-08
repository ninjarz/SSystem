from service.basehandler import *


class MainHandler(BaseHandler):
    def get(self):
        self.render("index.html")


class LoginHandler(BaseHandler):
    def get(self):
        if not self.get_secure_cookie("user"):
            self.set_secure_cookie("user", self.request.remote_ip)

        user = self.get_argument('user')
        password = self.get_argument('password')
        user_type = int(self.get_argument('type'))

        # student
        if user_type == 1:
            self.redirect("/student")
        # teacher
        elif user_type == 2:
            self.redirect("/teacher")
        # admin
        elif user_type == 3:
            self.redirect("/admin")


class StudentHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        courses = [
            {
                'id': 12,
                'name': 'computer',
                'score': 100,
                'status': 1
            }
        ]
        self.render("student.html", courses=courses)


class TeacherHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        self.render("teacher.html")


class AdminHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        self.render("admin.html")
