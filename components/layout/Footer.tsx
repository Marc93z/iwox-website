'use client';

import Link from 'next/link';
import { useLocale } from '@/lib/i18n/LocaleContext';

export default function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] mt-20 pt-12 pb-8 px-4 md:px-8 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div>
          <div className="logo mb-3">iwox.ai</div>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">{t('footer.tagline')}</p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
            {t('footer.contact')}
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://wa.me/33602731139"
                target="_blank"
                rel="noopener"
                className="text-zinc-400 hover:text-whatsapp transition-colors"
              >
                +33 6 02 73 11 39
              </a>
            </li>
            <li>
              <a
                href="mailto:contact.iwox@gmail.com"
                className="text-zinc-400 hover:text-brand-blue transition-colors"
              >
                contact.iwox@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/mentions-legales" className="text-zinc-400 hover:text-brand-blue transition-colors">
                {t('footer.legal')}
              </Link>
            </li>
            <li>
              <Link
                href="/politique-confidentialite"
                className="text-zinc-400 hover:text-brand-blue transition-colors"
              >
                {t('footer.privacy')}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/[0.04] text-center text-zinc-500 text-xs">
        © {year} iwox.ai — {t('footer.rights')}
      </div>
    </footer>
  );
}
