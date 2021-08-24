from app.models import db, Response


def seed_responses():
    response1a = Response(
        user_id=2, question_id=1, response="Something you don't talk about."
    )
    response1b = Response(
        user_id=3, question_id=1, response="Too much said already."
    )
    response1c = Response(
        user_id=3, question_id=1, response="But something to do with soap I think."
    )
    response2a = Response(
        user_id=1, question_id=2, response="Depends on what kind of partner you have. Breakfast in bed could be nice. Or something more wild like a puzzle with some soda."
    )
    response2b = Response(
        user_id=3, question_id=2, response="Walks can be nice, but maybe just getting a few books to read about the subject they might be interested in."
    )
    response2c = Response(
        user_id=1, question_id=2, response="Two week vacation in Ibiza should do them right."
    )
    response3a = Response(
        user_id=2, question_id=3, response="Draw your design on paper first."
    )
    response3b = Response(
        user_id=1, question_id=3, response="Get some of those pumpkin tools."
    )
    response3c = Response(
        user_id=1, question_id=3, response="I would be careful to keep thick support where you've cut so it doesn't cave in the first few days."
    )
    response4a = Response(
        user_id=2, question_id=4, response="The infamous room 44 is now stuck somewhere in last week."
    )
    response4b = Response(
        user_id=3, question_id=4, response="Found Virtually everywhere."
    )
    response4c = Response(
        user_id=3, question_id=4, response="Literally it was a virtual place that brought together some great and like minded peeps."
    )
    response5a = Response(
        user_id=1, question_id=5, response="The moon is great I hear"
    )
    response5b = Response(
        user_id=1, question_id=5, response="No seriously, I am sure if you wait long enough they'll exist. honeymoons to the Moon."
    )
    response5c = Response(
        user_id=3, question_id=5, response="I would say a beach near a mountain."
    )
    response6a = Response(
        user_id=1, question_id=6, response=""
    )
    response6b = Response(
        user_id=1, question_id=6, response=""
    )
    response6c = Response(
        user_id=1, question_id=6, response=""
    )
    response7a = Response(
        user_id=1, question_id=7, response=""
    )
    response7b = Response(
        user_id=1, question_id=7, response=""
    )
    response7c = Response(
        user_id=1, question_id=7, response=""
    )
    response8a = Response(
        user_id=1, question_id=8, response=""
    )
    response8b = Response(
        user_id=1, question_id=8, response=""
    )
    response8c = Response(
        user_id=1, question_id=8, response=""
    )
    response9a = Response(
        user_id=1, question_id=9, response=""
    )
    response9b = Response(
        user_id=1, question_id=9, response=""
    )
    response9c = Response(
        user_id=1, question_id=9, response=""
    )

    db.session.add(response1a)
    db.session.add(response1b)
    db.session.add(response1c)
    db.session.add(response2a)
    db.session.add(response2b)
    db.session.add(response2c)
    db.session.add(response3a)
    db.session.add(response3b)
    db.session.add(response3c)
    db.session.add(response4a)
    db.session.add(response4b)
    db.session.add(response4c)
    db.session.add(response5a)
    db.session.add(response5b)
    db.session.add(response5c)
    db.session.add(response6a)
    db.session.add(response6b)
    db.session.add(response6c)
    db.session.add(response7a)
    db.session.add(response7b)
    db.session.add(response7c)
    db.session.add(response8a)
    db.session.add(response8b)
    db.session.add(response8c)
    db.session.add(response9a)
    db.session.add(response9b)
    db.session.add(response9c)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the responses table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_responses():
    db.session.execute('TRUNCATE responses RESTART IDENTITY CASCADE;')
    db.session.commit()
