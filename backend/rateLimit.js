const rateLimit = require('express-rate-limit');

// 3 requêtes par minute par IP (anti-spam)
const shortLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3,
  message: {
    error: 'rate_limit',
    message: 'Vous avez atteint la limite d\'utilisation. Merci de réessayer plus tard.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false
});

// 8 requêtes par jour par IP (utilisation raisonnable)
const dailyLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 heures
  max: 8,
  message: {
    error: 'rate_limit',
    message: 'Vous avez atteint la limite d\'utilisation. Merci de réessayer plus tard.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false
});

module.exports = {
  shortLimiter,
  dailyLimiter
};
