#!/usr/bin/env bash

curl -sL https://rpm.nodesource.com/setup_12.x | sudo -E bash -
yum -y install nodejs
yum -y install make glibc-devel gcc patch

npm install -g pm2
