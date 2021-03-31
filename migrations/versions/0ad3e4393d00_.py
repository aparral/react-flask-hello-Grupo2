"""empty message

Revision ID: 0ad3e4393d00
Revises: e7d734084453
Create Date: 2021-03-30 22:28:47.569729

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0ad3e4393d00'
down_revision = 'e7d734084453'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('favoritos', sa.Column('name_servicio', sa.String(length=50), nullable=True))
    op.alter_column('favoritos', 'id_servicio_registrados',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('favoritos', 'id_user',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.drop_column('servicio_registrados', 'username')
    op.add_column('user', sa.Column('userName', sa.String(length=100), nullable=False))
    op.add_column('user', sa.Column('userPass', sa.String(length=100), nullable=False))
    op.create_unique_constraint(None, 'user', ['userName'])
    op.drop_column('user', 'password')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('password', sa.VARCHAR(length=200), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'user', type_='unique')
    op.drop_column('user', 'userPass')
    op.drop_column('user', 'userName')
    op.add_column('servicio_registrados', sa.Column('username', sa.VARCHAR(length=50), autoincrement=False, nullable=False))
    op.alter_column('favoritos', 'id_user',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('favoritos', 'id_servicio_registrados',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.drop_column('favoritos', 'name_servicio')
    # ### end Alembic commands ###
