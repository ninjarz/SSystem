from sqlalchemy import *  
from sqlalchemy.orm import *
from sqlalchemy.ext.declarative import declarative_base

from config import *


class ORM:
        def __init__(self):
                self.engine = create_engine(
                    config_data['database_type'] +
                    '+' +
                    config_data['connector'] +
                    '://' +
                    config_data['user_name'] +
                    ':' +
                    config_data['password'] +
                    '@' +
                    config_data['host_name'] +
                    '/' +
                    config_data['database_name']
                    )
                self.Session = sessionmaker(bind=self.engine)
                self.session = self.Session()


Base = declarative_base()
orm = ORM()


# student
class Student(Base):
    __tablename__ = 'StudentInfo'

    sid = Column(String, primary_key=True)
    sname = Column(String)
    spwd = Column(String)
    cid = Column(String, ForeignKey('ClassInfo.cid'))

    @staticmethod
    def authenticate(sid, spwd):
        student = Student.select_by_sid(sid)
        if student:
            if student.spwd == spwd:
                return student
        return None

    @staticmethod
    def select_all():
        students = orm.session.query(Student).all()
        return students

    @staticmethod
    def select_by_sid(sid):
        student = orm.session.query(Student).filter_by(sid=sid).all()
        if len(student):
            return student[0]
        return None

    @staticmethod
    def insert(sid, sname, spwd, cid):
        try:
            student = Student(sid=sid, sname=sname, spwd=spwd, cid=cid)
            orm.session.add(student)
            orm.session.commit()
        except:
            orm.session.rollback()
            return None
        return student

    @staticmethod
    def delete(sid):
        student = Student.select_by_sid(sid)
        if student:
            orm.session.delete(student)
            orm.session.commit()
            return True
        return False

    def dict(self):
        return {
            'sid': self.sid,
            'sname': self.sname,
            'spwd': self.spwd,
            'cid': self.cid
        }


# teacher
class Teacher(Base):
    __tablename__ = 'TeacherInfo'

    tid = Column(String, primary_key=True)
    tname = Column(String)
    tpwd = Column(String)

    @staticmethod
    def authenticate(tid, tpwd):
        teacher = Teacher.select_by_tid(tid)
        if teacher:
            if teacher.tpwd == tpwd:
                return teacher
        return None

    @staticmethod
    def select_all():
        teachers = orm.session.query(Teacher).all()
        return teachers

    @staticmethod
    def select_by_tid(tid):
        teacher = orm.session.query(Teacher).filter_by(tid=tid).all()
        if len(teacher):
            return teacher[0]
        return None

    @staticmethod
    def insert(tid, tname, tpwd):
        try:
            teacher = Teacher(tid=tid, tname=tname, tpwd=tpwd)
            orm.session.add(teacher)
            orm.session.commit()
        except:
            orm.session.rollback()
            return None
        return teacher

    @staticmethod
    def delete(tid):
        teacher = Teacher.select_by_tid(tid)
        if teacher:
            orm.session.delete(teacher)
            orm.session.commit()
            return True
        return False

    def dict(self):
        return {
            'tid': self.tid,
            'tname': self.tname,
            'tpwd': self.tpwd
        }


# admin
class Admin(Base):
    __tablename__ = 'AdminInfo'

    aid = Column(String, primary_key=True)
    aname = Column(String)
    apwd = Column(String)

    @staticmethod
    def authenticate(aid, apwd):
        admin = Admin.select_by_aid(aid)
        if admin:
            if admin.apwd == apwd:
                return admin
        return None

    @staticmethod
    def select_all():
        admins = orm.session.query(Admin).all()
        return admins

    @staticmethod
    def insert(aid, aname, apwd):
        try:
            admin = Admin(aid=aid, aname=aname, apwd=apwd)
            orm.session.add(admin)
            orm.session.commit()
        except:
            orm.session.rollback()
            return None
        return admin

    @staticmethod
    def select_by_aid(aid):
        admin = orm.session.query(Admin).filter_by(aid=aid).all()
        if len(admin):
            return admin[0]
        return None

    @staticmethod
    def delete(aid):
        admin = Admin.select_by_aid(aid)
        if admin:
            orm.session.delete(admin)
            orm.session.commit()
            return True
        return False

    def dict(self):
        return {
            'aid': self.aid,
            'aname': self.aname,
            'apwd': self.apwd
        }


# class
class Class(Base):
    __tablename__ = 'ClassInfo'

    cid = Column(String, primary_key=True)

    @staticmethod
    def select_all():
        classes = orm.session.query(Class).all()
        return classes

    @staticmethod
    def insert(cid):
        try:
            class_obj = Class(cid=cid)
            orm.session.add(class_obj)
            orm.session.commit()
        except:
            orm.session.rollback()
            return None
        return class_obj

    def dict(self):
        return {
            'cid': self.cid
        }


# course
class Course(Base):
    __tablename__ = 'CourseInfo'

    cid = Column(String, primary_key=True)
    cname = Column(String)
    tid = Column(String, ForeignKey('TeacherInfo.tid'))

    @staticmethod
    def select_all():
        courses = orm.session.query(Course).all()
        return courses

    @staticmethod
    def select_by_tid(tid):
        courses = orm.session.query(Course).filter_by(tid=tid).all()
        return courses

    @staticmethod
    def insert(cid, cname, tid):
        try:
            course = Course(cid=cid, cname=cname, tid=tid)
            orm.session.add(course)
            orm.session.commit()
        except:
            orm.session.rollback()
            return None
        return course

    def dict(self):
        return {
            'cid': self.cid,
            'cname': self.cname,
            'tid': self.tid
        }


# student_course
class StudentCourse(Base):
    __tablename__ = 'StudentCourse'
    sid = Column(String, ForeignKey('StudentInfo.sid'))
    cid = Column(String, ForeignKey('CourseInfo.cid'))
    score = Column(Integer)
    __table_args__ = (PrimaryKeyConstraint(sid, cid),)

    @staticmethod
    def select_all():
        student_courses = orm.session.query(StudentCourse).all()
        return student_courses

    @staticmethod
    def select_by_sid(sid):
        student_courses = orm.session.query(StudentCourse).filter_by(sid=sid).all()
        return student_courses

    @staticmethod
    def insert(sid, cid, score):
        try:
            student_course = StudentCourse(sid=sid, cid=cid, score=score)
            orm.session.add(student_course)
            orm.session.commit()
        except:
            orm.session.rollback()
            return None
        return student_course

    def dict(self):
        return {
            'sid': self.sid,
            'cid': self.cid,
            'score': self.score
        }


def select_student_courses(sid):
    courses = orm.session.query(StudentCourse, Course)
    courses = courses.filter_by(sid=sid).filter(StudentCourse.cid == Course.cid).all()
    return courses

def select_course_students(cid):
    students = orm.session.query(Student, StudentCourse)
    students = students.filter(StudentCourse.cid == cid).filter(Student.sid == StudentCourse.sid).all()
    return students


