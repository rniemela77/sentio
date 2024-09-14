import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// Define configuration based on the environment mode
export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? '/sentio/' : '/',
    plugins: [svelte()],
});
