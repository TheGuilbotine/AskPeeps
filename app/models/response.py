from .db import db


class Response(db.Model):
    __tablename__ = 'responses'

    id = db.Column(db.Integer, primary_key=True)
    # change username
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(
        "questions.id"), nullable=False)
    response = db.Column(db.Text, nullable=False)

    user = db.relationship("User", back_populates="responses")
    question = db.relationship("Question", back_populates="responses")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'question_id': self.question_id,
            'response': self.response,
            'username': self.user.username
        }
