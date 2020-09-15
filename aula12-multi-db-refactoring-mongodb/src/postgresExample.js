// npm install sequelize
//drivers do banco postgres
    // npm install pg-hstore pg

const Sequelize = require('sequelize')
const driver = new Sequelize(
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

async function main() {
    //procura o database 'heroes'
    //define a tabela com as colunas
    const Herois = driver.define('heroes', {
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

    // await Herois.create({
    //     nome: 'Laterna Verde',
    //     poder: 'Anel'
    // })

    const result = await Herois.findAll({
        raw: true,
        //se quiser apenas alguns campos
        //attributes: ['nome']
    })


 
    console.log(result)
}

main()