'use client';

import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';
import { useLocale } from '@/lib/i18n/LocaleContext';

export default function DemoSection() {
  const { t } = useLocale();
  return (
    <Section id="demo">
      <SectionTitle subtitle={t('demo.subtitle')}>{t('demo.title')}</SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
        <div className="space-y-5 order-2 lg:order-1">
          <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
            {t('demo.subtitle')}
          </p>
          <ul className="space-y-3 text-zinc-300">
            <li className="flex items-start gap-3"><span>{t('demo.bullet1')}</span></li>
            <li className="flex items-start gap-3"><span>{t('demo.bullet2')}</span></li>
            <li className="flex items-start gap-3"><span>{t('demo.bullet3')}</span></li>
          </ul>
          <p className="text-zinc-500 text-sm italic pt-2">{t('demo.banner')}</p>
        </div>
        <div className="order-1 lg:order-2">
          <ChatbotWidget />
        </div>
      </div>
    </Section>
  );
}
