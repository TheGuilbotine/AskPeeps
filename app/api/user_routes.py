from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Question, question

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    user = User.query.get(id)
    questions_query = Question.query.filter(Question.user_id == id).all()
    questions = [question.to_dict() for question in questions_query]
    return {**user.to_dict(), "questions": questions}


# @user_routes.route('/<int:id>/questions')
# # @login_required
# def user_questions(id):
#     questions = Question.query.filter(Question.user_id == id).all()
#     print('--------------------')
#     print(questions)
#     print('--------------------')
#     return {"questions": questions}
