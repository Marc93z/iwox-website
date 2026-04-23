'use client';

import Section from '@/components/ui/Section';
import { LinkButton } from '@/components/ui/Button';
import { useLocale } from '@/lib/i18n/LocaleContext';

export default function CtaSection() {
  const { t } = useLocale();
  return (
    <Section id="cta">
      <div className="glass p-10 md:p-16 text-center max-w-4xl mx-auto">
        <h2
          className="text-3xl md:text-5xl font-display font-bold mb-6 bg-gradient-brand bg-clip-text text-transparent leading-tight"
          dangerouslySetInnerHTML={{ __html: t('cta.title') }}
        />
        <p className="text-zinc-300 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          {t('cta.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <LinkButton variant="whatsapp" href="https://wa.me/33602731139" target="_blank" rel="noopener">
            {t('hero.cta-demo')}
          </LinkButton>
          <LinkButton variant="primary" href="#contact">
            {t('cta.button')}
          </LinkButton>
        </div>
      </div>
    </Section>
  );
}
