'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLocale } from '@/lib/i18n/LocaleContext';
import type { DictKey } from '@/lib/i18n/dict';

interface NavLink {
  href: string;
  labelKey: DictKey;
}

const NAV_LINKS: NavLink[] = [
  { href: '#services', labelKey: 'nav.services' },
  { href: '#demo', labelKey: 'nav.demo' },
  { href: '#pricing', labelKey: 'nav.pricing' },
  { href: '#about', labelKey: 'nav.about' },
  { href: '#contact', labelKey: 'nav.contact' },
];

export default function Navbar() {
  const { t, locale, setLocale } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/80 backdrop-blur-lg border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="logo" aria-label="iwox.ai">
          iwox.ai
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link text-sm">
              {t(l.labelKey)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-1">
            {(['fr', 'en'] as const).map((lng) => (
              <button
                key={lng}
                type="button"
                onClick={() => setLocale(lng)}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition-all ${
                  locale === lng
                    ? 'bg-gradient-brand text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
                aria-pressed={locale === lng}
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="menu"
            aria-expanded={mobileOpen}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-bg/95 backdrop-blur-lg">
          <div className="px-4 py-4 space-y-3">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block text-zinc-300 hover:text-brand-blue py-2"
              >
                {t(l.labelKey)}
              </a>
            ))}
            <div className="flex sm:hidden gap-1 bg-white/5 border border-white/10 rounded-lg p-1 w-fit">
              {(['fr', 'en'] as const).map((lng) => (
                <button
                  key={lng}
                  type="button"
                  onClick={() => setLocale(lng)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded transition-all ${
                    locale === lng ? 'bg-gradient-brand text-white' : 'text-zinc-400'
                  }`}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
