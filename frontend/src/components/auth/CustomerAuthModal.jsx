import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function CustomerAuthModal({ isOpen, onClose }) {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [currentUser, setCurrentUser] = useState(null);

  // Form states
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerIdentifier, setRegisterIdentifier] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Load existing user from localStorage on mount and when modal opens
  useEffect(() => {
    const checkCustomerAuth = () => {
      try {
        const saved = localStorage.getItem('tp_customer');
        if (saved) {
          setCurrentUser(JSON.parse(saved));
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        console.error('Error reading customer session', err);
        setCurrentUser(null);
      }
    };

    checkCustomerAuth();

    // Listen to custom customer auth change events
    window.addEventListener('tp_customer_change', checkCustomerAuth);
    return () => window.removeEventListener('tp_customer_change', checkCustomerAuth);
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!loginIdentifier.trim()) {
      setErrorMsg(language === 'bn' ? 'অনুগ্রহ করে ইমেইল বা ফোন নম্বর দিন' : 'Please provide your email or phone number');
      return;
    }
    if (!loginPassword.trim()) {
      setErrorMsg(language === 'bn' ? 'অনুগ্রহ করে পাসওয়ার্ড দিন' : 'Please provide your password');
      return;
    }

    // Mock successful login
    const userObj = {
      name: loginIdentifier.includes('@') ? loginIdentifier.split('@')[0] : 'Patron',
      identifier: loginIdentifier.trim(),
      role: 'customer',
      joinedAt: new Date().toISOString(),
    };

    localStorage.setItem('tp_customer', JSON.stringify(userObj));
    window.dispatchEvent(new Event('tp_customer_change'));
    setCurrentUser(userObj);
    setSuccessMsg(language === 'bn' ? 'সফলভাবে লগইন হয়েছে!' : 'Logged in successfully!');
    setLoginIdentifier('');
    setLoginPassword('');
  };

  const handleDemoLogin = () => {
    setErrorMsg('');
    const demoUser = {
      name: 'Samira Rahman',
      identifier: '01712-345678',
      email: 'samira.rahman@example.com',
      role: 'customer',
      tier: 'Dhaka Boutique Patron',
      joinedAt: new Date().toISOString(),
    };

    localStorage.setItem('tp_customer', JSON.stringify(demoUser));
    window.dispatchEvent(new Event('tp_customer_change'));
    setCurrentUser(demoUser);
    setSuccessMsg(language === 'bn' ? 'ডেমো অ্যাকাউন্ট দিয়ে সফলভাবে লগইন হয়েছে!' : 'Logged in as Demo Patron!');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!registerName.trim()) {
      setErrorMsg(language === 'bn' ? 'অনুগ্রহ করে আপনার নাম দিন' : 'Please enter your full name');
      return;
    }
    if (!registerIdentifier.trim()) {
      setErrorMsg(language === 'bn' ? 'অনুগ্রহ করে ইমেইল বা ফোন নম্বর দিন' : 'Please enter email or phone number');
      return;
    }
    if (!registerPassword.trim() || registerPassword.length < 4) {
      setErrorMsg(language === 'bn' ? 'পাসওয়ার্ড ন্যূনতম ৪ অক্ষরের হতে হবে' : 'Password must be at least 4 characters');
      return;
    }

    const newUser = {
      name: registerName.trim(),
      identifier: registerIdentifier.trim(),
      role: 'customer',
      joinedAt: new Date().toISOString(),
    };

    localStorage.setItem('tp_customer', JSON.stringify(newUser));
    window.dispatchEvent(new Event('tp_customer_change'));
    setCurrentUser(newUser);
    setSuccessMsg(language === 'bn' ? 'আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!' : 'Account created successfully!');
    setRegisterName('');
    setRegisterIdentifier('');
    setRegisterPassword('');
  };

  const handleLogout = () => {
    localStorage.removeItem('tp_customer');
    window.dispatchEvent(new Event('tp_customer_change'));
    setCurrentUser(null);
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleExploreSarees = () => {
    onClose();
    navigate('/shop?category=sarees');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className="relative bg-[#FAF8F5] border border-brand-gold/50 shadow-2xl rounded-sm w-full max-w-md overflow-hidden z-10 animate-fadeIn"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Crimson Accent Hairline */}
        <div className="h-1 bg-gradient-to-r from-brand-crimson via-brand-gold to-brand-crimson" />

        {/* Header with Close Button */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between border-b border-brand-border/60">
          <div className="flex items-center space-x-3">
            {/* Circular Crimson & Jet Black Brand Badge */}
            <div className="w-10 h-10 rounded-full bg-brand-black border-2 border-brand-crimson p-0.5 flex items-center justify-center shadow-sm flex-shrink-0">
              <div className="w-full h-full rounded-full border border-brand-gold/60 flex flex-col items-center justify-center bg-gradient-to-br from-brand-crimson via-brand-black to-brand-black text-white text-center leading-none">
                <span className="font-bengali text-[8.5px] font-bold text-brand-gold-light">তেরো</span>
                <span className="font-bengali text-[7px] text-white -mt-0.5">পার্বণ</span>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-xl text-brand-black tracking-wide font-medium">
                {t('auth_portal_title')}
              </h3>
              <p className="text-[11px] text-brand-stone font-sans">
                {t('brand_subtitle')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-brand-stone hover:text-brand-crimson p-1 text-lg transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {currentUser ? (
            /* Logged-In Profile View */
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 rounded-full bg-brand-crimson/10 border-2 border-brand-gold/50 mx-auto flex items-center justify-center text-brand-crimson font-serif text-2xl font-bold">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'P'}
              </div>

              <div>
                <span className="inline-block px-2.5 py-0.5 bg-brand-gold/15 text-brand-black border border-brand-gold/40 text-[10px] uppercase tracking-widest font-sans font-medium rounded-full mb-1">
                  {t('auth_patron_badge')}
                </span>
                <h4 className="font-serif text-2xl text-brand-black font-medium">
                  {t('auth_welcome_patron')} {currentUser.name}!
                </h4>
                <p className="text-xs text-brand-stone font-sans mt-0.5">
                  {currentUser.identifier || currentUser.email}
                </p>
              </div>

              <div className="bg-white/80 border border-brand-border rounded-sm p-4 text-left text-xs font-sans text-brand-black space-y-2">
                <div className="flex justify-between">
                  <span className="text-brand-stone">{language === 'bn' ? 'স্ট্যাটাস:' : 'Member Status:'}</span>
                  <strong className="text-brand-crimson font-medium">{t('auth_member_since')}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-stone">{language === 'bn' ? 'ক্যাশ অন ডেলিভারি:' : 'Cash on Delivery:'}</span>
                  <span className="text-emerald-700 font-medium">{language === 'bn' ? 'সক্রিয় (দেশব্যাপী)' : 'Eligible (Nationwide)'}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleExploreSarees}
                  className="w-full py-2.5 bg-brand-crimson text-white text-xs uppercase tracking-widest font-sans font-medium hover:bg-brand-crimson-hover transition-colors rounded-sm shadow-sm"
                >
                  {t('auth_btn_shop')}
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-2 border border-brand-border text-brand-stone hover:text-brand-crimson hover:border-brand-crimson text-xs uppercase tracking-wider font-sans transition-colors rounded-sm"
                >
                  {t('auth_btn_logout')}
                </button>
              </div>
            </div>
          ) : (
            /* Authentication Form (Tabs: Login & Register) */
            <div>
              {/* Tab Switcher */}
              <div className="flex border-b border-brand-border mb-5">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className={`flex-1 pb-2.5 text-xs uppercase tracking-wider font-sans transition-all text-center border-b-2 ${
                    activeTab === 'login'
                      ? 'border-brand-crimson text-brand-crimson font-semibold'
                      : 'border-transparent text-brand-stone hover:text-brand-black'
                  }`}
                >
                  {t('auth_tab_login')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('register');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className={`flex-1 pb-2.5 text-xs uppercase tracking-wider font-sans transition-all text-center border-b-2 ${
                    activeTab === 'register'
                      ? 'border-brand-crimson text-brand-crimson font-semibold'
                      : 'border-transparent text-brand-stone hover:text-brand-black'
                  }`}
                >
                  {t('auth_tab_register')}
                </button>
              </div>

              {/* Status Alerts */}
              {errorMsg && (
                <div className="mb-4 p-2.5 bg-brand-red-light border border-brand-red/25 text-brand-red-hover text-xs font-sans rounded-sm">
                  {errorMsg}
                </div>
              )}
              {successMsg && (
                <div className="mb-4 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans rounded-sm">
                  {successMsg}
                </div>
              )}

              {/* Sign In Form */}
              {activeTab === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-sans text-brand-black mb-1">
                      {t('auth_label_identifier')}
                    </label>
                    <input
                      type="text"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder={t('auth_placeholder_identifier')}
                      className="w-full px-3 py-2 text-xs font-sans bg-white border border-brand-border rounded-sm focus:outline-none focus:border-brand-crimson"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans text-brand-black mb-1">
                      {t('auth_label_password')}
                    </label>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder={t('auth_placeholder_password')}
                      className="w-full px-3 py-2 text-xs font-sans bg-white border border-brand-border rounded-sm focus:outline-none focus:border-brand-crimson"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-brand-crimson text-white text-xs uppercase tracking-widest font-sans font-medium hover:bg-brand-crimson-hover transition-colors rounded-sm shadow-sm"
                  >
                    {t('auth_btn_submit_login')}
                  </button>

                  {/* One-Click Demo Login Helper */}
                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={handleDemoLogin}
                      className="text-[11px] text-brand-stone hover:text-brand-crimson transition-colors underline decoration-dotted underline-offset-4"
                    >
                      ⚡ {t('auth_demo_btn')}
                    </button>
                  </div>
                </form>
              ) : (
                /* Create Account Form */
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-sans text-brand-black mb-1">
                      {t('auth_label_name')}
                    </label>
                    <input
                      type="text"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      placeholder={t('auth_placeholder_name')}
                      className="w-full px-3 py-2 text-xs font-sans bg-white border border-brand-border rounded-sm focus:outline-none focus:border-brand-crimson"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans text-brand-black mb-1">
                      {t('auth_label_identifier')}
                    </label>
                    <input
                      type="text"
                      value={registerIdentifier}
                      onChange={(e) => setRegisterIdentifier(e.target.value)}
                      placeholder={t('auth_placeholder_identifier')}
                      className="w-full px-3 py-2 text-xs font-sans bg-white border border-brand-border rounded-sm focus:outline-none focus:border-brand-crimson"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans text-brand-black mb-1">
                      {t('auth_label_password')}
                    </label>
                    <input
                      type="password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      placeholder={t('auth_placeholder_password')}
                      className="w-full px-3 py-2 text-xs font-sans bg-white border border-brand-border rounded-sm focus:outline-none focus:border-brand-crimson"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-brand-crimson text-white text-xs uppercase tracking-widest font-sans font-medium hover:bg-brand-crimson-hover transition-colors rounded-sm shadow-sm mt-2"
                  >
                    {t('auth_btn_submit_register')}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
