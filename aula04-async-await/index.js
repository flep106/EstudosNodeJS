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

        }, 2000);
    })
}

function obterEndereco(idUsuario) {
    return new Promise(function resolveEndereco(resolve, reject) {

        setTimeout(() => {

            return resolve({
                rua: 'Rua dos bobos',
                numero: 0
            })

        }, 2000);

    })

}
// 1- adicionar a palvra aasyn na funcao ->  ela vai retornar automaticamente uma Promise
main()

async function main(){
    try {
        console.time('tempo-promise');
        const usuario = await obterUsuario()
        // Endereco e Telefone não são dependentes entre si
        // sao dependentes apenas do usuario, logo pode colocar as 2 no promisse.all
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEndereco(usuario.id)
        ])
        // vira uma lista cada retorno de Promise é uma posicao da lista
        const endereco = resultado[1]
        const telefone = resultado[0]

        console.log(`
        Nome: ${usuario.nome}
        Endereço: ${endereco.rua} ${endereco.numero}
        Telefone:  ${telefone.ddd} ${telefone.numero}
        `
        )
        console.timeEnd('tempo-promise');
    } catch (error) {
        console.error('DEU RUIM', error)
    }

}

//codigo antigo
// const usuarioPromise = obterUsuario()
// //manipular com SUCESSO, usamos .then
// // o then sempre retorna uma promise com Result ou Reject
// //manipular com ERROR, usamos o .catch
// usuarioPromise
//     .then((resolveUsuario) => {
//         return obterTelefone(resolveUsuario.id)
//             .then((resultadoTelefone) => {
//                 return obterEndereco(resolveUsuario.id)
//                     .then((resultadoEnd) => {
//                         return {
//                             usuario: {
//                                 nome: resolveUsuario.nome,
//                                 id: resolveUsuario.id
//                             },
//                             telefone: {
//                                 numero: resultadoTelefone.numero,
//                                 ddd: resultadoTelefone.ddd
//                             },
//                             endereco: {
//                                 rua: resultadoEnd.rua,
//                                 numero: resultadoEnd.numero
//                             }
//                         }
//                     })
//             })
//     })

//     .then((resultado) => {
//         console.log('DEU BOM', resultado)
//         console.log(`
//         Nome: ${resultado.usuario.nome}
//         Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
//         Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.numero}
//         `)
//     })
//     .catch((error) => {
//         console.log('DEU RUIM', error)
//     })
