/* ---------PROVA---------- */

document.addEventListener('DOMContentLoaded', () => {
    verificaEstacionamentos();
    carregaRegistros();

    var parametros = new URLSearchParams(window.location.search);
    var acao = parametros.get('acao');
    var id = parametros.get('id');

    var url = window.location.origin + window.location.pathname;

    if (acao !== null && id !== null) {
        executaAcao(acao, id, url);
    }

    document.getElementById('btnAdicionar').addEventListener('click', () => {
        var donoEstacionamento = document.getElementById('donoEstacionamento').value;
        var nomeEstacionamento = document.getElementById('nomeEstacionamento').value;
        var quantidadeDeVagas = document.getElementById('quantidadeDeVagas').value;
        var nomeDosBlockos = document.getElementById('nomeDosBlockos').value;
        var cepEstacionamento = document.getElementById('cepEstacionamento').value;
        var numeroEstacionamento = document.getElementById('numeroEstacionamento').value;
        var logradouroEstacionamento = document.getElementById('logradouroEstacionamento').value;
        var bairroEstacionamento = document.getElementById('bairroEstacionamento').value;
        var complementoEstacionamento = document.getElementById('complementoEstacionamento').value;
        var cidadeEstacionamento = document.getElementById('cidadeEstacionamento').value;
        var estadoEstacionamento = document.getElementById('estadoEstacionamento').value;
        // NOVO CAMPO SE TIVER

        if (donoEstacionamento == '' || nomeEstacionamento == '') {
            document.getElementById('msgForm').textContent = 'Preencha o dono e o nome do estacionamento.';
            return;
        }

        document.getElementById('msgForm').textContent = '';

        var obj = {
            donoEstacionamento,
            nomeEstacionamento,
            quantidadeDeVagas,
            nomeDosBlockos,
            cepEstacionamento,
            numeroEstacionamento,
            logradouroEstacionamento,
            bairroEstacionamento,
            complementoEstacionamento,
            cidadeEstacionamento,
            estadoEstacionamento
            // NOVO CAMPO SE TIVER
        };

        var estacionamentos = JSON.parse(localStorage.getItem('estacionamentos'));
        estacionamentos.push(obj);
        localStorage.setItem('estacionamentos', JSON.stringify(estacionamentos));
        window.location.reload();
    });
});

function verificaEstacionamentos() {
    var estacionamentos = localStorage.getItem('estacionamentos');
    if (estacionamentos == null) {
        localStorage.setItem('estacionamentos', JSON.stringify([]));
    }
}

function carregaRegistros() {
    var estacionamentos = JSON.parse(localStorage.getItem('estacionamentos'));

    document.getElementById('contadorEstacionamentos').textContent = estacionamentos.length + ' registro' + (estacionamentos.length !== 1 ? 's' : '');

    if (estacionamentos.length == 0) {
        document.getElementById('listaEstacionamentos').innerHTML =
            '<div class="empty">🅿<br>Nenhum estacionamento cadastrado ainda.</div>';
        return;
    }

    var tabelaP1 = '';
    var tabelaP2 = '';
    var tabelaMeio = '';

    for (var i = 0; i < estacionamentos.length; i++) {
        var e = estacionamentos[i];
        tabelaMeio += `
        <div class="item">
        <div class="item-top">
            <div class="titulo-adm-estacionamento">
                <div class="item-name"><h3>${e.nomeEstacionamento}</h3></div>
                <div class="item-cnpj"><h3>CNPJ Dono: ${e.donoEstacionamento}</h3></div>
            </div>
            <div class="item-actions">
                <a href="?id=${i}&acao=alterar" class="item-btn-edit">✏ Editar</a>
                <a href="?id=${i}&acao=excluir" class="item-btn-del">✕ Excluir</a>
            </div>
        </div>
        <div class="tags">
            <div class="tag">Vagas: <span>${e.quantidadeDeVagas || '—'}</span></div>
            <div class="tag">Blocos: <span>${e.nomeDosBlockos || '—'}</span></div>
            <div class="tag">CEP: <span>${e.cepEstacionamento || '—'}</span></div>
            <div class="tag">${e.logradouroEstacionamento || 'S/ logradouro'}, ${e.numeroEstacionamento || 'S/N'}</div>
            <div class="tag">${e.bairroEstacionamento || '—'} — ${e.cidadeEstacionamento}/${e.estadoEstacionamento}</div>
            ${e.complementoEstacionamento ? `<div class="tag">Compl: <span>${e.complementoEstacionamento}</span></div>` : ''}
            <!-- NOVO CAMPO SE TIVER -->
        </div>
        </div>`;
    }

    var tabelaFinal = tabelaP1 + tabelaMeio + tabelaP2;
    document.getElementById('listaEstacionamentos').innerHTML = tabelaFinal;
}

