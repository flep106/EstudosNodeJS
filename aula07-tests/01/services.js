const { get } = require('axios')
const URL_BASE = `https://swapi.dev/api/people`

async function getPersonagens(nome) {
    const url = `${URL_BASE}/?search=${nome}&format=json`
    const result = await get(url)
    console.log(result.data)
    return result.data.results.map(mapearPersonagens)
}

//para cada item do results (json) ele faz o de para 
function mapearPersonagens(item){
    return{
        nome: item.name,
        peso: item.height
    }
}

module.exports = {
    getPersonagens
}

//teste
// getPersonagens('r2')
//     .then((response) =>{
//         console.log(response)
//     })
//     .catch((reject) => {
//         console.log('Deu RUIM!', reject)
//     })

