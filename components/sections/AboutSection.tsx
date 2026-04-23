'use client';

import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';
import { useLocale } from '@/lib/i18n/LocaleContext';

export default function AboutSection() {
  const { t } = useLocale();
  return (
    <Section id="about">
      <SectionTitle>{t('about.title')}</SectionTitle>
      <div className="max-w-3xl mx-auto space-y-5 text-zinc-300 text-base md:text-lg leading-relaxed text-center">
        <p>{t('about.p1')}</p>
        <p>{t('about.p2')}</p>
        <p className="text-brand-blue font-medium">{t('about.p3')}</p>
      </div>
    </Section>
  );
}
