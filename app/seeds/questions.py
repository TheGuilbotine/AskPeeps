from app.models import db, Question


# Adds a demo user, you can add other users here if you want
def seed_users():
    question1 = Question(
        user_id=1, question="What is fight club?", answered=False
    )
    question2 = Question(
        user_id=2, question="How do I please my partner?", answered=False
    )
    question3 = Question(
        user_id=3, question="How do I carve a pumpkin?", answered=False
    )
    question4 = Question(
        user_id=1, question="Where is room 44?", answered=False
    )
    question5 = Question(
        user_id=2, question="Where is a good honeymoon spot?", answered=False
    )
    question6 = Question(
        user_id=3, question="Where is a good vacation spot?", answered=False
    )
    question7 = Question(
        user_id=1, question="What flavor gum is the best?", answered=False
    )
    question8 = Question(
        user_id=2, question="Is it jif or gif?", answered=False
    )
    question9 = Question(
        user_id=3, question="How do you cut a Mango?", answered=False
    )


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE questions RESTART IDENTITY CASCADE;')
    db.session.commit()
