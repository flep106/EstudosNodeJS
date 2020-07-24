const MongoDB = require("../db/strategies/mongodb")

docker ps \
docker exec - it f09dbebca205 \
mongo - u vandrilho - p vandrilho1--authenticationDatabase herois


//databse
use herois

//mostrar TB (COLEÇÕES)
show collections


//INSERT (CREATE)
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1990-07-03'
})

//select (READ)
db.herois.find()
db.herois.find().pretty()
db.herois.findOne() //top 1
db.herois.find().limit(100).sort({ nome: -1 })//nome descentende
db.herois.find({}, { poder: 1, _id: 0 }) //traz a colunar poder sem o ID


for (let i = 0; i < 1000; i++) {
    db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1990-07-03'
    })
}

//UPDATE
//CUIDADO! Se tiver outras colunas elas são apagadas, só preserva o ID
db.herois.update({_id: ObjectId("5f1afb4f7a4ea8fdc3765e6c")}, {nome: 'Mulher Maravilha'})

//Update como estamos acostumados em SQL
db.herois.update({_id: ObjectId("5f1afb4f7a4ea8fdc3765e6c")}, {$set: {nome: 'Mulher Maravilha'} })
