#!/bin/bash
SERVICE_NAME=$1
docker-compose up -d --no-deps --build ${SERVICE_NAME}