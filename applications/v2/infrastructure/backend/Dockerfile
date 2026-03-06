FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

COPY backend/.mvn /app/.mvn
COPY backend/mvnw /app/mvnw
COPY backend/pom.xml /app/pom.xml
COPY backend/checkstyle.xml /app/checkstyle.xml
COPY backend/sonar-project.properties /app/sonar-project.properties

RUN chmod +x /app/mvnw
RUN /app/mvnw -q -DskipTests dependency:go-offline

COPY backend/src /app/src

EXPOSE 8080

CMD ["/app/mvnw", "-DskipTests", "spring-boot:run"]