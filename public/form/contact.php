<?php
// forms/contact.php
// Handles the contact form submission from Contact.jsx.
// Contact.jsx checks: response.ok && data.trim() === "OK" for success.
// Anything else in the body is shown to the user as an error message,
// so error strings here should be short, plain text, and user-facing.

header('Content-Type: text/plain; charset=utf-8');

// Only accept POST requests.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method not allowed.';
    exit;
}

// --- Config: change this to your real destination inbox ---
$recipient_email = 'info@AvidCompany.ir';
$recipient_name  = 'آوید';

// --- Honeypot spam check (mirrors the client-side check in Contact.jsx) ---
// Real visitors never see or fill this hidden field (see Contact.jsx),
// so bots that submit directly without loading the page/JS are still
// caught here. Pretend success and stop — don't send mail, and don't
// tell the bot its submission was rejected.
if (!empty($_POST['website'])) {
    echo 'OK';
    exit;
}

// --- Collect + validate input ---
function clean_header_value($value) {
    // Strip CR/LF so user input can never inject extra email headers
    // (a classic PHP mail() vulnerability when name/email/subject are
    // used unsanitized).
    return trim(preg_replace('/[\r\n]+/', ' ', (string) $value));
}

$name    = clean_header_value($_POST['name'] ?? '');
$email   = clean_header_value($_POST['email'] ?? '');
$subject = clean_header_value($_POST['subject'] ?? '');
$message = trim((string) ($_POST['message'] ?? ''));

$errors = [];

if ($name === '') {
    $errors[] = 'نام و نام خانوادگی الزامی است.';
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'آدرس ایمیل معتبر نیست.';
}
if ($subject === '') {
    $errors[] = 'موضوع الزامی است.';
}
if ($message === '') {
    $errors[] = 'متن پیام الزامی است.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo implode(' ', $errors);
    exit;
}

// --- Very basic per-IP rate limiting (file-based) ---
// Stops rapid repeated submissions from the same visitor. This is not
// a substitute for a CAPTCHA if spam becomes a real problem, but it
// blocks the simplest bot behavior with zero extra dependencies.
$rate_limit_dir = __DIR__ . '/.rate-limit';
if (!is_dir($rate_limit_dir)) {
    @mkdir($rate_limit_dir, 0700, true);
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rate_limit_file = $rate_limit_dir . '/' . md5($ip) . '.txt';
$now = time();
$min_interval_seconds = 30; // one submission per 30s per IP

if (is_file($rate_limit_file)) {
    $last = (int) file_get_contents($rate_limit_file);
    if ($now - $last < $min_interval_seconds) {
        http_response_code(429);
        echo 'لطفاً کمی صبر کنید و دوباره تلاش کنید.';
        exit;
    }
}
@file_put_contents($rate_limit_file, (string) $now);

// --- Send the email ---
$email_subject = '[فرم تماس آوید] ' . $subject;
$email_body =
    "نام: {$name}\n" .
    "ایمیل: {$email}\n" .
    "موضوع: {$subject}\n\n" .
    "پیام:\n{$message}\n";

$host_for_from = $_SERVER['HTTP_HOST'] ?? 'avidcompany.ir';
$headers = [
    'From: ' . $recipient_name . ' <no-reply@' . $host_for_from . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
];

// Encode the Persian subject correctly per RFC 2047 so it doesn't show
// up garbled in the recipient's inbox.
$encoded_subject = '=?UTF-8?B?' . base64_encode($email_subject) . '?=';

$sent = @mail($recipient_email, $encoded_subject, $email_body, implode("\r\n", $headers));

if ($sent) {
    echo 'OK';
} else {
    http_response_code(500);
    echo 'ارسال پیام با خطا مواجه شد. لطفاً بعداً دوباره تلاش کنید.';
}