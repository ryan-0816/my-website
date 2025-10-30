<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';
    import { injectAnalytics } from '@vercel/analytics/sveltekit';
    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { Analytics } from "@vercel/analytics/next"

    injectSpeedInsights();
    injectAnalytics();
	let { children } = $props();
</script>

<div class="app">
	<Header />

	<main>
		{@render children()}
	</main>
</div>

<style>
	:global(html), :global(body) {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
	}

	:global(*) {
		box-sizing: border-box;
	}

	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		width: 100%;
		background: var(--bg-0, #1b1c20);
	}

	/* Color scheme variables to match your personal website */
	:global(:root) {
		--bg-0: #1b1c20;
		--bg-1: #22242a;
		--bg-2: #2a2d34;
		--ink: #e8e8ee;
		--muted: #a9acb8;
		--deep-red: #7d0e0e;
		--dark-crimson: #5f0b0b;
		--glow-red: #c21f1f;
	}

	/* Remove any default margin from header */
	:global(header) {
		margin: 0;
		flex-shrink: 0; /* Prevent header from shrinking */
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0; /* Remove padding that was causing the gap */
		width: 100%;
		max-width: 100%;
		margin: 0;
		box-sizing: border-box;
		text-align: center;
		background: var(--bg-0, #1b1c20);
	}

	/* If you need padding inside the main content, add it to a container inside your pages */
	:global(.page-content) {
		padding: 1rem;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>