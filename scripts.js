// ================================================
// SOFTBYKE - SCRIPTS UNIFICADOS (scripts.js)
// ================================================

document.addEventListener("DOMContentLoaded", () => {

    // ------------------------------------------------
    // 1. LÓGICA DO SLIDER (Apenas se existir na página)
    // ------------------------------------------------
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const container = document.querySelector('.slider');
    const itens = document.querySelectorAll('.slider .list .item');
    const indicator = document.querySelector('.indicators');
    const dots = document.querySelectorAll('.indicators ul li');

    if (container && itens.length > 0) {
        let active = 0;
        let firstPosition = 0;
        let lastPosition = itens.length - 1;

        function setSlider() {
            let itemOld = container.querySelector('.list .item.active');
            if (itemOld) itemOld.classList.remove('active');

            let dotsOld = indicator ? indicator.querySelector('ul li.active') : null;
            if (dotsOld) dotsOld.classList.remove('active');

            if (itens[active]) itens[active].classList.add('active');
            if (dots[active]) dots[active].classList.add('active');

            if (indicator) {
                const numberEl = indicator.querySelector('.number');
                if (numberEl) {
                    numberEl.innerHTML = (active + 1 < 10 ? '0' : '') + (active + 1);
                }
            }
        }

        if (nextButton) {
            nextButton.onclick = () => {
                active = active + 1 > lastPosition ? 0 : active + 1;
                setSlider();
            };
        }

        if (prevButton) {
            prevButton.onclick = () => {
                active = active - 1 < firstPosition ? lastPosition : active - 1;
                setSlider();
            };
        }

        dots.forEach((li, index) => {
            li.addEventListener('click', () => {
                active = index;
                setSlider();
            });
        });
    }

    // ------------------------------------------------
    // 2. MENU LATERAL / DRAWER
    // ------------------------------------------------
    const menuToggle = document.getElementById('menuToggle');
    const drawerClose = document.getElementById('drawerClose');
    const sideDrawer = document.getElementById('sideDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');

    function openMenu() {
        if (sideDrawer) sideDrawer.classList.add('open');
        if (drawerOverlay) drawerOverlay.classList.add('active');
    }

    function closeMenu() {
        if (sideDrawer) sideDrawer.classList.remove('open');
        if (drawerOverlay) drawerOverlay.classList.remove('active');
    }

    if (menuToggle) menuToggle.addEventListener('click', openMenu);
    if (drawerClose) drawerClose.addEventListener('click', closeMenu);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeMenu);


    // ------------------------------------------------
    // 3. MODAL DE PRODUTO (injetada uma única vez)
    // ------------------------------------------------
    const modalHTML = `
    <div id="product-modal" class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-content">
            <button class="modal-close" id="modal-close-btn" aria-label="Fechar">&times;</button>

            <div class="modal-body">

                <!-- COLUNA 1: GALERIA -->
                <div class="modal-gallery">
                    <div class="thumb-strip" id="modal-thumbs"></div>
                    <div class="main-img-container">
                        <img id="modal-img" src="" alt="">
                    </div>
                </div>

                <!-- COLUNA 2: INFORMAÇÕES -->
                <div class="modal-info">
                    <p class="modal-meta">Novo &nbsp;|&nbsp; +50 vendidos</p>
                    <span class="badge-highlight" id="modal-badge">Mais vendido</span>

                    <h2 id="modal-title">Título do produto</h2>

                    <div class="modal-rating">
                        <span class="rating-value">4.9</span>
                        <span class="stars">★★★★★</span>
                        <span class="rating-count">(128)</span>
                    </div>

                    <div class="modal-price-box">
                        <span class="old-price" id="modal-old-price"></span>
                        <div class="current-price-row">
                            <span class="price-value" id="modal-price">R$ 0,00</span>
                            <span class="price-discount">15% OFF</span>
                        </div>
                        <span class="payment-terms" id="modal-installments"></span>
                        <a href="#" class="payment-link">Ver os meios de pagamento</a>
                    </div>

                    <p id="modal-desc" class="modal-description"></p>

                    <div class="modal-variant">
                        <p class="variant-label">Tamanho do quadro: <strong id="variant-current">17"</strong></p>
                        <div class="variant-options" id="modal-variants">
                            <button type="button" class="variant-chip">15"</button>
                            <button type="button" class="variant-chip is-selected">17"</button>
                            <button type="button" class="variant-chip">19"</button>
                        </div>
                    </div>

                    <ul class="modal-specs">
                        <li><span>Marca</span><strong>SOFTBYKE</strong></li>
                        <li><span>Material do quadro</span><strong id="spec-frame">Alumínio</strong></li>
                        <li><span>Freios</span><strong>A disco hidráulico</strong></li>
                        <li><span>Garantia</span><strong>12 meses de fábrica</strong></li>
                    </ul>
                </div>

                <!-- COLUNA 3: CAIXA DE COMPRA -->
                <aside class="modal-purchase-box">
                    <p class="delivery-date">Chegará <strong id="modal-delivery">grátis</strong></p>
                    <a href="#" class="payment-link">Mais detalhes e formas de entrega</a>

                    <p class="stock-status">Estoque disponível</p>

                    <div class="quantity-selector">
                        <label for="qty">Quantidade</label>
                        <div class="qty-control">
                            <button type="button" id="qty-minus" aria-label="Diminuir quantidade">−</button>
                            <span id="qty-value">1</span>
                            <button type="button" id="qty-plus" aria-label="Aumentar quantidade">+</button>
                        </div>
                        <span class="qty-hint">(12 disponíveis)</span>
                    </div>

                    <button class="btn-buy-now" id="btn-buy-now">Comprar agora</button>
                    <button class="btn-add-cart" id="btn-add-cart">Adicionar ao carrinho</button>

                    <div class="seller-box">
                        <p>Vendido por <strong>SOFTBYKE Oficial</strong></p>
                        <p class="seller-sales">+1 mi de vendas</p>
                    </div>

                    <ul class="modal-benefits">
                        <li><span aria-hidden="true">↺</span> <div><strong>Devolução grátis.</strong> Você tem 30 dias a partir do recebimento.</div></li>
                        <li><span aria-hidden="true">🛡</span> <div><strong>Compra garantida.</strong> Receba o produto ou devolvemos seu dinheiro.</div></li>
                        <li><span aria-hidden="true">🚚</span> <div><strong>Frete grátis</strong> para todo o Brasil.</div></li>
                    </ul>
                </aside>

            </div>
        </div>
    </div>

    <button id="btn-back-to-top" title="Voltar ao topo">↑ Topo</button>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById("product-modal");
    const closeBtn = document.getElementById("modal-close-btn");
    const modalImg = document.getElementById("modal-img");
    const thumbStrip = document.getElementById("modal-thumbs");
    let lastFocused = null;

    // Data de entrega: 3 dias úteis a partir de hoje
    function getDeliveryLabel() {
        const d = new Date();
        let added = 0;
        while (added < 3) {
            d.setDate(d.getDate() + 1);
            if (d.getDay() !== 0 && d.getDay() !== 6) added++;
        }
        const dia = d.toLocaleDateString('pt-BR', { weekday: 'long' });
        return `grátis ${dia}`;
    }

    // ------------------------------------------------
    // 4. CLIQUE NOS CARDS (ABRIR MODAL)
    // ------------------------------------------------
    document.addEventListener("click", (e) => {
        const card = e.target.closest(".product-card, .card-produto, .card");
        if (!card) return;
        if (e.target.closest("button, a")) return;

        lastFocused = document.activeElement;

        // Imagem principal + galeria opcional (data-imgs="img/a.png,img/b.png")
        const imgEl = card.querySelector("img");
        const mainSrc = imgEl ? imgEl.getAttribute("src") : "";
        const extra = card.getAttribute("data-imgs");
        const gallery = extra
            ? extra.split(",").map(s => s.trim()).filter(Boolean)
            : [mainSrc];

        // Título e descrição
        const titleEl = card.querySelector(".product-title, h3, .title");
        const titleText = titleEl ? titleEl.innerText.trim() : "Bicicleta SOFTBYKE";

        const descEl = card.querySelector(".product-desc, p");
        const descText = descEl ? descEl.innerText.trim() : "Bicicleta de alta performance SOFTBYKE.";

        // Preço
        let rawPrice = card.getAttribute("data-preco");
        if (!rawPrice) {
            const priceEl = card.querySelector(".product-price, .price, .preco");
            rawPrice = priceEl ? priceEl.innerText : "0";
        }

        const cleanPrice = rawPrice.toString()
            .replace("R$", "")
            .replace(/\./g, "")
            .replace(",", ".")
            .trim();

        let priceNum = parseFloat(cleanPrice);
        if (isNaN(priceNum) || priceNum === 0) priceNum = 3500.00;

        const brl = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        // Preenche a galeria
        modalImg.src = gallery[0];
        modalImg.alt = titleText;
        thumbStrip.innerHTML = gallery.map((src, i) =>
            `<button type="button" class="thumb${i === 0 ? ' is-active' : ''}" data-src="${src}">
                <img src="${src}" alt="">
             </button>`
        ).join("");

        // Preenche os textos
        document.getElementById("modal-title").innerText = titleText;
        document.getElementById("modal-desc").innerText = descText;
        document.getElementById("modal-price").innerText = brl(priceNum);
        document.getElementById("modal-old-price").innerText = brl(priceNum * 1.15);
        document.getElementById("modal-installments").innerText =
            `em 10x de ${brl(priceNum / 10)} sem juros`;
        document.getElementById("modal-delivery").innerText = getDeliveryLabel();

        // Material do quadro conforme o nome do modelo
        const lower = titleText.toLowerCase();
        document.getElementById("spec-frame").innerText =
            lower.includes("carbon") || lower.includes("aero") ? "Fibra de carbono"
            : lower.includes("titanium") ? "Liga de titânio"
            : "Alumínio";

        // Selo de destaque só para os modelos mais caros
        document.getElementById("modal-badge").style.display =
            priceNum >= 10000 ? "inline-block" : "none";

        // Reseta quantidade
        document.getElementById("qty-value").innerText = "1";

        openModal();
    });

    // ------------------------------------------------
    // 5. CONTROLES INTERNOS DA MODAL
    // ------------------------------------------------
    function openModal() {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
        closeBtn.focus();
    }

    function closeModal() {
        modal.classList.remove("active");
        document.body.style.overflow = "";
        if (lastFocused) lastFocused.focus();
    }

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
    });

    // Troca de imagem pelas miniaturas
    thumbStrip.addEventListener("click", (e) => {
        const thumb = e.target.closest(".thumb");
        if (!thumb) return;
        modalImg.src = thumb.dataset.src;
        thumbStrip.querySelectorAll(".thumb").forEach(t => t.classList.remove("is-active"));
        thumb.classList.add("is-active");
    });

    // Seleção de tamanho do quadro
    document.getElementById("modal-variants").addEventListener("click", (e) => {
        const chip = e.target.closest(".variant-chip");
        if (!chip) return;
        document.querySelectorAll(".variant-chip").forEach(c => c.classList.remove("is-selected"));
        chip.classList.add("is-selected");
        document.getElementById("variant-current").innerText = chip.innerText;
    });

    // Quantidade
    const qtyValue = document.getElementById("qty-value");
    document.getElementById("qty-minus").addEventListener("click", () => {
        const n = parseInt(qtyValue.innerText, 10);
        if (n > 1) qtyValue.innerText = n - 1;
    });
    document.getElementById("qty-plus").addEventListener("click", () => {
        const n = parseInt(qtyValue.innerText, 10);
        if (n < 12) qtyValue.innerText = n + 1;
    });

    // Ações de compra
    document.getElementById("btn-buy-now").addEventListener("click", () => {
        alert("Redirecionando para o checkout...");
    });
    document.getElementById("btn-add-cart").addEventListener("click", () => {
        const qtd = qtyValue.innerText;
        const nome = document.getElementById("modal-title").innerText;
        alert(`${qtd}x ${nome} adicionada ao carrinho.`);
    });

    // ------------------------------------------------
    // 6. BOTÃO VOLTAR AO TOPO
    // ------------------------------------------------
    const backToTopBtn = document.getElementById("btn-back-to-top");

    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            backToTopBtn.classList.toggle("show", window.scrollY > 300);
        });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});

// ================================================
// SOFTBYKE - CARRINHO DE COMPRAS
// ================================================

document.addEventListener("DOMContentLoaded", () => {
    const botao = document.getElementById("cartBtn");
    if (!botao) return;

    const CHAVE = "softbyke:carrinho";
    const contador = document.getElementById("cartCount");

    const ler = () => {
        try { return JSON.parse(localStorage.getItem(CHAVE)) || []; }
        catch { return []; }
    };
    const gravar = itens => localStorage.setItem(CHAVE, JSON.stringify(itens));
    const brl = v => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    // Painel
    const painel = document.createElement("div");
    painel.className = "cart-panel";
    painel.id = "cartPanel";
    document.body.appendChild(painel);

    function desenhar() {
        const itens = ler();
        const total = itens.reduce((s, i) => s + i.preco * i.qtd, 0);
        const unidades = itens.reduce((s, i) => s + i.qtd, 0);

        contador.innerText = unidades;
        contador.classList.toggle("tem-item", unidades > 0);

        if (!itens.length) {
            painel.innerHTML = `
                <h4>Seu carrinho</h4>
                <p class="cart-vazio">Nenhum produto por aqui ainda. Escolha um item do catálogo para começar.</p>`;
            return;
        }

        painel.innerHTML = `
            <h4>Seu carrinho</h4>
            ${itens.map((item, i) => `
                <div class="cart-item">
                    <div>
                        <div class="cart-item-nome">${item.nome}</div>
                        <div class="cart-item-qtd">${item.qtd} un. × ${brl(item.preco)}</div>
                    </div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span class="cart-item-preco">${brl(item.preco * item.qtd)}</span>
                        <button class="cart-remover" data-i="${i}" aria-label="Remover ${item.nome}">×</button>
                    </div>
                </div>`).join("")}
            <div class="cart-total"><span>Total</span><strong>${brl(total)}</strong></div>
            <div class="cart-acoes">
                <button class="btn-limpar" id="limparCarrinho">Esvaziar</button>
                <button class="btn-finalizar" id="finalizarCompra">Finalizar compra</button>
            </div>`;
    }

    function adicionar(nome, preco, qtd) {
        const itens = ler();
        const existente = itens.find(i => i.nome === nome);
        if (existente) existente.qtd += qtd;
        else itens.push({ nome, preco, qtd });
        gravar(itens);
        desenhar();

        botao.classList.remove("pulsando");
        void botao.offsetWidth;
        botao.classList.add("pulsando");
    }

    // Abrir e fechar o painel
    botao.addEventListener("click", (e) => {
        e.stopPropagation();
        painel.classList.toggle("aberto");
    });

    document.addEventListener("click", (e) => {
        if (!painel.contains(e.target) && e.target !== botao) painel.classList.remove("aberto");
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") painel.classList.remove("aberto");
    });

    // Ações dentro do painel
    painel.addEventListener("click", (e) => {
        const remover = e.target.closest(".cart-remover");
        if (remover) {
            const itens = ler();
            itens.splice(Number(remover.dataset.i), 1);
            gravar(itens);
            desenhar();
            return;
        }

        if (e.target.id === "limparCarrinho") {
            gravar([]);
            desenhar();
        }

        if (e.target.id === "finalizarCompra") {
            alert("Redirecionando para o checkout...");
        }
    });

    // Recebe o "Adicionar ao carrinho" da modal de produto
    document.addEventListener("click", (e) => {
        if (e.target.id !== "btn-add-cart") return;

        const nome = document.getElementById("modal-title").innerText.trim();
        const qtd = parseInt(document.getElementById("qty-value").innerText, 10) || 1;
        const preco = parseFloat(
            document.getElementById("modal-price").innerText
                .replace(/[^\d,]/g, "").replace(",", ".")
        ) || 0;

        adicionar(nome, preco, qtd);
    });

    desenhar();
});