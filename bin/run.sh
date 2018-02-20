#!/bin/bash

#README:
#usage: ./run.sh -e 5000 -g http://athena1.fyre.ibm.com:8400/open-banking -x http://athena1.fyre.ibm.com:9090

EXTERNALPORT=8080
INTERNALPORT=8080
PORT=8080
GATEWAYURL="http://athena1.fyre.ibm.com:32756/open-banking"
EXTERNALURL="http://localhost:8080"

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

docker stop shoes

#do the build for you then start
./build.sh -p $EXTERNALPORT

#docker run -d --rm --name shoes -p $EXTERNALPORT:8080 -e "GATEWAYURL=$GATEWAYURL" shoe-store
docker run -d --restart always --name shoes -p $EXTERNALPORT:8080 -e "GATEWAYURL=$GATEWAYURL" -e "EXTERNALURL=$EXTERNALURL" shoe-store
