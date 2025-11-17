FROM nginx:alpine

# Copier les fichiers HTML
COPY *.html /usr/share/nginx/html/

# Configuration Nginx optimale
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
