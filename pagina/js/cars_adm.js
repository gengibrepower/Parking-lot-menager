/* ---------PROVA---------- */
document.addEventListener("DOMContentLoaded", () => {
    verificaCarros();
    carregaProprietarios();
    carregaRegistrosCarros();
 
    // Verificar se há informações vindas por GET
    const parametros = new URLSearchParams(window.location.search);
    const acao = parametros.get("acao");
    const id = parametros.get("id");
 
    // URL limpa da página
    const url = window.location.origin + window.location.pathname;
 
    // Só executa a ação se tiver as duas informações
    if (acao !== null && id !== null) {
        executaAcaoCarro(acao, id, url);
    }
 
    // 1 - Evento para adicionar carro
    document.getElementById("btnAdicionarCarro").addEventListener("click", () => {
        const placa = document.getElementById("placa").value.trim();
        const proprietario = document.getElementById("proprietario").value;
        const marca = document.getElementById("marca").value.trim();
        const cor = document.getElementById("cor").value.trim();
 
        if (placa === "" || proprietario === "" || marca === "" || cor === "") {
            document.getElementById("msgFormCarro").textContent = "Preencha placa, proprietário, marca e cor.";
            return;
        }
 
        document.getElementById("msgFormCarro").textContent = "";
 
        // Verifica se a placa já está cadastrada
        const carros = JSON.parse(localStorage.getItem("carros"));
        const placaExiste = carros.some(c => c.placa === placa);
 
        if (placaExiste) {
            document.getElementById("msgFormCarro").textContent = "Esta placa já está cadastrada.";
            return;
        }
 
        const obj = {
            placa: placa,
            proprietario: proprietario,
            marca: marca,
            cor: cor

        };
 
        carros.push(obj);
        localStorage.setItem("carros", JSON.stringify(carros));
        window.location.reload();
    });
});
 
// Verifica se o admin está logado
function verificaSessaoAdmin() {
    const admin = localStorage.getItem("adminLogado");
    if (admin === null) {
        window.location.href = "index.html";
        return;
    }
}
 
// Garante que a lista de carros existe no localStorage
function verificaCarros() {
    const carros = localStorage.getItem("carros");
    if (carros === null) {
        localStorage.setItem("carros", JSON.stringify([]));
    }
}
 
// Carrega os usuários no <select> de proprietário
function carregaProprietarios() {
    const usuarios = JSON.parse(localStorage.getItem("clientes")) || [];
    const select = document.getElementById("proprietario");
 
    select.innerHTML = `<option value="">Selecione um proprietário</option>`;
 
    usuarios.forEach(usuario => {
        const option = document.createElement("option");
        option.value = usuario.email;
        option.textContent = `${usuario.nome} (${usuario.email})`;
        select.appendChild(option);
    });
}
 
// Carrega e exibe a tabela de carros
function carregaRegistrosCarros() {
    const carros = JSON.parse(localStorage.getItem("carros"));
 
    if (carros.length === 0) {
        document.getElementById("listaCarros").innerHTML =
            `<div class="text-center text-muted py-4">
                <i class="fa-solid fa-car fa-2x mb-2"></i>
                <p>Nenhum carro cadastrado ainda.</p>
             </div>`;
        return;
    }
 
    const tabelaP1 = `<div class="table-responsive">
                      <table class="table table-hover align-middle">
                      <thead>
                          <tr>
                              <th><i class="fa-solid fa-hashtag me-1"></i> Placa</th>
                              <th>Marca</th>
                              <th>Cor</th>
                              <th>Proprietário</th>
                              <th>Ações</th>
                          </tr>
                      </thead>
                      <tbody>`;
 
    const tabelaP2 = `</tbody>
                      </table>
                      </div>`;
 
    const linhas = carros.map((item, index) => {
        return `<tr>
                    <td><strong>${item.placa}</strong></td>
                    <td>${item.marca}</td>
                    <td>${item.cor}</td>
                    <td>${item.proprietario}</td>
                    <td>
                        <a href='cars_adm.html?id=${index}&acao=alterar' class="btn btn-outline-primary btn-sm me-1">
                            <i class="fa-solid fa-pen"></i> Editar
                        </a>
                        <a href='cars_adm.html?id=${index}&acao=excluir' class="btn btn-outline-danger btn-sm">
                            <i class="fa-solid fa-trash"></i> Excluir
                        </a>
                    </td>
                </tr>`;
    });
 
    const tabelaFinal = tabelaP1 + linhas.join("") + tabelaP2;
    document.getElementById("listaCarros").innerHTML = tabelaFinal;
 
    // Atualiza o contador da aba (se existir)
    const contador = document.querySelector(".tab-count");
    if (contador) {
        contador.textContent = carros.length;
    }
}
 
// Executa ação de excluir ou alterar com base nos parâmetros GET
function executaAcaoCarro(acao, indice, url) {
    const carros = JSON.parse(localStorage.getItem("carros"));
 
    if (acao === "excluir") {
        carros.splice(indice, 1);
        alert("Carro excluído com sucesso!");
        localStorage.setItem("carros", JSON.stringify(carros));
        window.location.href = url;
 
    } else if (acao === "alterar") {
        // Preenche o formulário com os dados do carro selecionado
        const obj = carros[indice];
        document.getElementById("placa").value = obj.placa;
        document.getElementById("marca").value = obj.marca;
        document.getElementById("cor").value = obj.cor;
 
        // Aguarda o select ser populado para depois setar o valor
        carregaProprietarios();
        document.getElementById("proprietario").value = obj.proprietario;
 
        // Desativa o botão de adicionar e exibe o botão salvar
        document.getElementById("btnAdicionarCarro").disabled = true;
 
        // Cria o botão Salvar dinamicamente (igual ao padrão do petshop)
        let btnSalvar = document.getElementById("btnSalvarCarro");
        if (!btnSalvar) {
            btnSalvar = document.createElement("button");
            btnSalvar.type = "button";
            btnSalvar.id = "btnSalvarCarro";
            btnSalvar.className = "btn-custom mt-2";
            btnSalvar.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Salvar Alterações`;
            document.getElementById("btnAdicionarCarro").insertAdjacentElement("afterend", btnSalvar);
        }
 
        // Escuta o botão Salvar
        btnSalvar.addEventListener("click", () => {
            carros[indice].placa = document.getElementById("placa").value.trim();
            carros[indice].proprietario = document.getElementById("proprietario").value;
            carros[indice].marca = document.getElementById("marca").value.trim();
            carros[indice].cor = document.getElementById("cor").value.trim();
            localStorage.setItem("carros", JSON.stringify(carros));
            window.location.href = url;
        });
 
    } else {
        console.log("Algo deu muito errado");
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
