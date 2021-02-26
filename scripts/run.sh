#!/usr/bin/env bash
cd /home/ec2-user/api/

pm2 delete server
pm2 start build/server.js
