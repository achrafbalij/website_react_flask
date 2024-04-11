from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(36), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.Text, nullable=False)
    fullAccess = db.Column(db.Boolean, default=False)

class Target(db.Model):
    __bind_key__ = 'master'
    __tablename__ = "target"
    trimestre = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, primary_key=True)
    target = db.Column(db.Integer, nullable=False)