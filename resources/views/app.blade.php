<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

        <!-- Scripts -->
        <script>
        window.addEventListener('error', function(e) {
            fetch('/log_error.php', { method: 'POST', body: 'Global error: ' + e.message + '\n' + (e.error ? e.error.stack : '') });
        });
        window.addEventListener('unhandledrejection', function(e) {
            fetch('/log_error.php', { method: 'POST', body: 'Promise rejection: ' + e.reason });
        });
        var oldError = console.error;
        console.error = function() {
            var msg = Array.from(arguments).map(String).join(' ');
            fetch('/log_error.php', { method: 'POST', body: 'Console Error: ' + msg });
            oldError.apply(console, arguments);
        };
        </script>
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-gray-50 text-gray-900">
        @inertia
    </body>
</html>
