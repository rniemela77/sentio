import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// Define configuration based on the environment mode
export default defineConfig(({ command, mode }) => {
  // Determine the base path depending on the environment
  const base = mode === 'production' ? '/sentio/' : '/';

  return {
    base,  // Base path for GitHub Pages
    plugins: [svelte()],
  };
});
