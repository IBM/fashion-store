#!/bin/bash

#README:
#usage: ./run.sh -e 5000 -g http://192.168.1.6:8400/open-banking -x http://192.168.1.6:9090

EXTERNALPORT=8080
INTERNALPORT=8080
PORT=8080
GATEWAYURL="http://192.168.1.6:32756/open-banking"
EXTERNALURL="http://192.168.1.6:8080"

while getopts "x:g:e:i:p:" option; do
    case ${option}
        in
        g) GATEWAYURL=${OPTARG};;
        x) EXTERNALURL=${OPTARG};;
        e) EXTERNALPORT=${OPTARG};;
        i) INTERNALPORT=${OPTARG};;
        p) PORT=${OPTARG};;
    esac
done

docker stop fashion

#do the build for you then start
./build.sh -p $EXTERNALPORT

#docker run -d --rm --name fashion -p $EXTERNALPORT:8080 -e "GATEWAYURL=$GATEWAYURL" shoe-store
docker run -d --restart always --name fashion -p $EXTERNALPORT:8080 -e "GATEWAYURL=$GATEWAYURL" -e "EXTERNALURL=$EXTERNALURL" fashion-store
