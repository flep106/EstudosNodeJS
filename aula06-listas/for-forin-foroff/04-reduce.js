const { getPersonagens } = require('./service')

Array.prototype.meuReduce = function(callback, valorInicial){
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]
    for (let i = 0; i < this.length; i++) {
        valorFinal = callback(valorFinal, this[index], this)
        
    }
    return valorFinal;
}

async function main() {
    try {
        const { results } = await getPersonagens('a')
        const pesos = results.map(item => parseInt(item.height))
        console.log('Pesos',pesos)
        const total = pesos.reduce((pAnterior, pAtual) => pAnterior + pAtual)
        
        console.log('Total',total)

    } catch (error) {
        console.error('DEU RUIM', error)
    }
}
main()