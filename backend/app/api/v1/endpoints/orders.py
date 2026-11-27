from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.order import Order, OrderItem
from app.models.product import Product, Variation
from app.schemas.order import OrderCreate, OrderOut

router = APIRouter()

@router.post("", response_model=OrderOut, status_code=status.HTTP_201_CREATED, summary="Submit a new Cash on Delivery order")
@router.post("/", response_model=OrderOut, status_code=status.HTTP_201_CREATED, include_in_schema=False)
def create_order(order_in: OrderCreate, db: Session = Depends(get_db)):
    """
    Submit a new Cash on Delivery (COD) order.
    Validates items, calculates total amount, records line items, and persists order.
    """
    calculated_total = 0.0
    order_items_to_create = []

    for item_in in order_in.items:
        product_title = item_in.product_title or "Boutique Item"
        size = item_in.size
        color = item_in.color
        unit_price = item_in.unit_price or 0.0

        # Look up product and variation details if provided
        if item_in.variation_id:
            variation = db.query(Variation).filter(Variation.id == item_in.variation_id).first()
            if variation:
                size = size or variation.size
                color = color or variation.color
                product = variation.product
                if product:
                    product_title = product.title
                    unit_price = product.base_price + variation.price_adjustment

                # Optionally decrement stock
                if variation.stock_quantity >= item_in.quantity:
                    variation.stock_quantity -= item_in.quantity
                else:
                    variation.stock_quantity = 0

        elif item_in.product_id:
            product = db.query(Product).filter(Product.id == item_in.product_id).first()
            if product:
                product_title = product.title
                unit_price = unit_price or product.base_price

        subtotal = round(unit_price * item_in.quantity, 2)
        calculated_total += subtotal

        order_items_to_create.append({
            "product_id": item_in.product_id,
            "variation_id": item_in.variation_id,
            "product_title": product_title,
            "size": size,
            "color": color,
            "unit_price": unit_price,
            "quantity": item_in.quantity,
            "subtotal": subtotal,
        })

    # Final order total: use calculated total or user provided total
    final_total = order_in.total_amount if order_in.total_amount is not None else round(calculated_total, 2)

    new_order = Order(
        customer_name=order_in.customer_name,
        phone=order_in.phone,
        address=order_in.address,
        total_amount=final_total,
        order_status="PENDING",
        payment_method="Cash on Delivery"
    )
    db.add(new_order)
    db.flush()

    # Create associated order items
    for item_data in order_items_to_create:
        order_item = OrderItem(
            order_id=new_order.id,
            **item_data
        )
        db.add(order_item)

    db.commit()
    db.refresh(new_order)
    return new_order


@router.get("/{order_id}", response_model=OrderOut, summary="Get order by ID")
def get_order(order_id: int, db: Session = Depends(get_db)):
    """
    Retrieve single order and its items by ID.
    """
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order #{order_id} not found."
        )
    return order


@router.get("", response_model=List[OrderOut], summary="List all orders")
@router.get("/", response_model=List[OrderOut], include_in_schema=False)
def list_orders(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    """
    List orders for administrative tracking.
    """
    return db.query(Order).order_by(Order.created_at.desc()).offset(skip).limit(limit).all()
