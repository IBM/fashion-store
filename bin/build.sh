#!/bin/bash

#README:
#usage: ./build.sh -p 8080

PORT=8080

while getopts "p:" option; do
    case ${option}
        in
        p) PORT=${OPTARG};;
    esac
done

#seems i need to execute the dockerfile at the root to find src
cp -f ../build/Dockerfile ..

cd ..
docker build --no-cache --build-arg "PORT=$PORT" -t shoe-store .

rm -f Dockerfile

cd bin