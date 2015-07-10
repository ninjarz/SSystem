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


class Admin(Base):
    __tablename__ = 'AdminInfo'

    aid = Column(Integer, primary_key=True)
    aname = Column(String)
    apwd = Column(String)


class Student(Base):
    __tablename__ = 'StudentInfo'

    sid = Column(Integer, primary_key=True)
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

    tid = Column(Integer, primary_key=True)
    tname = Column(String)
    tpwd = Column(String)


class Class(Base):
    __tablename__ = 'ClassInfo'

    cid = Column(String, primary_key=True)


class Course(Base):
    __tablename__ = 'CourseInfo'

    cid = Column(String, primary_key=True)
    cname = Column(String)
    tid = Column(Integer)


class StudentCourse(Base):
    __tablename__ = 'StudentCourse'

    sid = Column(Integer, primary_key=True)
    cid = Column(String)
    score = Column(Integer)


