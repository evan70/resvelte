<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>
    
    <!-- Scripts -->
    @routes
    @vite(['resources/ts/app.ts', "resources/ts/pages/{$page['component']}.svelte"])
    @inertiaHead
</head>
<body class="font-sans antialiased dark">
@inertia
</body>
</html>
