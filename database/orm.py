from sqlalchemy import *  
from sqlalchemy.orm import *
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


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


class Teacher(Base):
    __tablename__ = 'TeacherInfo'

    tid = Column(Integer, primary_key=True)
    tname = Column(String)
    tpwd = Column(String)




