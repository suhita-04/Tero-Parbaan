import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import CartDrawer from '../cart/CartDrawer';
import FloatingWhatsApp from '../common/FloatingWhatsApp';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-canvas text-brand-black selection:bg-brand-crimson-soft selection:text-brand-crimson">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      {/* Global Slide-out Cart Drawer */}
      <CartDrawer />
      {/* Subtle Floating WhatsApp Inquiry Button in Bottom-Right Corner */}
      <FloatingWhatsApp />
    </div>
  );
}
