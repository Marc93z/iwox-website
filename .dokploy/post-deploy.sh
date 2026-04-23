#!/bin/sh
# Hook exécuté après chaque déploiement
# Next.js standalone écoute sur le port 3000 dans le container

echo "🔧 Republishing port 8082 -> 3000 (Next.js)..."
docker service update --publish-rm 8082:80 iwox-q2kppp 2>/dev/null || true
docker service update --publish-add 8082:3000 iwox-q2kppp || true
echo "✅ Port 8082 published"
