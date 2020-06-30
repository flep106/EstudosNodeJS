const { deepEqual, ok } = require('assert')   

/*
Lembrar de toda vez limpar o arquivo herois.JSON, antes de 
executar os testes deixa apenas um array vazio "[]"
se preciso utilizar o it.only
*/

const DEFAULT_ITEM_CADRASTRAR = {
    nome: 'FLash',
    poder: 'Velocidade',
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Laterna Verde',
    poder: 'Energia Anel',
    id: 2
}
const database = require('./database')

describe('Suite de manipulação de heroi', () => {
    before(async ()=>{
        await database.cadrastrar(DEFAULT_ITEM_CADRASTRAR)
        await database.cadrastrar(DEFAULT_ITEM_ATUALIZAR)
    })
    
    it('deve listar um heroi', async () => {
        const expected = DEFAULT_ITEM_CADRASTRAR
        //[resultado] = resultado[0]
        const [resultado] = await database.listar(expected.id)
        deepEqual(resultado, expected)
    })

    it('Deve cadastrar um heroi', async () => {
        const expected = DEFAULT_ITEM_CADRASTRAR
        const resultado = await database.cadrastrar(DEFAULT_ITEM_CADRASTRAR)

        const [atual] = await database.listar(DEFAULT_ITEM_CADRASTRAR.id)

        deepEqual(atual, expected)
    })

    it('Deve remover um heroi por id', async () => {
        const expected = true;
        const resultado = await database.remover(DEFAULT_ITEM_CADRASTRAR.id)
        deepEqual(resultado, expected)
    })

    it('Deve atualizar o heroi pelo id', async () =>{
        const expected  = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Batman',
            poder: 'Dinheiro'
        }

        const novoDado = {
            nome: 'Batman',
            poder: 'Dinheiro'
        }

        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
        const [resultado] =  await database.listar(DEFAULT_ITEM_ATUALIZAR.ID)
        deepEqual(resultado, expected)
    })
})