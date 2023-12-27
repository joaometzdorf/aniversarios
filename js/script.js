const formulario = document.querySelector("[data-formulario]");
const tabela = document.querySelector("tbody");

const pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

function updateStorage() {
  localStorage.setItem("pessoas", JSON.stringify(pessoas));
}

function criarTabela(respostasNome, respostasData) {
  const tr = document.createElement("tr");

  const tdNome = document.createElement("td");
  tdNome.classList.add("fw-medium");
  tdNome.textContent = respostasNome;
  tr.append(tdNome);

  const tdData = document.createElement("td");
  tdData.classList.add("fw-medium");
  tdData.textContent = respostasData;
  tr.append(tdData);

  const tdBotao = document.createElement("td");
  const botaoEditar = document.createElement("button");
  const botaoRemover = document.createElement("button");
  botaoEditar.textContent = "Editar";
  botaoEditar.classList.add(
    "fw-medium",
    "text-success",
    "border-0",
    "bg-transparent"
  );
  botaoRemover.textContent = "Deletar";
  botaoRemover.classList.add(
    "fw-medium",
    "text-danger",
    "border-0",
    "bg-transparent",
    "margin-left"
  );
  tdBotao.append(botaoEditar);
  tdBotao.append(botaoRemover);
  tr.append(tdBotao);

  botaoEditar.onclick = () => {
    const novoNome = prompt("Edite o nome:", respostasNome);
    const novaData = prompt("Edite a data:", respostasData);

    if (
      novoNome !== null &&
      novaData !== null &&
      novoNome !== "" &&
      novaData !== ""
    ) {
      tdNome.textContent = novoNome;
      tdData.textContent = novaData;

      const index = pessoas.findIndex(
        (pessoa) =>
          pessoa.nome === respostasNome && pessoa.data === respostasData
      );
      if (index !== -1) {
        pessoas[index].nome = novoNome;
        pessoas[index].data = novaData;

        updateStorage();
      }
    }
  };

  botaoRemover.onclick = () => {
    tr.remove();

    const index = pessoas.findIndex(
      (pessoa) => pessoa.nome === respostasNome && pessoa.data === respostasData
    );
    if (index !== -1) {

      pessoas.splice(index, 1) 

      updateStorage();
    }
  };
  tabela.append(tr);
}

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const respostas = {
    nome: e.target.elements["nome"].value,
    data: e.target.elements["data"].value,
  };

  pessoas.push(respostas);

  criarTabela(respostas.nome, respostas.data);

  updateStorage();
});

window.addEventListener("load", () => {
  pessoas.forEach((pessoa) => {
    criarTabela(pessoa.nome, pessoa.data);
  });
});
