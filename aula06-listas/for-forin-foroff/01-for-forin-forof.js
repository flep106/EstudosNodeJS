const service = require('./service')

main()

async function main(){
    try {
        const resultados = await service.getPersonagens('a')
        const listaPersonagens = []
        //OBS: 'results' é o objeto json retornado pela API
        
        //for classico
        console.time('for-tempo')
        for (let i = 0; i < resultados.results.length; i++) {
            const pessoa = resultados.results[i];
            listaPersonagens.push(pessoa.name)
        }
        console.timeEnd('for-tempo')

        //diferença pra for é interação do index
        //É usado para interar pelas PROPRIEDADES do objeto
        console.time('for-in');
        for (const index in resultados.results) {
            if (resultados.results.hasOwnProperty(index)) {
                const pessoa = resultados.results[index]
                listaPersonagens.push(pessoa.name)
                
            }
        }
        console.timeEnd('for-in');
        
        //pega por elemento na lista
        //Usado para interar pelos ELEMENTOS da lista
        console.time('for-of');
        for (const elemento of resultados.results) {
            listaPersonagens.push(elemento.name)
        }
        console.timeEnd('for-of');

     // console.log('nomes dos personagens',listaPersonagens)
     console.log(resultados)
    } catch (error) {
        console.error('Erro interno', error)
    }
}

