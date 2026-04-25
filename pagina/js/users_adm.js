/* ---------PROVA---------- */



document.addEventListener('DOMContentLoaded', () => {
    verificarLista(); // verifica se a lista existe
    /*
    PARA PROVA GIULIO
    -TRAZER ID CRIADO NO HTML PARA O JS, USANDO DOCUMENTO.getELEMENT....
    -NAO ESQUECA DE COLOCAR .VALUE NO FINAL
    -VA NO OBJETO => let usuario = {}
    -ADICIONE  NO OBJ O ID QUE VOCE PEGOU ANTERIORMENTE
    -FIM
    */ 
    document.getElementById('btnAdicionar').addEventListener('click', () => {

        // Tras todos os value atraves do ID (PASSO 1 PROVA GIULIO TRAZER NOVO ID)
        const nome = document.getElementById('nome').value
        const email = document.getElementById('email').value
        const senha = document.getElementById('senha').value
        const status = document.getElementById('status_usuario').value
        const cpf = document.getElementById('cpfCliente').value
        
        if (verificaUsuarioExistente(cpf)) {
            alert('CPF já Cadastrado')
            return
        }
        // Usa parse (transforma informacoes de string para  array) dou get no usuarios (array criado na funcao verificar lista)
        let listaInformacoesUsuario = JSON.parse(localStorage.getItem('usuarios')) || []

        // Cria obj (PASSO 2 PROVA, ADICIONAR AO OBJ O NOVO ID Q VC TROUXE)
        let usuario = {
           nome,
           email,
           senha,
           status, 
           cpf
        }

        //dou push do obj par array e mando a lista denovo para local storage (set)
        listaInformacoesUsuario.push(usuario)
        localStorage.setItem('usuarios', JSON.stringify(listaInformacoesUsuario))
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

















/* ───────── DRAWER / MENU ───────── */

const menuBtn = document.getElementById('menuBtn');
const drawer = document.getElementById('drawer');

if (menuBtn && drawer) {

    const overlay = document.createElement('div');
    overlay.classList.add('drawer-overlay');
    document.body.appendChild(overlay);

    function openDrawer() {
        menuBtn.classList.add('open');
        drawer.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        menuBtn.classList.remove('open');
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', () => {
        drawer.classList.contains('open') ? closeDrawer() : openDrawer();
    });

    overlay.addEventListener('click', closeDrawer);

    drawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeDrawer);
    });
}


/*ativo*/

document.addEventListener("DOMContentLoaded", () => {

    const tabs = document.querySelectorAll(".admin-tab");
    const currentPage = window.location.pathname.split("/").pop();

    tabs.forEach(tab => {
        const tabPage = tab.getAttribute("href");

        if(tabPage === currentPage){
            tab.classList.add("active");
        }
    });

});