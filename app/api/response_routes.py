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


# TODO: Need a route for just one response?


@response_routes.route('/<int:id>')
def specific_responses(id):
    """
    Get all responses based on a question
    """
    response_query = Response.query.filter(
        Response.question_id == id).all()
    responses = [response.to_dict() for response in response_query]
    print('---------------------------------')
    print(response_query)
    print('---------------------------------')
    return {"responses": responses}


@response_routes.route('/', methods=['POST'])
@login_required
def create_response():
    """
    Creates a new response to a question
    """
    form = ResponseForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        response = Response(
            user_id=form.data["user_id"],
            question_id=form.data["question_id"],
            response=form.data["response"]
        )
        db.session.add(response)
        db.session.commit()
        response_dict = response.to_dict()
        return {**response_dict}
    errors = form.errors
    return {'errors': validation_errors_to_error_messages(errors)}, 401


@response_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_response(id):
    """
    Delete a single response
    """
    response = Response.query.get(id)

    db.session.delete(response)
    db.session.commit()

    return {"message": "SUCCESS"}, 204


@response_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_response(id):
    """
    Alter a response
    """
    data = request.json
    response = Response.query.get(id)
    response.response = data["response"]

    db.session.commit()
    response_dict = response.to_dict()

    return {**response_dict}
