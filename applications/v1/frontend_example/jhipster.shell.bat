
REM jhipster.shell.sh 7.1.0 command
set var1=%1%
set SHOULD_STOP=NO

if "%var1%" == ""  (set SHOULD_STOP=YES&& echo Error: missing jhipster version parameter) else  ( echo Using jhipster version "%var1%")

set var2=%2%
if "%var2%" == "" (set SHOULD_STOP=YES&& echo Error: missing jhipster script parameter && echo The name of the command inside the script to run must be present) else (echo Using script command %var2%)


if "%SHOULD_STOP%" == "YES" (echo "missing parameters below should from jhipster project directory (current app)" && echo "example: (script location)/jhipster.shell.sh 7.1.0 generate" && exit 1)

docker run \
  --rm \
  --name jhipster-$VER \
  -v $PWD:/home/jhipster/app \
  -v ~/.m2:/home/jhipster/.m2 \
  -e COMMAND=$COMMAND \
  -i \
  -t jhipster/jhipster:$VER \
  bash ./app-generate-internal-script.sh

# docker container run --rm --name jhipster-$VER -v ~/devenv:/home/jhipster/app -v ~/.m2:/home/jhipster/.m2 -d -t jhipster/jhipster:$VER

# docker container exec -it jhipster-$VER bash
