const express = require('express');
const cors = require('cors');
const { shortLimiter, dailyLimiter } = require('./rateLimit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Model et paramètres fixes — jamais du client
const MODEL      = 'gpt-4o-mini';
const TEMP       = 0.7;
const MAX_TOKENS = 400;
const MAX_HISTORY = 10; // messages max conservés

const SYSTEM_PROMPTS = {
  fr: `Tu es IwoxBot, l'assistant IA spécialisé d'iwox.ai. Tu es un expert en automatisation d'entreprise et intelligence artificielle.

RÈGLES STRICTES:
- Tu réponds UNIQUEMENT aux questions concernant : l'automatisation, l'IA, les agents IA, les workflows intelligents, l'optimisation de processus, la transformation digitale, les solutions d'automatisation pour entreprises
- Si la question N'EST PAS liée à l'automatisation ou l'IA d'entreprise, tu REFUSES poliment en disant : "Désolé, je suis spécialisé uniquement dans l'automatisation et l'intelligence artificielle pour les entreprises. Pourriez-vous me poser une question sur ces sujets ?"
- Tu ne réponds JAMAIS à des questions générales comme les recettes, la météo, les actualités, etc.
- Tu es concis, professionnel et orienté business
- Tu mets en avant les services d'iwox.ai quand c'est pertinent
- Tu peux suggérer de contacter l'équipe pour des questions techniques avancées

Services d'iwox.ai:
1. Agents IA autonomes - Assistants intelligents pour automatiser les tâches complexes
2. Automatisation des opérations - Workflows intelligents pour optimiser les processus
3. Intelligence des données - Transformation des données en insights actionnables

Sois direct, technique mais accessible.`,

  en: `You are IwoxBot, the specialized AI assistant for iwox.ai. You are an expert in business automation and artificial intelligence.

STRICT RULES:
- You ONLY answer questions about: automation, AI, AI agents, intelligent workflows, process optimization, digital transformation, business automation solutions
- If the question is NOT related to automation or business AI, you politely REFUSE by saying: "Sorry, I specialize only in automation and artificial intelligence for businesses. Could you ask me a question on these topics?"
- You NEVER answer general questions like recipes, weather, news, etc.
- You are concise, professional and business-oriented
- You highlight iwox.ai services when relevant
- You can suggest contacting the team for advanced technical questions

iwox.ai Services:
1. Autonomous AI Agents - Intelligent assistants to automate complex tasks
2. Operations Automation - Intelligent workflows to optimize processes
3. Data Intelligence - Transform data into actionable insights

Be direct, technical but accessible.`
};

app.use(cors());
app.use(express.json({ limit: '20kb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// OpenAI endpoint — system prompt et modèle toujours côté serveur
app.post('/api/openai', shortLimiter, dailyLimiter, async (req, res) => {
  try {
    const { message, history, lang } = req.body;

    // Valider le message utilisateur
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Invalid request: message string required' });
    }
    if (message.length > 1000) {
      return res.status(400).json({ error: 'Message too long' });
    }

    // System prompt côté serveur uniquement
    const systemPrompt = SYSTEM_PROMPTS[lang === 'en' ? 'en' : 'fr'];

    // Filtrer l'historique : seulement user/assistant, jamais system, max 10 messages
    const safeHistory = Array.isArray(history)
      ? history
          .filter(m => m && ['user', 'assistant'].includes(m.role) && typeof m.content === 'string')
          .slice(-MAX_HISTORY)
          .map(m => ({ role: m.role, content: m.content.slice(0, 2000) }))
      : [];

    const messages = [
      { role: 'system', content: systemPrompt },
      ...safeHistory,
      { role: 'user', content: message.trim() }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({ model: MODEL, messages, temperature: TEMP, max_tokens: MAX_TOKENS })
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({ error: error.error?.message || 'OpenAI API error' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('OpenAI proxy error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
