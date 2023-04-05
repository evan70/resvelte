// @ts-ignore
import fs from "fs";
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";
import { homedir } from "os";
import Unocss from "unocss/vite";
import { run } from "vite-plugin-run";
import AutoImport from "unplugin-auto-import/vite";
import { visualizer } from 'rollup-plugin-visualizer';

const projectRootDir = resolve(__dirname);

let host = "localhost:8000";

export default defineConfig({
    plugins: [
        laravel.default({
            input: ["resources/ts/app.ts"],
            ssr: 'resources/ts/ssr.ts',
            refresh: true,
        }),

        svelte({
            // experimental: {
            //     useVitePreprocess: true,
            // },
        }),
        Unocss(),
        // regenerate ziggy routes when any of the files in the routes folder changes
        run([
            {
                name: "ziggy",
                run: [
                    "php",
                    "artisan",
                    "ziggy:generate",
                    "./resources/ts/generated/ziggy-routes.js",
                ],
                condition: (file) =>
                    file.includes("/routes/") && file.endsWith(".php"),
            },
            {
                name: "spatie typescript generator",
                run: ["php", "artisan", "typescript:transform"],
                condition: (file) =>
                    file.includes("/app/Data") && file.endsWith(".php"),
            },
        ]),
        AutoImport({
            imports: [
                "svelte",
                "svelte/store",
                "svelte/transition",
                "svelte/easing",
                "svelte/motion",
                "svelte/animate",
                {
                    "@inertiajs/svelte": ["inertia", "useForm", "router"],
                },
            ],
            dirs: ["resources/ts/helpers/**", "resources/ts/actions/**"],
            dts: "./resources/ts/generated/auto-imports.d.ts",
        }),
        visualizer({
            filename: './storage/bundle-analyzer.html',
            open: false,
            template: 'sunburst', //sunburst, treemap, network, json, list
            //json: false,
            gzipSize: true,
            brotliSize: true,
        }),
    ],
    optimizeDeps: {
        include: ["@inertiajs/inertia", "@inertiajs/inertia-svelte"],
    },
    resolve: {
        alias: {
            "@": resolve(projectRootDir, "resources/ts"),
        },
    },
    server: detectServerConfig(host),
});

// fix : to make valet https work with vite
function detectServerConfig(host: string) {
    let keyPath = resolve(homedir(), `.config/valet/Certificates/${host}.key`);
    let certificatePath = resolve(
        homedir(),
        `.config/valet/Certificates/${host}.crt`
    );

    if (!fs.existsSync(keyPath)) {
        return {};
    }

    if (!fs.existsSync(certificatePath)) {
        return {};
    }

    return {
        hmr: { host },
        host,
        https: {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certificatePath),
        },
    };
}
