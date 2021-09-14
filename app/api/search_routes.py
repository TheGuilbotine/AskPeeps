from flask import Blueprint, request
from app.models import Question


search_routes = Blueprint("search", __name__)

# Search Questions


@search_routes.route("/")
def get_results():
    """
    Search database for questions.
    """
    if "question" in request.args:
        search_str = request.args.get("question")
        results = Question.query.filter(
            Question.question.ilike("%"+search_str+"%"))
    return {"results": [question.to_dict() for question in results]}
