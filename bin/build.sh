#!/bin/bash

#seems i need to execute the dockerfile at the root to find src
cp -f ../build/Dockerfile ..

cd ..
docker build -t shoe-store .

rm -f Dockerfile

cd bin