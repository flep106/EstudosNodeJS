const service = require('./service')

async function main() {
    try {
        const resultado = await service.getPersonagens(`a`)
        
        // 01 - maneira
        // const nomes = []
        // resultado.results.forEach(element => {
        //    return nomes.push(element.name)
        // })

        //02 maneira
        // const nomes = resultado.results.map((elemento) => { return elemento.name } )

        // 03 maneira
        const nomes = resultado.results.map(elemento => elemento.name)



        console.log(nomes)
    } catch (error) {
        console.error('DEU RUIM', error)
    }
}

main()