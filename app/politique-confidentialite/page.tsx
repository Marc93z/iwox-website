import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Politique de confidentialité — iwox.ai',
  description: 'Politique de confidentialité du site iwox.ai',
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12 md:py-20 px-4 md:px-6">
      <div className="glass max-w-3xl mx-auto p-8 md:p-12">
        <Link href="/" className="inline-block mb-6 text-brand-blue hover:text-brand-violet transition-colors text-sm">
          ← Retour au site
        </Link>

        <h1 className="font-display text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-brand bg-clip-text text-transparent">
          Politique de confidentialité
        </h1>

        <div className="glass p-4 mb-8 text-sm">
          <p className="font-semibold text-white">Dernière mise à jour : 2025</p>
          <p className="mt-2 text-zinc-300">
            La présente Politique de confidentialité décrit la manière dont IW0X.AI collecte, utilise et protège vos
            données lorsque vous utilisez ce site.
          </p>
        </div>

        <article className="space-y-8 text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-brand-blue mb-3 border-b border-brand-blue/20 pb-2">
              Responsable du traitement
            </h2>
            <p>
              <strong className="text-white">IW0X.AI</strong>
              <br />
              Contact :{' '}
              <a href="mailto:contact.iwox@gmail.com" className="text-brand-blue hover:underline">
                contact.iwox@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-blue mb-3 border-b border-brand-blue/20 pb-2">
              Données collectées
            </h2>
            <p>Le site iwox.ai ne collecte des données personnelles que lorsque vous les transmettez volontairement, notamment via :</p>
            <ul className="list-disc list-inside ml-4 mt-3 space-y-1">
              <li>Le formulaire de contact</li>
              <li>Un message envoyé par email</li>
            </ul>
            <p className="mt-3">Les données collectées peuvent inclure :</p>
            <ul className="list-disc list-inside ml-4 mt-3 space-y-1">
              <li>Nom</li>
              <li>Adresse email</li>
              <li>Contenu du message envoyé</li>
            </ul>
            <p className="mt-3">
              <strong className="text-white">Aucune donnée sensible n&apos;est collectée.</strong>
              <br />
              <strong className="text-white">Aucun tracking publicitaire n&apos;est utilisé.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-blue mb-3 border-b border-brand-blue/20 pb-2">
              Finalité des données
            </h2>
            <p>Les données collectées servent uniquement à :</p>
            <ul className="list-disc list-inside ml-4 mt-3 space-y-1">
              <li>Répondre aux demandes envoyées via le site</li>
              <li>Assurer un suivi client ou pré-client</li>
              <li>Garantir le bon fonctionnement du site</li>
            </ul>
            <p className="mt-3">Ces données ne sont jamais utilisées à d&apos;autres fins.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-blue mb-3 border-b border-brand-blue/20 pb-2">
              Partage des données
            </h2>
            <p>
              Aucune donnée ne sera vendue, échangée ou communiquée à des tiers. Les données ne sont partagées qu&apos;en
              cas d&apos;obligation légale.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-blue mb-3 border-b border-brand-blue/20 pb-2">
              Durée de conservation
            </h2>
            <p>
              Les données transmises via le formulaire ou par email sont conservées au maximum{' '}
              <strong className="text-white">12 mois</strong>, puis supprimées automatiquement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-blue mb-3 border-b border-brand-blue/20 pb-2">
              Base légale (RGPD)
            </h2>
            <p>Le traitement est fondé sur :</p>
            <ul className="list-disc list-inside ml-4 mt-3 space-y-1">
              <li>Votre consentement (article 6.1.a)</li>
              <li>L&apos;intérêt légitime de répondre à vos messages (article 6.1.f)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-blue mb-3 border-b border-brand-blue/20 pb-2">
              Droits de l&apos;utilisateur (RGPD)
            </h2>
            <p>Vous disposez des droits suivants :</p>
            <ul className="list-disc list-inside ml-4 mt-3 space-y-1">
              <li>Droit d&apos;accès</li>
              <li>Droit de rectification</li>
              <li>Droit de suppression</li>
              <li>Droit d&apos;opposition</li>
              <li>Droit de limitation du traitement</li>
            </ul>
            <p className="mt-3">
              Pour exercer un droit, contactez :{' '}
              <a href="mailto:contact.iwox@gmail.com" className="text-brand-blue hover:underline">
                contact.iwox@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-blue mb-3 border-b border-brand-blue/20 pb-2">Cookies</h2>
            <p>
              Le site utilise uniquement des cookies techniques nécessaires à son fonctionnement (pas de cookies
              publicitaires, statistiques ou marketing).
            </p>
            <p className="mt-3">Aucun consentement cookie n&apos;est requis.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-blue mb-3 border-b border-brand-blue/20 pb-2">
              Modifications
            </h2>
            <p>
              IW0X.AI peut mettre à jour cette politique à tout moment. Les utilisateurs sont invités à consulter
              régulièrement cette page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-blue mb-3 border-b border-brand-blue/20 pb-2">Contact</h2>
            <p>
              Pour toute question concernant cette Politique de confidentialité :{' '}
              <a href="mailto:contact.iwox@gmail.com" className="text-brand-blue hover:underline">
                contact.iwox@gmail.com
              </a>
            </p>
          </section>

          <div className="pt-8 text-center text-zinc-500 text-sm">
            <p>
              <strong>Dernière mise à jour : 2025</strong>
            </p>
            <p className="mt-1">© {new Date().getFullYear()} iwox.ai — Tous droits réservés</p>
          </div>
        </article>
      </div>
    </div>
  );
}
