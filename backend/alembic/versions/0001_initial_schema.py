"""Initial schema for Admin Users, Products, Variations, Orders, and OrderItems

Revision ID: 0001_initial_schema
Revises: 
Create Date: 2026-11-16 21:45:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = '0001_initial_schema'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 1. Admin Users table
    op.create_table(
        'admin_users',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('hashed_password', sa.String(length=255), nullable=False),
        sa.Column('full_name', sa.String(length=150), nullable=False),
        sa.Column('role', sa.String(length=50), server_default='STAFF', nullable=False),
        sa.Column('is_active', sa.Boolean(), server_default='true', nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_admin_users_id'), 'admin_users', ['id'], unique=False)
    op.create_index(op.f('ix_admin_users_email'), 'admin_users', ['email'], unique=True)

    # 2. Products table
    op.create_table(
        'products',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('base_price', sa.Float(), nullable=False),
        sa.Column('image_url', sa.String(length=500), nullable=True),
        sa.Column('category', sa.String(length=50), server_default='sarees', nullable=True),
        sa.Column('is_active', sa.Boolean(), server_default='true', nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_products_id'), 'products', ['id'], unique=False)
    op.create_index(op.f('ix_products_title'), 'products', ['title'], unique=False)
    op.create_index(op.f('ix_products_category'), 'products', ['category'], unique=False)

    # 3. Variations table
    op.create_table(
        'variations',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('product_id', sa.Integer(), nullable=False),
        sa.Column('size', sa.String(length=50), nullable=False),
        sa.Column('color', sa.String(length=50), nullable=False),
        sa.Column('stock_quantity', sa.Integer(), server_default='0', nullable=False),
        sa.Column('sku', sa.String(length=100), nullable=True),
        sa.Column('price_adjustment', sa.Float(), server_default='0.0', nullable=False),
        sa.Column('is_active', sa.Boolean(), server_default='true', nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(['product_id'], ['products.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_variations_id'), 'variations', ['id'], unique=False)
    op.create_index(op.f('ix_variations_product_id'), 'variations', ['product_id'], unique=False)
    op.create_index(op.f('ix_variations_sku'), 'variations', ['sku'], unique=True)

    # 4. Orders table
    op.create_table(
        'orders',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('customer_name', sa.String(length=150), nullable=False),
        sa.Column('phone', sa.String(length=30), nullable=False),
        sa.Column('address', sa.Text(), nullable=False),
        sa.Column('total_amount', sa.Float(), nullable=False),
        sa.Column('order_status', sa.String(length=50), server_default='PENDING', nullable=False),
        sa.Column('payment_method', sa.String(length=50), server_default='Cash on Delivery', nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_orders_id'), 'orders', ['id'], unique=False)

    # 5. Order Items table
    op.create_table(
        'order_items',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('order_id', sa.Integer(), nullable=False),
        sa.Column('product_id', sa.Integer(), nullable=True),
        sa.Column('variation_id', sa.Integer(), nullable=True),
        sa.Column('product_title', sa.String(length=255), nullable=False),
        sa.Column('size', sa.String(length=50), nullable=True),
        sa.Column('color', sa.String(length=50), nullable=True),
        sa.Column('unit_price', sa.Float(), nullable=False),
        sa.Column('quantity', sa.Integer(), server_default='1', nullable=False),
        sa.Column('subtotal', sa.Float(), nullable=False),
        sa.ForeignKeyConstraint(['order_id'], ['orders.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['product_id'], ['products.id'], ondelete='SET NULL'),
        sa.ForeignKeyConstraint(['variation_id'], ['variations.id'], ondelete='SET NULL'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_order_items_id'), 'order_items', ['id'], unique=False)
    op.create_index(op.f('ix_order_items_order_id'), 'order_items', ['order_id'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_order_items_order_id'), table_name='order_items')
    op.drop_index(op.f('ix_order_items_id'), table_name='order_items')
    op.drop_table('order_items')

    op.drop_index(op.f('ix_orders_id'), table_name='orders')
    op.drop_table('orders')

    op.drop_index(op.f('ix_variations_sku'), table_name='variations')
    op.drop_index(op.f('ix_variations_product_id'), table_name='variations')
    op.drop_index(op.f('ix_variations_id'), table_name='variations')
    op.drop_table('variations')

    op.drop_index(op.f('ix_products_category'), table_name='products')
    op.drop_index(op.f('ix_products_title'), table_name='products')
    op.drop_index(op.f('ix_products_id'), table_name='products')
    op.drop_table('products')

    op.drop_index(op.f('ix_admin_users_email'), table_name='admin_users')
    op.drop_index(op.f('ix_admin_users_id'), table_name='admin_users')
    op.drop_table('admin_users')
