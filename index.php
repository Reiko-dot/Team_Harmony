<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kiosk Start</title>
    <link rel="stylesheet" href="css/style.css">
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
            <img src="images/pb-cacao-toast.png" class="slide-img-2">
            <img src="images/garden-breakfast-wrap.png" class="slide-img-3">
            <img src="images/falafel-bites.png" class="slide-img-4">
            <img src="images/citrus-drink.png" class="slide-img-5">
            <img src="images/dip-avocado.png" class="slide-img-6">
            <img src="images/teriyaki-tempeh.png" class="slide-img-7">
            <img src="images/berry-blast.png" class="slide-img-8">
            <img src="images/chickpea-wrap.png" class="slide-img-9">
        </div>
        <div class="overlay"></div>
        <div class="content">
            <img src="images/kiosk-logo.png" alt="Logo" class="logo-main">
            <p class="tap-text">Touch screen to start</p>
        </div>
    </div>

    <script src="js/kiosk-start.js"></script>
</body>
</html>