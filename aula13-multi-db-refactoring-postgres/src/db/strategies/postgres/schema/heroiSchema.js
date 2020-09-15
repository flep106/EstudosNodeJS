const Sequelize = require('sequelize')

const heroiSchema = {
    name: 'herois',
    schema: {
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
    },

    options: {
            tableName: 'TB_HEROIS',
            freezeTableName: false,
            timestamps: false
    }

}

//this._herois = this._driver.define('heroes')

//await this._herois.sync() //sincroniza com o BD
module.exports = HeroiSchema