<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Happy Herbivore POS</title>
    <link rel="stylesheet" href="product.css">
</head>
<body>

<div class="app-container">
    <header class="header">
        <img src="images/dino.png" alt="Dino Mascot" class="dino-image">
        <img src="images/herbivore-title.png" alt="Happy Herbivore" class="title-image">
    </header>

    <div class="main-content">
        <aside class="sidebar">
            <button class="category-btn active" data-category="drinks">Drinks</button>
            <button class="category-btn" data-category="breakfast">Breakfast</button>
            <button class="category-btn" data-category="lunch">Lunch &<br>Dinner</button>
            <button class="category-btn" data-category="snacks">Handhelds</button>
            <button class="category-btn" data-category="desserts">Side &<br>Small plates</button>
            <button class="category-btn" data-category="specials">Signature<br>Dips</button>
        </aside>

        <!-- Products are loaded here dynamically by main.js -->
        <section class="product-grid" id="product-container">
            <div class="loading-msg">Loading menu...</div>
        </section>
    </div>

    <footer class="footer">
        <div class="button-row">
            <button class="clear-btn">CLEAR ORDER</button>
            <button class="order-btn">CART</button>
        </div>
        <div class="info-row">
            <span>Orderoverview</span>
            <span class="total-label">Total</span>
            <span class="total-price">€ 0.00</span>
        </div>
    </footer>
</div>

<script src="main.js"></script>
</body>
</html>