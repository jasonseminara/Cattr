from app import db,app
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session,sessionmaker, relationship,backref
from flask.ext.login import LoginManager, UserMixin
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

from flask.ext.login import LoginManager, UserMixin
lm = LoginManager(app)

  
class User(UserMixin, db.Model):
  __tablename__ = 'users'
  
  id            = db.Column(Integer,Sequence('users_id_seq'),primary_key=True)
  social_id     = db.Column(db.String(64), nullable=False, unique=True)
  nickname      = db.Column(db.String(64), nullable=False)
  email         = Column(String(120), index=True, unique=True)
  cats          = db.relationship('Cat', backref='user', lazy='dynamic')
  reservations  = db.relationship('Availability', backref='user', lazy='dynamic')
 
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

tags_xref = db.Table('xref_cat_tag',
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'),primary_key=True),
    db.Column('cat_id', db.Integer, db.ForeignKey('cats.id'),primary_key=True)
)

class Cat(db.Model):
  __tablename__ = 'cats'

  id = Column(Integer,Sequence('cats_id_seq'),primary_key=True) 
  name        = Column(String)
  birthdate   = Column(DateTime)
  variety     = Column(String)
  female      = Column(Boolean, default=False) 
  description = Column(String)
  last_updated = Column(DateTime, default=datetime.datetime.now)
  image       = Column(String)

  owner_id    = Column(Integer, db.ForeignKey('users.id'))
  address_id  = Column(Integer, db.ForeignKey('addresses.id'))
  
  tags          = db.relationship('Tag', secondary=tags_xref, backref=db.backref('cats', lazy='dynamic'))
  availability  = db.relationship('Availability', backref=db.backref('cat'))
  address       = db.relationship('Address', backref=db.backref('cats'))
  #reservations  = db.relationship('Availability', backref=db.backref('cat'))

  def __str__(self):
    return "{0} ({1})".format(self.name,self.owner.username)


class Tag(db.Model):
  __tablename__ = 'tags'
  id        = Column(Integer,Sequence('tags_id_seq'),primary_key=True) 
  name      = Column(String(30), index=True)
  # cats      = relationship("Cat", secondary=tags_xref)




class Availability(db.Model):
  __tablename__ = 'availability'
  id = Column(Integer,Sequence('availability_id_seq'),primary_key=True)
  
  # An availability is created with an assoc to the cat + time
  start = Column(DateTime)
  end   = Column(DateTime)
  cat_id    = Column(Integer,db.ForeignKey('cats.id'))
  
  create_date       = Column(DateTime, default=datetime.datetime.now)
  last_updated      = Column(DateTime, default=datetime.datetime.now)
  
  
  # after the reservation is taken we'll update these fields (add an assoc to a user)
  reservation_taken = Column(DateTime)
  host_id   = Column(Integer, ForeignKey('users.id'), index=True)

  def __str__(self):
    return "{} {:%Y-%m-%d} : {:%Y-%m-%d} / {}".format(self.cat.name,self.start,self.end,self.cat.owner.username,)


class Posting(db.Model):
  __tablename__ = 'posts'

  id          = Column(Integer,Sequence('posts_id_seq'),primary_key=True)

  author_id   = Column(Integer, ForeignKey('users.id'))
  title       = Column(String(64))
  body        = Column(String)
  start       = Column(DateTime, default=datetime.datetime.now)
  end         = Column(DateTime, default=datetime.datetime.now)
  display     = Column(Boolean,  default=False) 
  reservation_id = Column(Integer, ForeignKey('availability.id'))
  smokingEnviron = Column(Boolean, default=False)

  def __str__(self):
    return "{0} ({1})".format(self.title,self.author_id.username)



class Address(db.Model):
  __tablename__ = 'addresses'

  id      = Column(Integer,Sequence('addresses_id_seq'),primary_key=True)
  street  = Column(String)
  city    = Column(String)
  state   = Column(String(2))
  zipcode = Column(String(10))

