<?php
declare(strict_types=1);

$store = __DIR__ . DIRECTORY_SEPARATOR . 'tracking-data';
if (!is_dir($store)) {
    @mkdir($store, 0700, true);
}

function valid_token(string $token): bool {
    return (bool)preg_match('/^[a-f0-9]{64}$/', $token);
}
function token_file(string $store, string $token): string {
    return $store . DIRECTORY_SEPARATOR . $token . '.json';
}

if (isset($_GET['status'])) {
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

    $tokens = array_filter(explode(',', (string)$_GET['status']));
    $result = [];
    foreach ($tokens as $token) {
        $token = strtolower(trim($token));
        if (!valid_token($token)) continue;

        $data = [];
        $file = token_file($store, $token);
        if (is_file($file)) {
            $decoded = json_decode((string)@file_get_contents($file), true);
            if (is_array($decoded)) $data = $decoded;
        }
        $result[$token] = [
            'opened' => !empty($data['first_opened_at']),
            'first_opened_at' => (string)($data['first_opened_at'] ?? ''),
            'last_opened_at' => (string)($data['last_opened_at'] ?? ''),
            'count' => (int)($data['count'] ?? 0),
        ];
    }
    echo json_encode(['tokens' => $result], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

$token = strtolower(trim((string)($_GET['t'] ?? '')));
if (valid_token($token)) {
    $file = token_file($store, $token);
    $now = gmdate('c');
    $data = ['first_opened_at' => $now, 'last_opened_at' => $now, 'count' => 1];

    if (is_file($file)) {
        $existing = json_decode((string)@file_get_contents($file), true);
        if (is_array($existing)) {
            $data['first_opened_at'] = (string)($existing['first_opened_at'] ?? $now);
            $data['count'] = (int)($existing['count'] ?? 0) + 1;
        }
    }
    @file_put_contents($file, json_encode($data, JSON_UNESCAPED_SLASHES), LOCK_EX);
}

$gif = base64_decode('R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==');
header('Content-Type: image/gif');
header('Content-Length: ' . strlen($gif));
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
echo $gif;
