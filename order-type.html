<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Type</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background: #222;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;
        }

        .kiosk-wrap {
            aspect-ratio: 9 / 16;
            height: 100vh;
            background: white;
            display: flex;
            flex-direction: column;
            box-shadow: 0 0 40px rgba(0, 0, 0, 0.6);
            overflow: hidden;
        }

        .header {
            background: #8cc63f;
            padding: 28px 24px 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }

        .header img {
            height: 80px;
        }

        .header h1 {
            font-family: Arial, sans-serif;
            font-size: 20px;
            color: #0b2b16;
            font-weight: bold;
            letter-spacing: 1px;
        }

        .main {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 28px;
            padding: 40px 32px;
            background: #f9fdf3;
        }

        .question {
            font-family: Arial, sans-serif;
            font-size: 28px;
            font-weight: bold;
            color: #0b2b16;
            text-align: center;
        }

        .options {
            display: flex;
            flex-direction: column;
            gap: 20px;
            width: 100%;
        }

        .option-btn {
            width: 100%;
            padding: 36px 24px;
            border: 3px solid #8cc63f;
            border-radius: 20px;
            background: white;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            transition: all 0.18s ease;
            -webkit-tap-highlight-color: transparent;
            user-select: none;
            position: relative;
            overflow: hidden;
        }

        .option-btn:active,
        .option-btn.tapped {
            transform: scale(0.97);
        }

        .option-btn.eat-in:active,
        .option-btn.eat-in.tapped {
            background: #e2f497;
            border-color: #0b2b16;
        }

        .option-btn.takeout:active,
        .option-btn.takeout.tapped {
            background: #fff0e0;
            border-color: #ff7e26;
        }

        .option-btn .icon {
            font-size: 56px;
        }

        .option-btn .label {
            font-family: Arial, sans-serif;
            font-size: 26px;
            font-weight: bold;
            color: #0b2b16;
        }

        .option-btn.takeout .label {
            color: #cc5500;
        }

        .option-btn .sublabel {
            font-family: Arial, sans-serif;
            font-size: 15px;
            color: #666;
        }

        .option-btn.takeout {
            border-color: #ff7e26;
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(140, 198, 63, 0.35);
            transform: scale(0);
            pointer-events: none;
            animation: rippleAnim 0.5s ease-out forwards;
        }

        .takeout .ripple {
            background: rgba(255, 126, 38, 0.3);
        }

        @keyframes rippleAnim {
            to {
                transform: scale(8);
                opacity: 0;
            }
        }

        .footer {
            background: #8cc63f;
            padding: 16px 24px;
            display: flex;
            justify-content: center;
        }

        .footer span {
            font-family: Arial, sans-serif;
            font-size: 13px;
            font-weight: bold;
            color: #0b2b16;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
    </style>
</head>

<body>
    <div class="kiosk-wrap">
        <div class="header">
            <img src="images/kiosk-logo.png" alt="Logo">
            <h1>How would you like your order?</h1>
        </div>

        <div class="main">
            <p class="question">Choose your order type</p>
            <div class="options">
                <button class="option-btn eat-in" id="eatIn">
                    <span class="icon">🪴</span>
                    <span class="label">Eat In</span>
                    <span class="sublabel">Dine with us in the restaurant</span>
                </button>
                <button class="option-btn takeout" id="takeout">
                    <span class="icon">🥡</span>
                    <span class="label">Take Out</span>
                    <span class="sublabel">Pick up your order to go</span>
                </button>
            </div>
        </div>

        <div class="footer">
            <span>Happy Herbivore &mdash; Fresh &amp; Plant-Based</span>
        </div>
    </div>

    <script>
        function handleChoice(btn, orderType) {
            btn.addEventListener('click', (e) => {
                // Ripple effect
                const ripple = document.createElement('div');
                ripple.className = 'ripple';
                const rect = btn.getBoundingClientRect();
                const size = 80;
                ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
                btn.appendChild(ripple);
                btn.classList.add('tapped');

                // Save choice so product-screen knows eat_in or takeout
                sessionStorage.setItem('order_type', orderType);

                setTimeout(() => window.location.href = 'product-screen.php', 320);
            });
        }

        handleChoice(document.getElementById('eatIn'), 'eat_in');
        handleChoice(document.getElementById('takeout'), 'takeout');
    </script>
</body>

</html>