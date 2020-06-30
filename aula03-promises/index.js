/*
0 - obter usuário
1 - Obter o telefone do usuario a partir do ID usuario
2 - Obter endereço a partir do ID do usuario
*/

//Lib usada para transformar funções com callback em Promise
// const util = require('util')
// const obterEnderecoAsync = util.promisify(obterEndereco)

//obterEnderecoAsync().then

function obterUsuario() {
    // SUCESS -> resolve
    // ERROR -> Reject
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // return reject(new Error('DEU RUIM DE VERDADE'))

            return resolve({
                id: 1,
                nome: 'Jarbas',
                data: new Date()
            })
        }, 1000);
    })

}

function obterTelefone(idUsuario) {
    return new Promise(function resolveTelefone(resolve, reject) {

        setTimeout(() => {

            return resolve({
                numero: '8146516',
                ddd: 81
            })

        }, 1000);
    })
}

function obterEndereco(idUsuario) {
    return new Promise(function resolveEndereco(resolve, reject) {

        setTimeout(() => {

            return resolve({
                rua: 'Rua dos bobos',
                numero: 0
            })

        }, 1000);

    })

}

const usuarioPromise = obterUsuario()
//manipular com SUCESSO, usamos .then
// o then sempre retorna uma promise com Result ou Reject
//manipular com ERROR, usamos o .catch
usuarioPromise
    .then((resolveUsuario) => {
        return obterTelefone(resolveUsuario.id)
            .then((resultadoTelefone) => {
                return obterEndereco(resolveUsuario.id)
                    .then((resultadoEnd) => {
                        return {
                            usuario: {
                                nome: resolveUsuario.nome,
                                id: resolveUsuario.id
                            },
                            telefone: {
                                numero: resultadoTelefone.numero,
                                ddd: resultadoTelefone.ddd
                            },
                            endereco: {
                                rua: resultadoEnd.rua,
                                numero: resultadoEnd.numero
                            }
                        }
                    })
            })
    })

    .then((resultado) => {
        console.log('DEU BOM', resultado)
        console.log(`
        Nome: ${resultado.usuario.nome}
        Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
        Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.numero}
        `)
    })
    .catch((error) => {
        console.log('DEU RUIM', error)
    })
