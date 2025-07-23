document.addEventListener("DOMContentLoaded", () => {
  const produtos = [
    { id: 1, nome: "Café Tradicional", descricao: "Café feito com grãos selecionados, sabor clássico e aroma intenso.", preco: 7.50, imagem: "assets/images/cafe_tradicional.webp" },
    { id: 2, nome: "Café Gourmet", descricao: "Blend especial com grãos premium, sabor encorpado e notas frutadas.", preco: 9.00, imagem: "assets/images/cafe_gourmet.jpg" },
    { id: 3, nome: "Café Expresso", descricao: "Expresso forte e cremoso, perfeito para começar o dia.", preco: 6.00, imagem: "assets/images/cafe_expresso.jpg" }
  ];

  const cardapioList = document.getElementById("cardapio-list");
  const pedidoTableBody = document.querySelector("#pedido-table tbody");

  // Modal e botões
  const modal = document.getElementById("modal-add-item");
  const btnOpenModal = document.getElementById("btn-open-modal");
  const btnCloseModal = document.getElementById("btn-close-modal");
  const formAddItem = document.getElementById("add-item-form");
  const main = document.querySelector("main");

  // Renderiza cards dos produtos
  function renderProdutos() {
    produtos.forEach(produto => {
      const col = document.createElement("div");
      col.className = "col-md-4";

      col.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}" style="height: 220px; object-fit: cover; border-radius: 10px 10px 0 0;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${produto.nome}</h5>
            <p class="card-text flex-grow-1">${produto.descricao}</p>
            <p class="card-text fw-bold">R$ ${produto.preco.toFixed(2)}</p>
            <button class="btn btn-primary mt-auto" data-id="${produto.id}">Adicionar ao pedido</button>
          </div>
        </div>
      `;

      cardapioList.appendChild(col);
    });
  }

  // Adiciona um produto à tabela pedido
  function adicionarAoPedido(id, nome, preco, descricao) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${id}</td>
      <td>${nome}</td>
      <td>${Number(preco).toFixed(2)}</td>
      <td>${descricao}</td>
    `;
    pedidoTableBody.appendChild(tr);
  }

  renderProdutos();

  // Itens iniciais na tabela
  adicionarAoPedido(1, "Café Tradicional", 7.50, "Café feito com grãos selecionados, sabor clássico e aroma intenso.");
  adicionarAoPedido(3, "Café Expresso", 6.00, "Expresso forte e cremoso, perfeito para começar o dia.");

  // Evento para adicionar produto via botão do card
  cardapioList.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
      const id = parseInt(e.target.getAttribute("data-id"));
      const produto = produtos.find(p => p.id === id);
      if (produto) {
        adicionarAoPedido(produto.id, produto.nome, produto.preco, produto.descricao);
      }
    }
  });

  // Abre modal e escurece fundo
  btnOpenModal.addEventListener("click", () => {
    modal.style.display = "flex";
    main.classList.add("dimmed");
  });

  // Fecha modal e remove escurecimento
  btnCloseModal.addEventListener("click", () => {
    modal.style.display = "none";
    formAddItem.reset();
    main.classList.remove("dimmed");
  });

  // Fecha modal clicando fora do conteúdo
  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
      formAddItem.reset();
      main.classList.remove("dimmed");
    }
  });

  // Submete formulário do modal
  formAddItem.addEventListener("submit", e => {
    e.preventDefault();
    const id = document.getElementById("input-id").value.trim();
    const nome = document.getElementById("input-nome").value.trim();
    const preco = document.getElementById("input-preco").value.trim();
    const descricao = document.getElementById("input-descricao").value.trim();

    if (id && nome && preco && descricao) {
      adicionarAoPedido(id, nome, preco, descricao);
      modal.style.display = "none";
      formAddItem.reset();
      main.classList.remove("dimmed");
    }
  });
});
