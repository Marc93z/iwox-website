import { NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MODEL = 'gpt-4o-mini';
const TEMPERATURE = 0.7;
const MAX_TOKENS = 400;
const MAX_HISTORY = 10;
const MAX_MESSAGE_LEN = 1000;

const SHORT_LIMIT = 3;
const SHORT_WINDOW_MS = 60 * 1000;
const DAILY_LIMIT = 8;
const DAILY_WINDOW_MS = 24 * 60 * 60 * 1000;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPTS: Record<'fr' | 'en', string> = {
  fr: `Tu es IwoxBot, l'assistant d'iwox.ai. Iwox installe des bots WhatsApp sur-mesure pour PME, commerces de proximité et e-commerce (catalogue + panier + checkout + relances, 100% dans WhatsApp).

RÈGLES:
- Tu réponds aux questions sur : bots WhatsApp, intégration WhatsApp Business / Meta / Shopify / WooCommerce, automatisation des ventes, support client, prise de RDV, plateforme multi-tenant, pricing iwox, délai de mise en place, RGPD.
- Si la question sort de ce périmètre : refuse poliment et redirige vers contact.iwox@gmail.com ou wa.me/33602731139.
- Tu es concis (3-5 phrases max), business-orienté, jamais jargon technique.
- Tu pousses subtilement vers la démo WhatsApp ou un échange humain quand c'est pertinent.
- Tu ne donnes JAMAIS de nom de client réel (iwox vend une plateforme multi-tenant, pas une référence agence).

Pricing indicatif (à confirmer avec l'équipe) :
- Starter : 1500€ setup + 150€/mois
- Commerce : 3500€ setup + 350€/mois
- Sur-mesure : devis`,

  en: `You are IwoxBot, the assistant of iwox.ai. Iwox builds custom WhatsApp bots for SMBs, local retailers and e-commerce (catalog + cart + checkout + follow-ups, all inside WhatsApp).

RULES:
- You answer questions about: WhatsApp bots, WhatsApp Business / Meta / Shopify / WooCommerce integration, sales automation, customer support, booking, multi-tenant platform, iwox pricing, time to launch, GDPR.
- If a question falls outside this scope: politely decline and redirect to contact.iwox@gmail.com or wa.me/33602731139.
- You are concise (3-5 sentences max), business-oriented, never technical jargon.
- You subtly push toward the WhatsApp demo or a human conversation when relevant.
- You NEVER give a real client name (iwox sells a multi-tenant platform, not an agency reference).

Indicative pricing (to confirm with the team):
- Starter: €1,500 setup + €150/mo
- Commerce: €3,500 setup + €350/mo
- Custom: quote`,
};

export async function POST(req: Request) {
  const ip = getClientIp(req.headers);

  const short = checkRateLimit(`short:${ip}`, SHORT_LIMIT, SHORT_WINDOW_MS);
  if (!short.ok) {
    return NextResponse.json(
      { error: 'rate_limit', message: 'rate_limit' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((short.resetAt - Date.now()) / 1000)) } },
    );
  }
  const daily = checkRateLimit(`daily:${ip}`, DAILY_LIMIT, DAILY_WINDOW_MS);
  if (!daily.ok) {
    return NextResponse.json(
      { error: 'rate_limit', message: 'rate_limit' },
      { status: 429 },
    );
  }

  let body: { message?: unknown; history?: unknown; lang?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const { message, history, lang } = body;

  if (typeof message !== 'string' || message.trim().length === 0) {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LEN) {
    return NextResponse.json({ error: 'message_too_long' }, { status: 400 });
  }

  const locale: 'fr' | 'en' = lang === 'en' ? 'en' : 'fr';
  const systemPrompt = SYSTEM_PROMPTS[locale];

  const safeHistory: ChatMessage[] = Array.isArray(history)
    ? (history as unknown[])
        .filter((m): m is ChatMessage =>
          typeof m === 'object' &&
          m !== null &&
          'role' in m &&
          'content' in m &&
          ((m as { role: unknown }).role === 'user' || (m as { role: unknown }).role === 'assistant') &&
          typeof (m as { content: unknown }).content === 'string',
        )
        .slice(-MAX_HISTORY)
        .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }))
    : [];

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'server_misconfigured' }, { status: 500 });
  }

  try {
    const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          ...safeHistory,
          { role: 'user', content: message.trim() },
        ],
        temperature: TEMPERATURE,
        max_tokens: MAX_TOKENS,
      }),
    });

    if (!upstream.ok) {
      const err = await upstream.json().catch(() => ({}));
      return NextResponse.json(
        { error: err?.error?.message ?? 'openai_error' },
        { status: upstream.status },
      );
    }

    const data = await upstream.json();
    return NextResponse.json(data);
  } catch (e) {
    console.error('OpenAI proxy error:', e);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
