'use client';

import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';
import GlassCard from '@/components/ui/GlassCard';
import { useLocale } from '@/lib/i18n/LocaleContext';
import type { DictKey } from '@/lib/i18n/dict';

interface Persona {
  titleKey: DictKey;
  descKey: DictKey;
  examplesKey: DictKey;
  icon: string;
}

const PERSONAS: Persona[] = [
  { titleKey: 'case.type1.title', descKey: 'case.type1.desc', examplesKey: 'case.type1.examples', icon: '🛒' },
  { titleKey: 'case.type2.title', descKey: 'case.type2.desc', examplesKey: 'case.type2.examples', icon: '📅' },
  { titleKey: 'case.type3.title', descKey: 'case.type3.desc', examplesKey: 'case.type3.examples', icon: '💬' },
];

export default function ForWhoSection() {
  const { t } = useLocale();
  return (
    <Section id="for-who">
      <SectionTitle subtitle={t('case.subtitle')}>{t('case.title')}</SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {PERSONAS.map((p) => (
          <GlassCard key={p.titleKey} className="flex flex-col h-full">
            <div className="text-4xl mb-3">{p.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-3">{t(p.titleKey)}</h3>
            <p className="text-zinc-300 text-sm leading-relaxed flex-1">{t(p.descKey)}</p>
            <p className="text-zinc-500 text-xs mt-4 italic">{t(p.examplesKey)}</p>
          </GlassCard>
        ))}
      </div>

      <div className="glass p-6 md:p-8 text-center max-w-3xl mx-auto">
        <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
          <span className="text-emerald-400 font-semibold">{t('case.multitenant.head')}</span>{' '}
          {t('case.multitenant.body')}
        </p>
      </div>
    </Section>
  );
}
