'use client';

import Section from '@/components/ui/Section';
import SectionTitle from '@/components/ui/SectionTitle';
import { LinkButton } from '@/components/ui/Button';
import { useLocale } from '@/lib/i18n/LocaleContext';

export default function ContactSection() {
  const { t } = useLocale();
  return (
    <Section id="contact">
      <SectionTitle subtitle={t('modal.subtitle')}>{t('modal.title')}</SectionTitle>
      <div className="max-w-xl mx-auto space-y-4">
        <a
          href="https://wa.me/33602731139"
          target="_blank"
          rel="noopener"
          className="glass-card flex items-center gap-5 p-5 group"
        >
          <span className="w-14 h-14 flex-shrink-0 rounded-full bg-gradient-to-br from-whatsapp/20 to-whatsapp/5 text-whatsapp flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.099-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.18 2.095 3.195 5.076 4.485.709.3 1.265.48 1.704.629.713.227 1.365.195 1.879.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.426-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a9.869 9.869 0 0 1-1.516-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
            </svg>
          </span>
          <div className="flex-1">
            <div className="text-white font-semibold text-lg">{t('modal.whatsapp.title')}</div>
            <div className="text-zinc-400 text-sm">{t('modal.whatsapp.desc')} — +33 6 02 73 11 39</div>
          </div>
        </a>

        <a href="mailto:contact.iwox@gmail.com" className="glass-card flex items-center gap-5 p-5 group">
          <span className="w-14 h-14 flex-shrink-0 rounded-full bg-gradient-to-br from-brand-blue/20 to-brand-blue/5 text-brand-blue flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </span>
          <div className="flex-1">
            <div className="text-white font-semibold text-lg">{t('modal.email.title')}</div>
            <div className="text-zinc-400 text-sm">{t('modal.email.desc')} — contact.iwox@gmail.com</div>
          </div>
        </a>

        <div className="pt-4 text-center">
          <LinkButton variant="primary" href="https://wa.me/33602731139" target="_blank" rel="noopener">
            {t('cta.button')}
          </LinkButton>
        </div>
      </div>
    </Section>
  );
}
