<?php
// ============================================================
//  get-products.php — Returns products as JSON
//  Called by main.js to load products dynamically from the DB
//
//  Usage: get-products.php?category=drinks
//         get-products.php          (returns all)
// ============================================================

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'db.php';

try {
    $pdo = getDB();
    $category = $_GET['category'] ?? null;

    if ($category) {
        $stmt = $pdo->prepare("
            SELECT p.id, p.name, p.description, p.price, p.kcal,
                   p.image_file, c.slug AS category_slug,
                   d.code AS dietary_code
            FROM products p
            JOIN categories c   ON p.category_id    = c.id
            JOIN dietary_tags d ON p.dietary_tag_id = d.id
            WHERE c.slug = ? AND p.available = 1
            ORDER BY p.sort_order
        ");
        $stmt->execute([$category]);
    } else {
        $stmt = $pdo->query("
            SELECT p.id, p.name, p.description, p.price, p.kcal,
                   p.image_file, c.slug AS category_slug,
                   d.code AS dietary_code
            FROM products p
            JOIN categories c   ON p.category_id    = c.id
            JOIN dietary_tags d ON p.dietary_tag_id = d.id
            WHERE p.available = 1
            ORDER BY c.sort_order, p.sort_order
        ");
    }

    $products = $stmt->fetchAll();

    echo json_encode(['success' => true, 'data' => $products]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>