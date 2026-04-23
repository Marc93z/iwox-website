'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from '@/lib/i18n/LocaleContext';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const MAX_HISTORY = 10;

export default function ChatbotWidget() {
  const { t, locale } = useLocale();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages([{ role: 'assistant', content: t('chatbot.welcome') }]);
  }, [locale, t]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setError(null);
    setInput('');
    const userMsg: ChatMessage = { role: 'user', content: text };
    const next: ChatMessage[] = [...messages, userMsg].slice(-(MAX_HISTORY + 1));
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: next.slice(0, -1),
          lang: locale,
        }),
      });
      if (res.status === 429) {
        setError(t('chatbot.rateLimit'));
        return;
      }
      if (!res.ok) {
        setError(t('chatbot.error'));
        return;
      }
      const data = await res.json();
      const reply: string | undefined = data?.choices?.[0]?.message?.content;
      if (!reply) {
        setError(t('chatbot.error'));
        return;
      }
      setMessages((m) => [...m, { role: 'assistant', content: reply }]);
    } catch {
      setError(t('chatbot.error'));
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="glass flex flex-col h-[520px] md:h-[600px] overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
        <div className="w-10 h-10 rounded-full bg-whatsapp flex items-center justify-center text-white font-semibold">
          IB
        </div>
        <div className="flex-1">
          <div className="text-white font-semibold text-sm">{t('chatbot.title')}</div>
          <div className="text-emerald-400 text-xs flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {t('chatbot.status')}
          </div>
        </div>
      </div>

      <div className="px-4 py-2 text-center text-amber-300 text-xs bg-amber-500/10 border-b border-amber-500/20">
        {t('demo.banner')}
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-whatsapp text-white rounded-br-md'
                  : 'bg-white/[0.06] text-zinc-100 rounded-bl-md border border-white/[0.08]'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/[0.06] border border-white/[0.08] px-4 py-2.5 rounded-2xl rounded-bl-md">
              <span className="inline-flex gap-1">
                <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '120ms' }} />
                <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '240ms' }} />
              </span>
            </div>
          </div>
        )}
        {error && (
          <div className="text-center text-red-400 text-xs py-2">{error}</div>
        )}
      </div>

      <div className="border-t border-white/10 p-3 flex items-end gap-2 bg-white/[0.02]">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          placeholder={t('chatbot.placeholder')}
          disabled={loading}
          className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-brand-blue/60 resize-none max-h-32"
        />
        <button
          type="button"
          onClick={send}
          disabled={loading || !input.trim()}
          aria-label={t('chatbot.send')}
          className="w-11 h-11 flex-shrink-0 rounded-xl bg-whatsapp hover:bg-whatsapp-dark text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