function executaAcao(acao, indice, url) {
    var estacionamentos = JSON.parse(localStorage.getItem('estacionamentos'));

    if (acao == 'excluir') {
        estacionamentos.splice(indice, 1);
        alert('Estacionamento excluído com sucesso!');
        localStorage.setItem('estacionamentos', JSON.stringify(estacionamentos));
        window.location.href = url;

    } else if (acao == 'alterar') {
        var obj = estacionamentos[indice];
        document.getElementById('donoEstacionamento').value           = obj.donoEstacionamento;
        document.getElementById('nomeEstacionamento').value           = obj.nomeEstacionamento;
        document.getElementById('quantidadeDeVagas').value            = obj.quantidadeDeVagas;
        document.getElementById('nomeDosBlockos').value               = obj.nomeDosBlockos;
        document.getElementById('cepEstacionamento').value            = obj.cepEstacionamento;
        document.getElementById('numeroEstacionamento').value         = obj.numeroEstacionamento;
        document.getElementById('logradouroEstacionamento').value     = obj.logradouroEstacionamento;
        document.getElementById('bairroEstacionamento').value         = obj.bairroEstacionamento;
        document.getElementById('complementoEstacionamento').value    = obj.complementoEstacionamento;
        document.getElementById('cidadeEstacionamento').value         = obj.cidadeEstacionamento;
        document.getElementById('estadoEstacionamento').value         = obj.estadoEstacionamento;
        // NOVO CAMPO SE TIVER

        document.getElementById('btnAdicionar').disabled = true;
        document.getElementById('btnSalvar').style.display = 'block';

        document.getElementById('btnSalvar').addEventListener('click', () => {
            estacionamentos[indice].donoEstacionamento           = document.getElementById('donoEstacionamento').value;
            estacionamentos[indice].nomeEstacionamento           = document.getElementById('nomeEstacionamento').value;
            estacionamentos[indice].quantidadeDeVagas            = document.getElementById('quantidadeDeVagas').value;
            estacionamentos[indice].nomeDosBlockos               = document.getElementById('nomeDosBlockos').value;
            estacionamentos[indice].cepEstacionamento            = document.getElementById('cepEstacionamento').value;
            estacionamentos[indice].numeroEstacionamento         = document.getElementById('numeroEstacionamento').value;
            estacionamentos[indice].logradouroEstacionamento     = document.getElementById('logradouroEstacionamento').value;
            estacionamentos[indice].bairroEstacionamento         = document.getElementById('bairroEstacionamento').value;
            estacionamentos[indice].complementoEstacionamento    = document.getElementById('complementoEstacionamento').value;
            estacionamentos[indice].cidadeEstacionamento         = document.getElementById('cidadeEstacionamento').value;
            estacionamentos[indice].estadoEstacionamento         = document.getElementById('estadoEstacionamento').value;
            // NOVO CAMPO SE TIVER
            localStorage.setItem('estacionamentos', JSON.stringify(estacionamentos));
            window.location.href = url;
        });

    } else {
        console.log('Algo deu muito errado');
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