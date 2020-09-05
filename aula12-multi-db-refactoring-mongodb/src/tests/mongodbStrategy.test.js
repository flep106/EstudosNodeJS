const assert = require('assert')
const MongoDb = require('./../db/strategies/mongodb/mongodb')
const HeroiSchema = require('./../db/strategies/mongodb/schemas/heroisSchemas')
const Context = require('../db/strategies/base/contextStrategy')


const MOCK_HEROI_CADASTRAR ={
    nome: 'Mulher Maravilha',
    poder: 'Laço'
}

const MOCK_HEROI_DEFAULT ={
    nome: `Homem Aranha-${Date.now()}` ,
    poder: 'Teia'
}

const MOCK_HEROI_ATUALIZAR ={
    nome: `Patolino-${Date.now()}` ,
    poder: 'Velocidade'
}

let MOCK_HEROI_ID = ''

let context = {}

describe.only('MongoDB suite de testes', function () {
    this.beforeAll(async () => {
        const connection = MongoDb.connect()
        context = new Context(new MongoDb(connection, HeroiSchema))

        await context.create(MOCK_HEROI_DEFAULT)
        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ID = result._id
        
    })

    // it('Verificar conexao', async function ()  {
    //     const result = await context.isConnected()
    //     const expected = 'Conectado'
        
    //     assert.deepEqual(result, expected)
    // })

    it('Cadastrar', async () =>{
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })

    it('Listar', async () => {
        //da lista retornada me traga pos0 e nesse item traga o nome e poder do item
        // const result = await context.read({nome: MOCK_HEROI_DEFAULT.nome})
        // console.log('result', result)
        const [{nome, poder}] = await context.read({nome: MOCK_HEROI_DEFAULT.nome})
        const result  = {
            nome, poder
        }

        assert.deepEqual(result, MOCK_HEROI_DEFAULT)
    })

    it('Atualizar', async() =>{
        //console.log('MOCK_HEROI_ID', MOCK_HEROI_ID)
        const result = await context.update(MOCK_HEROI_ID, {
            nome: 'Pernalonga'
        })

        assert.deepEqual(result.nModified, 1)
    })

    it('Remover', async () => {
        const result = await context.delete(MOCK_HEROI_ID)
        console.log('result!', result)
        assert.deepEqual(result.n, 1)
    })
})