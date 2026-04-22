document.addEventListener("DOMContentLoaded", () => {
    // Inicialização
    verificaClientes();
    verificaCarros();
    verificaDonos();
    verificaEstacionamentos();
    verificaVagas();
    carregaRegistros();
    carregaRegistrosCarros();
    carregaRegistrosDonos();
    carregaRegistrosEstacionamentos();
    carregaRegistrosVagas();
    popularSelectClientes();
    popularSelectDonos();
    popularSelectEstacionamentos();
    popularSelectCarrosParaVaga();

    // Lógica para navegação das Abas (Tabs)
    const tabs = document.querySelectorAll('.admin-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active de todas as abas e conteúdos
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Adiciona active no botão clicado e na aba alvo
            tab.classList.add('active');
            const target = tab.getAttribute('data-tab');
            document.getElementById('aba-' + target).classList.add('active');
        });
    });

    const parametros = new URLSearchParams(window.location.search);
    const acao = parametros.get("acao");
    const id = parametros.get("id");
    const tipo = parametros.get("tipo"); // serve para sabermos se editamos cliente ou carro
    const url = window.location.origin + window.location.pathname;

    if(acao !== null && id !== null){
        executaAcao(acao, id, tipo, url);
    }

    // ==========================================
    // LÓGICA DE USUÁRIOS
    // ==========================================
    document.getElementById("btnAdicionar").addEventListener("click", () => {
        var nome = document.getElementById("nome").value;
        var email = document.getElementById("email").value;
        var senha = document.getElementById("senha").value;
        var status = document.getElementById("status_usuario").value;

        if(nome == "" || email == "" || senha == ""){
            document.getElementById("msgForm").textContent = "Preencha todos os campos corretamente.";
            return;
        }

        document.getElementById("msgForm").textContent = "";

        var obj = {
            nome: nome,
            email: email,
            senha: senha,
            status: status
        };

        var clientes = JSON.parse(localStorage.getItem("clientes"));
        var idAtual = document.getElementById("idAtual").value;
        
        if(idAtual !== "") {
            clientes[idAtual] = obj;
        } else {
            clientes.push(obj);
        }
        
        localStorage.setItem("clientes", JSON.stringify(clientes));
        window.location.href = url; // Recarrega
    });

    // ==========================================
    // LÓGICA DE CARROS
    // ==========================================
    document.getElementById("btnAdicionarCarro").addEventListener("click", () => {
        var placa = document.getElementById("placa").value;
        var proprietarioIndex = document.getElementById("proprietario").value;
        var marca = document.getElementById("marca").value;

        if(placa == "" || proprietarioIndex == "" || marca == ""){
            document.getElementById("msgFormCarro").textContent = "Preencha placa, proprietário e marca.";
            return;
        }

        document.getElementById("msgFormCarro").textContent = "";

        // Pegamos os detalhes do proprietário a partir do index
        var clientes = JSON.parse(localStorage.getItem("clientes"));
        var nomeProprietario = clientes[proprietarioIndex].nome;
        var emailProprietario = clientes[proprietarioIndex].email;

        var objCarro = {
            placa: placa,
            idProprietario: proprietarioIndex,
            nomeProprietario: nomeProprietario,
            emailProprietario: emailProprietario,
            marca: marca,
            status: "ativo"
        };

        var carros = JSON.parse(localStorage.getItem("carros"));
        var idAtualCarro = document.getElementById("idAtualCarro").value;
        
        if(idAtualCarro !== "") {
            carros[idAtualCarro] = objCarro;
            // Volta para a aba de carros pra não perder contexto visual
            window.location.href = url + "?tab=carros";
        } else {
            carros.push(objCarro);
            window.location.href = url + "?tab=carros";
        }
        
        localStorage.setItem("carros", JSON.stringify(carros));
    });

    // ==========================================
    // LÓGICA DE DONOS DE ESTACIONAMENTO
    // ==========================================
    document.getElementById("btnAdicionarDono").addEventListener("click", () => {
        var razao = document.getElementById("razao").value;
        var cnpj = document.getElementById("cnpj").value;
        var emailDono = document.getElementById("emailDono").value;
        var status_dono = document.getElementById("status_dono").value;

        if(razao == "" || cnpj == "" || emailDono == ""){
            document.getElementById("msgFormDono").textContent = "Preencha todos os campos corretamente.";
            return;
        }

        document.getElementById("msgFormDono").textContent = "";

        var objDono = {
            razao: razao,
            cnpj: cnpj,
            email: emailDono,
            status: status_dono
        };

        var donos = JSON.parse(localStorage.getItem("donos"));
        var idAtualDono = document.getElementById("idAtualDono").value;
        
        if(idAtualDono !== "") {
            donos[idAtualDono] = objDono;
            window.location.href = url + "?tab=donos";
        } else {
            donos.push(objDono);
            window.location.href = url + "?tab=donos";
        }
        
        localStorage.setItem("donos", JSON.stringify(donos));
    });

    // ==========================================
    // LÓGICA DE ESTACIONAMENTOS
    // ==========================================
    document.getElementById("btnAdicionarEstacionamento").addEventListener("click", () => {
        var donoIndex = document.getElementById("donoEstacionamento").value;
        var nomeEstacionamento = document.getElementById("nomeEstacionamento").value;
        var areaEstacionamento = document.getElementById("areaEstacionamento").value;

        if(donoIndex == "" || nomeEstacionamento == "" || areaEstacionamento == ""){
            document.getElementById("msgFormEstacionamento").textContent = "Preencha todos os campos do estacionamento.";
            return;
        }

        document.getElementById("msgFormEstacionamento").textContent = "";

        // Pegamos os detalhes do dono B2B a partir do index
        var donos = JSON.parse(localStorage.getItem("donos"));
        var razaoDono = donos[donoIndex].razao;

        var objEstac = {
            idDono: donoIndex,
            razaoDono: razaoDono,
            nome: nomeEstacionamento,
            area: areaEstacionamento
        };

        var estacs = JSON.parse(localStorage.getItem("estacionamentos"));
        var idAtualEstac = document.getElementById("idAtualEstacionamento").value;
        
        if(idAtualEstac !== "") {
            estacs[idAtualEstac] = objEstac;
            window.location.href = url + "?tab=estacionamentos";
        } else {
            estacs.push(objEstac);
            window.location.href = url + "?tab=estacionamentos";
        }
        
        localStorage.setItem("estacionamentos", JSON.stringify(estacs));
    });

    // ==========================================
    // LÓGICA DE VAGAS
    // ==========================================
    document.getElementById("btnAdicionarVaga").addEventListener("click", () => {
        var estacIndex = document.getElementById("vagaEstacionamento").value;
        var carroIndex = document.getElementById("vagaCarro").value;
        var entrada = document.getElementById("vagaEntrada").value;
        var saida = document.getElementById("vagaSaida").value;
        var sensor = document.getElementById("vagaSensor").value;
        var numero = document.getElementById("vagaNumero").value;

        if(estacIndex == "" || carroIndex == "" || entrada == "" || sensor == "" || numero == ""){
            document.getElementById("msgFormVaga").textContent = "Preencha todos os campos obrigatórios.";
            return;
        }

        document.getElementById("msgFormVaga").textContent = "";

        // Pegamos detalhes
        var estacs = JSON.parse(localStorage.getItem("estacionamentos"));
        var nomeEstacionamento = estacs[estacIndex].nome;

        var carros = JSON.parse(localStorage.getItem("carros"));
        var placaCarro = carros[carroIndex].placa;

        var objVaga = {
            idEstacionamento: estacIndex,
            nomeEstacionamento: nomeEstacionamento,
            idCarro: carroIndex,
            placaCarro: placaCarro,
            entrada: entrada,
            saida: saida,
            sensor: sensor,
            numero: numero
        };

        var vagas = JSON.parse(localStorage.getItem("vagas"));
        var idAtualVaga = document.getElementById("idAtualVaga").value;
        
        if(idAtualVaga !== "") {
            vagas[idAtualVaga] = objVaga;
            window.location.href = url + "?tab=vagas";
        } else {
            vagas.push(objVaga);
            window.location.href = url + "?tab=vagas";
        }
        
        localStorage.setItem("vagas", JSON.stringify(vagas));
    });

    // Se estivermos recarregando com aba especifica
    if (parametros.get("tab") === "carros" || tipo === "carro") {
        document.querySelector('[data-tab="carros"]').click();
    } else if (parametros.get("tab") === "donos" || tipo === "dono") {
        document.querySelector('[data-tab="donos"]').click();
    } else if (parametros.get("tab") === "estacionamentos" || tipo === "estacionamento") {
        document.querySelector('[data-tab="estacionamentos"]').click();
    } else if (parametros.get("tab") === "vagas" || tipo === "vaga") {
        document.querySelector('[data-tab="vagas"]').click();
    }
});

