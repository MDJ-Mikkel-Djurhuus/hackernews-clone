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

rm docker-compose.yml
sudo wget https://raw.githubusercontent.com/MDJ-Mikkel-Djurhuus/hackernews-clone/master/docker-compose.yml
sudo chmod u+x ./docker-compose.yml

rm deploy.sh
sudo wget https://raw.githubusercontent.com/MDJ-Mikkel-Djurhuus/hackernews-clone/master/buildserver/remote/deploy.sh
sudo chmod u+x ./deploy.sh

sudo mkdir mysql
cd mysql
sudo mkdir data
sudo mkdir mysql_init
cd mysql_init
rm dbcreation.sql
sudo wget https://raw.githubusercontent.com/MDJ-Mikkel-Djurhuus/hackernews-clone/master/mysql/mysql_init/dbcreation.sql
sudo chmod u+x ./dbcreation.sql
