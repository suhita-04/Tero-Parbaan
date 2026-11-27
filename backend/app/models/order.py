from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.session import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    customer_name = Column(String(150), nullable=False)
    phone = Column(String(30), nullable=False)
    address = Column(Text, nullable=False)
    total_amount = Column(Float, nullable=False)
    order_status = Column(String(50), default="PENDING", nullable=False)  # PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED
    payment_method = Column(String(50), default="Cash on Delivery", nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    # Relationships
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan", lazy="joined")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="SET NULL"), nullable=True)
    variation_id = Column(Integer, ForeignKey("variations.id", ondelete="SET NULL"), nullable=True)
    product_title = Column(String(255), nullable=False)
    size = Column(String(50), nullable=True)
    color = Column(String(50), nullable=True)
    unit_price = Column(Float, nullable=False)
    quantity = Column(Integer, default=1, nullable=False)
    subtotal = Column(Float, nullable=False)

    # Relationships
    order = relationship("Order", back_populates="items")