function verificaClientes(){
    var clientes = localStorage.getItem("clientes");
    if(clientes == null){
        localStorage.setItem("clientes", JSON.stringify([]));
    }
}

function verificaCarros(){
    var carros = localStorage.getItem("carros");
    if(carros == null){
        localStorage.setItem("carros", JSON.stringify([]));
    }
}

function verificaDonos(){
    var donos = localStorage.getItem("donos");
    if(donos == null){
        localStorage.setItem("donos", JSON.stringify([]));
    }
}

function verificaEstacionamentos(){
    var estacs = localStorage.getItem("estacionamentos");
    if(estacs == null){
        localStorage.setItem("estacionamentos", JSON.stringify([]));
    }
}

function verificaVagas(){
    var vagas = localStorage.getItem("vagas");
    if(vagas == null){
        localStorage.setItem("vagas", JSON.stringify([]));
    }
}

function popularSelectClientes(){
    var clientes = JSON.parse(localStorage.getItem("clientes"));
    var select = document.getElementById("proprietario");
    
    if(!clientes || clientes.length == 0){
        select.innerHTML = '<option value="">Nenhum usuário cadastrado</option>';
        return;
    }

    let options = '<option value="" disabled selected>Selecione um Proprietário...</option>';
    clientes.forEach((cliente, index) => {
        options += `<option value="${index}">${cliente.nome} (${cliente.email})</option>`;
    });

    select.innerHTML = options;
}

