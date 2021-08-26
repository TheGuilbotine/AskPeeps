from .db import db
from sqlalchemy.sql import func


class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    question = db.Column(db.Text, nullable=False)
    answered = db.Column(db.Boolean, nullable=True)
    #  TODO: Migrate, Update and reseed
    #  or use UTC.NOW default=datetime.datetime.utcnow()

    # created_at = db.Column(db.DateTime(timezone=True),
    #                        nullable=False, server_default=func.now())
    # updated_at = db.Column(db.DateTime(timezone=True),
    #                        nullable=False, server_default=func.now(), onupdate=func.now())

    user = db.relationship("User", back_populates="questions")
    responses = db.relationship(
        "Response", back_populates="question", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'question': self.question,
            'answered': self.answered,
            'responses': [response.to_dict() for response in self.responses]
            # TODO/ Add a responses key? pointing to the list of responses response.response for response in self.responses
        }
