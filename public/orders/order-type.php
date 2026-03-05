<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Type</title>
    <link rel="stylesheet" href="../css/order-type.css">
</head>
<body>
    <div class="kiosk-wrap">
        <div class="header">
            <img src="../images/kiosk-logo.png" alt="Logo">
            <h1 id="headerTitle">How would you like your order?</h1>
        </div>

        <div class="main">
            <p class="question" id="questionText">Choose your order type</p>
            <div class="options">

                <button class="option-btn eat-in" id="eatIn">
                    <div class="btn-glow eat-glow"></div>
                    <span class="label" id="eatInLabel">Eat In</span>
                    <span class="sublabel" id="eatInSub">Dine with us in the restaurant</span>
                </button>

                <button class="option-btn takeout" id="takeout">
                    <div class="btn-glow take-glow"></div>
                    <span class="label" id="takeoutLabel">Take Out</span>
                    <span class="sublabel" id="takeoutSub">Pick up your order to go</span>
                </button>

            </div>
        </div>
    </div>

    <script>
        // ── Language translations ──────────────────────────────
        const t = {
            nl: {
                header:     'Hoe wil je bestellen?',
                question:   'Kies je bestelmethode',
                eatIn:      'Hier eten',
                eatInSub:   'Geniet van je maaltijd in het restaurant',
                takeout:    'Meenemen',
                takeoutSub: 'Haal je bestelling op om mee te nemen'
            },
            en: {
                header:     'How would you like your order?',
                question:   'Choose your order type',
                eatIn:      'Eat In',
                eatInSub:   'Dine with us in the restaurant',
                takeout:    'Take Out',
                takeoutSub: 'Pick up your order to go'
            },
            de: {
                header:     'Wie möchten Sie bestellen?',
                question:   'Bestellmethode wählen',
                eatIn:      'Hier essen',
                eatInSub:   'Genießen Sie Ihr Essen bei uns',
                takeout:    'Mitnehmen',
                takeoutSub: 'Holen Sie Ihre Bestellung ab'
            }
        };

        const lang = sessionStorage.getItem('lang') || 'nl';
        const tx   = t[lang] || t.nl;

        document.getElementById('headerTitle').textContent  = tx.header;
        document.getElementById('questionText').textContent = tx.question;
        document.getElementById('eatInLabel').textContent   = tx.eatIn;
        document.getElementById('eatInSub').textContent     = tx.eatInSub;
        document.getElementById('takeoutLabel').textContent = tx.takeout;
        document.getElementById('takeoutSub').textContent   = tx.takeoutSub;

        // ── Ripple + navigate ──────────────────────────────────
        function handleChoice(btn, orderType) {
            btn.addEventListener('click', (e) => {
                const ripple = document.createElement('div');
                ripple.className = 'ripple';
                const rect = btn.getBoundingClientRect();
                const size = 120;
                ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px`;
                btn.appendChild(ripple);
                btn.classList.add('tapped');
                sessionStorage.setItem('order_type', orderType);
                setTimeout(() => window.location.href = '../products/product-screen.php', 380);
            });
        }

        handleChoice(document.getElementById('eatIn'),   'eat_in');
        handleChoice(document.getElementById('takeout'), 'takeout');
    </script>
</body>
</html>