function popularSelectDonos(){
    var donos = JSON.parse(localStorage.getItem("donos"));
    var select = document.getElementById("donoEstacionamento");
    
    if(!donos || donos.length == 0){
        select.innerHTML = '<option value="">Nenhum dono cadastrado</option>';
        return;
    }

    let options = '<option value="" disabled selected>Selecione um Dono...</option>';
    donos.forEach((dono, index) => {
        options += `<option value="${index}">${dono.razao} (${dono.cnpj})</option>`;
    });

    select.innerHTML = options;
}

function popularSelectEstacionamentos(){
    var estacs = JSON.parse(localStorage.getItem("estacionamentos"));
    var select = document.getElementById("vagaEstacionamento");
    
    if(!estacs || estacs.length == 0){
        select.innerHTML = '<option value="">Nenhum estacionamento cadastrado</option>';
        return;
    }

    let options = '<option value="" disabled selected>Selecione um Estacionamento...</option>';
    estacs.forEach((estac, index) => {
        options += `<option value="${index}">${estac.nome}</option>`;
    });

    select.innerHTML = options;
}

function popularSelectCarrosParaVaga(){
    var carros = JSON.parse(localStorage.getItem("carros"));
    var select = document.getElementById("vagaCarro");
    
    if(!carros || carros.length == 0){
        select.innerHTML = '<option value="">Nenhum carro cadastrado</option>';
        return;
    }

    let options = '<option value="" disabled selected>Selecione um Carro...</option>';
    carros.forEach((carro, index) => {
        options += `<option value="${index}">${carro.placa}</option>`;
    });

    select.innerHTML = options;
}

