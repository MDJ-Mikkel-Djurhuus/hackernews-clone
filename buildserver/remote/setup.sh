#!/bin/bash
sudo apt-get remove docker docker-engine docker.io
sudo apt-get update

sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

sudo apt-get update
sudo apt-get install docker-ce
sudo usermod -aG docker $(whoami)

# Installing the deployment script, which we will call from a Jenkins build job

wget https://raw.githubusercontent.com/MDJ-Mikkel-Djurhuus/hackernews-clone/master/docker-compose.yml
chmod u+x ./docker-compose.yml

wget https://raw.githubusercontent.com/MDJ-Mikkel-Djurhuus/hackernews-clone/master/buildserver/remote/deploy.sh
chmod u+x ./deploy.sh

mkdir mysql
cd mysql
mkdir data
mkdir mysql_init
cd mysql_init
wget https://raw.githubusercontent.com/MDJ-Mikkel-Djurhuus/hackernews-clone/master/mysql/mysql_init/dbcreation.sql
chmod u+x ./dbcreation.sql
