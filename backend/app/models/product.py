from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.session import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=True)
    base_price = Column(Float, nullable=False)
    image_url = Column(String(500), nullable=True)
    category = Column(String(50), nullable=True, default="sarees", index=True)  # sarees, kurtis, blouses
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    # Relationships
    variations = relationship("Variation", back_populates="product", cascade="all, delete-orphan", lazy="joined")


class Variation(Base):
    __tablename__ = "variations"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True)
    size = Column(String(50), nullable=False)  # XS, S, M, L, XL, Free Size
    color = Column(String(50), nullable=False)  # Crimson Red, Vintage Cream, etc.
    stock_quantity = Column(Integer, default=0, nullable=False)
    sku = Column(String(100), unique=True, index=True, nullable=True)
    price_adjustment = Column(Float, default=0.0, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    # Relationships
    product = relationship("Product", back_populates="variations")
