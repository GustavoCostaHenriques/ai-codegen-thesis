
# jhipster.shell.sh 7.1.0 command

SHOULD_STOP=NO

if [ -z "$1" ]
then
  SHOULD_STOP=
  echo Error: missing jhipster version parameter
else
  VER=v$1
  echo Using jhipster version $VER
fi

if [ -z "$2" ]
then
  SHOULD_STOP=
  echo Error: missing jhipster script parameter
  echo The name of the command inside the script to run must be present
else
  COMMAND=$2
  echo Using script command $COMMAND
fi

if [ -z "$SHOULD_STOP" ]
then
  echo "missing parameters below should from jhipster project directory (current app)"
  echo "example: (script location)/jhipster.shell.sh 7.1.0 generate"
  exit 1
fi

docker run \
  --rm \
  --name jhipster-$VER \
  -v `pwd -W`:/home/jhipster/app:Z \
  -v $HOMEDRIVE\\$HOMEPATH\\.m2:/home/jhipster/.m2 \
  -e COMMAND=$COMMAND \
  -i \
  -t jhipster/jhipster:$VER \
  bash ./app-generate-internal-script.sh

# docker container run --rm --name jhipster-$VER -v ~/devenv:/home/jhipster/app -v ~/.m2:/home/jhipster/.m2 -d -t jhipster/jhipster:$VER
#
# docker container exec -it jhipster-$VER bash
