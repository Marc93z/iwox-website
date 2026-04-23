'use client';

import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';
import { LinkButton } from '@/components/ui/Button';
import { useLocale } from '@/lib/i18n/LocaleContext';
import type { DictKey } from '@/lib/i18n/dict';

interface Plan {
  id: 'starter' | 'commerce' | 'custom';
  popular?: boolean;
  nameKey: DictKey;
  targetKey: DictKey;
  setupKey: DictKey;
  setupLabelKey: DictKey;
  monthlyKey: DictKey;
  monthlyLabelKey: DictKey;
  features: DictKey[];
  ctaKey: DictKey;
  ctaHref: string;
}

const PLANS: Plan[] = [
  {
    id: 'starter',
    nameKey: 'pricing.starter.name',
    targetKey: 'pricing.starter.target',
    setupKey: 'pricing.starter.setup',
    setupLabelKey: 'pricing.starter.setup-label',
    monthlyKey: 'pricing.starter.monthly',
    monthlyLabelKey: 'pricing.starter.monthly-label',
    features: ['pricing.starter.f1', 'pricing.starter.f2', 'pricing.starter.f3', 'pricing.starter.f4'],
    ctaKey: 'pricing.cta',
    ctaHref: '#contact',
  },
  {
    id: 'commerce',
    popular: true,
    nameKey: 'pricing.commerce.name',
    targetKey: 'pricing.commerce.target',
    setupKey: 'pricing.commerce.setup',
    setupLabelKey: 'pricing.commerce.setup-label',
    monthlyKey: 'pricing.commerce.monthly',
    monthlyLabelKey: 'pricing.commerce.monthly-label',
    features: ['pricing.commerce.f1', 'pricing.commerce.f2', 'pricing.commerce.f3', 'pricing.commerce.f4', 'pricing.commerce.f5'],
    ctaKey: 'pricing.cta',
    ctaHref: '#contact',
  },
  {
    id: 'custom',
    nameKey: 'pricing.custom.name',
    targetKey: 'pricing.custom.target',
    setupKey: 'pricing.custom.setup',
    setupLabelKey: 'pricing.custom.setup-label',
    monthlyKey: 'pricing.custom.monthly',
    monthlyLabelKey: 'pricing.custom.monthly-label',
    features: ['pricing.custom.f1', 'pricing.custom.f2', 'pricing.custom.f3', 'pricing.custom.f4'],
    ctaKey: 'pricing.cta.custom',
    ctaHref: '#contact',
  },
];

export default function PricingSection() {
  const { t } = useLocale();
  return (
    <Section id="pricing">
      <SectionTitle subtitle={t('pricing.subtitle')}>{t('pricing.title')}</SectionTitle>
      {/* TODO: confirmer chiffres avec Marc avant prod (Starter 1500€/150€mo, Commerce 3500€/350€mo) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((p) => (
          <div
            key={p.id}
            className={`relative glass-card p-6 md:p-8 flex flex-col ${p.popular ? 'border-brand-blue/40 shadow-glow' : ''}`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold text-white bg-gradient-brand rounded-full">
                {t('pricing.popular')}
              </span>
            )}
            <h3 className="text-2xl font-display font-bold text-white mb-2">{t(p.nameKey)}</h3>
            <p className="text-zinc-400 text-sm mb-6">{t(p.targetKey)}</p>

            <div className="mb-6">
              <div className="text-3xl md:text-4xl font-bold text-white">{t(p.setupKey)}</div>
              <div className="text-zinc-500 text-xs">{t(p.setupLabelKey)}</div>
              <div className="mt-3 text-lg font-semibold text-brand-blue">{t(p.monthlyKey)}</div>
              <div className="text-zinc-500 text-xs">{t(p.monthlyLabelKey)}</div>
            </div>

            <ul className="space-y-2 mb-8 flex-1">
              {p.features.map((f) => (
                <li key={f} className="text-zinc-300 text-sm leading-relaxed">
                  {t(f)}
                </li>
              ))}
            </ul>

            <LinkButton variant={p.popular ? 'primary' : 'secondary'} href={p.ctaHref} className="w-full text-center">
              {t(p.ctaKey)}
            </LinkButton>
          </div>
        ))}
      </div>
    </Section>
  );
}
