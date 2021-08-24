from .db import db


class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    question = db.Column(db.Text, nullable=False)
    answered = db.Column(db.Boolean, nullable=True)

    user = db.relationship("User", back_populates="questions")
    responses = db.relationship(
        "Response", back_populates="question", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'question': self.question,
            'answered': self.answered
        }