function carregaRegistros(){
    var clientes = JSON.parse(localStorage.getItem("clientes"));

    if(!clientes || clientes.length == 0){
        document.getElementById("listaClientes").innerHTML =
            `<div class="text-center text-muted py-5" style="color: rgba(255,255,255,0.3) !important;">
                <i class="fa-solid fa-users-slash fa-3x mb-3" style="opacity: 0.2;"></i>
                <p style="font-family: 'Markl', monospace; letter-spacing: 1px;">Nenhum usuário cadastrado no momento.</p>
             </div>`;
        return;
    }

    var tabelaP1 = `<div class="table-container mt-2">
                    <table class="table">
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>E-mail</th>
                            <th>Senha</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>`;

    var tabelaP2 = `</tbody>
                    </table>
                    </div>`;

    var tabelaMeio = "";
    clientes.forEach((item, index) => {
        let iniciais = item.nome.substring(0, 2).toUpperCase();
        
        let statusBadge = item.status === "inativo" 
            ? `<span class="status-badge" style="background: rgba(220, 53, 69, 0.1); color: #dc3545; border-color: rgba(220, 53, 69, 0.2);"><span style="width:6px; height:6px; border-radius:50%; background:#dc3545; box-shadow:0 0 8px #dc3545;"></span> Inativo</span>`
            : `<span class="status-badge">Ativo</span>`;

        tabelaMeio += `<tr>
                            <td>
                                <div class="client-name-cell">
                                    <div class="avatar-initial">${iniciais}</div>
                                    <div class="client-info">
                                        <strong>${item.nome}</strong>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="client-email">${item.email}</div>
                            </td>
                            <td>
                                <div class="password-cell" style="font-size: 0.85rem;">••••${item.senha.substr(item.senha.length - 2)}</div>
                            </td>
                            <td>
                                ${statusBadge}
                            </td>
                            <td>
                                <div class="actions-cell">
                                    <a href='admin.html?id=${index}&tipo=usuario&acao=alterar' class="btn-action edit" title="Editar Cliente">
                                        <i class="fa-solid fa-pen"></i>
                                    </a>
                                    <a href='admin.html?id=${index}&tipo=usuario&acao=excluir' class="btn-action delete" title="Excluir Cliente">
                                        <i class="fa-solid fa-trash"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>`;
    });

    var tabelaFinal = tabelaP1 + tabelaMeio + tabelaP2;
    document.getElementById("listaClientes").innerHTML = tabelaFinal;
}

function carregaRegistrosCarros(){
    var carros = JSON.parse(localStorage.getItem("carros"));

    if(!carros || carros.length == 0){
        document.getElementById("listaCarros").innerHTML =
            `<div class="text-center text-muted py-5" style="color: rgba(255,255,255,0.3) !important;">
                <i class="fa-solid fa-car-burst fa-3x mb-3" style="opacity: 0.2;"></i>
                <p style="font-family: 'Markl', monospace; letter-spacing: 1px;">Nenhum carro cadastrado no momento.</p>
             </div>`;
        return;
    }

    var tabelaP1 = `<div class="table-container mt-2">
                    <table class="table">
                    <thead>
                        <tr>
                            <th>Placa</th>
                            <th>Marca</th>
                            <th>Proprietário</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>`;

    var tabelaP2 = `</tbody>
                    </table>
                    </div>`;

    var tabelaMeio = "";
    carros.forEach((item, index) => {
        let iniciaisProprietario = item.nomeProprietario ? item.nomeProprietario.substring(0, 2).toUpperCase() : "--";
        
        tabelaMeio += `<tr>
                            <td>
                                <strong style="letter-spacing: 1px; color: #fff;">${item.placa}</strong>
                            </td>
                            <td>
                                <span style="color: rgba(255,255,255,0.5);">${item.marca}</span>
                            </td>
                            <td>
                                <div class="client-name-cell">
                                    <div class="avatar-initial" style="width: 36px; height: 36px; font-size: 0.85rem; margin-right: 12px; background: rgba(255,255,255,0.05); color: var(--cinza); border: 1px solid rgba(255,255,255,0.1);">${iniciaisProprietario}</div>
                                    <span style="font-size: 0.90rem;">${item.nomeProprietario}</span>
                                </div>
                            </td>
                            <td>
                                <div class="actions-cell">
                                    <a href='admin.html?id=${index}&tipo=carro&acao=alterar' class="btn-action edit" title="Editar Carro">
                                        <i class="fa-solid fa-pen"></i>
                                    </a>
                                    <a href='admin.html?id=${index}&acao=excluir&tipo=carro' class="btn-action delete" title="Excluir Carro">
                                        <i class="fa-solid fa-trash"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>`;
    });

    var tabelaFinal = tabelaP1 + tabelaMeio + tabelaP2;
    document.getElementById("listaCarros").innerHTML = tabelaFinal;
}

