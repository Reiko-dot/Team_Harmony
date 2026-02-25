document.addEventListener('DOMContentLoaded', () => {
            const buttons = document.querySelectorAll('.category-btn');
            const products = document.querySelectorAll('.product-item');

            function filterCategory(category) {
                products.forEach(product => {
                    // Check of het product de juiste categorie class heeft
                    if (product.classList.contains('category-' + category)) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = 'none';
                    }
                });
            }

            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    // 1. Wissel de active class
                    buttons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    // 2. Filter de producten
                    const selectedCategory = button.getAttribute('data-category');
                    filterCategory(selectedCategory);
                });
            });

            // Zorg dat we beginnen met 'drinks' bij het laden
            filterCategory('drinks');
        });