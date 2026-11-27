import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const DEFAULT_SETTINGS = {
  dhaka_delivery: 80,
  outside_dhaka_delivery: 150,
  notice_text: '',
  notice_active: false,
};

const StoreSettingsContext = createContext(null);

export function StoreSettingsProvider({ children }) {
  const [storeSettings, setStoreSettings] = useState(DEFAULT_SETTINGS);

  const refreshSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.ok && data.settings) {
        setStoreSettings({
          dhaka_delivery: Number(data.settings.dhaka_delivery ?? 80),
          outside_dhaka_delivery: Number(data.settings.outside_dhaka_delivery ?? 150),
          notice_text: data.settings.notice_text || '',
          notice_active: Boolean(data.settings.notice_active),
        });
      }
    } catch {
      // Fallback gracefully to DEFAULT_SETTINGS
    }
  }, []);

  useEffect(() => {
    refreshSettings();
  }, [refreshSettings]);

  return (
    <StoreSettingsContext.Provider value={{ storeSettings, setStoreSettings, refreshSettings }}>
      {children}
    </StoreSettingsContext.Provider>
  );
}

export function useStoreSettings() {
  const ctx = useContext(StoreSettingsContext);
  return ctx || { storeSettings: DEFAULT_SETTINGS, setStoreSettings: () => {}, refreshSettings: () => {} };
}
