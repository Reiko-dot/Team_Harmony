<?php
// ============================================================
//  overview-screen.php — Kitchen / Order Overview Screen
//  Shows all orders for today, newest first
//  Auto-refreshes every 15 seconds
// ============================================================
require_once 'db.php';

$pdo = getDB();

// Fetch today's orders with their items
$stmt = $pdo->prepare("
    SELECT o.id, o.order_number, o.order_type, o.status,
           o.total_price, o.created_at
    FROM orders o
    WHERE DATE(o.created_at) = CURDATE()
    ORDER BY o.created_at DESC
");
$stmt->execute();
$orders = $stmt->fetchAll();

// Fetch items for each order
foreach ($orders as &$order) {
    $stmt2 = $pdo->prepare("
        SELECT name, quantity, price, subtotal
        FROM order_items
        WHERE order_id = ?
        ORDER BY id
    ");
    $stmt2->execute([$order['id']]);
    $order['items'] = $stmt2->fetchAll();
}
unset($order);

// Status badge colours
$statusColors = [
    'pending'   => '#ff7e26',
    'preparing' => '#3498db',
    'ready'     => '#8cc63f',
    'completed' => '#95a5a6',
    'cancelled' => '#e74c3c',
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Overview — Happy Herbivore</title>
    <!-- Auto-refresh every 15 seconds -->
    <meta http-equiv="refresh" content="15">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            background: #1a1a1a;
            font-family: Arial, sans-serif;
            min-height: 100vh;
            padding: 20px;
        }

        .page-header {
            background: #8cc63f;
            border-radius: 12px;
            padding: 18px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24px;
        }

        .page-header h1 {
            color: #0b2b16;
            font-size: 24px;
            font-weight: 900;
        }

        .page-header .meta {
            color: #0b2b16;
            font-size: 14px;
            font-weight: bold;
            text-align: right;
        }

        .orders-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 16px;
        }

        .order-card {
            background: #2a2a2a;
            border-radius: 12px;
            overflow: hidden;
            border: 2px solid #333;
        }

        .order-card.status-pending   { border-color: #ff7e26; }
        .order-card.status-preparing { border-color: #3498db; }
        .order-card.status-ready     { border-color: #8cc63f; }
        .order-card.status-completed { border-color: #555; opacity: 0.6; }
        .order-card.status-cancelled { border-color: #e74c3c; opacity: 0.5; }

        .order-header {
            padding: 14px 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #333;
        }

        .order-number {
            font-size: 22px;
            font-weight: 900;
            color: white;
        }

        .order-type-badge {
            font-size: 12px;
            font-weight: bold;
            padding: 4px 10px;
            border-radius: 20px;
            background: #444;
            color: #ccc;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .order-type-badge.eat_in  { background: #1a472a; color: #8cc63f; }
        .order-type-badge.takeout { background: #5c2700; color: #ff7e26; }

        .order-items {
            padding: 12px 16px;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .order-item-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            color: #ddd;
        }

        .item-qty {
            background: #444;
            color: white;
            font-weight: bold;
            font-size: 13px;
            border-radius: 6px;
            padding: 2px 8px;
            margin-right: 8px;
            min-width: 28px;
            text-align: center;
        }

        .item-name { flex: 1; }

        .item-subtotal {
            color: #aaa;
            font-size: 13px;
        }

        .order-footer {
            padding: 12px 16px;
            border-top: 1px solid #444;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
        }

        .status-badge {
            font-size: 12px;
            font-weight: bold;
            padding: 5px 12px;
            border-radius: 20px;
            color: white;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .order-total {
            font-size: 16px;
            font-weight: bold;
            color: white;
        }

        .status-form {
            display: flex;
            gap: 6px;
            align-items: center;
        }

        .status-select {
            background: #444;
            color: white;
            border: 1px solid #555;
            border-radius: 6px;
            padding: 5px 8px;
            font-size: 13px;
            cursor: pointer;
        }

        .update-btn {
            background: #8cc63f;
            color: #0b2b16;
            border: none;
            border-radius: 6px;
            padding: 5px 12px;
            font-weight: bold;
            font-size: 13px;
            cursor: pointer;
        }

        .update-btn:hover { opacity: 0.85; }

        .order-time {
            font-size: 12px;
            color: #777;
            padding: 0 16px 10px;
        }

        .empty-state {
            text-align: center;
            color: #666;
            font-size: 18px;
            margin-top: 80px;
        }

        .empty-state span { font-size: 48px; display: block; margin-bottom: 12px; }

        .refresh-note {
            text-align: center;
            color: #555;
            font-size: 12px;
            margin-top: 24px;
        }
    </style>
</head>
<body>

<div class="page-header">
    <h1>🌿 Kitchen Orders</h1>
    <div class="meta">
        <?= date('l, d F Y') ?><br>
        <?= count($orders) ?> order<?= count($orders) !== 1 ? 's' : '' ?> today
    </div>
</div>

<?php if (empty($orders)): ?>
    <div class="empty-state">
        <span>🌱</span>
        No orders yet today.
    </div>
<?php else: ?>
    <div class="orders-grid">
        <?php foreach ($orders as $order): ?>
        <div class="order-card status-<?= htmlspecialchars($order['status']) ?>">

            <div class="order-header">
                <span class="order-number"><?= htmlspecialchars($order['order_number']) ?></span>
                <span class="order-type-badge <?= htmlspecialchars($order['order_type']) ?>">
                    <?= $order['order_type'] === 'eat_in' ? '🪴 Eat In' : '🥡 Take Out' ?>
                </span>
            </div>

            <div class="order-items">
                <?php foreach ($order['items'] as $item): ?>
                <div class="order-item-row">
                    <span class="item-qty"><?= (int)$item['quantity'] ?>×</span>
                    <span class="item-name"><?= htmlspecialchars($item['name']) ?></span>
                    <span class="item-subtotal">€ <?= number_format($item['subtotal'], 2) ?></span>
                </div>
                <?php endforeach; ?>
            </div>

            <div class="order-time">
                🕐 <?= date('H:i', strtotime($order['created_at'])) ?>
            </div>

            <div class="order-footer">
                <span class="status-badge" style="background: <?= $statusColors[$order['status']] ?? '#555' ?>">
                    <?= ucfirst($order['status']) ?>
                </span>

                <span class="order-total">€ <?= number_format($order['total_price'], 2) ?></span>

                <!-- Update status form -->
                <form class="status-form" action="update-status.php" method="POST">
                    <input type="hidden" name="order_number" value="<?= htmlspecialchars($order['order_number']) ?>">
                    <select name="status" class="status-select">
                        <option value="pending"   <?= $order['status'] === 'pending'   ? 'selected' : '' ?>>Pending</option>
                        <option value="preparing" <?= $order['status'] === 'preparing' ? 'selected' : '' ?>>Preparing</option>
                        <option value="ready"     <?= $order['status'] === 'ready'     ? 'selected' : '' ?>>Ready</option>
                        <option value="completed" <?= $order['status'] === 'completed' ? 'selected' : '' ?>>Completed</option>
                        <option value="cancelled" <?= $order['status'] === 'cancelled' ? 'selected' : '' ?>>Cancelled</option>
                    </select>
                    <button type="submit" class="update-btn">✓</button>
                </form>
            </div>

        </div>
        <?php endforeach; ?>
    </div>
<?php endif; ?>

<p class="refresh-note">Auto-refreshes every 15 seconds</p>

</body>
</html>