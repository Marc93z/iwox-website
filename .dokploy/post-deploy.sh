#!/bin/sh
# Hook exécuté après chaque déploiement

echo "🔧 Publishing port 8082..."
docker service update --publish-add 8082:80 iwox-q2kppp || true
echo "✅ Port 8082 published"
