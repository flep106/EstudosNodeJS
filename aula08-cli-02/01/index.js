const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./Heroi')
async function main() {
    Commander
    .version('v1')
    .option('-n| --nome [value]', "Nome do heroi")
    .option('-p| --poder [value]', "Poder do heroi")
    .option('-i| --id [value]', "ID do Heroi")
    .option('-a| --atualizar [value]', "Atualiza o Heroi por ID")
    
    .option('-c| --cadastrar', "Cadastrar um Heroi")
    .option('-l| --listar', "Listar herois")
    .option('-r| --remover',"Remover Heroi pelo ID")
    .parse(process.argv)

    //pega o Objeto Commander que tem varios atributos e extrai nome, poder e id
    const heroi = new Heroi(Commander)

    try {
        if(Commander.cadastrar){
            //console.log(heroi)
            delete heroi.id //remove o atributo ID undefinied

            const resultado = await Database.cadrastrar(heroi)
            if(!resultado){
                console.error('Heroi não foi cadastrado!')
                return;
            }
            console.log('Heroi cadastrado com sucesso!')
        }

        if(Commander.listar){
            const resultado = await Database.listar()
            console.log(resultado)
            return;
        }

        if(Commander.remover){
            const resultado = await Database.remover(heroi.id)
            if(!resultado){
                console.error('Não foi possivel remover o heroi')
                return;
            }
            console.log('Heroii Removido com sucesso')
        }

        if(Commander.atualizar){
            //console.log(Commander.atualizar)
            const idParaAtualizar = parseInt(Commander.atualizar);
            //remover todas as chaves undefinied | null
            // transforma pra string e depois pra JSON novamente
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            //depois só chama o atualizar
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)

            if(!resultado){
                console.error('Não foi possivel atualizar o heroi')
            }
            console.log('Heroi Atualizado com sucesso!')
            
        }
        
    } catch (error) {
        console.error('DEU RUIM ', error)
    }
}

main()