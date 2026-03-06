# ------------------------------------------------
# BUILD STAGE
# ------------------------------------------------
FROM maven:3.9.11-eclipse-temurin-17 AS build

WORKDIR /build

# Copy pom first for dependency caching
COPY backend/pom.xml ./pom.xml

# Download dependencies (better Docker layer caching)
RUN mvn -B -q -DskipTests dependency:go-offline

# Copy source code
COPY backend/src ./src

# Build Spring Boot executable jar
RUN mvn -B -q -DskipTests clean package spring-boot:repackage

# Verify jar exists (fail fast if not)
RUN ls -la target \
    && test -f target/*.jar

# ------------------------------------------------
# RUNTIME STAGE
# ------------------------------------------------
FROM eclipse-temurin:17-jre-jammy AS runtime

WORKDIR /app

# Install curl for healthcheck/debugging
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/* \
    && useradd --system --uid 10001 appuser

# Copy ONLY the executable Spring Boot jar
# Exclude original-* jars safely
COPY --from=build /build/target/*-SNAPSHOT.jar /app/app.jar

# Security: run as non-root
USER appuser

EXPOSE 8080

# JVM tuned for containers
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "/app/app.jar"]
