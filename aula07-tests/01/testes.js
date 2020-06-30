const assert = require('assert')
const { getPersonagens } = require('./services')
const nock = require('nock')
const URL_BASE = `https://swapi.dev/api/people`
/*
npm install -g mocha para usar o cmd mocha test.js
npm i --save-dev mocha -> para ficar apenas em DEV o pacote de testes
*/

/*
    describe -> oq desejo no meu pacote de teste
    it -> um pedaço do teste a ser feito
    
    Como executar:
    mocha <nome_arquivo>
*/

//instalamos o pacote nock, para simular requisições
//npm install nock

describe('Star Wars Tests', () => {
    
    before(() => {
        const response =
        {
            count: 1,
            next: null,
            previous: null,
            results: [
                {
                    name: 'R2-D2',
                    height: '96',
                    mass: '32',
                    hair_color: 'n/a',
                    skin_color: 'white, blue',
                    eye_color: 'red',
                    birth_year: '33BBY',
                    gender: 'n/a',
                    homeworld: 'http://swapi.dev/api/planets/8/',
                    vehicles: [],
                    starships: [],
                    created: '2014-12-10T15:11:50.376000Z',
                    edited: '2014-12-20T21:17:50.311000Z',
                    url: 'http://swapi.dev/api/people/3/'
                }
            ]
        }

        // nock simula a ida na API, mas não vai
        nock(URL_BASE)
            .get('/?search=r2-d2&format=json')
            .reply(200, response)
    })

    //teste efetivo
    it('deve buscar o R2D2 com o formato correto', async function () {
        //difinir na mao o que quero receber(resultado esperado)
        const expected = [{
            nome: 'R2-D2',
            peso: '96'
        }]

        const nomeBase = `r2-d2`
        const resultado = await getPersonagens(nomeBase)
        //executa o teste
        assert.deepEqual(resultado, expected)

    })
})


/*
    padrão: executar o comando mocha(já instalado nas dep)
    mocha (ele procura o arquivo test.js)
    para executar 'mocha testes.js'
*/


//assert.ok(false)