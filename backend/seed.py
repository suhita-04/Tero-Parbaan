"""
Seed script to populate initial sample products for Tero Parbon.
Usage:
    python seed.py
"""
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app.db.session import SessionLocal, engine, Base
from app.models.product import Product, Variation
from app.models.user import AdminUser

def seed():
    # Ensure tables exist
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # Check if already seeded
        if db.query(Product).first():
            print("Database already contains products. Skipping seed.")
            return

        print("Seeding Tero Parbon luxury catalog...")

        sample_products = [
            {
                "title": "Royal Crimson Jamdani Saree",
                "description": "Authentic handloom Jamdani saree woven with pure cotton-silk and rich crimson and gold motifs. Drapes like a dream for weddings and festivals.",
                "base_price": 240.0,
                "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
                "category": "sarees",
                "variations": [
                    {"size": "Free Size", "color": "Crimson Red", "stock_quantity": 8, "sku": "TP-SAR-JAM-RED-01", "price_adjustment": 0.0},
                    {"size": "Free Size", "color": "Deep Maroon", "stock_quantity": 5, "sku": "TP-SAR-JAM-MAR-02", "price_adjustment": 15.0},
                ]
            },
            {
                "title": "Bespoke Beige Raw Silk Blouse",
                "description": "Handcrafted sweetheart-neck blouse featuring intricate antique gold zardozi embroidery along the sleeves and back tie-up detail.",
                "base_price": 95.0,
                "image_url": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
                "category": "blouses",
                "variations": [
                    {"size": "S", "color": "Vintage Cream", "stock_quantity": 10, "sku": "TP-BLS-ZAR-CRM-S", "price_adjustment": 0.0},
                    {"size": "M", "color": "Vintage Cream", "stock_quantity": 12, "sku": "TP-BLS-ZAR-CRM-M", "price_adjustment": 0.0},
                    {"size": "L", "color": "Vintage Cream", "stock_quantity": 6, "sku": "TP-BLS-ZAR-CRM-L", "price_adjustment": 0.0},
                ]
            },
            {
                "title": "Chanderi Minimalist A-Line Kurti",
                "description": "Breathable Chanderi silk kurti in soft ivory with subtle tonal thread embroidery and mother-of-pearl buttons. Understated luxury for daytime elegance.",
                "base_price": 85.0,
                "image_url": "https://images.unsplash.com/photo-1583391733975-dd2d0865d8c3?auto=format&fit=crop&w=800&q=80",
                "category": "kurtis",
                "variations": [
                    {"size": "S", "color": "Ivory Beige", "stock_quantity": 15, "sku": "TP-KUR-CHA-IVR-S", "price_adjustment": 0.0},
                    {"size": "M", "color": "Ivory Beige", "stock_quantity": 20, "sku": "TP-KUR-CHA-IVR-M", "price_adjustment": 0.0},
                    {"size": "L", "color": "Ivory Beige", "stock_quantity": 12, "sku": "TP-KUR-CHA-IVR-L", "price_adjustment": 0.0},
                ]
            },
            {
                "title": "Heritage Baluchari Silk Saree",
                "description": "Exquisite Bishnupur Baluchari depicting mythological narratives along the pallu with glistening resham threads.",
                "base_price": 290.0,
                "image_url": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
                "category": "sarees",
                "variations": [
                    {"size": "Free Size", "color": "Royal Burgundy", "stock_quantity": 4, "sku": "TP-SAR-BAL-BUR-01", "price_adjustment": 0.0},
                    {"size": "Free Size", "color": "Classic Indigo", "stock_quantity": 6, "sku": "TP-SAR-BAL-IND-02", "price_adjustment": 0.0},
                ]
            }
        ]

        for p_data in sample_products:
            variations_data = p_data.pop("variations")
            product = Product(**p_data)
            db.add(product)
            db.flush()

            for v_data in variations_data:
                variation = Variation(product_id=product.id, **v_data)
                db.add(variation)

        # Seed initial admin user placeholder
        admin = AdminUser(
            email="admin@teroparbon.com",
            hashed_password="pbkdf2_sha256$260000$placeholderhashfortesting$",
            full_name="Tero Parbon Boutique Admin",
            role="SUPER_ADMIN",
            is_active=True
        )
        db.add(admin)

        db.commit()
        print("Successfully seeded catalog items and default admin user!")

    except Exception as e:
        db.rollback()
        print(f"Error during seeding: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed()
