#!/bin/bash

TPPURLENV=

#do the build for you then start
./build.sh

if [ "$1" != "" ]; then
    TPPURLENV="-e \"GATEWAYURL=$1\""
fi

echo $TPPURLENV
docker run -d --rm --name shoes -p 8080:8080 -e "GATEWAYURL=$1" shoe-store