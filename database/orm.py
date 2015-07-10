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


class Student(Base):
    __tablename__ = 'StudentInfo'

    sid = Column(String, primary_key=True)
    sname = Column(String)
    spwd = Column(String)
    cid = Column(String)

    def delete(self):
        orm.session.delete(self)

    @staticmethod
    def select_all():
        students = orm.session.query(Student).all()
        return students

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

    def dict(self):
        return {
            'sid': self.sid,
            'sname': self.sname,
            'spwd': self.spwd,
            'cid': self.cid
        }


class Teacher(Base):
    __tablename__ = 'TeacherInfo'

    tid = Column(String, primary_key=True)
    tname = Column(String)
    tpwd = Column(String)

    @staticmethod
    def select_all():
        teachers = orm.session.query(Teacher).all()
        return teachers

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

    def dict(self):
        return {
            'tid': self.tid,
            'tname': self.tname,
            'tpwd': self.tpwd
        }


class Admin(Base):
    __tablename__ = 'AdminInfo'

    aid = Column(String, primary_key=True)
    aname = Column(String)
    apwd = Column(String)

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

    def dict(self):
        return {
            'aid': self.aid,
            'aname': self.aname,
            'apwd': self.apwd
        }


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


class Course(Base):
    __tablename__ = 'CourseInfo'

    cid = Column(String, primary_key=True)
    cname = Column(String)
    tid = Column(String)

    @staticmethod
    def select_all():
        courses = orm.session.query(Course).all()
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


class StudentCourse(Base):
    __tablename__ = 'StudentCourse'

    sid = Column(String, primary_key=True)
    cid = Column(String)
    score = Column(Integer)

    @staticmethod
    def select_all():
        student_courses = orm.session.query(StudentCourse).all()
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




