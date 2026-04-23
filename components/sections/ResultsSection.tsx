'use client';

import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';
import GlassCard from '@/components/ui/GlassCard';
import { useLocale } from '@/lib/i18n/LocaleContext';
import type { DictKey } from '@/lib/i18n/dict';

interface Metric {
  metricKey: DictKey;
  labelKey: DictKey;
}

const METRICS: Metric[] = [
  { metricKey: 'results.1.metric', labelKey: 'results.1.label' },
  { metricKey: 'results.2.metric', labelKey: 'results.2.label' },
  { metricKey: 'results.3.metric', labelKey: 'results.3.label' },
  { metricKey: 'results.4.metric', labelKey: 'results.4.label' },
  { metricKey: 'results.5.metric', labelKey: 'results.5.label' },
  { metricKey: 'results.6.metric', labelKey: 'results.6.label' },
];

export default function ResultsSection() {
  const { t } = useLocale();
  return (
    <Section id="results">
      <SectionTitle subtitle={t('results.subtitle')}>{t('results.title')}</SectionTitle>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {METRICS.map((m) => (
          <GlassCard key={m.metricKey} className="text-center">
            <div className="text-2xl md:text-4xl font-display font-bold bg-gradient-brand bg-clip-text text-transparent mb-2">
              {t(m.metricKey)}
            </div>
            <div className="text-zinc-400 text-xs md:text-sm">{t(m.labelKey)}</div>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