function carregaRegistrosDonos(){
    var donos = JSON.parse(localStorage.getItem("donos"));

    if(!donos || donos.length == 0){
        document.getElementById("listaDonos").innerHTML =
            `<div class="text-center text-muted py-5" style="color: rgba(255,255,255,0.3) !important;">
                <i class="fa-solid fa-building-circle-xmark fa-3x mb-3" style="opacity: 0.2;"></i>
                <p style="font-family: 'Markl', monospace; letter-spacing: 1px;">Nenhum dono cadastrado no momento.</p>
             </div>`;
        return;
    }

    var tabelaP1 = `<div class="table-container mt-2">
                    <table class="table">
                    <thead>
                        <tr>
                            <th>Dono Sócio</th>
                            <th>CNPJ</th>
                            <th>E-mail</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>`;

    var tabelaP2 = `</tbody>
                    </table>
                    </div>`;

    var tabelaMeio = "";
    donos.forEach((item, index) => {
        let iniciaisDono = item.razao ? item.razao.substring(0, 2).toUpperCase() : "--";
        
        let statusBadgeDono = item.status === "inativo" 
            ? `<span class="status-badge" style="background: rgba(220, 53, 69, 0.1); color: #dc3545; border-color: rgba(220, 53, 69, 0.2);"><span style="width:6px; height:6px; border-radius:50%; background:#dc3545; box-shadow:0 0 8px #dc3545;"></span> Inativo</span>`
            : `<span class="status-badge">Ativo</span>`;

        tabelaMeio += `<tr>
                            <td>
                                <div class="client-name-cell">
                                    <div class="avatar-initial" style="width: 36px; height: 36px; font-size: 0.85rem; margin-right: 12px; background: rgba(76, 175, 138, 0.15); color: #4CAF8A; border: 1px solid rgba(76, 175, 138, 0.3);">${iniciaisDono}</div>
                                    <span style="font-size: 0.90rem; font-weight: 600;">${item.razao}</span>
                                </div>
                            </td>
                            <td>
                                <strong style="letter-spacing: 1px; color: #fff;">${item.cnpj}</strong>
                            </td>
                            <td>
                                <div class="client-email">${item.email}</div>
                            </td>
                            <td>
                                ${statusBadgeDono}
                            </td>
                            <td>
                                <div class="actions-cell">
                                    <a href='admin.html?id=${index}&tipo=dono&acao=alterar' class="btn-action edit" title="Editar Dono">
                                        <i class="fa-solid fa-pen"></i>
                                    </a>
                                    <a href='admin.html?id=${index}&acao=excluir&tipo=dono' class="btn-action delete" title="Excluir Dono">
                                        <i class="fa-solid fa-trash"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>`;
    });

    var tabelaFinal = tabelaP1 + tabelaMeio + tabelaP2;
    document.getElementById("listaDonos").innerHTML = tabelaFinal;
}

function carregaRegistrosEstacionamentos(){
    var estacs = JSON.parse(localStorage.getItem("estacionamentos"));

    if(!estacs || estacs.length == 0){
        document.getElementById("listaEstacionamentos").innerHTML =
            `<div class="text-center text-muted py-5" style="color: rgba(255,255,255,0.3) !important;">
                <i class="fa-solid fa-map-location-dot fa-3x mb-3" style="opacity: 0.2;"></i>
                <p style="font-family: 'Markl', monospace; letter-spacing: 1px;">Nenhum estacionamento registrado.</p>
             </div>`;
        return;
    }

    var tabelaP1 = `<div class="table-container mt-2">
                    <table class="table">
                    <thead>
                        <tr>
                            <th>Estacionamento</th>
                            <th>Área (m²)</th>
                            <th>Dono Responsável</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>`;

    var tabelaP2 = `</tbody>
                    </table>
                    </div>`;

    var tabelaMeio = "";
    estacs.forEach((item, index) => {
        let iniciaisStac = item.nome ? item.nome.substring(0, 2).toUpperCase() : "--";
        
        tabelaMeio += `<tr>
                            <td>
                                <div class="client-name-cell">
                                    <div class="avatar-initial" style="width: 36px; height: 36px; font-size: 0.85rem; margin-right: 12px; background: rgba(230, 126, 34, 0.15); color: #e67e22; border: 1px solid rgba(230, 126, 34, 0.3);">${iniciaisStac}</div>
                                    <strong style="letter-spacing: 1px; color: #fff; font-size: 0.90rem;">${item.nome}</strong>
                                </div>
                            </td>
                            <td>
                                <span style="color: rgba(255,255,255,0.7);">${item.area} m²</span>
                            </td>
                            <td>
                                <div class="client-info">
                                    <span style="font-size: 0.90rem;">${item.razaoDono}</span>
                                </div>
                            </td>
                            <td>
                                <div class="actions-cell">
                                    <a href='admin.html?id=${index}&tipo=estacionamento&acao=alterar' class="btn-action edit" title="Editar Estacionamento">
                                        <i class="fa-solid fa-pen"></i>
                                    </a>
                                    <a href='admin.html?id=${index}&acao=excluir&tipo=estacionamento' class="btn-action delete" title="Excluir Estacionamento">
                                        <i class="fa-solid fa-trash"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>`;
    });

    var tabelaFinal = tabelaP1 + tabelaMeio + tabelaP2;
    document.getElementById("listaEstacionamentos").innerHTML = tabelaFinal;
}

