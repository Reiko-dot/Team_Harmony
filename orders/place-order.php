<?php
// ============================================================
//  place-order.php
//  Lives at: TEAM_HARMONY/orders/place-order.php
//  db.php is at root → require __DIR__ . '/../db.php'
// ============================================================

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['success' => false, 'error' => 'POST only']));
}

require_once __DIR__ . '/../db.php';    // orders/ → up one level to root

$body       = json_decode(file_get_contents('php://input'), true);
$order_type = $body['order_type'] ?? null;
$items      = $body['items']      ?? [];

if (!$order_type || empty($items)) {
    http_response_code(400);
    die(json_encode(['success' => false, 'error' => 'order_type and items are required']));
}

if (!in_array($order_type, ['eat_in', 'takeout'])) {
    http_response_code(400);
    die(json_encode(['success' => false, 'error' => 'order_type must be eat_in or takeout']));
}

try {
    $pdo = getDB();
    $pdo->beginTransaction();

    // 1. Generate order number HH-YYYYMMDD-NNN
    $today       = date('Y-m-d');
    $dateCompact = date('Ymd');

    $pdo->prepare("
        INSERT INTO order_counter (date, counter)
        VALUES (?, 1)
        ON DUPLICATE KEY UPDATE counter = counter + 1
    ")->execute([$today]);

    $stmt = $pdo->prepare("SELECT counter FROM order_counter WHERE date = ?");
    $stmt->execute([$today]);
    $counter = $stmt->fetchColumn();

    $order_number = 'HH-' . $dateCompact . '-' . str_pad($counter, 3, '0', STR_PAD_LEFT);

    // 2. Fetch real prices from DB
    $productIds   = array_column($items, 'product_id');
    $placeholders = implode(',', array_fill(0, count($productIds), '?'));

    $stmt = $pdo->prepare("
        SELECT id, name, price FROM products
        WHERE id IN ($placeholders) AND available = 1
    ");
    $stmt->execute($productIds);
    $products = $stmt->fetchAll();

    if (count($products) !== count($productIds)) {
        throw new Exception('One or more products not found or unavailable');
    }

    $productMap = [];
    foreach ($products as $p) {
        $productMap[$p['id']] = $p;
    }

    // 3. Calculate total
    $total = 0;
    foreach ($items as $item) {
        $total += $productMap[$item['product_id']]['price'] * $item['quantity'];
    }

    // 4. Insert order
    $stmt = $pdo->prepare("INSERT INTO orders (order_number, order_type, total_price) VALUES (?, ?, ?)");
    $stmt->execute([$order_number, $order_type, number_format($total, 2, '.', '')]);
    $orderId = $pdo->lastInsertId();

    // 5. Insert order items
    $stmt = $pdo->prepare("INSERT INTO order_items (order_id, product_id, name, price, quantity) VALUES (?, ?, ?, ?, ?)");
    foreach ($items as $item) {
        $p = $productMap[$item['product_id']];
        $stmt->execute([$orderId, $item['product_id'], $p['name'], $p['price'], $item['quantity']]);
    }

    $pdo->commit();

    echo json_encode([
        'success'      => true,
        'order_number' => $order_number,
        'order_id'     => (int)$orderId,
        'total'        => '€ ' . number_format($total, 2, '.', ''),
        'status'       => 'pending'
    ]);

} catch (Exception $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>