'use client';

import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';
import { useLocale } from '@/lib/i18n/LocaleContext';
import type { DictKey } from '@/lib/i18n/dict';

interface Step {
  titleKey: DictKey;
  descKey: DictKey;
  icon: string;
}

const STEPS: Step[] = [
  { titleKey: 'process.step1', descKey: 'process.step1.desc', icon: '📱' },
  { titleKey: 'process.step2', descKey: 'process.step2.desc', icon: '📦' },
  { titleKey: 'process.step3', descKey: 'process.step3.desc', icon: '🧠' },
  { titleKey: 'process.step4', descKey: 'process.step4.desc', icon: '🚀' },
];

export default function HowItWorksSection() {
  const { t } = useLocale();
  return (
    <Section id="how-it-works">
      <SectionTitle subtitle={t('process.subtitle')}>{t('process.title')}</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STEPS.map((s) => (
          <div key={s.titleKey} className="text-center group">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl border-2 border-brand-blue/20 bg-gradient-to-br from-brand-blue/10 to-brand-violet/10 transition-all group-hover:scale-110 group-hover:border-brand-blue/50">
              {s.icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{t(s.titleKey)}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-[260px] mx-auto">
              {t(s.descKey)}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
