import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mentions légales — iwox.ai',
  description: 'Mentions légales du site iwox.ai',
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen py-12 md:py-20 px-4 md:px-6">
      <div className="glass max-w-3xl mx-auto p-8 md:p-12">
        <Link href="/" className="inline-block mb-6 text-brand-blue hover:text-brand-violet transition-colors text-sm">
          ← Retour au site
        </Link>

        <h1 className="font-display text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-brand bg-clip-text text-transparent">
          Mentions légales
        </h1>

        <article className="space-y-8 text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-brand-blue mb-3 border-b border-brand-blue/20 pb-2">
              Éditeur du site
            </h2>
            <p>
              <strong className="text-white">IW0X.AI</strong>
              <br />
              Email de contact :{' '}
              <a href="mailto:contact.iwox@gmail.com" className="text-brand-blue hover:underline">
                contact.iwox@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-blue mb-3 border-b border-brand-blue/20 pb-2">
              Hébergement
            </h2>
            <p>Le site est hébergé par :</p>
            <p className="mt-2">
              <strong className="text-white">Contabo GmbH</strong>
              <br />
              Adresse : Aschauer Str. 32a, 81549 München, Allemagne
              <br />
              Site :{' '}
              <a href="https://contabo.com/" target="_blank" rel="noopener" className="text-brand-blue hover:underline">
                https://contabo.com/
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-blue mb-3 border-b border-brand-blue/20 pb-2">
              Propriété intellectuelle
            </h2>
            <p>
              Le contenu présent sur ce site (textes, images, éléments graphiques, logos, vidéos, structure générale)
              est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
            </p>
            <p className="mt-3">
              Toute reproduction, distribution, modification ou utilisation, totale ou partielle, est strictement
              interdite sans autorisation écrite.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-blue mb-3 border-b border-brand-blue/20 pb-2">
              Responsabilité
            </h2>
            <p>
              IW0X.AI s&apos;efforce de fournir des informations fiables, mais ne garantit ni leur exactitude, ni leur
              exhaustivité.
            </p>
            <p className="mt-3">L&apos;utilisateur reconnaît utiliser le site sous sa seule responsabilité.</p>
            <p className="mt-3">
              Le site peut contenir des liens vers des sites tiers ; IW0X.AI décline toute responsabilité quant à leur
              contenu ou leur fonctionnement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-blue mb-3 border-b border-brand-blue/20 pb-2">
              Données personnelles
            </h2>
            <p>Aucune donnée personnelle n&apos;est collectée à l&apos;insu de l&apos;utilisateur.</p>
            <p className="mt-3">
              Les seules données éventuellement transmises sont celles envoyées volontairement via le formulaire de
              contact (nom, email, message).
            </p>
            <p className="mt-3">
              Ces données ne sont utilisées que pour répondre aux demandes. Elles ne sont ni revendues ni partagées.
            </p>
            <p className="mt-3">
              Conformément au RGPD, vous pouvez demander l&apos;accès, la modification ou la suppression de vos données
              en écrivant à :{' '}
              <a href="mailto:contact.iwox@gmail.com" className="text-brand-blue hover:underline">
                contact.iwox@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-blue mb-3 border-b border-brand-blue/20 pb-2">Cookies</h2>
            <p>Le site peut utiliser uniquement des cookies techniques nécessaires à son fonctionnement.</p>
            <p className="mt-3">Aucun cookie publicitaire ou de suivi n&apos;est utilisé.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-brand-blue mb-3 border-b border-brand-blue/20 pb-2">
              Modification
            </h2>
            <p>
              IW0X.AI se réserve le droit de modifier ou mettre à jour ces mentions légales à tout moment, sans
              préavis.
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
