//
const { getPersonagens } = require('./service')

//implementação do filter
Array.prototype.meuFilter = function (callback) {
    const lista = []
    for (index in this) {
        const item = this[index]
        const result = callback(item, index, this)
        // 0, "", null, undefined === false
        if (!result) continue;
        lista.push(item)
    }
    return lista;
}

async function main(){
    try {
        //pega só o results do JSON
        const { results } = await getPersonagens('a')
        
        const cabeloMarrom = results.map((pessoa) =>  pessoa.hair_color === 'brown' )

        console.log(cabeloMarrom)  

    } catch (error) {
        console.error('deu ruiom', error)
    }
}

main()