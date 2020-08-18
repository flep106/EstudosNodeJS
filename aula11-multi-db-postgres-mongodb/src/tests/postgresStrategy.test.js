const assert = require('assert')
const Postgres = require('./../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')
const { read } = require('fs')


const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR =    {nome: 'Gaviao Negro', poder: 'Flechas'}
const MOCK_HEROI_ATUALIZAR =    {nome: 'Batman', poder: 'Dinheiro'}

let db = null

describe('Postgres Strategy', function(){
    this.timeout(Infinity)
    
    this.beforeAll(async function(){
        await context.connect()
        await context.delete() //limpa a base
        await context.create(MOCK_HEROI_ATUALIZAR)
    })

    it('PostgresSQL Connection', async function() {
        const result = await context.isConnected()
        assert.equal(result, true)
    })

    it('Cadrastrar', async function(){
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id //remove a chave id do objeto
        //console.log('Resultado', result)
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('Listar', async () => {
        //pega a primeira posição da lista 
        //const posicaoZero = [result]
        // const [posicaoZero, posicaoUm] = ['itemDaPosicao0', 'itemdaPosicao1']
        const [result] = await context.read({nome: MOCK_HEROI_CADASTRAR.nome})
        //deleta o id do objeto
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('Atualizar', async () => {
        const [itemAtualizar] = await context.read({nome: MOCK_HEROI_ATUALIZAR.nome})
        //console.log(result)
        novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Mulher Maravilha'
        }
        const [result] = await context.update(itemAtualizar.id, novoItem)
        const [itemAtualizado] = await context.read({id: itemAtualizar.id})

        assert.deepEqual(result, 1)
        assert.deepEqual(itemAtualizado.nome, novoItem.nome)



        /* ...MOCK_HEROI_ATUALIZAR
            O novoItem pode chamar os atributos
            novoItem.nome
            novoItem.poder

            MOCK_HEROI_ATUALIZAR
            novoItem.MOCK_HEROI_ATUALIZAR.nome
            novoItem.MOCK_HEROI_ATUALIZAR.poder

        */
        /* No javascript temos uma tecnica chamada rest/spread 
           é um método usado pra merge de objetos Ou separa-los
        {
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        
        {
            data_nascimento: '1990-02-30'
        }
        
        //final
        {
            nome: 'Batman',
            poder: 'Dinheiro',
            data_nascimento: '1990-02-30'
        }
        
           */

    })

    it('Remover por ID', async (id) => {
        const [item] = await context.read({})
        // console.log('item', item)
        const result = await context.delete(item.id)
        assert.deepEqual(result, 1)
    })
})