function carregaRegistrosVagas(){
    var vagas = JSON.parse(localStorage.getItem("vagas"));

    if(!vagas || vagas.length == 0){
        document.getElementById("listaVagas").innerHTML =
            `<div class="text-center text-muted py-5" style="color: rgba(255,255,255,0.3) !important;">
                <i class="fa-solid fa-parking fa-3x mb-3" style="opacity: 0.2;"></i>
                <p style="font-family: 'Markl', monospace; letter-spacing: 1px;">Nenhuma vaga registrada.</p>
             </div>`;
        return;
    }

    var tabelaP1 = `<div class="table-container mt-2">
                    <table class="table">
                    <thead>
                        <tr>
                            <th>Vaga/Sensor</th>
                            <th>Carro</th>
                            <th>Tempo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>`;

    var tabelaP2 = `</tbody>
                    </table>
                    </div>`;

    var tabelaMeio = "";
    vagas.forEach((item, index) => {
        let iniciaisVaga = item.numero ? item.numero.substring(0, 2).toUpperCase() : "--";
        let tempoStr = `In: ${new Date(item.entrada).toLocaleString()}`;
        if(item.saida) tempoStr += `<br>Out: ${new Date(item.saida).toLocaleString()}`;
        
        tabelaMeio += `<tr>
                            <td>
                                <div class="client-name-cell">
                                    <div class="avatar-initial" style="width: 36px; height: 36px; font-size: 0.85rem; margin-right: 12px; background: rgba(52, 152, 219, 0.15); color: #3498db; border: 1px solid rgba(52, 152, 219, 0.3);">${iniciaisVaga}</div>
                                    <div>
                                        <strong style="letter-spacing: 1px; color: #fff; font-size: 0.90rem;">Vaga: ${item.numero}</strong>
                                        <div style="font-size: 0.8rem; color: rgba(255,255,255,0.5);">Estac: ${item.nomeEstacionamento}</div>
                                        <div style="font-size: 0.8rem; color: rgba(255,255,255,0.5);">Cod: ${item.sensor}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <strong style="color: rgba(255,255,255,0.8);">${item.placaCarro}</strong>
                            </td>
                            <td>
                                <span style="font-size: 0.85rem; color: rgba(255,255,255,0.7);">${tempoStr}</span>
                            </td>
                            <td>
                                <div class="actions-cell">
                                    <a href='admin.html?id=${index}&tipo=vaga&acao=alterar' class="btn-action edit" title="Editar Vaga">
                                        <i class="fa-solid fa-pen"></i>
                                    </a>
                                    <a href='admin.html?id=${index}&acao=excluir&tipo=vaga' class="btn-action delete" title="Excluir Vaga">
                                        <i class="fa-solid fa-trash"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>`;
    });

    var tabelaFinal = tabelaP1 + tabelaMeio + tabelaP2;
    document.getElementById("listaVagas").innerHTML = tabelaFinal;
}

