import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
