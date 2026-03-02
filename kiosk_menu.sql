  -- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 02 mrt 2026 om 22:22
-- Serverversie: 10.4.32-MariaDB
-- PHP-versie: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kiosk_menu`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `categories`
--

INSERT INTO `categories` (`id`, `slug`, `name`, `sort_order`) VALUES
(1, 'drinks', 'Drinks', 1),
(2, 'breakfast', 'Breakfast', 2),
(3, 'lunch', 'Lunch & Dinner', 3),
(4, 'snacks', 'Handhelds', 4),
(5, 'desserts', 'Sides & Small Plates', 5),
(6, 'specials', 'Signature Dips', 6);

-- --------------------------------------------------------

--
-- Stand-in structuur voor view `category_price_summary`
-- (Zie onder voor de actuele view)
--
CREATE TABLE `category_price_summary` (
`category` varchar(100)
,`total_items` bigint(21)
,`min_price` decimal(6,2)
,`max_price` decimal(6,2)
,`avg_price` decimal(7,2)
);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `dietary_tags`
--

CREATE TABLE `dietary_tags` (
  `id` int(11) NOT NULL,
  `code` varchar(10) NOT NULL,
  `label` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `dietary_tags`
--

INSERT INTO `dietary_tags` (`id`, `code`, `label`) VALUES
(1, 'VG', 'Vegan'),
(2, 'V', 'Vegetarian');

-- --------------------------------------------------------

--
-- Stand-in structuur voor view `menu_full`
-- (Zie onder voor de actuele view)
--
CREATE TABLE `menu_full` (
`id` int(11)
,`category` varchar(100)
,`category_slug` varchar(50)
,`product_name` varchar(150)
,`description` text
,`price` decimal(6,2)
,`kcal` int(11)
,`dietary_code` varchar(10)
,`dietary_label` varchar(50)
,`image_file` varchar(200)
,`available` tinyint(1)
,`sort_order` int(11)
);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_number` varchar(20) NOT NULL,
  `order_type` enum('eat_in','takeout') NOT NULL,
  `status` enum('pending','preparing','ready','completed','cancelled') NOT NULL DEFAULT 'pending',
  `total_price` decimal(8,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `order_counter`
--

CREATE TABLE `order_counter` (
  `date` date NOT NULL,
  `counter` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `subtotal` decimal(8,2) GENERATED ALWAYS AS (`price` * `quantity`) STORED
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(6,2) NOT NULL,
  `kcal` int(11) DEFAULT NULL,
  `dietary_tag_id` int(11) DEFAULT NULL,
  `image_file` varchar(200) DEFAULT NULL,
  `image_data` longblob DEFAULT NULL,
  `image_mime` varchar(50) DEFAULT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `description`, `price`, `kcal`, `dietary_tag_id`, `image_file`, `image_data`, `image_mime`, `available`, `sort_order`, `created_at`) VALUES
(1, 1, 'Green Glow Smoothie', 'Spinach, pineapple, cucumber, and coconut water.', 3.50, 120, 1, 'green-glow.png', NULL, NULL, 1, 1, '2026-03-02 20:25:16'),
(2, 1, 'Berry Blast Smoothie', 'A creamy blend of strawberries, blueberries, and raspberries with almond milk.', 3.80, 140, 1, 'berry-blast.png', NULL, NULL, 1, 2, '2026-03-02 20:25:16'),
(3, 1, 'Citrus Cooler', 'A refreshing mix of orange juice, sparkling water, and a hint of lime.', 3.00, 90, 1, 'citrus-drink.png', NULL, NULL, 1, 3, '2026-03-02 20:25:16'),
(4, 1, 'Iced Matcha Latte', 'Lightly sweetened matcha green tea with almond milk.', 3.00, 90, 1, 'iced-matcha.png', NULL, NULL, 1, 4, '2026-03-02 20:25:16'),
(5, 1, 'Fruit-Infused Water', 'Freshly infused water with a choice of lemon-mint, strawberry-basil, or cucumber-lime.', 1.50, 0, 1, 'fruit-infused.png', NULL, NULL, 1, 5, '2026-03-02 20:25:16'),
(6, 2, 'Morning Boost Açaí Bowl', 'A chilled blend of açaí and banana topped with crunchy granola, chia seeds, and coconut.', 7.50, 320, 1, 'acai-bowl.png', NULL, NULL, 1, 1, '2026-03-02 20:25:16'),
(7, 2, 'The Garden Breakfast Wrap', 'Whole-grain wrap with fluffy scrambled eggs, baby spinach, and a light yogurt-herb sauce.', 6.50, 280, 2, 'garden-breakfast-wrap.png', NULL, NULL, 1, 2, '2026-03-02 20:25:16'),
(8, 2, 'Peanut Butter & Cacao Toast', 'Sourdough toast with 100% natural peanut butter, banana, and a sprinkle of cacao nibs.', 5.00, 240, 1, 'pb-cacao-toast.png', NULL, NULL, 1, 3, '2026-03-02 20:25:16'),
(9, 2, 'Overnight Oats: Apple Pie Style', 'Oats soaked in almond milk with grated apple, cinnamon, and crushed walnuts.', 5.50, 290, 1, 'overnight-oats.png', NULL, NULL, 1, 4, '2026-03-02 20:25:16'),
(10, 3, 'Tofu Power Tahini Bowl', 'Tri-color quinoa, maple-glazed tofu, roasted sweet potatoes, and kale with tahini dressing.', 10.50, 480, 1, 'PB-CT.png', NULL, NULL, 1, 1, '2026-03-02 20:25:16'),
(11, 3, 'The Supergreen Harvest', 'Massaged kale, edamame, avocado, cucumber, and toasted pumpkin seeds with lemon-olive oil.', 9.50, 310, 1, 'supergreen-harvest.png', NULL, NULL, 1, 2, '2026-03-02 20:25:16'),
(12, 3, 'Mediterranean Falafel Bowl', 'Baked falafel, hummus, pickled red onions, cherry tomatoes, and cucumber on a bed of greens.', 10.00, 440, 1, 'mediterranean-falafel.png', NULL, NULL, 1, 3, '2026-03-02 20:25:16'),
(13, 3, 'Warm Teriyaki Tempeh Bowl', 'Steamed brown rice, seared tempeh, broccoli, and shredded carrots with a ginger-soy glaze.', 11.00, 500, 1, 'teriyaki-tempeh.png', NULL, NULL, 1, 4, '2026-03-02 20:25:16'),
(14, 4, 'Zesty Chickpea Hummus Wrap', 'Spiced chickpeas, shredded carrots, crisp lettuce, and signature hummus in a whole-wheat wrap.', 8.50, 410, 1, 'chickpea-wrap.png', NULL, NULL, 1, 1, '2026-03-02 20:25:16'),
(15, 4, 'Avocado & Halloumi Toastie', 'Grilled halloumi cheese, smashed avocado, and chili flakes on thick-cut multi-grain bread.', 9.00, 460, 2, 'halloumi-toastie.png', NULL, NULL, 1, 2, '2026-03-02 20:25:16'),
(16, 4, 'Smoky BBQ Jackfruit Slider', 'Pulled jackfruit in BBQ sauce with a crunchy purple slaw on a vegan brioche bun.', 7.50, 350, 1, 'jackfruit-slider.png', NULL, NULL, 1, 3, '2026-03-02 20:25:16'),
(17, 5, 'Oven-Baked Sweet Potato Wedges', 'Seasoned with smoked paprika. Best with Avocado Lime Dip.', 4.50, 260, 1, 'sweet-potato-wedges.png', NULL, NULL, 1, 1, '2026-03-02 20:25:16'),
(18, 5, 'Zucchini Fries', 'Crispy breaded zucchini sticks. Best with Greek Yogurt Ranch.', 4.50, 190, 2, 'zucchini-fries.png', NULL, NULL, 1, 2, '2026-03-02 20:25:16'),
(19, 5, 'Baked Falafel Bites (5pcs)', 'Five golden baked falafel bites, crispy on the outside and soft inside.', 5.00, 230, 1, 'falafel-bites.png', NULL, NULL, 1, 3, '2026-03-02 20:25:16'),
(20, 5, 'Mini Veggie Platter & Hummus', 'Fresh crunch: celery, carrots, and cucumber served with classic hummus.', 4.00, 160, 1, 'veggie-platter.png', NULL, NULL, 1, 4, '2026-03-02 20:25:16'),
(21, 6, 'Classic Hummus', 'Smooth and creamy blended chickpea hummus with a drizzle of olive oil.', 1.00, 120, 1, 'dip-hummus.png', NULL, NULL, 1, 1, '2026-03-02 20:25:16'),
(22, 6, 'Avocado Lime Crema', 'Creamy avocado dip with a bright citrus finish.', 1.00, 110, 1, 'dip-avocado.png', NULL, NULL, 1, 2, '2026-03-02 20:25:16'),
(23, 6, 'Greek Yogurt Ranch', 'Herby and tangy yogurt-based ranch dip.', 1.00, 90, 2, 'dip-ranch.png', NULL, NULL, 1, 3, '2026-03-02 20:25:16'),
(24, 6, 'Spicy Sriracha Mayo', 'Bold sriracha heat balanced with creamy vegan mayo.', 1.00, 180, 1, 'dip-sriracha.png', NULL, NULL, 1, 4, '2026-03-02 20:25:16'),
(25, 6, 'Peanut Satay Sauce', 'Rich and nutty peanut sauce with a hint of ginger and soy.', 1.00, 200, 1, 'dip-peanut.png', NULL, NULL, 1, 5, '2026-03-02 20:25:16');

-- --------------------------------------------------------

--
-- Structuur voor de view `category_price_summary`
--
DROP TABLE IF EXISTS `category_price_summary`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `category_price_summary`  AS SELECT `c`.`name` AS `category`, count(`p`.`id`) AS `total_items`, min(`p`.`price`) AS `min_price`, max(`p`.`price`) AS `max_price`, round(avg(`p`.`price`),2) AS `avg_price` FROM (`products` `p` join `categories` `c` on(`p`.`category_id` = `c`.`id`)) GROUP BY `c`.`id`, `c`.`name` ORDER BY `c`.`sort_order` ASC ;

-- --------------------------------------------------------

--
-- Structuur voor de view `menu_full`
--
DROP TABLE IF EXISTS `menu_full`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `menu_full`  AS SELECT `p`.`id` AS `id`, `c`.`name` AS `category`, `c`.`slug` AS `category_slug`, `p`.`name` AS `product_name`, `p`.`description` AS `description`, `p`.`price` AS `price`, `p`.`kcal` AS `kcal`, `d`.`code` AS `dietary_code`, `d`.`label` AS `dietary_label`, `p`.`image_file` AS `image_file`, `p`.`available` AS `available`, `p`.`sort_order` AS `sort_order` FROM ((`products` `p` join `categories` `c` on(`p`.`category_id` = `c`.`id`)) join `dietary_tags` `d` on(`p`.`dietary_tag_id` = `d`.`id`)) ORDER BY `c`.`sort_order` ASC, `p`.`sort_order` ASC ;

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexen voor tabel `dietary_tags`
--
ALTER TABLE `dietary_tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexen voor tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_number` (`order_number`);

--
-- Indexen voor tabel `order_counter`
--
ALTER TABLE `order_counter`
  ADD PRIMARY KEY (`date`);

--
-- Indexen voor tabel `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexen voor tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `dietary_tag_id` (`dietary_tag_id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT voor een tabel `dietary_tags`
--
ALTER TABLE `dietary_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT voor een tabel `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Beperkingen voor tabel `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`dietary_tag_id`) REFERENCES `dietary_tags` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
