import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),

		prerender: {
			handleHttpError: ({ status, path }) => {
				console.warn(`Prerender error ${status} at ${path}`);
				return 'skip'; // Skip this path but continue build
			}
		}
	}
};

export default config;
