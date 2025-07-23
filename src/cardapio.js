document.addEventListener("DOMContentLoaded", () => {
  const produtos = [
    {
      id: 1,
      nome: "Café Tradicional",
      descricao: "Café feito com grãos selecionados, sabor clássico e aroma intenso.",
      preco: 7.50,
      imagem: "assets/images/cafe_tradicional.webp"
    },
    {
      id: 2,
      nome: "Café Gourmet",
      descricao: "Blend especial com grãos premium, sabor encorpado e notas frutadas.",
      preco: 9.00,
      imagem: "assets/images/cafe_gourmet.jpg"
    },
    {
      id: 3,
      nome: "Café Expresso",
      descricao: "Expresso forte e cremoso, perfeito para começar o dia.",
      preco: 6.00,
      imagem: "assets/images/cafe_expresso.jpg"
    }
  ];

  const cardapioList = document.getElementById("cardapio-list");
  const pedidoTableBody = document.querySelector("#pedido-table tbody");

  // Função para renderizar os cards de produtos
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

  // Função para adicionar produto ao pedido e atualizar tabela
  function adicionarAoPedido(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${produto.id}</td>
      <td>${produto.nome}</td>
      <td>${produto.preco.toFixed(2)}</td>
      <td>${produto.descricao}</td>
    `;

    pedidoTableBody.appendChild(tr);
  }

  // Inicializar produtos na tela
  renderProdutos();

  // Delegação de evento para botões "Adicionar ao pedido"
  cardapioList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const id = parseInt(e.target.getAttribute("data-id"));
      adicionarAoPedido(id);
    }
  });
});

