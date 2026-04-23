'use client';

import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';
import { useLocale } from '@/lib/i18n/LocaleContext';

const INTEGRATIONS = [
  'WhatsApp',
  'Meta',
  'Shopify',
  'WooCommerce',
  'Chatwoot',
  'n8n',
  'Supabase',
  'Stripe',
  'Google Calendar',
  'HubSpot',
  'Notion',
  'Airtable',
] as const;

export default function IntegrationsSection() {
  const { t } = useLocale();
  return (
    <Section id="integrations">
      <SectionTitle subtitle={t('integrations.subtitle')}>{t('integrations.title')}</SectionTitle>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4 max-w-4xl mx-auto">
        {INTEGRATIONS.map((name) => (
          <div
            key={name}
            className="glass px-3 py-3 md:py-4 text-center text-zinc-300 text-xs md:text-sm font-medium hover:border-brand-blue/40 hover:text-white transition-all"
          >
            {name}
          </div>
        ))}
      </div>
    </Section>
  );
}
