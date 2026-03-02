document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.category-btn');
    const products = document.querySelectorAll('.product-item');

    let cart = {};

    function filterCategory(category) {
        products.forEach(product => {
            product.style.display = product.classList.contains('category-' + category) ? 'block' : 'none';
        });
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterCategory(button.getAttribute('data-category'));
        });
    });

    filterCategory('drinks');

    products.forEach(product => {
        product.addEventListener('click', () => {
            const name = product.querySelector('.name').textContent.trim();
            const priceText = product.querySelector('.price').textContent.trim();
            const price = parseFloat(priceText.replace('€', '').replace(',', '.').trim());
            const img = product.querySelector('img') ? product.querySelector('img').src : null;

            if (cart[name]) {
                cart[name].qty += 1;
            } else {
                cart[name] = { price, qty: 1, img };
            }

            product.classList.add('added');
            setTimeout(() => product.classList.remove('added'), 400);

            updateFooter();
        });
    });

    function updateFooter() {
        const totalItems = Object.values(cart).reduce((s, i) => s + i.qty, 0);
        const totalPrice = Object.values(cart).reduce((s, i) => s + i.price * i.qty, 0);

        document.querySelector('.total-price').textContent = '€ ' + totalPrice.toFixed(2);

        const orderSpan = document.querySelector('.info-row span:first-child');
        orderSpan.textContent = totalItems > 0 ? `${totalItems} item${totalItems > 1 ? 's' : ''} in order` : 'Orderoverview';

        const orderBtn = document.querySelector('.order-btn');
        orderBtn.textContent = totalItems > 0 ? `CART (${totalItems})` : 'CART';
    }

    document.querySelector('.clear-btn').addEventListener('click', () => {
        const totalItems = Object.values(cart).reduce((s, i) => s + i.qty, 0);
        if (totalItems === 0) return;
        showClearConfirmModal();
    });

    function showClearConfirmModal() {
        const existing = document.getElementById('clear-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'clear-modal';
        modal.innerHTML = `
            <div class="modal-overlay" style="align-items: flex-end;">
                <div class="modal-box clear-confirm-box" style="height: auto; max-height: none; gap: 16px;">
                    <div class="modal-header">
                        <h2>🗑️ Clear Order?</h2>
                    </div>
                    <p style="color: #555; font-size: 16px; margin: 0;">Are you sure you want to remove all items from your order? This cannot be undone.</p>
                    <div class="modal-actions">
                        <button class="modal-close-btn" id="clear-cancel-btn">Keep Items</button>
                        <button class="modal-confirm-btn" id="clear-proceed-btn" style="background:#c0392b;">Clear Order</button>
                    </div>
                </div>
            </div>`;

        document.querySelector('.app-container').appendChild(modal);

        requestAnimationFrame(() => {
            const box = modal.querySelector('.modal-box');
            if (box) box.classList.add('visible');
        });

        modal.querySelector('#clear-cancel-btn').addEventListener('click', () => modal.remove());
        modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) modal.remove();
        });
        modal.querySelector('#clear-proceed-btn').addEventListener('click', () => {
            cart = {};
            updateFooter();
            modal.remove();
        });
    }

    document.querySelector('.order-btn').addEventListener('click', () => {
        showCartModal();
    });

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
                        </div>
                    </div>
                </div>`;
        } else {
            const total = items.reduce((s, [, v]) => s + v.price * v.qty, 0);
            const itemsHTML = items.map(([name, { price, qty, img }]) => `
                <div class="cart-item">
                    ${img ? `<img src="${img}" alt="${name}" class="cart-item-img">` : '<div class="cart-img-placeholder"></div>'}
                    <div class="cart-item-info">
                        <span class="cart-item-name">${name}</span>
                        <span class="cart-item-unit">€ ${price.toFixed(2)} each</span>
                    </div>
                    <div class="cart-item-controls">
                        <button class="qty-btn minus" data-name="${name}">−</button>
                        <span class="qty-display">${qty}</span>
                        <button class="qty-btn plus" data-name="${name}">+</button>
                    </div>
                    <span class="cart-item-subtotal">€ ${(price * qty).toFixed(2)}</span>
                </div>`).join('');

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
        modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) modal.remove();
        });

        modal.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
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
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                const orderNumber = String(Math.floor(Math.random() * 900) + 100);
                modal.innerHTML = `
                    <div class="modal-overlay">
                        <div class="modal-box confirm-box visible" style="gap: 12px; align-items: center; text-align: center;">
                            <div class="checkmark">✓</div>
                            <h2 style="margin: 0; font-size: 22px; color: #0b2b16;">Order Placed!</h2>
                            <p style="margin: 0; color: #555; font-size: 15px;">Your food is being prepared. 🌿</p>
                            <div style="background: #f5f5f5; border-radius: 16px; padding: 18px 32px; margin: 4px 0; width: 100%;">
                                <p style="margin: 0 0 4px 0; font-size: 13px; color: #888; letter-spacing: 1px; text-transform: uppercase; font-weight: bold;">Your order number</p>
                                <p style="margin: 0; font-size: 64px; font-weight: 900; color: #0b2b16; line-height: 1;">#${orderNumber}</p>
                            </div>
                            <p style="margin: 0; font-size: 13px; color: #aaa;">We'll call your number when it's ready</p>
                            <div class="modal-actions" style="width: 100%; flex-direction: column; gap: 10px; margin-top: 4px;">
                                <button class="modal-confirm-btn" id="done-btn" style="width: 100%; padding: 14px; font-size: 16px;">Continue ordering</button>
                                <button id="menu-btn" style="width: 100%; padding: 14px; background: #e2f497; border: none; border-radius: 8px; font-weight: bold; font-size: 15px; color: #0b2b16; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
                                    <span style="font-size: 18px;">🏠</span> Back to Menu
                                </button>
                            </div>
                        </div>
                    </div>`;
                cart = {};
                updateFooter();
                modal.querySelector('#done-btn').addEventListener('click', () => modal.remove());
                modal.querySelector('#menu-btn').addEventListener('click', () => window.location.href = 'index.html');
            });
        }
    }
});



// Slideshow
        const img1 = document.querySelector('.slide-img-1');
        const img2 = document.querySelector('.slide-img-2');
        let cur = 1;
        setInterval(() => {
            if (cur === 1) { img1.classList.remove('active'); img2.classList.add('active'); cur = 2; }
            else { img2.classList.remove('active'); img1.classList.add('active'); cur = 1; }
        }, 3500);

        // Tap to navigate
        document.getElementById('kioskWrap').addEventListener('click', (e) => {
            const wrap = e.currentTarget;
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            const rect = wrap.getBoundingClientRect();
            const size = 80;
            ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px`;
            wrap.appendChild(ripple);
            setTimeout(() => window.location.href = 'order-type.html', 350);
        });