<?php
// ============================================================
//  update-status.php — Updates order status from overview screen
// ============================================================
require_once 'db.php';

$order_number = $_POST['order_number'] ?? '';
$status       = $_POST['status']       ?? '';

$valid = ['pending', 'preparing', 'ready', 'completed', 'cancelled'];

if ($order_number && in_array($status, $valid)) {
    $pdo = getDB();
    $stmt = $pdo->prepare("UPDATE orders SET status = ? WHERE order_number = ?");
    $stmt->execute([$status, $order_number]);
}

// Go back to overview
header('Location: overview-screen.php');
exit;
?>