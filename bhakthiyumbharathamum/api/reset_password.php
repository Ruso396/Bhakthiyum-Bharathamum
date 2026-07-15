<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../helpers/response.php';

$database = new Database();
$conn = $database->getConnection();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['username']) || !isset($data['new_password']) || !isset($data['confirm_password'])) {
    sendError('Username, new password and confirm password are required');
}

$username = trim($data['username']);
$newPassword = trim($data['new_password']);
$confirmPassword = trim($data['confirm_password']);

if (empty($username)) {
    sendError('Username is required');
}

if (strlen($newPassword) < 6) {
    sendError('Password must be at least 6 characters long');
}

if ($newPassword !== $confirmPassword) {
    sendError('New password and confirm password do not match');
}

$stmt = $conn->prepare("SELECT * FROM admins WHERE username = ?");
$stmt->execute([$username]);
$admin = $stmt->fetch();

if (!$admin) {
    sendError('Admin account not found', 404);
}

$hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

$stmt = $conn->prepare("UPDATE admins SET password = ? WHERE username = ?");
$stmt->execute([$hashedPassword, $username]);

sendSuccess([], 'Password has been reset successfully');
