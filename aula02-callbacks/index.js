function obterUsuario(callback) {
    setTimeout(() => {
        return callback(null, {
            id:1,
            nome: 'Jarbas',
            data: new Date()
        })
    }, 1000);
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: '8146516',
            ddd: 81
        })
    }, 2000);
}

function obterEndereco(idUsuario, callback){
    setTimeout(() => {
        return callback(null, {
            rua: 'Rua dos bobos',
            numero: 0
        })
    }, 2000)
}

function resolverUsuario(erro, usuario){
    console.log('usuario', usuario)
}


obterUsuario(function resolverUsuario(error, usuario){
    if(error){
        console.error('Deu RUIM Usuario', error)
        return;
    }
    obterTelefone(usuario.id, function resolverTelefone(error2, telefone){
        if(error2 ){
            console.error('Deu RUIM Telefone', error)
            return;
        }
        obterEndereco(usuario.id, function resolverEndereco(error3, endereco){
            if(error3){
                console.error('Deu ruim endereco', erro3)
                return;
            }
            console.log(`
            Nome: ${usuario.nome},
            Endereco: ${endereco.rua}, ${endereco.numero}
            (${telefone.ddd})Telefone: ${telefone.telefone}
            
            `)

        })
    })
})
// const telefone = obterTelefone(usuario.id)


// console.log('telefone', telefone)