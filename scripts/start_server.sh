#!/bin/bash

cd /home/ec2-user/sample-app

pkill node || true

node app.js > app.log 2>&1 &