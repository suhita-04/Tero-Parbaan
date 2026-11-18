import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import CartDrawer from '../cart/CartDrawer';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream text-brand-charcoal selection:bg-brand-red-soft selection:text-brand-red">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      {/* Global Slide-out Cart Drawer */}
      <CartDrawer />
    </div>
  );
}
