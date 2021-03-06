from flask import Blueprint, jsonify, session, request
from app.models import Question, db, User, Response
from app.forms import QuestionForm
from flask_login import login_required
from datetime import datetime


question_routes = Blueprint('questions', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# TODO: secure return so that state doesn't have first and last name
# Get all questions


@question_routes.route('/')
def questions():
    """
    Gets all questions with username in object
    """
    questions_query = Question.query.order_by(Question.id.desc()).all()
    questions = [question.to_dict() for question in questions_query]
    for question in questions:
        question["username"] = User.query.get(
            question["user_id"]).username
    # sorted_questions = sorted(questions, key=lambda question: datetime.strptime(
    #     str(question.created_at), "%m-%d-%Y %H:%M:%S.%f"))
    # sorted_questions = sorted(questions, key=lambda x: datetime.strptime(
    #     str(x.created_at), "%Y-%m-%d %H:%M:%S.%f"))
    # sorted_questions.reverse()
    return {"questions": questions}


@question_routes.route('/<int:id>')
def user_questions(id):
    """
    Get all questions pertaining to a user
    """
    questions_query = Question.query.filter(Question.user_id == id).all()
    return {question.id: question.to_dict() for question in questions_query}
    # for question in questions:
    #     question.id = question
    # return questions


# @question_routes.route('/<int:id>')
# def question(id):
#     """
#     Get a single question
#     """
#     question = Question.query.get(id).to_dict()
#     question["username"] = User.query.get(
#         question["user_id"]).username
#     return {"question": question}


@question_routes.route('/', methods=['POST'])
@login_required
def create_question():
    """
    Creates a new question
    """
    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        question = Question(
            user_id=form.data["user_id"],
            question=form.data["question"],
            answered=form.data["answered"]
        )
        db.session.add(question)
        db.session.commit()
        question_dict = question.to_dict()
        return {**question_dict}
    errors = form.errors
    return {'errors': validation_errors_to_error_messages(errors)}, 401


@question_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_question(id):
    """
    Delete a single question
    """
    question = Question.query.get(id)

    db.session.delete(question)
    db.session.commit()

    return {"message": "SUCCESS"}, 204


@question_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_question(id):
    """
    Alter a question
    """
    data = request.json
    question = Question.query.get(id)
    question.question = data["question"]
    question.answered = data["answered"]

    db.session.commit()
    question_dict = question.to_dict()

    return {**question_dict}
