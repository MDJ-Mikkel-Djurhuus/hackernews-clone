#!/bin/bash
IMAGE_NAME=$1
SERVICE_NAME=$2

docker pull mikkeldjurhuus/${IMAGE_NAME}:latest
docker-compose up -d --no-deps --build ${SERVICE_NAME}