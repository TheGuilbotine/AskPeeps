from flask_wtf import FlaskForm
from wtforms import TextField, IntegerField
from wtforms.validators import DataRequired
from app.models import Response


class ResponseForm(FlaskForm):
    user_id = IntegerField("User Id", validators=[DataRequired()])
    question_id = IntegerField("Question Id", validators=[DataRequired()])
    response = TextField("Response")
