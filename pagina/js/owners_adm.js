/* ---------PROVA---------- */


// Espera a página carregar completamente antes de rodar o código
document.addEventListener("DOMContentLoaded", () => {

    // Verifica se existe usuário logado
    // verificaSessao();

    // Garante que existe a lista de donos no localStorage
    verificaDonos();

    // Carrega os donos na tela
    carregaDonos();

    // Pega dados da URL 
    const parametros = new URLSearchParams(window.location.search);
    const acao = parametros.get("acao"); // tipo da ação
    const id = parametros.get("id"); // índice do dono

    // Pega a URL limpa  (sem parâmetros)
    const url = window.location.origin + window.location.pathname;

    // Se existir alguma ação ele executa automaticamente (editar ou excluir)
    if (acao !== null && id !== null) {
        executaAcao(acao, id, url);
    }

    // Quando clicar no botão de adicionar dono ele adiciona um novo dono com os dados do formulário
    document.getElementById("btnAdicionarDono").addEventListener("click", () => {

        // Pega os valores dos inputs   passo 2
        const razao = document.getElementById("razao").value;
        const cnpj = document.getElementById("cnpj").value;
        const email = document.getElementById("emailDono").value;
        const status = document.getElementById("status_dono").value;


        // Validação simples , verifica se os campos estão preenchidos  passo 3
        if (razao === "" || cnpj === "" || email === "") {
            document.getElementById("msgFormDono").textContent = "Preencha todos os campos.";
            return;
        }

        // Limpa mensagem de erro
        document.getElementById("msgFormDono").textContent = "";

        // Cria objeto dono  passo 4
        const dono = {
            razao: razao,
            cnpj: cnpj,
            email: email,
            status: status

        };

        // Pega lista de donos do localStorage
        let donos = JSON.parse(localStorage.getItem("donos"));

        // Adiciona novo dono
        donos.push(dono);

        // Salva novamente no localStorage
        localStorage.setItem("donos", JSON.stringify(donos));

        // Recarrega a página
        window.location.reload();
    });
});


//  Verifica se o usuário está logado
function verificaSessao() {
    const usuario = localStorage.getItem("usuarioLogado");

    // Se não tiver login, volta para index
    if (usuario == null) {
        window.location.href = "index.html";
    }
}


// Checa se a lista de donos existe no localStorage, se não existir cria uma lista vazia para evitar erros
function verificaDonos() {
    if (localStorage.getItem("donos") == null) {
        // Se não existir, cria uma lista vazia
        localStorage.setItem("donos", JSON.stringify([]));
    }
}


// Carrega os donos e mostra na tela
function carregaDonos() {
    const donos = JSON.parse(localStorage.getItem("donos"));

    // Se não tiver nenhum dono mostra mensagem
    if (donos.length === 0) {
        document.getElementById("listaDonos").innerHTML =
            `<div class="text-center text-muted py-4">
                <p>Nenhum dono cadastrado ainda.</p>
             </div>`;
        return;
    }

    // Começo da tabela        passo 5
    let tabela = `
    <div class="table-responsive">
    <table class="table">
        <thead>
            <tr>
                <th>Razão Social</th>
                <th>CNPJ</th>
                <th>Email</th>
                <th>Status</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>`;

    // Loop que percorre todos os donos      passo 6
    donos.forEach((dono, index) => {

        tabela += `
        <tr>
            <td>${dono.razao}</td>
            <td>${dono.cnpj}</td>
            <td>${dono.email}</td>
            <td>${badgeStatus(dono.status)}</td>
            <td>
                <!-- Botão editar -->
                <a href='?id=${index}&acao=alterar'>Editar</a>

                <!-- Botão excluir -->
                <a href='?id=${index}&acao=excluir'>Excluir</a>
            </td>
        </tr>`;
    });

    // Final da tabela
    tabela += `</tbody></table></div>`;

    // Joga tudo dentro da div no html
    document.getElementById("listaDonos").innerHTML = tabela;
}


//  Executa as ações (editar ou excluir)
function executaAcao(acao, indice, url) {

    let donos = JSON.parse(localStorage.getItem("donos"));

    //  EXCLUIR
    if (acao === "excluir") {

        donos.splice(indice, 1); // remove o item

        alert("Dono excluído!");

        localStorage.setItem("donos", JSON.stringify(donos));

        window.location.href = url; // recarrega página


        //  EDITAR
    } else if (acao === "alterar") {

        const dono = donos[indice];

        // Pega os dados que já existem e coloca nos inputs       passo 7
        document.getElementById("razao").value = dono.razao;
        document.getElementById("cnpj").value = dono.cnpj;
        document.getElementById("emailDono").value = dono.email;
        document.getElementById("status_dono").value = dono.status;

        // Esconde botão de adicionar para evitar confusão, já que agora é para editar e não adicionar
        document.getElementById("btnAdicionarDono").style.display = "none";

        // Cria botão salvar
        let btnSalvar = document.createElement("button");
        btnSalvar.textContent = "Salvar";
        btnSalvar.className = "btn-custom";

        document.getElementById("formDono").appendChild(btnSalvar);

        // Quando clicar em salvar atualiza os dados do dono e salva no localStorage      passo 8
        btnSalvar.addEventListener("click", () => {

            // Atualiza os dados
            donos[indice].razao = document.getElementById("razao").value;
            donos[indice].cnpj = document.getElementById("cnpj").value;
            donos[indice].email = document.getElementById("emailDono").value;
            donos[indice].status = document.getElementById("status_dono").value;

            // Salva denovo
            localStorage.setItem("donos", JSON.stringify(donos));

            window.location.href = url;
        });
    }
}


//  Mostra o status bonitinho
function badgeStatus(status) {

    let labels = {
        ativo: "Ativo",
        inativo: "Inativo"
    };

    return `<span>${labels[status] || status}</span>`;
}


// Remove login 
function sair() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "index.html";
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

        if (tabPage === currentPage) {
            tab.classList.add("active");
        }

    });

});