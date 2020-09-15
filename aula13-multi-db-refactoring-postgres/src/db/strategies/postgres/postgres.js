const ICrud = require('./../interfaces/interfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends ICrud {
    constructor(connection, schema) {
        super()
        this._connection = connection
        this._schema = schema
    }

    async isConnected() {
        try {
            await this._connection.authenticate()
            return true
        }
        catch (error) {
            console.error('Fail!', error)
            return false
        }
    }

    // 0 - abre conexão com o banco
    // 1 - com a conexão define o modelo de dados(tabela) com o objeto
    async connect() {
        this._connection = new Sequelize(
            'heroes',
            'vandrilho',
            'admin123',
            // quoteIdentifiers = deixa collation que existe no banco por default
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: '0'
            }
        )
        await this.defineModel()
    }

    async defineModel(connection, schema) {
        const model = connection
        await this._schema.sync() //sincroniza com o BD
    }

    async create(item) {
        const { dataValues } = await this._schema.create(item)
        return dataValues
    }

    //Se nao mandar ele coloca como vazio
    async read(item = {}) {
        const result = this._herois.findAll({ where: item, raw: true })
        //console.log(result)
        return result
    }
    
    async update (id, item) {
        //console.log('item', item)
        const r = await this._herois.update(item, {where: {id:id}})
        //console.log('r', r)
        return r
        //return this._herois.update(item, {where: {id: id}})
        
    }

    async delete(id){
        const query = id ? {id} : {}
        return this._herois.destroy({where: query})
    }
}

module.exports = Postgres