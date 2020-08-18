const ICrud = require('./interfaces/interfaceCrud')
const Mongoose = require('mongoose')

//criei um dicionario com status / Strings
const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectado'
}


class MongoDB extends ICrud {
    constructor(){
        super()
        this._herois = null
        this._driver = null
    }

    async isConnected(){
        const state = STATUS[this._driver.readyState]
        if(state === 'Conectado') return state;

        if(state !== 'Conectando') return state;

        await new Promise(resolve => setTimeout(resolve, 1000))
        return STATUS[this._driver.readyState]
    }

    connect(){
        Mongoose.connect('mongodb://vandrilho:vandrilho1@localhost:27017/herois',
            { useUnifiedTopology: true, useNewUrlParser: true }, function (error) {
                if (!error) return;
                console.error('Falha na conexão!', error)
            })
        const connection = Mongoose.connection
        this._driver = connection

        connection.once('open', () => console.log('Database rodando!!'))
        this.defineModel()

    }

    defineModel(){
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

    this._herois = Mongoose.model('heroi', heroiSchema)

    }
    
    async create(item){
        return this._herois.create(item)
    }
    //se nao passar skip assume 0, limit 10
    async read(item, skip=0, limit=10){
        return this._herois.find(item).skip(skip).limit(limit)
    }

    update(id, item){
        console.log('id', id)
        return this._herois.updateOne({id: id,  $set:  item})
    }

    delete(id){
        return this._herois.deleteOne({ "_id": id })
    }

}

module.exports = MongoDB