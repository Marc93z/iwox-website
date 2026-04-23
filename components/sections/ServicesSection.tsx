'use client';

import { useState } from 'react';
import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';
import GlassCard from '@/components/ui/GlassCard';
import { useLocale } from '@/lib/i18n/LocaleContext';
import type { DictKey } from '@/lib/i18n/dict';

type ServiceKey = 'agents' | 'automation' | 'data';

interface ServiceCardConfig {
  key: ServiceKey;
  titleKey: DictKey;
  descKey: DictKey;
  icon: string;
}

const SERVICES: ServiceCardConfig[] = [
  { key: 'agents', titleKey: 'services.ai.title', descKey: 'services.ai.desc', icon: '🛍️' },
  { key: 'automation', titleKey: 'services.automation.title', descKey: 'services.automation.desc', icon: '🤝' },
  { key: 'data', titleKey: 'services.data.title', descKey: 'services.data.desc', icon: '📅' },
];

const MODAL_LIS: Record<ServiceKey, DictKey[]> = {
  agents: ['modal.agents.li1', 'modal.agents.li2', 'modal.agents.li3', 'modal.agents.li4', 'modal.agents.li5'],
  automation: ['modal.automation.li1', 'modal.automation.li2', 'modal.automation.li3', 'modal.automation.li4', 'modal.automation.li5'],
  data: ['modal.data.li1', 'modal.data.li2', 'modal.data.li3', 'modal.data.li4', 'modal.data.li5'],
};

const MODAL_TITLES: Record<ServiceKey, DictKey> = {
  agents: 'modal.agents.title',
  automation: 'modal.automation.title',
  data: 'modal.data.title',
};

export default function ServicesSection() {
  const { t } = useLocale();
  const [openKey, setOpenKey] = useState<ServiceKey | null>(null);

  return (
    <Section id="services">
      <SectionTitle subtitle={t('services.subtitle')}>{t('services.title')}</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {SERVICES.map((s) => (
          <GlassCard key={s.key} className="flex flex-col h-full">
            <div className="text-5xl mb-4">{s.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-3">{t(s.titleKey)}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed flex-1">{t(s.descKey)}</p>
            <button
              type="button"
              onClick={() => setOpenKey(s.key)}
              className="mt-6 self-start px-5 py-2 rounded-lg bg-gradient-to-r from-brand-blue/15 to-brand-violet/15 border border-brand-blue/30 text-brand-blue font-medium text-sm transition-all hover:-translate-y-0.5 hover:border-brand-blue/60"
            >
              {t('services.learn-more')}
            </button>
          </GlassCard>
        ))}
      </div>

      {openKey && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={() => setOpenKey(null)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative max-w-2xl w-full bg-bg-surface/95 backdrop-blur-xl border border-brand-blue/20 rounded-3xl p-8 md:p-10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenKey(null)}
              aria-label={t('modal.close')}
              className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-brand-blue hover:bg-white/10 transition-all flex items-center justify-center"
            >
              ✕
            </button>
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-6 bg-gradient-brand bg-clip-text text-transparent">
              {t(MODAL_TITLES[openKey])}
            </h3>
            <ul className="space-y-3 mb-8">
              {MODAL_LIS[openKey].map((k) => (
                <li key={k} className="text-zinc-300 leading-relaxed pl-6 relative">
                  <span className="absolute left-0 text-brand-blue font-bold">→</span>
                  {t(k)}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setOpenKey(null)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-blue/20 to-brand-violet/20 border border-brand-blue/30 text-brand-blue font-semibold hover:from-brand-blue/30 hover:to-brand-violet/30 transition-all"
            >
              {t('modal.close')}
            </button>
          </div>
        </div>
      )}
    </Section>
  );
}
