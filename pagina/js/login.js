document.addEventListener('DOMContentLoaded', () => {
    verificarLista();

    document.getElementById('btn-cadastrar').addEventListener('click', () => {

        const nome = document.getElementById('nome').value
        const email = document.getElementById('email').value
        const cpf = document.getElementById('cpf').value
        const senha = document.getElementById('senha').value
        const confirmaSenha = document.getElementById('confirmaSenha').value
        const tipoConta = document.querySelector('input[name="tipoConta"]:checked').value

        if (senha !== confirmaSenha) {
            alert("As senhas não coincidem")
            return
        }

        if (verificaUsuarioExistente(cpf)) {
            alert('CPF já cadastrado.')
            return
        }

        let listaInformacoesUsuario = JSON.parse(localStorage.getItem('usuarios')) || []

        let usuario = {
            nome: nome,
            email: email,
            cpf: cpf,
            senha: senha,
            tipoConta: tipoConta
        }

        listaInformacoesUsuario.push(usuario)
        localStorage.setItem('usuarios', JSON.stringify(listaInformacoesUsuario))
        localStorage.setItem('amps_logado', JSON.stringify(usuario))

        window.location.href = 'index.html'
    })

    document.getElementById('btnJaTenhoConta').addEventListener('click', (e) => {
        e.preventDefault()
        sessionStorage.setItem('amps_abrirLogin', '1')
        window.location.href = 'index.html'
    })

})

function verificarLista() {
    const lista = localStorage.getItem('usuarios')
    if (lista == null) {
        localStorage.setItem('usuarios', JSON.stringify([]))
    }
}

function verificaUsuarioExistente(cpf) {
    let lista = JSON.parse(localStorage.getItem('usuarios')) || []
    return lista.some(usuario => usuario.cpf === cpf)
}