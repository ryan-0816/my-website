<script lang="ts">
  import Header from './Header.svelte';
  import '../app.css';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

  injectSpeedInsights();
  injectAnalytics();
</script>

<div class="app">
  <Header />
  <main>
    <slot />
  </main>
</div>

<style>
  :global(html), :global(body) {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  :global(*) { box-sizing: border-box; }

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

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    width: 100%;
    max-width: 100%;
    margin: 0;
    box-sizing: border-box;
    text-align: center;
    background: var(--bg-0, #1b1c20);
  }

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
