from flask_wtf import FlaskForm
from wtforms import TextField, BooleanField, IntegerField
from wtforms import validators
from wtforms.validators import DataRequired
from app.models import Question


class QuestionForm(FlaskForm):
    user_id = IntegerField("User Id", validators=[DataRequired()])
    question = TextField("Question", validators=[DataRequired()])
    answered = BooleanField("Answered")
