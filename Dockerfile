# Stage 1: Build backend
FROM node:18-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ ./

# Stage 2: Runtime avec Nginx + Node
FROM node:18-alpine
WORKDIR /app

# Installer Nginx
RUN apk add --no-cache nginx supervisor

# Copier le backend
COPY --from=backend-builder /app/backend /app/backend

# Copier le frontend
COPY index.html mentions-legales.html politique-confidentialite.html /usr/share/nginx/html/
RUN chmod -R 755 /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/http.d/default.conf

# Configuration Supervisor (lance Nginx + Node ensemble)
RUN mkdir -p /var/log/supervisor
COPY <<'SUPERVISOR' /etc/supervisord.conf
[supervisord]
nodaemon=true
user=root

[program:backend]
command=node /app/backend/server.js
directory=/app/backend
autostart=true
autorestart=true
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0

[program:nginx]
command=nginx -g 'daemon off;'
autostart=true
autorestart=true
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
SUPERVISOR

EXPOSE 80 3001

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
