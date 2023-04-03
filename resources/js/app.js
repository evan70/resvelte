import './bootstrap';
import '../css/app.css'
import createServer from '@inertiajs/svelte/server'
import { createInertiaApp } from '@inertiajs/svelte'

const resolveApp = name => {
    const pages = import.meta.glob('../Pages/**/*.svelte', { eager: true })
    return pages[`${'../Pages/'}${name}.svelte`]
}

if (typeof createServer !== 'function') {
    createServer(page =>
        createInertiaApp({
            page,
            resolve: resolveApp,
        }),
    )
} else {
    createInertiaApp({
        resolve: resolveApp,
        setup({ el, App, props }) {
            new App({ target: el, props })
        },
    })
}
