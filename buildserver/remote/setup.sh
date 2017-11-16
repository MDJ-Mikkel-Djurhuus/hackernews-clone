#!/bin/bash

# Important, run this script as sudo
sudo apt-get update
sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
echo "deb https://apt.dockerproject.org/repo ubuntu-xenial main" | sudo tee /etc/apt/sources.list.d/docker.list
sudo apt-get update
apt-cache policy docker-engine
sudo apt-get install -y docker-engine
sudo usermod -aG docker $(whoami)
sudo apt-get install -y docker-compose

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
