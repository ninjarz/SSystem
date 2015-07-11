import json

from service.basehandler import *
from database.orm import *

# main
class MainHandler(BaseHandler):
    def get(self):
        self.render("index.html")


# login
class LoginHandler(BaseHandler):
    def get(self):
        user = self.get_argument('user')
        password = self.get_argument('password')
        user_type = self.get_argument('type')

        # student
        if user_type == '1':
            student = Student.authenticate(user, password)
            if student:
                print("student:", user)
                self.set_secure_cookie("user", user)
                self.set_secure_cookie("type", user_type)
                self.redirect("/student")
            else:
                self.redirect("/")
        # teacher
        elif user_type == '2':
            teacher = Teacher.authenticate(user, password)
            if teacher:
                print("teacher:", user)
                self.set_secure_cookie("user", user)
                self.set_secure_cookie("type", user_type)
                self.redirect("/teacher")
            else:
                self.redirect("/")
        # admin
        elif user_type == '3':
            admin = Admin.authenticate(user, password)
            if admin:
                print("admin:", user)
                self.set_secure_cookie("user", user)
                self.set_secure_cookie("type", user_type)
                self.redirect("/admin")
            else:
                self.redirect("/")
        else:
            self.redirect("/")


# student
class StudentHandler(BaseHandler):
    def get_current_user(self):
        return self.get_secure_cookie("type") == b'1'

    @tornado.web.authenticated
    def get(self, action):
        action = action.split('/')
        action = action[len(action) - 1]

        student = Student.select_by_sid(self.get_secure_cookie("user").decode())
        if student is None:
            self.redirect("/")
            return

        if action == "":
            self.render("student.html", student=student)
        elif action == "score":
            courses = select_student_courses(student.sid)
            self.render("student_score.html", courses=courses)


# teacher
class TeacherHandler(BaseHandler):
    def get_current_user(self):
        return self.get_secure_cookie("type") == b'2'

    @tornado.web.authenticated
    def get(self, action):
        action = action.split('/')
        action = action[len(action) - 1]

        teacher = Teacher.select_by_tid(self.get_secure_cookie("user").decode())
        if teacher is None:
            self.redirect("/")
            return

        if action == "":
            self.render("teacher.html", teacher=teacher)
        elif action == "course":
            courses = Course.select_by_tid(teacher.tid)
            self.render("teacher_course.html", courses=courses)
        elif action == "score":
            courses = Course.select_by_tid(teacher.tid)
            students = {}
            for course in courses:
                students[course.cid] = select_course_students(course.cid)
            self.render("teacher_score.html", courses=courses, students=students)

    @tornado.web.authenticated
    def post(self, action):
        action = action.split('/')
        action = action[len(action) - 1]

        # student
        if action == "update_student_score":
            sid = self.get_argument('sid')
            cid = self.get_argument('cid')
            score = self.get_argument('score')
            data = json.dumps({
                "success": False,
            })
            if score.isdigit():
                if StudentCourse.update(sid, cid, {'score': score}):
                    data = json.dumps({
                        "success": True,
                        "sid": sid,
                        "cid": cid,
                        "score": score
                    })
            self.write(data)


# admin
class AdminHandler(BaseHandler):
    def get_current_user(self):
        return self.get_secure_cookie("type") == b'3'

    @tornado.web.authenticated
    def get(self, action):
        action = action.split('/')
        action = action[len(action) - 1]

        admin = Admin.select_by_aid(self.get_secure_cookie("user").decode())
        if admin is None:
            self.redirect("/")
            return

        if action == "":
            self.render("admin.html", admin=admin)
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
            sid = self.get_argument('sid')
            if Student.delete(sid):
                data = json.dumps({
                    "success": True,
                    "sid": sid
                })
            else:
                data = json.dumps({
                    "success": False,
                })
            self.write(data)
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
        elif action == "delete_teacher":
            tid = self.get_argument('tid')
            if Teacher.delete(tid):
                data = json.dumps({
                    "success": True,
                    "tid": tid
                })
            else:
                data = json.dumps({
                    "success": False,
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
        elif action == "delete_admin":
            aid = self.get_argument('aid')
            if Admin.delete(aid):
                data = json.dumps({
                    "success": True,
                    "aid": aid
                })
            else:
                data = json.dumps({
                    "success": False,
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
        elif action == "delete_class":
            cid = self.get_argument('cid')
            if Class.delete(cid):
                data = json.dumps({
                    "success": True,
                    "cid": cid
                })
            else:
                data = json.dumps({
                    "success": False,
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
        elif action == "delete_course":
            cid = self.get_argument('cid')
            if Course.delete(cid):
                data = json.dumps({
                    "success": True,
                    "cid": cid
                })
            else:
                data = json.dumps({
                    "success": False,
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
        elif action == "delete_student_course":
            sid = self.get_argument('sid')
            cid = self.get_argument('cid')
            if StudentCourse.delete(sid, cid):
                data = json.dumps({
                    "success": True,
                    "sid": sid,
                    "cid": cid,
                })
            else:
                data = json.dumps({
                    "success": False,
                })
            self.write(data)


