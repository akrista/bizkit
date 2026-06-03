import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from "@tailwindcss/vite";
import inertia from '@inertiajs/vite';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/js/passkeys.js',
                'resources/js/svelte/app.ts',
                'resources/js/react/app.tsx',
                'resources/js/vue/app.ts',
            ],
            refresh: true,
            fonts: [
                bunny('Instrument Sans', {
                    weights: [400, 500, 600],
                }),
            ],
        }),
        inertia(),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        vue(),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
        svelte(),
    ],
    resolve: {
        alias: [
            {
                find: '@/routes',
                replacement: path.resolve(__dirname, 'resources/js/routes'),
            },
            {
                find: '@/actions',
                replacement: path.resolve(__dirname, 'resources/js/actions'),
            },
            {
                find: '@',
                replacement: path.resolve(__dirname, 'resources/js/svelte'),
                customResolver(source, importer, options) {
                    const normalizedImporter = importer ? importer.replace(/\\/g, '/') : '';
                    const isReact = normalizedImporter.includes('resources/js/react');
                    const isVue = normalizedImporter.includes('resources/js/vue');

                    if (isReact && source.includes('resources/js/svelte')) {
                        return this.resolve(source.replace('resources/js/svelte', 'resources/js/react'), importer, { skipSelf: true, ...options });
                    }

                    if (isVue && source.includes('resources/js/svelte')) {
                        return this.resolve(source.replace('resources/js/svelte', 'resources/js/vue'), importer, { skipSelf: true, ...options });
                    }

                    return this.resolve(source, importer, { skipSelf: true, ...options });
                }
            }
        ]
    },
    server: {
        cors: true,
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
