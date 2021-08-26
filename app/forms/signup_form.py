from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    f_name = StringField('f_name', validators=[DataRequired()])
    l_name = StringField('l_name', validators=[DataRequired()])
    birth_date = DateField('birth_date', validators=[DataRequired()])
    password = StringField('password', validators=[
        DataRequired(),
        EqualTo('repeat_password',
                message='Confirm password does not match Password')
    ])
    repeat_password = StringField(
        'repeat_password', validators=[DataRequired()])
