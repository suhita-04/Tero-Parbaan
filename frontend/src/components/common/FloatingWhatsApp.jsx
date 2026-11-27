import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function FloatingWhatsApp() {
  const { t } = useLanguage();

  const defaultMessage = encodeURIComponent(
    'Hello Tero Parbaan, I would like to inquire about your Dhaka boutique collection.'
  );

  return (
    <aside className="fixed bottom-6 right-6 z-40 group flex items-center" aria-label="Customer Support">
      {/* Tooltip on hover */}
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 bg-brand-black text-white text-[11px] font-sans font-medium uppercase tracking-wider rounded-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {t('whatsapp_inquire')}
      </span>

      {/* Floating WhatsApp Action Button */}
      <a
        href={`https://wa.me/8801700000000?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center p-3.5 shadow-lg whatsapp-pulse hover:bg-[#20ba59] transition-all"
        aria-label="Direct WhatsApp Inquiry with Dhaka Atelier"
        title={t('whatsapp_tooltip')}
      >
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.158.572 4.184 1.574 5.938l-1.668 6.095 6.257-1.642c1.7 1.054 3.708 1.609 5.837 1.609 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
        </svg>
      </a>
    </aside>
  );
}
