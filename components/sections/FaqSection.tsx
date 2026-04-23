'use client';

import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';
import { useLocale } from '@/lib/i18n/LocaleContext';
import type { DictKey } from '@/lib/i18n/dict';

const QA: { q: DictKey; a: DictKey }[] = [
  { q: 'faq.q1', a: 'faq.a1' },
  { q: 'faq.q2', a: 'faq.a2' },
  { q: 'faq.q3', a: 'faq.a3' },
  { q: 'faq.q4', a: 'faq.a4' },
  { q: 'faq.q5', a: 'faq.a5' },
  { q: 'faq.q6', a: 'faq.a6' },
];

export default function FaqSection() {
  const { t } = useLocale();
  return (
    <Section id="faq">
      <SectionTitle subtitle={t('faq.subtitle')}>{t('faq.title')}</SectionTitle>
      <div className="max-w-3xl mx-auto space-y-3">
        {QA.map(({ q, a }) => (
          <details key={q} className="glass p-5 group [&[open]>summary>span]:rotate-45">
            <summary className="flex items-center justify-between cursor-pointer text-white font-medium text-base md:text-lg list-none">
              <span className="flex-1 pr-4">{t(q)}</span>
              <span className="text-brand-blue text-2xl transition-transform duration-300 leading-none">+</span>
            </summary>
            <p className="mt-4 text-zinc-300 text-sm md:text-base leading-relaxed">{t(a)}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
