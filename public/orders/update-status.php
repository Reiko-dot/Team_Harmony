<?php
// ============================================================
//  update-status.php
//  Lives at: TEAM_HARMONY/orders/update-status.php
//  db.php is at root → require __DIR__ . '/../db.php'
// ============================================================
require_once __DIR__ . '/../db.php';

$order_number = $_POST['order_number'] ?? '';
$status       = $_POST['status']       ?? '';
$valid        = ['pending', 'preparing', 'ready', 'completed', 'cancelled'];

if ($order_number && in_array($status, $valid)) {
    $pdo  = getDB();
    $stmt = $pdo->prepare("UPDATE orders SET status = ? WHERE order_number = ?");
    $stmt->execute([$status, $order_number]);
}

// Redirect back to overview — same folder
header('Location: overview-screen.php');
exit;
?>