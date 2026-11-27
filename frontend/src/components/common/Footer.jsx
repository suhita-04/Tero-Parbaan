import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="footer-contact" className="bg-white border-t border-brand-border mt-20 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 sm:gap-12 pb-14 border-b border-brand-border">
          
          {/* Brand Philosophy & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-full bg-brand-black border border-brand-crimson flex items-center justify-center p-0.5">
                <span className="font-bengali text-[8px] text-brand-gold font-bold">তেরো</span>
              </div>
              <h3 className="font-serif text-2xl tracking-widest uppercase text-brand-crimson font-medium">
                {t('brand_name')}
              </h3>
            </div>

            {/* Poetic Bengali Tagline */}
            <p className="font-bengali text-sm text-brand-black leading-relaxed font-normal">
              &ldquo;{t('tagline_bengali')}&rdquo;
            </p>

            <p className="text-xs text-brand-stone font-sans max-w-md leading-relaxed font-light">
              {t('footer_philosophy')}
            </p>

            <div className="pt-2 text-[11px] tracking-[0.2em] uppercase text-brand-black font-sans flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson"></span>
                <strong>Dhaka, Bangladesh</strong>
              </span>
              <span className="text-brand-border">&bull;</span>
              {/* Instagram Profile Link */}
              <a
                href="https://instagram.com/tero_parbon3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-crimson hover:text-brand-crimson-hover font-medium underline underline-offset-4 flex items-center gap-1"
              >
                <span>{t('footer_instagram')}</span>
                <span className="text-[10px]">&nearr;</span>
              </a>
            </div>
          </div>

          {/* Boutique Collections Navigation */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs uppercase tracking-widest text-brand-black font-semibold">
              {t('footer_col_title')}
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-stone font-sans">
              <li>
                <Link to="/shop?category=sarees" className="hover:text-brand-crimson transition-colors">
                  {t('cat_sarees')}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=blouses" className="hover:text-brand-crimson transition-colors">
                  {t('cat_blouses')}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=kurtis" className="hover:text-brand-crimson transition-colors">
                  {t('cat_kurtis')}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=stoles" className="hover:text-brand-crimson transition-colors">
                  {t('cat_stoles')}
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-brand-crimson transition-colors">
                  {t('cat_all')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Stories */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs uppercase tracking-widest text-brand-black font-semibold">
              {t('footer_service_title')}
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-stone font-sans">
              <li>
                <Link to="/about" className="hover:text-brand-crimson transition-colors font-medium text-brand-black">
                  {t('nav_about')}
                </Link>
              </li>
              <li>
                <Link to="/founder" className="hover:text-brand-crimson transition-colors font-medium text-brand-black">
                  {t('nav_founder')}
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-brand-crimson transition-colors font-medium text-brand-black">
                  {t('nav_reviews')}
                </Link>
              </li>
              <li>
                <span className="hover:text-brand-crimson transition-colors cursor-pointer">
                  {t('footer_guide_size')}
                </span>
              </li>
              <li>
                <span className="hover:text-brand-crimson transition-colors cursor-pointer">
                  {t('footer_guide_cod')}
                </span>
              </li>
              <li>
                <span className="hover:text-brand-crimson transition-colors cursor-pointer">
                  {t('footer_guide_care')}
                </span>
              </li>
              <li>
                <a
                  href="https://instagram.com/tero_parbon3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-crimson transition-colors inline-block"
                >
                  {t('footer_follow_insta')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-stone font-sans gap-4">
          <p>&copy; {new Date().getFullYear()} {t('brand_name')}. {t('footer_copyright')}</p>
          <p className="tracking-wide text-center sm:text-right">
            {t('footer_motto')} &bull; Dhaka, Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}
