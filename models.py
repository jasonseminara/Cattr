from app import db
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session,sessionmaker, relationship,backref

from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey,
    DateTime,
    Sequence,
    Float
)

import datetime


  
class User(db.Model):
  __tablename__ = 'users'
  
  id = Column(Integer,Sequence('user_seq'),primary_key=True)
  first_name = Column(String,index=True)
  last_name = Column(String,index=True)
  password = Column(String)
  email = Column(String(120), index=True, unique=True)
  cats = db.relationship('Cat', backref='cats', lazy='dynamic')

  @property
  def is_authenticated(self):
    return True

  @property
  def is_active(self):
    return True

  @property
  def is_anonymous(self):
    return False
  

  def get_id(self):
      try:
          return unicode(self.id)  # python 2
      except NameError:
          return str(self.id)  # python 3
  def __repr__(self):
    return '<User %r>' % (self.nickname)  

class Cat(db.Model):
  __tablename__ = 'cats'

  id = Column(Integer,Sequence('cat_seq'),primary_key=True) 
  name        = Column(String)
  birthdate   = Column(DateTime)
  variety     = Column(String)
  owner_id    = Column(Integer, ForeignKey('users.id'))
  female      = Column(Boolean, default=False) 

  description = Column(String)
  last_updated = Column(DateTime, default=datetime.datetime.now)

  def __str__(self):
    return "{0} ({1})".format(self.name,self.owner.username)


class Tag(db.Model):
  __tablename__ = 'tags'
  id = Column(Integer,Sequence('tag_seq'),primary_key=True) 
  name = Column(String(30))


class CatTag(db.Model):
  __tablename__ = 'xref_cat_tag'
  id = Column(Integer,Sequence('xref_seq'),primary_key=True) 
  cat_id = Column(Integer,ForeignKey('cats.id'))
  tag_id = Column(Integer,ForeignKey('tags.id'))


class Availability(db.Model):
  __tablename__ = 'availability'
  id = Column(Integer,Sequence('avail_seq'),primary_key=True)
  cat_id = Column(Integer,ForeignKey('cats.id'))
  start = Column(DateTime)
  end   = Column(DateTime)
  def __str__(self):
    return "{} {:%Y-%m-%d} : {:%Y-%m-%d} / {}".format(self.cat.name,self.start,self.end,self.cat.owner.username,)



class Reservation(db.Model):
  __tablename__ = 'reservations'

  id        = Column(Integer,Sequence('res_seq'),primary_key=True)
  avail_id  = Column(Integer,ForeignKey('availability.id'))
  slot      = relationship("Availability", backref=backref("availability", uselist=False)) # <------
  cat_id    = Column(Integer,ForeignKey('cats.id'))

  host_id   = Column(Integer, ForeignKey('users.id'))

  def __str__(self):
    return "{} {:%Y-%m-%d} : {:%Y-%m-%d} / {}".format(self.cat.name,self.slot.start,self.slot.end,self.cat.owner.username,)



class Posting(db.Model):
  __tablename__ = 'posts'

  id          = Column(Integer,Sequence('post_seq'),primary_key=True)

  author_id   = Column(Integer, ForeignKey('users.id'))
  title       = Column(String(64))
  body        = Column(String)
  start       = Column(DateTime, default=datetime.datetime.now)
  end         = Column(DateTime, default=datetime.datetime.now)
  display     = Column(Boolean,  default=False) 
  reservation_id = Column(Integer, ForeignKey('reservations.id'))
  smokingEnviron = Column(Boolean, default=False)

  def __str__(self):
    return "{0} ({1})".format(self.title,self.author_id.username)



class Address(db.Model):
  __tablename__ = 'addresses'

  id          = Column(Integer,Sequence('address_seq'),primary_key=True)
  cat_id = Column(Integer,ForeignKey('cats.id'))
  
  street  = Column(String)
  city    = Column(String)
  state   = Column(String(2))
  zipcode = Column(String(10))

