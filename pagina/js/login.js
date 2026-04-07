document.addEventListener('DOMContentLoaded', () => {

    let dados = []

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

        let usuario = {
            nome: nome,
            email: email,
            cpf: cpf,
            senha: senha,
            tipoConta: tipoConta
        }

        dados.push(usuario)

        // salva no localStorage
        localStorage.setItem('usuarios', JSON.stringify(dados))

        console.log(usuario)

        // window.location.href = "../pages/login.html"

    })

})