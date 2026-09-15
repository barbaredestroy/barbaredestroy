<?php
declare(strict_types=1);

/*
 * Maildrasil - suivi d'ouverture
 * URL attendue :
 * https://barbaredestroy.fr/maildrasil/track.php
 *
 * Stockage minimal :
 * - token aléatoire
 * - première ouverture
 * - dernière ouverture
 * - compteur
 * Aucune IP ni User-Agent n'est enregistré.
 */

header_remove('X-Powered-By');

$store = __DIR__ . DIRECTORY_SEPARATOR . 'tracking-data';

function json_response(array $payload, int $status = 200): never {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('Pragma: no-cache');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function ensure_store(string $store): bool {
    if (is_dir($store)) {
        return is_writable($store);
    }
    if (!@mkdir($store, 0755, true) && !is_dir($store)) {
        return false;
    }
    return is_writable($store);
}

function valid_token(string $token): bool {
    return (bool)preg_match('/^[a-f0-9]{64}$/', $token);
}

function token_file(string $store, string $token): string {
    return $store . DIRECTORY_SEPARATOR . $token . '.json';
}

$writable = ensure_store($store);

if (isset($_GET['health'])) {
    json_response([
        'ok' => true,
        'service' => 'maildrasil-tracking',
        'writable' => $writable,
        'php' => PHP_VERSION,
        'time' => gmdate('c'),
    ]);
}

if (isset($_GET['status'])) {
    if (!$writable) {
        json_response([
            'ok' => false,
            'error' => 'Le dossier tracking-data n’est pas accessible en écriture.',
        ], 500);
    }

    $tokens = array_filter(explode(',', (string)$_GET['status']));
    $result = [];

    foreach ($tokens as $token) {
        $token = strtolower(trim($token));
        if (!valid_token($token)) {
            continue;
        }

        $data = [];
        $file = token_file($store, $token);

        if (is_file($file)) {
            $decoded = json_decode((string)@file_get_contents($file), true);
            if (is_array($decoded)) {
                $data = $decoded;
            }
        }

        $result[$token] = [
            'opened' => !empty($data['first_opened_at']),
            'first_opened_at' => (string)($data['first_opened_at'] ?? ''),
            'last_opened_at' => (string)($data['last_opened_at'] ?? ''),
            'count' => (int)($data['count'] ?? 0),
        ];
    }

    json_response([
        'ok' => true,
        'tokens' => $result,
    ]);
}

$token = strtolower(trim((string)($_GET['t'] ?? '')));

if (valid_token($token) && $writable) {
    $file = token_file($store, $token);
    $now = gmdate('c');

    $data = [
        'first_opened_at' => $now,
        'last_opened_at' => $now,
        'count' => 1,
    ];

    if (is_file($file)) {
        $existing = json_decode((string)@file_get_contents($file), true);
        if (is_array($existing)) {
            $data['first_opened_at'] = (string)($existing['first_opened_at'] ?? $now);
            $data['count'] = (int)($existing['count'] ?? 0) + 1;
        }
    }

    $data['last_opened_at'] = $now;

    @file_put_contents(
        $file,
        json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
        LOCK_EX
    );
}

/* GIF transparent 1x1 */
$gif = base64_decode('R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==');
header('Content-Type: image/gif');
header('Content-Length: ' . strlen($gif));
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
echo $gif;
