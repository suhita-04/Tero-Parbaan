import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import About from '../pages/About';
import Founder from '../pages/Founder';
import Reviews from '../pages/Reviews';
import ParbondeskDashboard from '../pages/parbondesk/ParbondeskDashboard';
import ParbondeskLogin from '../pages/parbondesk/ParbondeskLogin';
import ProtectedAdminRoute from '../components/auth/ProtectedAdminRoute';
import { AdminAuthProvider } from '../context/AdminAuthContext';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <AdminAuthProvider>
      <Routes>
        {/* Consumer Storefront Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="about" element={<About />} />
          <Route path="founder" element={<Founder />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Hidden Admin Portal — /parbondesk (not linked anywhere public) */}
        <Route path="/parbondesk/login" element={<ParbondeskLogin />} />
        <Route
          path="/parbondesk"
          element={
            <ProtectedAdminRoute>
              <ParbondeskDashboard />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </AdminAuthProvider>
  );
}
