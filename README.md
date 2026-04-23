# iwox.ai — Next.js

Refonte de la landing iwox.ai en Next.js 14 (App Router, TypeScript, Tailwind).

## Stack

- **Next.js 14** (App Router, RSC + client components)
- **TypeScript strict**
- **Tailwind CSS** (config locale, pas de CDN)
- **Fonts** : Inter + Orbitron via `next/font/google`
- **i18n FR/EN** via `LocaleContext` client (localStorage persist)
- **Chatbot IwoxBot** : route API `/api/openai` (proxy OpenAI `gpt-4o-mini`) + rate-limit in-memory (3 req/min et 8 req/24h par IP)

## Install & dev

```bash
cp .env.example .env.local   # renseigner OPENAI_API_KEY
npm install
npm run dev                  # http://localhost:3000
```

## Build prod

```bash
npm run build
npm run start                # test local du build standalone
```

## Docker

```bash
docker build -t iwox-website-next:latest .
docker run --rm -p 3000:3000 -e OPENAI_API_KEY=sk-... iwox-website-next:latest
```

## Déploiement K8s

1. Build + push l'image vers le registry GitLab (ou le registry de ton choix) :
   ```bash
   docker build -t registry.gitlab.com/iwox-group/iwox-project:latest .
   docker push registry.gitlab.com/iwox-group/iwox-project:latest
   ```
2. Les manifests K8s sont dans `../iwox-k3s-infra/k8s/applications/iwox-website/` :
   - `deployment.yaml` lit `OPENAI_API_KEY` depuis le secret `iwox-website-secrets`
   - `doppler-secret.yaml` provisionne ce secret depuis Doppler (clé `OPENAI_API_KEY`)
3. Rollout :
   ```bash
   kubectl -n iwox-website rollout restart deployment/iwox-website
   ```

## Variables d'environnement

| Var | Scope | Requis |
|---|---|---|
| `OPENAI_API_KEY` | serveur uniquement | Oui (chatbot) |
| `NEXT_PUBLIC_SITE_URL` | client + serveur | Non (défaut `https://iwox.ai`) |

## Structure

```
app/
├── layout.tsx              Root layout, fonts, providers
├── page.tsx                Landing (compose toutes les sections)
├── api/
│   ├── openai/route.ts     Proxy OpenAI rate-limited
│   └── health/route.ts
├── mentions-legales/
└── politique-confidentialite/
components/
├── layout/                 Navbar, Footer, StickyWhatsApp, ParticleCanvas
├── sections/               Hero → Contact (12 sections)
├── chatbot/                ChatbotWidget
└── ui/                     Button, GlassCard, Section, SectionTitle
lib/
├── i18n/                   dict.ts + LocaleContext.tsx
└── rate-limit.ts           In-memory bucket rate limiter
```

## TODO avant prod

- Confirmer les prix Starter (1500€+150€/mo) et Commerce (3500€+350€/mo) avec Marc
- Remplacer le placeholder vidéo du Hero par une vraie capture/démo quand disponible
- Tester le rendu sur mobile + iPad + desktop
