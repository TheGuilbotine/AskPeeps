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


def username_length(form, field):
    # Check if username length is less than 40 chars
    username = field.data
    if len(username) > 40:
        raise ValidationError('Username must be less than 40 characters.')


def first_name_length(form, field):
    # Check if first name is less than 30 characters
    first_name = field.data
    if len(first_name) > 30:
        raise ValidationError(
            'My you have a long first name. Please enter the first 30 characters.')


def last_name_length(form, field):
    # Check if first name is less than 30 characters
    last_name = field.data
    if len(last_name) > 30:
        raise ValidationError(
            'My you have a long last name. Please enter the first 30 characters.')


def email_length(form, field):
    # Check if first name is less than 30 characters
    last_name = field.data
    if len(last_name) > 255:
        raise ValidationError(
            'Email must be less than 255 characters.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, username_length])
    email = StringField('email', validators=[
                        DataRequired(), user_exists, email_length])
    f_name = StringField('f_name', validators=[
                         DataRequired(), first_name_length])
    l_name = StringField('l_name', validators=[
                         DataRequired(), last_name_length])
    birth_date = DateField('birth_date', validators=[DataRequired()])
    password = StringField('password', validators=[
        DataRequired()
    ])
