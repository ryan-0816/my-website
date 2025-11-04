<script lang="ts">
  import Header from './Header.svelte';
  import '../app.css';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
  import { afterNavigate } from '$app/navigation';
  import { onMount } from 'svelte';

  injectSpeedInsights();
  injectAnalytics();

  // Robust matcher for "About Me" routes
  function isAbout(pathname: string) {
    const p = pathname.replace(/\/+$/, ''); // trim trailing slash
    return p === '/about' || p.startsWith('/about/') || p === '/about-me';
  }

  let canScroll = false;

  function applyScrollPolicy(pathname: string) {
    canScroll = isAbout(pathname);

    // Always snap to the top on route change to prevent "phantom below-the-fold"
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const html = document.documentElement;
    const body = document.body;

    // Toggle lock class + inline overflow (belt and suspenders)
    html.classList.toggle('lock-scroll', !canScroll);
    body.classList.toggle('lock-scroll', !canScroll);

    // Inline overflow for extra safety
    const overflowValue = canScroll ? '' : 'hidden';
    html.style.overflow = overflowValue;
    body.style.overflow = overflowValue;

    // Height rules: only force 100% height when locking scroll
    if (canScroll) {
      html.style.height = '';
      body.style.height = '';
    } else {
      html.style.height = '100%';
      body.style.height = '100%';
    }
  }

  onMount(() => {
    applyScrollPolicy(location.pathname);
  });

  afterNavigate(({ to }) => {
    const path = to?.url.pathname ?? location.pathname;
    applyScrollPolicy(path);
  });
</script>

<div class="app">
  <Header />
  <main class:locked={!canScroll}>
    <slot />
  </main>
</div>

<style>
  /* Allow document to grow so /about can scroll */
  :global(html), :global(body) {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100%;
  }

  :global(*) { box-sizing: border-box; }

  /* Hard scroll lock for non-about pages */
  :global(html.lock-scroll),
  :global(body.lock-scroll) {
    overflow: hidden !important;
    height: 100%;
  }

  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    background: var(--bg-0, #1b1c20);
  }

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

  :global(header) { margin: 0; flex-shrink: 0; }

  /* Base main: let html/body own scrolling; don't center by default so tall pages can flow */
  main {
    flex: 1;
    display: block; /* not flex so children can set their own layout */
    padding: 0;
    width: 100%;
    max-width: 100%;
    margin: 0;
    box-sizing: border-box;
    text-align: center;
    background: var(--bg-0, #1b1c20);
    overflow: visible; /* do not clip /about content */
  }

  /* Center only when locked (e.g., home page) to preserve your original look */
  .locked {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden; /* prevent inner scrollbars from reintroducing page scroll */
  }

  :global(.page-content) {
    padding: 1rem;
    width: 100%;
    /* No forced height; let content drive size so /about can scroll */
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
