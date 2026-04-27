/* ---------PROVA---------- */

document.addEventListener('DOMContentLoaded', () => {
    verificarLista(); // verifica se a lista existe
    /*
    Dicas para prova
    -Pegar o Id do html e trazer ele para dentro do evento adcionar vaga, usando document.getElementById
    -Não esquecer de colocar o .value no final da "const" nova para pegar os valores dos inputs
    */ 
    document.getElementById('btnAdicionarVaga').addEventListener('click', () => {

        // colocar a nova "const" aqui V
        const nomeEstacionamento = document.getElementById('vagaEstacionamento').value
        const idCarro = document.getElementById('vagaCarro').value
        const vagaSensor = document.getElementById('vagaSensor').value
        const vagaNumero = document.getElementById('vagaNumero').value
       
        
        // Usa parse para pegar a lista do localStorage para que seja um array e não string, se não tiver nada no localstorage, ele cria um array vazio
        let listaInformacoesVagas = JSON.parse(localStorage.getItem('vagas')) || []

        // Colocar o obj com as novas informações aqui V
        let objVagas = {
            nomeEstacionamento,
            idCarro,
            vagaSensor,
            vagaNumero
        }

        adicionarHTML(nomeEstacionamento,idCarro,vagaSensor,vagaNumero)

        // Adiciona o obj na lista e salva no localstorage
        listaInformacoesVagas.push(objVagas)
        localStorage.setItem('vagas', JSON.stringify(listaInformacoesVagas))

        
    })
 

})
// Verifica se a lista existe no localStorage, se não existir, cria uma lista vazia
function verificarLista() {
    const lista = localStorage.getItem('vagas')
    if (lista == null) {
        localStorage.setItem('vagas', JSON.stringify([]))
    }
}
// Função para adicionar a vaga na tela, recebe os parâmetros do objVagas
function adicionarHTML(nomeEstacionamento, idCarro, vagaSensor, vagaNumero) {
    const lista = document.getElementById('listaVagas');
    let item =` 
        <li id="vagas-${vagaNumero}">
            ${nomeEstacionamento} | Carro: ${idCarro} | Sensor: ${vagaSensor} | Número: ${vagaNumero} 
            <button onclick="excluirVaga('${vagaNumero}')">Excluir</button>
            <button onclick="alterarVagas('${vagaNumero}')">Alterar</button>
        </li>`;
    lista.innerHTML += item;
}
// Função para excluir a vaga, recebe o número da vaga como parâmetro
function excluirVaga(vagaNumero) {
    if (!confirm(`Deseja excluir a vaga com Número ${vagaNumero}?`)) return;


    let lista = JSON.parse(localStorage.getItem('vagas')) || [];
    lista = lista.filter(vagas => vagas.vagaNumero !== vagaNumero);
    localStorage.setItem('vagas', JSON.stringify(lista));

    // Remove do HTML
    const item = document.getElementById(`vagas-${vagaNumero}`);
    if (item) item.remove();
}

// Função para alterar a vaga, recebe o número da vaga como parâmetro
function alterarVagas(vagaNumero) {
    let lista = JSON.parse(localStorage.getItem('vagas')) || [];
    let indice = lista.findIndex(u => u.vagaNumero === vagaNumero);
    if (indice === -1) return;

    let obj = lista[indice];

    // Carrega os valores nos inputs do formulário
    document.getElementById('vagaEstacionamento').value = obj.nomeEstacionamento;
    document.getElementById('vagaCarro').value = obj.idCarro;
    document.getElementById('vagaSensor').value = obj.vagaSensor;
    document.getElementById('vagaNumero').value = obj.vagaNumero;

    // Desabilita o botão adicionar e mostra o salvar
    document.getElementById('btnAdicionarVaga').disabled = true;
    document.getElementById('btnSalvar').style.display = 'inline-block';

    // Escuta o botão salvar
    document.getElementById('btnSalvar').onclick = () => {
        lista[indice].nomeEstacionamento   = document.getElementById('vagaEstacionamento').value;
        lista[indice].idCarro  = document.getElementById('vagaCarro').value;
        lista[indice].vagaSensor  = document.getElementById('vagaSensor').value;
        lista[indice].vagaNumero = document.getElementById('vagaNumero').value;

        localStorage.setItem('vagas', JSON.stringify(lista));

        // Atualiza o item na tela
        const item = document.getElementById(`vagas-${vagaNumero}`);
        if (item) {
            item.innerHTML = `
                Estacionamento: ${lista[indice].nomeEstacionamento} | IdCarro: ${lista[indice].idCarro} | Sensor: ${lista[indice].vagaSensor} | Vaga : ${lista[indice].vagaNumero}
                <button onclick="excluirVaga('${vagaNumero}')" class="btn-excluir">Excluir</button>
                <button onclick="alterarVagas('${vagaNumero}')" class="btn-alterar">Alterar</button>`;
        }

        // Reseta o formulário
        document.getElementById('vagaEstacionamento').value = "";
        document.getElementById('vagaCarro').value = "";
        document.getElementById('vagaSensor').value = "";
        document.getElementById('vagaNumero').value = "";

        // Reseta os botões
        document.getElementById('btnSalvar').style.display = 'none';
        document.getElementById('btnAdicionarVaga').disabled = false;
    }
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

