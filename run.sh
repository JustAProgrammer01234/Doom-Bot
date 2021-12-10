#!/usr/bin/bash 

git pull && docker-compose down --rmi all && docker-compose up -d