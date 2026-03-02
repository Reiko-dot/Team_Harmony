<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kiosk Start</title>
    <link rel="stylesheet" href="style.css">
    <style>
        #flash {
            position: fixed;
            inset: 0;
            background: white;
            opacity: 0;
            pointer-events: none;
            z-index: 9999;
            transition: opacity 0.28s ease;
        }
    </style>
</head>
<body>
    <div id="flash"></div>

    <div class="kiosk-wrap" id="kioskWrap">
        <div class="background-slider">
            <img src="images/acai-bowl.png" class="slide-img-1 active">
            <img src="images/PB-CT.png" class="slide-img-2">
        </div>
        <div class="overlay"></div>
        <div class="content">
            <img src="images/kiosk-logo.png" alt="Logo" class="logo-main">
            <p class="tap-text">Touch screen to start</p>
        </div>
        <div class="brand-bar">
            <span>Happy Herbivore &mdash; Fresh &amp; Plant-Based</span>
        </div>
    </div>

    <script src="kiosk-start.js"></script>
</body>
</html>