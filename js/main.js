// js/main.js
// Lives at:           TEAM_HARMONY/js/main.js
// Loaded by:          TEAM_HARMONY/products/product-screen.php
//
// Path reference point = products/product-screen.php (the HTML page)
//   ../get-products.php          → root
//   ../images/                   → root/images/
//   ../orders/place-order.php    → orders folder
//   ../index.php                 → root (back to start)

document.addEventListener('DOMContentLoaded', () => {
    const buttons   = document.querySelectorAll('.category-btn');
    const container = document.getElementById('product-container');

    let cart            = {};
    let currentCategory = 'breakfast';

    // ── Load products ──────────────────────────────────────────
    async function loadProducts(category) {
        container.innerHTML = '<div class="loading-msg">Loading...</div>';
        currentCategory = category;

        try {
            // get-products.php is at root, page is in /products/ → ../
            const res  = await fetch(`../get-products.php?category=${category}`);
            const json = await res.json();

            if (!json.success || !json.data.length) {
                container.innerHTML = '<div class="loading-msg">No products found.</div>';
                return;
            }

            container.innerHTML = '';

            json.data.forEach(product => {
                const div = document.createElement('div');
                div.className = `product-item category-${product.category_slug}`;
                div.dataset.id    = product.id;
                div.dataset.name  = product.name;
                div.dataset.price = product.price;

                // images/ is at root, page is in /products/ → ../images/
                const imgHTML = product.image_file
                    ? `<img src="../images/${product.image_file}" alt="${product.name}">`
                    : `<div class="product-placeholder"></div>`;

                const badge = product.dietary_code === 'VG'
                    ? '<span class="dietary-badge vegan">VG</span>'
                    : '<span class="dietary-badge veg">V</span>';

                div.innerHTML = `
                    ${imgHTML}
                    <div class="product-details">
                        <span class="name">${product.name}</span>
                        <span class="price">€ ${parseFloat(product.price).toFixed(2)}</span>
                    </div>
                    ${badge}`;

                div.addEventListener('click', () => showProductModal(product));
                container.appendChild(div);
            });

        } catch (err) {
            container.innerHTML = '<div class="loading-msg">Failed to load products.</div>';
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

        const dietaryLabel = product.dietary_code === 'VG' ? 'Vegan' : 'Vegetarian';
        const dietaryClass = product.dietary_code === 'VG' ? 'vegan' : 'veg';
        const kcalHTML     = product.kcal > 0
            ? `<span class="pmodal-pill kcal">🔥 ${product.kcal} kcal</span>`
            : '';

        const currentQty = cart[product.name] ? cart[product.name].qty : 0;
        const price      = parseFloat(product.price);

        const categoryNames = {
            drinks: 'Drinks', breakfast: 'Breakfast', lunch: 'Lunch & Dinner',
            snacks: 'Handhelds', desserts: 'Sides & Small Plates', specials: 'Signature Dips'
        };
        const categoryLabel = categoryNames[product.category_slug] || product.category_slug;

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
                        ${currentQty > 0 ? `<p class="pmodal-already-added">✓ Already ${currentQty}× in cart</p>` : ''}
                        <div class="pmodal-qty-row">
                            <button class="pmodal-qty-btn" id="pmodal-minus">−</button>
                            <span class="pmodal-qty-display" id="pmodal-qty">1</span>
                            <button class="pmodal-qty-btn" id="pmodal-plus">+</button>
                        </div>
                        <button class="pmodal-add-btn" id="pmodal-add">
                            Add to Cart &nbsp;·&nbsp; <span id="pmodal-add-price">€ ${price.toFixed(2)}</span>
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
            // Store image path relative to the HTML page (/products/)
            const img  = product.image_file ? `../images/${product.image_file}` : null;
            const id   = product.id;

            if (cart[name]) {
                cart[name].qty += qty;
            } else {
                cart[name] = {
                    price, qty, img, id,
                    category:    categoryNames[product.category_slug] || product.category_slug,
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
        });
    }

    // ── Update footer ──────────────────────────────────────────
    function updateFooter() {
        const totalItems = Object.values(cart).reduce((s, i) => s + i.qty, 0);
        const totalPrice = Object.values(cart).reduce((s, i) => s + i.price * i.qty, 0);

        document.querySelector('.total-price').textContent = '€ ' + totalPrice.toFixed(2);

        const orderSpan = document.querySelector('.info-row span:first-child');
        orderSpan.textContent = totalItems > 0
            ? `${totalItems} item${totalItems > 1 ? 's' : ''} in order`
            : 'Orderoverview';

        document.querySelector('.order-btn').textContent = totalItems > 0 ? `CART (${totalItems})` : 'CART';
    }

    // ── Clear order ────────────────────────────────────────────
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
                    <div class="modal-header"><h2>🗑️ Clear Order?</h2></div>
                    <p style="color:#555;font-size:16px;margin:0;">Are you sure you want to remove all items? This cannot be undone.</p>
                    <div class="modal-actions">
                        <button class="modal-close-btn" id="clear-cancel-btn">Keep Items</button>
                        <button class="modal-confirm-btn" id="clear-proceed-btn" style="background:#c0392b;">Clear Order</button>
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
                        <h2>Your Cart</h2>
                        <p class="empty-msg">🌿 No items added yet.</p>
                        <div class="modal-actions">
                            <button class="modal-close-btn">Close</button>
                            <button class="modal-menu-btn" onclick="window.location.href='../index.php'">🏠 Menu</button>
                        </div>
                    </div>
                </div>`;
        } else {
            const total     = items.reduce((s, [, v]) => s + v.price * v.qty, 0);
            const itemsHTML = items.map(([name, { price, qty, img, category, dietaryCode, kcal }]) => {
                const dietaryLabel = dietaryCode === 'VG' ? 'Vegan' : 'Vegetarian';
                const dietaryClass = dietaryCode === 'VG' ? 'vegan' : 'veg';
                const kcalHTML     = kcal > 0 ? `<span class="cart-pill kcal">🔥 ${kcal} kcal</span>` : '';
                const categoryHTML = category ? `<span class="cart-pill cat">🍽 ${category}</span>` : '';
                return `
                <div class="cart-item">
                    ${img ? `<img src="${img}" alt="${name}" class="cart-item-img">` : '<div class="cart-img-placeholder"></div>'}
                    <div class="cart-item-info">
                        <span class="cart-item-name">${name}</span>
                        <div class="cart-item-pills">
                            ${categoryHTML}
                            <span class="cart-pill dietary ${dietaryClass}">${dietaryLabel}</span>
                            ${kcalHTML}
                        </div>
                        <span class="cart-item-unit">€ ${price.toFixed(2)} each</span>
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
                            <h2>🛒 Your Order</h2>
                            <span class="modal-item-count">${items.length} item${items.length > 1 ? 's' : ''}</span>
                        </div>
                        <div class="cart-items-list">${itemsHTML}</div>
                        <div class="cart-total-row">
                            <span>Total</span>
                            <span class="cart-total-amount">€ ${total.toFixed(2)}</span>
                        </div>
                        <div class="modal-actions">
                            <button class="modal-close-btn">Continue</button>
                            <button class="modal-confirm-btn">Place Order</button>
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
        confirmBtn.textContent = 'Placing order...';
        confirmBtn.disabled    = true;

        try {
            // place-order.php is in /orders/, page is in /products/ → ../orders/
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
                        <h2 style="margin:0;font-size:22px;color:#0b2b16;">Order Placed!</h2>
                        <p style="margin:0;color:#555;font-size:15px;">Your food is being prepared. 🌿</p>
                        <div style="background:#f5f5f5;border-radius:16px;padding:18px 32px;margin:4px 0;width:100%;">
                            <p style="margin:0 0 4px 0;font-size:13px;color:#888;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">Your order number</p>
                            <p style="margin:0;font-size:64px;font-weight:900;color:#0b2b16;line-height:1;">#${displayNum}</p>
                            <p style="margin:4px 0 0;font-size:12px;color:#aaa;">${json.order_number}</p>
                        </div>
                        <p style="margin:0;font-size:13px;color:#aaa;">We'll call your number when it's ready</p>
                        <div class="modal-actions" style="width:100%;flex-direction:column;gap:10px;margin-top:4px;">
                            <button class="modal-confirm-btn" id="done-btn" style="width:100%;padding:14px;font-size:16px;">Continue ordering</button>
                            <button id="menu-btn" style="width:100%;padding:14px;background:#e2f497;border:none;border-radius:8px;font-weight:bold;font-size:15px;color:#0b2b16;cursor:pointer;">
                                🏠 Back to Menu
                            </button>
                        </div>
                    </div>
                </div>`;

            cart = {};
            updateFooter();

            modal.querySelector('#done-btn').addEventListener('click', () => modal.remove());
            // Back to start screen — page is in /products/ → ../
            modal.querySelector('#menu-btn').addEventListener('click', () => window.location.href = '../index.php');

        } catch (err) {
            confirmBtn.textContent = 'Place Order';
            confirmBtn.disabled    = false;
            alert('Something went wrong: ' + err.message);
        }
    }
});