# ------------------------------------------------
# BUILD STAGE
# ------------------------------------------------
FROM node:20-alpine AS build

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend/angular.json ./angular.json
COPY frontend/tsconfig.json ./tsconfig.json
COPY frontend/tsconfig.app.json ./tsconfig.app.json
COPY frontend/public ./public
COPY frontend/src ./src

ARG API_BASE_URL=http://localhost/api/v1
RUN sed -i "s|apiBaseUrl: 'http://localhost:8080/api/v1'|apiBaseUrl: '${API_BASE_URL}'|g" src/environments/environment.ts

RUN npm run build

RUN mkdir -p /tmp/frontend-build \
    && if [ -d dist/frontend/browser ]; then \
         cp -R dist/frontend/browser/. /tmp/frontend-build; \
       else \
         cp -R dist/frontend/. /tmp/frontend-build; \
       fi


# ------------------------------------------------
# RUNTIME STAGE
# ------------------------------------------------
FROM nginx:1.27-alpine AS runtime

# Install wget for healthcheck
RUN apk add --no-cache wget

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom config
COPY infrastructure/docker/frontend-nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files
COPY --from=build /tmp/frontend-build/ /usr/share/nginx/html/

EXPOSE 80

HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=5 \
  CMD wget -q -O - http://localhost/healthz > /dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
