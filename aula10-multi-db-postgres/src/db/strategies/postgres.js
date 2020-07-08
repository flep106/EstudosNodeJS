const ICrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends ICrud{
    constructor(){
        super()
        this._driver = null
        this._herois = null
        this._connect()
    }

    async isConnected(){
        try {
            await this._driver.authenticate()
            return true
        } 
        catch (error) {
            console.error('Fail!', error)
            return false
        }
    }

    _connect() {  
        this._driver = new Sequelize(
            'heroes',
            'vandrilho',
            'vandrilho1',
            // quoteIdentifiers = deixa collation que existe no banco por default
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: '0'
            }
        )
    }

    defineModel(){
        this._herois = driver.define('heroes', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true,
            },
            nome: {
                type: Sequelize.STRING,
                required: true
            },
            poder: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'TB_HEROIS',
            freezeTableName: false,
            timestamps: false
        })
    
        await Herois.sync() //sincroniza com o BD
    }

    create(item){
        console.log('Item cadastrado no Postgres')
    }
}

module.exports = Postgres