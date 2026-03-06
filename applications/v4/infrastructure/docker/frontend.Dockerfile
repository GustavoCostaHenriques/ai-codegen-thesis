FROM node:20-alpine AS build

WORKDIR /workspace/frontend

# Install dependencies inside the container only.
COPY package*.json ./
RUN rm -rf node_modules dist
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY angular.json ./angular.json
COPY tsconfig*.json ./
COPY karma.conf.cjs ./karma.conf.cjs
COPY src ./src

ARG FRONTEND_API_BASE_URL=http://localhost/api/v1
RUN for env_file in src/environments/environment*.ts; do \
      sed -i "s|http://localhost:8080/api/v1|${FRONTEND_API_BASE_URL}|g" "$env_file"; \
    done

RUN npm run build

RUN mkdir -p /dist-out \
    && if [ -d dist/frontend/browser ]; then \
         cp -a dist/frontend/browser/. /dist-out/; \
       elif [ -d dist/frontend ]; then \
         cp -a dist/frontend/. /dist-out/; \
       else \
         echo "Angular build output not found in dist/frontend or dist/frontend/browser"; \
         exit 1; \
       fi

FROM nginx:1.27-alpine

RUN rm -f /etc/nginx/conf.d/default.conf \
 && printf '%s\n' \
'server {' \
'    listen 80;' \
'    listen [::]:80;' \
'' \
'    server_name _;' \
'' \
'    root /usr/share/nginx/html;' \
'    index index.html;' \
'' \
'    location / {' \
'        try_files $uri $uri/ /index.html;' \
'    }' \
'' \
'    location = /healthz {' \
'        access_log off;' \
'        return 200 "ok";' \
'        add_header Content-Type text/plain;' \
'    }' \
'}' \
> /etc/nginx/conf.d/default.conf

COPY --from=build /dist-out/ /usr/share/nginx/html/

EXPOSE 80

