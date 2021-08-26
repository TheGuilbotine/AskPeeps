"""first migrate with questions and responses

Revision ID: c09c429fb868
Revises: ffdc0a98111c
Create Date: 2021-08-24 22:02:06.235978

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c09c429fb868'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('questions',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('question', sa.Text(), nullable=False),
                    sa.Column('answered', sa.Boolean(), nullable=True),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('responses',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('question_id', sa.Integer(), nullable=False),
                    sa.Column('response', sa.Text(), nullable=False),
                    sa.ForeignKeyConstraint(
                        ['question_id'], ['questions.id'], ),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.add_column('users', sa.Column(
        'f_name', sa.String(length=30), nullable=False))
    op.add_column('users', sa.Column(
        'l_name', sa.String(length=30), nullable=False))
    op.add_column('users', sa.Column('birth_date', sa.Date(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'birth_date')
    op.drop_column('users', 'l_name')
    op.drop_column('users', 'f_name')
    op.drop_table('responses')
    op.drop_table('questions')
    # ### end Alembic commands ###
