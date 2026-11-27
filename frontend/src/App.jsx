import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import { StoreSettingsProvider } from './context/StoreSettingsContext';

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <StoreSettingsProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </StoreSettingsProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
