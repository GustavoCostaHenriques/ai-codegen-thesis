FROM node:20-alpine AS build

WORKDIR /app

COPY frontend/package.json /app/package.json
COPY frontend/package-lock.json /app/package-lock.json
RUN npm ci --no-audit --no-fund

COPY frontend/angular.json /app/angular.json
COPY frontend/tsconfig.json /app/tsconfig.json
COPY frontend/tsconfig.app.json /app/tsconfig.app.json
COPY frontend/tsconfig.spec.json /app/tsconfig.spec.json
COPY frontend/src /app/src
COPY frontend/public /app/public

RUN npm run build && \
    DIST_DIR="$(dirname "$(find dist -name index.html -print -quit)")" && \
    if [ -z "$DIST_DIR" ]; then echo "index.html not found under dist/"; exit 1; fi && \
    mkdir -p /app/nginx-dist && \
    cp -R "$DIST_DIR"/. /app/nginx-dist/

FROM nginx:1.25-alpine

COPY infrastructure/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/nginx-dist/ /usr/share/nginx/html/

EXPOSE 80