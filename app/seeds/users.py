from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='DemoLicious', email='demo@aa.io', f_name='Demo', l_name='Licious', birth_date="2021/08/24", password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', f_name='Barney', l_name='Nelson', birth_date="2003/08/24", password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', f_name='Billy', l_name='Jean', birth_date="1980/08/24", password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
