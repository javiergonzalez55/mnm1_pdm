let telaAnterior = 'tela-home';
let telaAtual = 'tela-home';

function navegar(destino) {
    let telas = document.getElementsByClassName('tela');
    Array.from(telas).forEach(element => {
        element.classList.remove('show');
        element.classList.add('collapse');
    });
    document.getElementById(destino).classList.remove('collapse');
    document.getElementById(destino).classList.add('show');
    telaAnterior = telaAtual;
    telaAtual = destino;
}

function voltar() {
    navegar(telaAnterior);
}

// Função que carrega produtos baseado em uma categoria escolhida
async function carregarPorCategoria(categoria) {

    try {
        let url;
        const telaLista = document.getElementById("tela-home");


        // Define URLs conforme categoria selecionada
        if (categoria === 'todos') {
            url = 'https://dummyjson.com/products';
        } else {
            url = `https://dummyjson.com/products/category/${categoria}`;
        }


        // Faz requisições 
        const response = await axios.get(url);
        const produtos = response.data.products;


        // Renderiza os produtos na tela principal
        telaLista.innerHTML = "";
        produtos.forEach(produto => {
            const card = document.createElement("div");
            card.className = "col";
            card.innerHTML = `
                <div class="card h-100" onclick="abrirDetalhes(${produto.id})">

                    <img
                        src="${produto.thumbnail}"
                        class="card-img-top p-3"
                        style="height:250px; object-fit:contain;"
                        alt="${produto.title}"
                    >

                    <div class="card-body">
                        <h5 class="card-title">${produto.title}</h5>
                        <p class="card-text">
                            R$ ${produto.price.toFixed(2)}
                        </p>
                    </div>

                </div>
            `;
            telaLista.appendChild(card);
        });


        navegar('tela-home')
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
    }
}

carregarPorCategoria('todos')

// Função que carrega detalhes específicos de um produto
async function abrirDetalhes(id) {
    try {
        const detalhesProduto = document.getElementById("detalhes-produto");

        navegar('tela-produto')
        detalhesProduto.innerHTML = "Carregando..."
        const response = await axios.get(`https://dummyjson.com/products/${id}`)
        const p = response.data;

        detalhesProduto.innerHTML = `
            <div class="row g-3">
                <div class="col-md-4 text-center">
                    <img
                        src="${p.thumbnail}"
                        class="img-fluid"
                        alt="${p.title}">
                </div>
                <div class="col-md-8">
                    <h2>${p.title}</h2>
                    <p>
                        <strong>Categoria:</strong>
                        ${p.category}
                    </p>
                    <p>
                        <strong>Preço:</strong>
                        R$ ${p.price.toFixed(2)}
                    </p>
                    <p>
                        <strong>Descrição:</strong>
                        ${p.description}
                    </p>
                    <p>
                        <strong>Avaliação:</strong>
                        ${p.rating} ⭐
                        (${p.reviews.length} avaliações)
                    </p>

                </div>
            </div>
        `;

    } catch (error) {
        console.error("Erro ao carregar detalhes:", error)
    }
}