function executaAcao(acao, id, tipo, url) {
    if (!tipo) tipo = "usuario"; // fallback para evitar problemas sessões antigas

    if (tipo === "usuario") {
        var clientes = JSON.parse(localStorage.getItem("clientes"));
        
        if (acao === "excluir") {
            if(confirm("Deseja realmente excluir este usuário definitivamente?")) {
                clientes.splice(id, 1);
                localStorage.setItem("clientes", JSON.stringify(clientes));
            }
            window.location.href = url;
            
        } else if (acao === "alterar") {
            var cliente = clientes[id];
            if(cliente) {
                document.getElementById("nome").value = cliente.nome;
                document.getElementById("email").value = cliente.email;
                document.getElementById("senha").value = cliente.senha;
                
                if (cliente.status) {
                    document.getElementById("status_usuario").value = cliente.status;
                }
                
                document.getElementById("idAtual").value = id;
                
                let btnAdicionar = document.getElementById("btnAdicionar");
                btnAdicionar.innerHTML = '<i class="fa-solid fa-check"></i> Salvar Alterações';
                
                document.getElementById("nome").focus();
            }
        }
    } else if (tipo === "carro") {
        var carros = JSON.parse(localStorage.getItem("carros"));
        
        if (acao === "excluir") {
            if(confirm("Deseja deletar este carro cadastrado?")) {
                carros.splice(id, 1);
                localStorage.setItem("carros", JSON.stringify(carros));
            }
            window.location.href = url + "?tab=carros";
            
        } else if (acao === "alterar") {
            document.querySelector('[data-tab="carros"]').click();
            var carro = carros[id];
            if(carro) {
                document.getElementById("placa").value = carro.placa;
                document.getElementById("marca").value = carro.marca;
                document.getElementById("proprietario").value = carro.idProprietario;
                document.getElementById("idAtualCarro").value = id;
                
                let btnCarro = document.getElementById("btnAdicionarCarro");
                btnCarro.innerHTML = '<i class="fa-solid fa-check"></i> Salvar Carro';
                
                document.getElementById("placa").focus();
            }
        }
    } else if (tipo === "dono") {
        var donos = JSON.parse(localStorage.getItem("donos"));
        
        if (acao === "excluir") {
            if(confirm("Deseja deletar este Dono de Estabelecimento do sistema?")) {
                donos.splice(id, 1);
                localStorage.setItem("donos", JSON.stringify(donos));
            }
            window.location.href = url + "?tab=donos";
            
        } else if (acao === "alterar") {
            document.querySelector('[data-tab="donos"]').click();
            var dono = donos[id];
            if(dono) {
                document.getElementById("razao").value = dono.razao;
                document.getElementById("cnpj").value = dono.cnpj;
                document.getElementById("emailDono").value = dono.email;
                if (dono.status) document.getElementById("status_dono").value = dono.status;
                document.getElementById("idAtualDono").value = id;
                
                let btnDono = document.getElementById("btnAdicionarDono");
                btnDono.innerHTML = '<i class="fa-solid fa-check"></i> Salvar Dono';
                
                document.getElementById("razao").focus();
            }
        }
    } else if (tipo === "estacionamento") {
        var estacs = JSON.parse(localStorage.getItem("estacionamentos"));
        
        if (acao === "excluir") {
            if(confirm("Deseja deletar este estacionamento do sistema?")) {
                estacs.splice(id, 1);
                localStorage.setItem("estacionamentos", JSON.stringify(estacs));
            }
            window.location.href = url + "?tab=estacionamentos";
            
        } else if (acao === "alterar") {
            document.querySelector('[data-tab="estacionamentos"]').click();
            var estac = estacs[id];
            if(estac) {
                document.getElementById("donoEstacionamento").value = estac.idDono;
                document.getElementById("nomeEstacionamento").value = estac.nome;
                document.getElementById("areaEstacionamento").value = estac.area;
                document.getElementById("idAtualEstacionamento").value = id;
                
                let btnEstac = document.getElementById("btnAdicionarEstacionamento");
                btnEstac.innerHTML = '<i class="fa-solid fa-check"></i> Salvar Estacionamento';
                
                document.getElementById("nomeEstacionamento").focus();
            }
        }
    } else if (tipo === "vaga") {
        var vagas = JSON.parse(localStorage.getItem("vagas"));
        
        if (acao === "excluir") {
            if(confirm("Deseja deletar esta Vaga do sistema?")) {
                vagas.splice(id, 1);
                localStorage.setItem("vagas", JSON.stringify(vagas));
            }
            window.location.href = url + "?tab=vagas";
            
        } else if (acao === "alterar") {
            document.querySelector('[data-tab="vagas"]').click();
            var vaga = vagas[id];
            if(vaga) {
                document.getElementById("vagaEstacionamento").value = vaga.idEstacionamento;
                document.getElementById("vagaCarro").value = vaga.idCarro;
                document.getElementById("vagaEntrada").value = vaga.entrada;
                document.getElementById("vagaSaida").value = vaga.saida || "";
                document.getElementById("vagaSensor").value = vaga.sensor;
                document.getElementById("vagaNumero").value = vaga.numero;
                document.getElementById("idAtualVaga").value = id;
                
                let btnVaga = document.getElementById("btnAdicionarVaga");
                btnVaga.innerHTML = '<i class="fa-solid fa-check"></i> Salvar Vaga';
                
                document.getElementById("vagaNumero").focus();
            }
        }
    }
}
