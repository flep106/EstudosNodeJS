const Mongoose = require('mongoose')

Mongoose.connect('mongodb://vandrilho:admin123@localhost:27017/herois', 
    {useUnifiedTopology: true, useNewUrlParser: true }, function(error){
        if(!error) return;
        console.error('Falha na conexão!', error)
})

const connection = Mongoose.connection


connection.once('open', () => console.log('Database rodando!!'))
/*
    0: Disconectado
    1: Conectado
    2: Conectando
    3: Disconectado
*/

// setTimeout(() => {
//     const state = connection.readyState
//     console.log('State', state)    
// }, 1000);


//modlo do documento pra ser inserido no mongo
const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    poder:{
        type: String,
        required: true,
    },
    insertedAt:{
        type: Date,
        default: new Date()
    }
})

const model = Mongoose.model('heroi', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })

    console.log('Result Cadastrar', resultCadastrar)
    const listItens = await model.find()
    console.log('items', listItens)
}
main()