const axios = require('axios')
const URL = `https://swapi.dev/api/people`

async function getPersonagens(nome) {
    const urlPersonagem = `${URL}/?search=${nome}&format=json`
    response = await axios.get(urlPersonagem)
    return response.data
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