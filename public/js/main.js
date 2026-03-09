// js/main.js — Full multilingual support (NL / EN / DE)

// ── Translations ───────────────────────────────────────────
const TX = {
    nl: {
        // Footer
        orderOverview:   'Besteloverzicht',
        total:           'Totaal',
        clearBtn:        'WISSEN',
        cartBtn:         'WINKELWAGEN',
        cartBtnCount:    (n) => `WINKELWAGEN (${n})`,
        itemsInOrder:    (n) => `${n} item${n > 1 ? 's' : ''} in bestelling`,

        // Sidebar categories
        breakfast:       'Ontbijt',
        lunch:           'Lunch & Diner',
        snacks:          'Handhelds',
        desserts:        'Bijgerechten',
        drinks:          'Dranken',
        specials:        'Signature Dips',

        // Category names (for modal pills)
        catNames: {
            drinks: 'Dranken', breakfast: 'Ontbijt', lunch: 'Lunch & Diner',
            snacks: 'Handhelds', desserts: 'Bijgerechten', specials: 'Signature Dips'
        },

        // Dietary
        vegan:           'Veganistisch',
        vegetarian:      'Vegetarisch',

        // Loading
        loading:         'Laden...',
        noProducts:      'Geen producten gevonden.',
        loadFailed:      'Laden mislukt.',

        // Product modal
        alreadyInCart:   (n) => `✓ Al ${n}× in winkelwagen`,
        addToCart:       'Toevoegen',

        // Cart modal
        cartTitle:       '🛒 Jouw Bestelling',
        emptyCart:       '🌿 Nog geen items toegevoegd.',
        each:            'per stuk',
        continueShopping:'Verder winkelen',
        placeOrder:      'Bestelling plaatsen',
        placingOrder:    'Bestelling plaatsen...',
        backToMenu:      '🏠 Terug naar menu',
        continueOrdering:'Verder bestellen',

        // Clear modal
        clearTitle:      '🗑️ Bestelling wissen?',
        clearBody:       'Weet je zeker dat je alle items wilt verwijderen? Dit kan niet ongedaan worden gemaakt.',
        keepItems:       'Items bewaren',
        clearOrder:      'Bestelling wissen',

        // Order confirmed
        orderPlaced:     'Bestelling geplaatst!',
        beingPrepared:   'Je eten wordt bereid. 🌿',
        yourOrderNumber: 'Jouw bestelnummer',
        callWhenReady:   'We roepen je nummer als het klaar is',
    },

    en: {
        orderOverview:   'Order overview',
        total:           'Total',
        clearBtn:        'CLEAR ORDER',
        cartBtn:         'CART',
        cartBtnCount:    (n) => `CART (${n})`,
        itemsInOrder:    (n) => `${n} item${n > 1 ? 's' : ''} in order`,

        breakfast:       'Breakfast',
        lunch:           'Lunch & Dinner',
        snacks:          'Handhelds',
        desserts:        'Sides & Small Plates',
        drinks:          'Drinks',
        specials:        'Signature Dips',

        catNames: {
            drinks: 'Drinks', breakfast: 'Breakfast', lunch: 'Lunch & Dinner',
            snacks: 'Handhelds', desserts: 'Sides & Small Plates', specials: 'Signature Dips'
        },

        vegan:           'Vegan',
        vegetarian:      'Vegetarian',

        loading:         'Loading...',
        noProducts:      'No products found.',
        loadFailed:      'Failed to load products.',

        alreadyInCart:   (n) => `✓ Already ${n}× in cart`,
        addToCart:       'Add to Cart',

        cartTitle:       '🛒 Your Order',
        emptyCart:       '🌿 No items added yet.',
        each:            'each',
        continueShopping:'Continue',
        placeOrder:      'Place Order',
        placingOrder:    'Placing order...',
        backToMenu:      '🏠 Back to Menu',
        continueOrdering:'Continue ordering',

        clearTitle:      '🗑️ Clear Order?',
        clearBody:       'Are you sure you want to remove all items? This cannot be undone.',
        keepItems:       'Keep Items',
        clearOrder:      'Clear Order',

        orderPlaced:     'Order Placed!',
        beingPrepared:   'Your food is being prepared. 🌿',
        yourOrderNumber: 'Your order number',
        callWhenReady:   "We'll call your number when it's ready",
    },

    de: {
        orderOverview:   'Bestellübersicht',
        total:           'Gesamt',
        clearBtn:        'LÖSCHEN',
        cartBtn:         'WARENKORB',
        cartBtnCount:    (n) => `WARENKORB (${n})`,
        itemsInOrder:    (n) => `${n} Artikel in der Bestellung`,

        breakfast:       'Frühstück',
        lunch:           'Mittagessen',
        snacks:          'Snacks',
        desserts:        'Beilagen',
        drinks:          'Getränke',
        specials:        'Signature Dips',

        catNames: {
            drinks: 'Getränke', breakfast: 'Frühstück', lunch: 'Mittagessen',
            snacks: 'Snacks', desserts: 'Beilagen', specials: 'Signature Dips'
        },

        vegan:           'Vegan',
        vegetarian:      'Vegetarisch',

        loading:         'Laden...',
        noProducts:      'Keine Produkte gefunden.',
        loadFailed:      'Laden fehlgeschlagen.',

        alreadyInCart:   (n) => `✓ Bereits ${n}× im Warenkorb`,
        addToCart:       'In den Warenkorb',

        cartTitle:       '🛒 Ihre Bestellung',
        emptyCart:       '🌿 Noch keine Artikel hinzugefügt.',
        each:            'pro Stück',
        continueShopping:'Weiter einkaufen',
        placeOrder:      'Bestellung aufgeben',
        placingOrder:    'Bestellung wird aufgegeben...',
        backToMenu:      '🏠 Zurück zum Menü',
        continueOrdering:'Weiter bestellen',

        clearTitle:      '🗑️ Bestellung löschen?',
        clearBody:       'Möchten Sie alle Artikel entfernen? Dies kann nicht rückgängig gemacht werden.',
        keepItems:       'Artikel behalten',
        clearOrder:      'Bestellung löschen',

        orderPlaced:     'Bestellung aufgegeben!',
        beingPrepared:   'Ihr Essen wird zubereitet. 🌿',
        yourOrderNumber: 'Ihre Bestellnummer',
        callWhenReady:   'Wir rufen Ihre Nummer auf, wenn es fertig ist',
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const lang = sessionStorage.getItem('lang') || 'nl';
    const t    = TX[lang] || TX.nl;

    const buttons   = document.querySelectorAll('.category-btn');
    const container = document.getElementById('product-container');
    let cart = {};

    // ── Translate static UI ────────────────────────────────────
    const categoryLabels = {
        breakfast: t.breakfast, lunch: t.lunch, snacks: t.snacks,
        desserts:  t.desserts,  drinks: t.drinks, specials: t.specials
    };

    buttons.forEach(btn => {
        const cat = btn.getAttribute('data-category');
        if (categoryLabels[cat]) btn.innerHTML = categoryLabels[cat].replace(' & ', ' &<br>');
    });

    document.querySelector('.clear-btn').textContent = t.clearBtn;
    document.querySelector('.order-btn').textContent = t.cartBtn;
    document.querySelector('.total-label').textContent = t.total;

    const orderSpan = document.querySelector('.info-row span:first-child');
    orderSpan.textContent = t.orderOverview;

    // ── Load products ──────────────────────────────────────────
    async function loadProducts(category) {
        container.innerHTML = `<div class="loading-msg">${t.loading}</div>`;

        try {
            const res  = await fetch(`../get-products.php?category=${category}`);
            const json = await res.json();

            if (!json.success || !json.data.length) {
                container.innerHTML = `<div class="loading-msg">${t.noProducts}</div>`;
                return;
            }

            container.innerHTML = '';

            json.data.forEach(product => {
                const div = document.createElement('div');
                div.className = `product-item category-${product.category_slug}`;
                div.dataset.id    = product.id;
                div.dataset.name  = product.name;
                div.dataset.price = product.price;

                const imgHTML = product.image_file
                    ? `<img src="../images/${product.image_file}" alt="${product.name}">`
                    : `<div class="product-placeholder"></div>`;

                const badge = product.dietary_code === 'VG'
                    ? `<span class="dietary-badge vegan">VG</span>`
                    : `<span class="dietary-badge veg">V</span>`;

                div.innerHTML = `
                    ${imgHTML}
                    <div class="product-details">
                        <span class="product-name">${product.name}</span>
                        <span class="product-price">€${parseFloat(product.price).toFixed(2)}</span>
                    </div>
                    ${badge}`;

                div.addEventListener('click', () => showProductModal(product));
                container.appendChild(div);
            });

        } catch (err) {
            container.innerHTML = `<div class="loading-msg">${t.loadFailed}</div>`;
            console.error(err);
        }
    }

    // ── Category buttons ───────────────────────────────────────
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            loadProducts(button.getAttribute('data-category'));
        });
    });

    loadProducts('breakfast');

    // ── Product detail modal ───────────────────────────────────
    function showProductModal(product) {
        const existing = document.getElementById('product-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'product-modal';

        const imgHTML = product.image_file
            ? `<img src="../images/${product.image_file}" alt="${product.name}" class="pmodal-img">`
            : `<div class="pmodal-img-placeholder"></div>`;

        const dietaryLabel = product.dietary_code === 'VG' ? t.vegan : t.vegetarian;
        const dietaryClass = product.dietary_code === 'VG' ? 'vegan' : 'veg';
        const kcalHTML     = product.kcal > 0
            ? `<span class="pmodal-pill kcal">🔥 ${product.kcal} kcal</span>`
            : '';

        const currentQty   = cart[product.name] ? cart[product.name].qty : 0;
        const price        = parseFloat(product.price);
        const categoryLabel = t.catNames[product.category_slug] || product.category_slug;

        modal.innerHTML = `
            <div class="modal-overlay pmodal-overlay">
                <div class="modal-box pmodal-box">
                    <div class="pmodal-img-wrap">
                        ${imgHTML}
                        <button class="pmodal-close-x" id="pmodal-close-x">✕</button>
                    </div>
                    <div class="pmodal-body">
                        <span class="pmodal-category">${categoryLabel}</span>
                        <div class="pmodal-title-row">
                            <h2 class="pmodal-name">${product.name}</h2>
                            <span class="pmodal-price">€ ${price.toFixed(2)}</span>
                        </div>
                        <div class="pmodal-pills">
                            <span class="pmodal-pill dietary ${dietaryClass}">${dietaryLabel}</span>
                            ${kcalHTML}
                        </div>
                        <p class="pmodal-description">${product.description || ''}</p>
                        ${currentQty > 0 ? `<p class="pmodal-already-added">${t.alreadyInCart(currentQty)}</p>` : ''}
                        <div class="pmodal-qty-row">
                            <button class="pmodal-qty-btn" id="pmodal-minus">−</button>
                            <span class="pmodal-qty-display" id="pmodal-qty">1</span>
                            <button class="pmodal-qty-btn" id="pmodal-plus">+</button>
                        </div>
                        <button class="pmodal-add-btn" id="pmodal-add">
                            ${t.addToCart} &nbsp;·&nbsp; <span id="pmodal-add-price">€ ${price.toFixed(2)}</span>
                        </button>
                    </div>
                </div>
            </div>`;

        document.querySelector('.app-container').appendChild(modal);
        requestAnimationFrame(() => modal.querySelector('.pmodal-box').classList.add('visible'));

        modal.querySelector('#pmodal-close-x').addEventListener('click', () => modal.remove());
        modal.querySelector('.pmodal-overlay').addEventListener('click', e => {
            if (e.target.classList.contains('pmodal-overlay')) modal.remove();
        });

        let qty = 1;
        const qtyDisplay = modal.querySelector('#pmodal-qty');
        const addPrice   = modal.querySelector('#pmodal-add-price');

        function updateQtyDisplay() {
            qtyDisplay.textContent = qty;
            addPrice.textContent   = `€ ${(price * qty).toFixed(2)}`;
        }

        modal.querySelector('#pmodal-minus').addEventListener('click', () => {
            if (qty > 1) { qty--; updateQtyDisplay(); }
        });
        modal.querySelector('#pmodal-plus').addEventListener('click', () => {
            if (qty < 20) { qty++; updateQtyDisplay(); }
        });

        modal.querySelector('#pmodal-add').addEventListener('click', () => {
            const name = product.name;
            const img  = product.image_file ? `../images/${product.image_file}` : null;
            const id   = product.id;

            if (cart[name]) {
                cart[name].qty += qty;
            } else {
                cart[name] = {
                    price, qty, img, id,
                    category:    t.catNames[product.category_slug] || product.category_slug,
                    dietaryCode: product.dietary_code,
                    kcal:        product.kcal || 0
                };
            }

            const card = container.querySelector(`[data-id="${product.id}"]`);
            if (card) {
                card.classList.add('added');
                setTimeout(() => card.classList.remove('added'), 400);
            }

            updateFooter();
            modal.remove();

            // ── Pairing suggestions ──────────────────────────────
            const pairings = {
                'Oven-Baked Sweet Potato Wedges': { id: 22, name: 'Avocado Lime Crema', price: 1.00, img: '../images/dip-avocado.png', dietaryCode: 'VG', kcal: 110 },
                'Zucchini Fries':                 { id: 23, name: 'Greek Yogurt Ranch',  price: 1.00, img: '../images/dip-ranch.png',   dietaryCode: 'V',  kcal: 90  }
            };

            if (pairings[name] && !cart[pairings[name].name]) {
                // Mark the main product as pairing too
                if (cart[name]) cart[name].isPairing = true;
                showPairingSuggestion(pairings[name]);
            }
        });
    }

    // ── Pairing suggestion modal ───────────────────────────────
    function showPairingSuggestion(pairing) {
        const existing = document.getElementById('pairing-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'pairing-modal';
        modal.style.cssText = 'position:absolute;inset:0;z-index:300;';

        modal.innerHTML = `
            <div class="modal-overlay" style="align-items:center;">
                <div class="modal-box" style="height:auto;max-height:none;border-radius:20px;transform:scale(0.85);opacity:0;transition:transform 0.25s cubic-bezier(0.34,1.56,0.64,1),opacity 0.2s ease;">
                    <div style="text-align:center;padding:8px 0 4px;">
                        <span style="font-size:36px;">🍽️</span>
                        <h2 style="margin:10px 0 4px;font-size:20px;color:#0b2b16;">Lekker erbij!</h2>
                        <p style="color:#555;font-size:14px;margin:0;">Klanten combineren dit graag met:</p>
                    </div>
                    <div style="display:flex;align-items:center;gap:14px;background:#f0fbe0;border-radius:14px;padding:14px;">
                        <img src="${pairing.img}" alt="${pairing.name}" style="width:70px;height:70px;object-fit:cover;border-radius:10px;">
                        <div style="flex:1;">
                            <div style="font-weight:bold;font-size:16px;color:#0b2b16;">${pairing.name}</div>
                            <div style="font-size:13px;color:#888;margin-top:3px;">🔥 ${pairing.kcal} kcal</div>
                        </div>
                        <div style="font-weight:bold;font-size:18px;color:#ff7e26;">€${pairing.price.toFixed(2)}</div>
                    </div>
                    <div class="modal-actions" style="gap:10px;">
                        <button id="pairing-decline" class="modal-close-btn">Nee, bedankt</button>
                        <button id="pairing-accept" class="modal-confirm-btn">Toevoegen ✓</button>
                    </div>
                </div>
            </div>`;

        document.querySelector('.app-container').appendChild(modal);
        requestAnimationFrame(() => {
            const box = modal.querySelector('.modal-box');
            box.style.transform = 'scale(1)';
            box.style.opacity   = '1';
        });

        modal.querySelector('#pairing-decline').addEventListener('click', () => {
            // Only remove isPairing from the main product that triggered this suggestion
            const mainProducts = ['Oven-Baked Sweet Potato Wedges', 'Zucchini Fries'];
            mainProducts.forEach(name => {
                if (cart[name] && cart[name].isPairing) cart[name].isPairing = false;
            });
            modal.remove();
        });
        modal.querySelector('.modal-overlay').addEventListener('click', e => {
            if (e.target.classList.contains('modal-overlay')) modal.remove();
        });

        modal.querySelector('#pairing-accept').addEventListener('click', () => {
            cart[pairing.name] = {
                price:       pairing.price,
                qty:         1,
                img:         pairing.img,
                id:          pairing.id,
                category:    t.catNames['specials'] || 'Signature Dips',
                dietaryCode: pairing.dietaryCode,
                kcal:        pairing.kcal,
                isPairing:   true
            };
            updateFooter();
            modal.remove();
        });
    }

    // ── Update footer ──────────────────────────────────────────
    function updateFooter() {
        const totalItems = Object.values(cart).reduce((s, i) => s + i.qty, 0);
        const totalPrice = Object.values(cart).reduce((s, i) => s + i.price * i.qty, 0);

        document.querySelector('.total-price').textContent = '€ ' + totalPrice.toFixed(2);

        const orderSpan = document.querySelector('.info-row span:first-child');
        orderSpan.textContent = totalItems > 0
            ? t.itemsInOrder(totalItems)
            : t.orderOverview;

        document.querySelector('.order-btn').textContent = totalItems > 0
            ? t.cartBtnCount(totalItems)
            : t.cartBtn;
    }

    // ── Clear order modal ──────────────────────────────────────
    document.querySelector('.clear-btn').addEventListener('click', () => {
        if (Object.keys(cart).length === 0) return;
        showClearConfirmModal();
    });

    function showClearConfirmModal() {
        const existing = document.getElementById('clear-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'clear-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-box clear-confirm-box" style="height:auto;max-height:none;gap:16px;">
                    <div class="modal-header"><h2>${t.clearTitle}</h2></div>
                    <p style="color:#555;font-size:16px;margin:0;">${t.clearBody}</p>
                    <div class="modal-actions">
                        <button class="modal-close-btn" id="clear-cancel-btn">${t.keepItems}</button>
                        <button class="modal-confirm-btn" id="clear-proceed-btn" style="background:#c0392b;">${t.clearOrder}</button>
                    </div>
                </div>
            </div>`;

        document.querySelector('.app-container').appendChild(modal);
        requestAnimationFrame(() => modal.querySelector('.modal-box').classList.add('visible'));

        modal.querySelector('#clear-cancel-btn').addEventListener('click', () => modal.remove());
        modal.querySelector('.modal-overlay').addEventListener('click', e => {
            if (e.target.classList.contains('modal-overlay')) modal.remove();
        });
        modal.querySelector('#clear-proceed-btn').addEventListener('click', () => {
            cart = {};
            updateFooter();
            modal.remove();
        });
    }

    // ── Cart modal ─────────────────────────────────────────────
    document.querySelector('.order-btn').addEventListener('click', showCartModal);

    function showCartModal() {
        const existing = document.getElementById('cart-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'cart-modal';
        const items = Object.entries(cart);

        if (items.length === 0) {
            modal.innerHTML = `
                <div class="modal-overlay">
                    <div class="modal-box">
                        <h2>${t.cartTitle}</h2>
                        <p class="empty-msg">${t.emptyCart}</p>
                        <div class="modal-actions">
                            <button class="modal-close-btn">${t.continueShopping}</button>
                        </div>
                    </div>
                </div>`;
        } else {
            const total     = items.reduce((s, [, v]) => s + v.price * v.qty, 0);
            const totalKcal = items.reduce((s, [, v]) => s + (v.kcal || 0) * v.qty, 0);
            const itemsHTML = items.map(([name, { price, qty, img, category, dietaryCode, kcal, isPairing }]) => {
                const dietaryLabel = dietaryCode === 'VG' ? t.vegan : t.vegetarian;
                const dietaryClass = dietaryCode === 'VG' ? 'vegan' : 'veg';
                const kcalHTML     = kcal > 0 ? `<span class="cart-pill kcal">🔥 ${kcal} kcal</span>` : '';
                const categoryHTML = category ? `<span class="cart-pill cat">🍽 ${category}</span>` : '';
                const pairingStyle = isPairing
                    ? 'border:2px solid #8cc63f;background:#f0fbe0;border-radius:12px;padding:8px;'
                    : '';
                const pairingBadge = isPairing
                    ? `<span style="font-size:11px;font-weight:bold;background:#8cc63f;color:#0b2b16;padding:2px 8px;border-radius:10px;margin-bottom:4px;display:inline-block;">🍽️ Pairing</span><br>`
                    : '';
                return `
                <div class="cart-item" style="${pairingStyle}">
                    ${img ? `<img src="${img}" alt="${name}" class="cart-item-img">` : '<div class="cart-img-placeholder"></div>'}
                    <div class="cart-item-info">
                        ${pairingBadge}
                        <span class="cart-item-name">${name}</span>
                        <div class="cart-item-pills">
                            ${categoryHTML}
                            <span class="cart-pill dietary ${dietaryClass}">${dietaryLabel}</span>
                            ${kcalHTML}
                        </div>
                        <span class="cart-item-unit">€ ${price.toFixed(2)} ${t.each}</span>
                    </div>
                    <div class="cart-item-controls">
                        <button class="qty-btn minus" data-name="${name}">−</button>
                        <span class="qty-display">${qty}</span>
                        <button class="qty-btn plus" data-name="${name}">+</button>
                    </div>
                    <span class="cart-item-subtotal">€ ${(price * qty).toFixed(2)}</span>
                </div>`;
            }).join('');

            modal.innerHTML = `
                <div class="modal-overlay">
                    <div class="modal-box">
                        <div class="modal-header">
                            <h2>${t.cartTitle}</h2>
                            <span class="modal-item-count">${items.length} item${items.length > 1 ? 's' : ''}</span>
                        </div>
                        <div class="cart-items-list">${itemsHTML}</div>
                        <div class="cart-total-row">
                            <span>${t.total}</span>
                            <span style="color:#888;font-size:15px;">🔥 ${totalKcal} kcal</span>
                            <span class="cart-total-amount">€ ${total.toFixed(2)}</span>
                        </div>
                        <div class="modal-actions">
                            <button class="modal-close-btn">${t.continueShopping}</button>
                            <button class="modal-confirm-btn">${t.placeOrder}</button>
                        </div>
                    </div>
                </div>`;
        }

        document.querySelector('.app-container').appendChild(modal);
        requestAnimationFrame(() => {
            const box = modal.querySelector('.modal-box');
            if (box) box.classList.add('visible');
        });

        modal.querySelector('.modal-close-btn').addEventListener('click', () => modal.remove());
        modal.querySelector('.modal-overlay').addEventListener('click', e => {
            if (e.target.classList.contains('modal-overlay')) modal.remove();
        });

        modal.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                const name = e.target.getAttribute('data-name');
                if (btn.classList.contains('minus')) {
                    cart[name].qty -= 1;
                    if (cart[name].qty <= 0) delete cart[name];
                } else {
                    cart[name].qty += 1;
                }
                updateFooter();
                modal.remove();
                showCartModal();
            });
        });

        const confirmBtn = modal.querySelector('.modal-confirm-btn');
        if (confirmBtn) confirmBtn.addEventListener('click', () => placeOrder(modal));
    }

    // ── Place order ────────────────────────────────────────────
    async function placeOrder(modal) {
        const orderType = sessionStorage.getItem('order_type') || 'eat_in';
        const items     = Object.values(cart).map(item => ({
            product_id: item.id,
            quantity:   item.qty
        }));

        const confirmBtn       = modal.querySelector('.modal-confirm-btn');
        confirmBtn.textContent = t.placingOrder;
        confirmBtn.disabled    = true;

        try {
            const res  = await fetch('../orders/place-order.php', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({ order_type: orderType, items })
            });
            const json = await res.json();

            if (!json.success) throw new Error(json.error || 'Order failed');

            const parts      = json.order_number.split('-');
            const rawNum     = parseInt(parts[parts.length - 1], 10);
            const displayNum = String(rawNum % 100).padStart(2, '0');

            modal.innerHTML = `
                <div class="modal-overlay">
                    <div class="modal-box confirm-box visible" style="gap:12px;align-items:center;text-align:center;">
                        <div class="checkmark">✓</div>
                        <h2 style="margin:0;font-size:22px;color:#0b2b16;">${t.orderPlaced}</h2>
                        <p style="margin:0;color:#555;font-size:15px;">${t.beingPrepared}</p>
                        <div style="background:#f5f5f5;border-radius:16px;padding:18px 32px;margin:4px 0;width:100%;">
                            <p style="margin:0 0 4px 0;font-size:13px;color:#888;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">${t.yourOrderNumber}</p>
                            <p style="margin:0;font-size:64px;font-weight:900;color:#0b2b16;line-height:1;">#${displayNum}</p>
                            <p style="margin:4px 0 0;font-size:12px;color:#aaa;">${json.order_number}</p>
                        </div>
                        <p style="margin:0;font-size:13px;color:#aaa;">${t.callWhenReady}</p>
                        <div class="modal-actions" style="width:100%;flex-direction:column;gap:10px;margin-top:4px;">
                            <button class="modal-confirm-btn" id="done-btn" style="width:100%;padding:14px;font-size:16px;">${t.continueOrdering}</button>
                            <button id="menu-btn" style="width:100%;padding:14px;background:#e2f497;border:none;border-radius:8px;font-weight:bold;font-size:15px;color:#0b2b16;cursor:pointer;">
                                ${t.backToMenu}
                            </button>
                        </div>
                    </div>
                </div>`;

            cart = {};
            updateFooter();

            modal.querySelector('#done-btn').addEventListener('click', () => modal.remove());
            modal.querySelector('#menu-btn').addEventListener('click', () => window.location.href = '../index.php');

        } catch (err) {
            confirmBtn.textContent = t.placeOrder;
            confirmBtn.disabled    = false;
            alert('Something went wrong: ' + err.message);
        }
    }
});