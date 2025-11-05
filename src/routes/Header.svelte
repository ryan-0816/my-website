<script lang="ts">
	import { page } from '$app/state';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
</script>

<style>
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

	header {
		display: flex;
		justify-content: space-between;
		position: sticky;
		top: 0;
		z-index: 1000;
		background: var(--bg-1);
		border-bottom: 1px solid var(--bg-2);
		backdrop-filter: blur(10px);
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		transition: transform 0.2s ease;
	}

	.corner a:hover {
		transform: scale(1.1);
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
		filter: brightness(0.9);
	}

	nav {
		display: flex;
		justify-content: center;
		--background: var(--bg-1);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--glow-red);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1rem;
		color: var(--ink);
		font-weight: 600;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: all 0.2s ease;
		position: relative;
	}

	nav a:hover {
		color: var(--glow-red);
		background: rgba(194, 31, 31, 0.1);
	}

	li[aria-current='page'] a {
		color: var(--glow-red);
		background: linear-gradient(180deg, transparent, rgba(194, 31, 31, 0.15));
	}

	/* Add a subtle glow effect for current page */
	li[aria-current='page'] a::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 25%;
		width: 50%;
		height: 2px;
		background: var(--glow-red);
		border-radius: 2px;
		box-shadow: 0 0 8px var(--glow-red);
	}

	/* Responsive design */
	@media (max-width: 768px) {
		nav a {
			padding: 0 0.75rem;
			font-size: 0.75rem;
		}
		
		.corner {
			width: 2.5em;
			height: 2.5em;
		}
		
		.corner img {
			width: 1.5em;
			height: 1.5em;
		}
	}

	@media (max-width: 640px) {
		nav a {
			padding: 0 0.5rem;
			font-size: 0.7rem;
			letter-spacing: 0.05em;
		}
		
		ul {
			height: 2.5em;
		}
		
		svg {
			height: 2.5em;
		}
	}
</style>

<header>
	<div class="corner">
		<a href="https://svelte.dev/docs/kit">
			<img src={logo} alt="SvelteKit" />
		</a>
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={page.url.pathname === '/about-me' ? 'page' : undefined}>
				<a href="/about-me">About Me</a>
			</li>
			<li aria-current={page.url.pathname === '/contact' ? 'page' : undefined}>
				<a href="/contact">Contact</a>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	<div class="corner">
		<a href="https://github.com/sveltejs/kit">
			<img src={github} alt="GitHub" />
		</a>
	</div>
</header>