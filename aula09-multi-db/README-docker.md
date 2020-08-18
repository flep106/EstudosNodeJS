docker run \
    --name postgres \
    -e POSTGRES_USER=vandrilho \
    -e POSTGRES_PASSWORD=padrao1 \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker ps
#r
winpty docker exec -it postgres //bin//bash
OU docker exec -it postgres /bin/bash

docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer


## 1- roda docker
## 2- nome do serviço
## 3- usuário do db
## 4- password
## 5- nome da base
## 6- porta interna e externa
## 7- download (roda em segundo plano)
## 8- nome da imagem
## 10- verifica se tá rodando
## 11- entra na imagen do postgres no path executavel do postgres
## 13 à 18 - Roda um client em : http://localhost:8080 para e linka com a base postgres criada nas linhas de 1 a 8


## --Mongo DB
docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=padrao1 \
    -d \
    mongo:4

## Client do mongo
## http://localhost:3000
docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient

## cria um usuario vandrilho e da permissão no banco Heroi, também criado
docker exec -it mongodb \
    mongo --host localhost -u admin -p padrao1 --authenticationDatabase admin \
    --eval "db.getSiblingDB('herois').createUser({user: 'vandrilho', pwd: 'padrao1', roles: [{role: 'readWrite', db: 'herois'}]})"


## comando para subir
docker run --name mongodb
docker run --name mongoclient
docker run --name adminer
docker run --name postgres
