from app.forms.response_form import ResponseForm
from flask import Blueprint, jsonify, session, request
from app.models import Question, db, User, Response
from app.forms import ResponseForm
from flask_login import login_required


response_routes = Blueprint('responses', __name__)

# Get all responses


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@response_routes.route('/')
def responses():
    """
    Get all responses
    """
    response_query = Response.query.all()
    responses = [response.to_dict() for response in response_query]
    return {"responses": responses}


@response_routes.route('/<int:questionId>')
def specific_responses(questionId):
    """
    Get all responses based on a question
    """
    response_query = Response.query.filter(
        Response.question_id == questionId).all()
    responses = [response.to_dict() for response in response_query]
    print('---------------------------------')
    print(response_query)
    print('---------------------------------')
    return {"responses": responses}
