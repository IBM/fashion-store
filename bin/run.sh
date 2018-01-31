#!/bin/bash

#README:
#usage: ./run.sh -e 5000 -c ../configuration/api-endpoint-controller-config.json

EXTERNALPORT=8080
INTERNALPORT=8080
PORT=8080
GATEWAYURL=../configuration/api-endpoint-controller-config.json

while getopts "g:e:i:p:" option; do
    case ${option}
        in
        g) GATEWAYURL=${OPTARG};;
        e) EXTERNALPORT=${OPTARG};;
        i) INTERNALPORT=${OPTARG};;
        p) PORT=${OPTARG};;
    esac
done

docker stop shoes

#do the build for you then start
./build.sh -p $PORT

docker run -d --rm --name shoes -p $PORT:$PORT -e "GATEWAYURL=$GATEWAYURL" shoe-store