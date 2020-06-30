const { readFile, writeFile } = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)
//pra ler  se o arquivo for JSON, pode pedir direto, exemplo
//const dadosJson = require('./herois.json')

class Database{

    constructor(){
        this.NOME_ARQUIVO = 'herois.json'
    }

    //metodo auxiliar usando no listar
    async obterDadosArquivo(){
        //simulando que fosse qualquer outro tipo de arquivo e tranforma em JSON
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }

    async escreverArquivo(dados){
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true
    }

    
    async cadrastrar(heroi){
        const dados = await this.obterDadosArquivo()
        const id = heroi.id <= 2 ? heroi.id : Date.now();

        /*
        {
            nome: Flash,
            poder: Velocidade
        }
        juntar com
        {
            id:1342423
        }
        transformar em
        {
            nome: flash,
            poder: velocidade
            id: 1342423
        }
        */
       const heroiComId = {
           id,
           ...heroi
       }


    //    [
    //        {
    //            nome: flash
    //        }
    //    ]

    //    {
    //        nome: batman
    //    }
       
    // TRANSFORMA EM:
    //    [
    //        {
    //            nome:flash
    //        },
    //        {
    //            nome: batman
    //        }
    //    ]

//     const dadosFinal = [  
//         ...dados,
//         heroiComId
// ]

       const resultado = await this.escreverArquivo([...dados, heroiComId])
       return resultado
    }

    async listar(id){
        const dados = await this.obterDadosArquivo()
        const dadosFiltrados = dados.filter((item) => (id ? (item.id === id) : true) )
        return dadosFiltrados
    }

    async remover(id){
        if(!id){
            //se nao passou o id, remove tudo, ou seja, escreve uma array vazio
            return await this.escreverArquivo([])
        }
        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))
        
        if(indice === -1){
            throw Error('O usuario informado nao existe!')
        }
        dados.splice(indice, 1)
        return await this.escreverArquivo(dados)
    }

    async atualizar(id, modificacoes){
        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))
        if(indice === -1){
            throw Error('O heroi Informado nao existe')
        }
        
        const atual = dados[indice] //pega o item da lista
        dados.splice(indice, 1) //remove ele da lista

        //faz o merge dos objetos
        const objetoAtualizar = {
            ...atual,
            ...modificacoes
        }
        
        return await this.escreverArquivo([
            ...dados,
            objetoAtualizar
        ])
        
        return false
    }
}

module.exports = new Database()