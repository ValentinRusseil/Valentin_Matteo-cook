import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, normalizePath } from 'vite';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';
import { PurgeCSS } from 'purgecss';
import type { PreRenderedChunk } from 'rollup';

export default defineConfig({
    plugins: [
        sveltekit(),
        viteCompression({
            algorithm: 'gzip',
            threshold: 256,
            compressionOptions: {
                level: 9,
            },
            deleteOriginFile: false,
        }),
        viteCompression({
            algorithm: 'brotliCompress',
            threshold: 256,
            compressionOptions: {
                level: 11,
            },
            deleteOriginFile: false,
        }),
        {
            name: 'purge-css',
            enforce: 'post',
            async generateBundle(_, bundle: Record<string, any>) {
                const purgeCSSResult = await new PurgeCSS().purge({
                    content: ['./src/**/*.{html,js,svelte,ts}'],
                    css: Object.keys(bundle)
                        .filter((key) => key.endsWith('.css'))
                        .map((key) => normalizePath(bundle[key].fileName)),
                    safelist: {
                        standard: [/svelte-/],
                        deep: [/svelte-/],
                        greedy: [/svelte-/],
                    },
                });

                for (const file of Object.values(bundle)) {
                    if (file.type === 'asset' && file.fileName.endsWith('.css')) {
                        const purgedCSS = purgeCSSResult.find((result) => result.file === normalizePath(file.fileName));
                        if (purgedCSS) {
                            file.source = purgedCSS.css;
                        }
                    }
                }
            },
        },
        visualizer({
            open: false,
            gzipSize: true,
            brotliSize: true,
        }),
    ],
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn', 'console.error'],
                passes: 7,
                unsafe: true,
                unsafe_math: true,
                unsafe_methods: true,
                unsafe_proto: true,
                unsafe_regexp: true,
                toplevel: true,
                pure_getters: true,
                reduce_vars: true,
                join_vars: true,
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                loops: true,
                unused: true,
                if_return: true,
                inline: 3,
                collapse_vars: true,
                reduce_funcs: true,
                hoist_funs: true,
                hoist_vars: true,
                computed_props: true,
                keep_fargs: false,
                module: true,
                arguments: true,
                typeofs: true,
                booleans_as_integers: true,
                properties: true,
            },
            mangle: {
                toplevel: true,
                safari10: true,
                properties: {
                    regex: /^_/,
                    keep_quoted: true,
                    reserved: [],
                },
                module: true,
                reserved: [],
            },
            format: {
                comments: false,
                ecma: 2020,
                wrap_iife: true,
                webkit: true,
                ascii_only: true,
                beautify: false,
                indent_level: 0,
                max_line_len: 0,
            },
            ecma: 2020,
            module: true,
            toplevel: true,
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    'svelte-core': ['svelte'],
                    'svelte-kit': ['@sveltejs/kit'],
                },
                compact: true,
                inlineDynamicImports: false,
                generatedCode: {
                    preset: 'es2015',
                    symbols: false,
                },
                entryFileNames: 'entry-[hash].js',
                chunkFileNames: (chunkInfo: PreRenderedChunk) => {
                    const hash =
                        chunkInfo.facadeModuleId?.split('/').pop()?.split('.')[0] ?? (chunkInfo.name || 'chunk');
                    if (chunkInfo.name === 'svelte-core') return `svelte-core.${hash}.js`;
                    if (chunkInfo.name === 'svelte-kit') return `svelte-kit.${hash}.js`;
                    return `chunk.${hash}.js`;
                },
                assetFileNames: 'assets/[hash][extname]',
            },
        },
        cssCodeSplit: true,
        cssMinify: true,
        reportCompressedSize: true,
        chunkSizeWarningLimit: 1000,
        assetsInlineLimit: 2048,
        sourcemap: false,
        target: 'esnext',
    },
    optimizeDeps: {
        include: ['svelte'],
        exclude: ['@sveltejs/kit'],
        esbuildOptions: {
            minify: true,
            target: 'esnext',
            legalComments: 'none',
        },
    },
    ssr: {
        noExternal: ['@sveltejs/kit'],
    },
});
