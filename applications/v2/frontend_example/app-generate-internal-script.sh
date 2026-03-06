# npm config set registry https://nexus.mydbsapps.com/repository/npm-group/
git config --global --add safe.directory /home/jhipster/app

if [ "$COMMAND" = "generate" ]
then

  echo generating

  jhipster jdl jdl-app.jdl jdl-ent.jdl --no-insight --skip-install --skip-fake-data --skip-git --force
  #jhipster jdl jdl-app.jdl jdl-ent.jdl --no-insight --skip-install --skip-fake-data --with-entities


elif [ "$COMMAND" = "entity" ]
then

  jhipster entity --help


elif [ "$COMMAND" = "upgrade" ]
then

  jhipster upgrade

elif [ "$COMMAND" = "openapi-client" ]
then

  echo OpenAPI client generator

  # Added OpenAPI client (still needs to change the default apiyml file location)

  jhipster openapi-client

  # Welcome to the JHipster OpenApi client Sub-Generator
  # ? Where do you want to import your OpenAPI/Swagger specification from ? From the api-client.yml spec of an existing Jhipster project
  # ? Enter the path to the jhipster project root directory .
  # ? What is the unique name for your API client (please avoid using Java keywords) ? superlogica
  # ? Do you want to save this config for future reuse ? Yes

  # after create folder src/main/resources/swagger/client
  # after copy file src/main/resources/swagger/api-client.yml to src/main/resources/swagger/client/api-client.yml

  # change .yo-rc.json and change line: "spec": "./src/main/resources/swagger/api-client.yml", to "spec": "./src/main/resources/swagger/client/api-client.yml",
  # change package.json openclient generation to include client/api-client.yml:     "openapi-client:superlogica": "openapi-generator generate -g spring -i ./src/main/resources/swagger/client/api-client.yml -p library=spring-cloud -p apiPackage=com.digitalbanksolutions.ib.gtw.wstorest.superlogica.client.superlogica.api -p modelPackage=com.digitalbanksolutions.ib.gtw.wstorest.superlogica.client.superlogica.model -p basePackage=com.digitalbanksolutions.ib.gtw.wstorest.superlogica.client -p configPackage=com.digitalbanksolutions.ib.gtw.wstorest.superlogica.client.superlogica -p title=superlogica -p artifactId=superlogica -p supportingFiles=ApiKeyRequestInterceptor.java --skip-validate-spec"

  # manually generate client API code
  # superlogica without timestamp (copied from the package.json script created by "jhipster openapi-client" ran on docker)
  # (also changed the package.json to add the flag to remove timestamp creation)
  # npm run openapi-client:superlogica
  #
  # as another option is was added to pom.xml maven openapi generator plugin as another execution (this way it generates server and client files based on OpenApi yaml spec)


elif [ "$COMMAND" = "ci-cd" ]
then

  echo Adde CI-CD

    jhipster ci-cd

elif [ "$COMMAND" = "test" ]
then

  echo test

fi

# mvn install:install-file -DgroupId=com.digitalbanksolutions.mapstruct.spi -DartifactId=accessornaming-spi-impl -Dversion=1.0.1 -Dpackaging=jar -Dfile=accessornaming-spi-impl-1.0.1.jar -DlocalRepositoryPath=/Users/marcomorado/devenv/dbscv/sgdlgtw/local-maven-repo

# Move docker image https://stackoverflow.com/questions/23935141/how-to-copy-docker-images-from-one-host-to-another-without-using-a-repository

# docker save -o <path for generated tar file> <image name>
# scp file
# docker load -i <path to image tar file>
