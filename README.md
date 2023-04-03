<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

# laravel-svelte-base"

Laravel 10 + Vite + Svelte + Inertia + Unocss 🔥

With srr

`npm run dev`  
Will run:  
`php artisan serve`  
and:  
`vite`  
 
So you only need to run 1 command

- Laravel 10
- Vite
- Svelte
- Inertia
- Unocss
- Typescript
- Spatie Laravel Data

### Automatic route generation for Inertia ⚡

`ziggy.js` file will be generated automatically from the `routes/web.php` file. This allows you to use the `route()`
function in your Svelte components .

### Automatic types generation for laravel-data package ⚡

`generated.d.ts` file will be generated automatically from the data classes in the App/Data directory>

## Installation

- `git clone https://github.com/wpzag/laravel-inertia-svelte-unocss.git`
- Edit '.env' and set your database connection details
- Generate app key `php artisan key:generate;`
- Generate types `php artisan typescript:transform`
- Generate ziggy routes `php artisan ziggy:generate`

