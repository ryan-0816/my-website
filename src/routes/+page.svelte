<script lang="ts">
  // ===== ONE PLACE TO EDIT =====
  const CONFIG = {
    hover: { scale: 1.6, captionDelay: 0 },
    inner: { width: 50 }, // % of stage width; height = width * 0.75
    spawn: { padding: 5, minSize: 7, maxSize: 8, minDistance: 20 },
    motion: {
      minSpeed: 0.8,
      maxSpeed: 2.5,
      damping: 0.9985,
      dtClamp: 1 / 60,
      restitution: 0.6
    },
    patterns: { idleTimeout: 3600, patternDuration: 30, transitionSpeed: 0.02 },
    physics: { collisions: true, hitsForCooldown: 5, cooldownSeconds: 5, hitDebounceMs: 180 },
    bounds: { taskbarPx: 48 }
  };
  // =============================

  export let name = "RYAN TAGEN";
  const tagline = "Cybersecurity BS/MS at Rochester Institute of Technology";

  const images: string[] = [
    "/photos/photo1.jpg","/photos/photo2.jpg","/photos/photo3.jpg","/photos/photo4.jpg",
    "/photos/photo5.jpg","/photos/photo6.jpg","/photos/photo7.jpg","/photos/photo8.jpg",
    "/photos/photo9.jpg","/photos/photo10.jpg","/photos/photo11.jpg","/photos/photo12.jpg",
    "/photos/photo13.jpg","/photos/photo14.jpg","/photos/photo15.jpg","/photos/photo16.jpg",
    "/photos/photo17.jpg","/photos/photo18.jpg","/photos/photo19.jpg","/photos/photo20.jpg",
    "/photos/photo21.jpg","/photos/photo22.jpg","/photos/photo23.jpg","/photos/photo24.jpg",
    "/photos/photo25.jpg","/photos/photo26.jpg","/photos/photo27.jpg"
  ];

  const captions: string[] = [
    "All hail the mighty Capybara","Capybara general","Feeding a little guy","Top of Ampersand Mountain",
    "Park Ranger duties","4th of July","Betrayal?","First time racing!",
    "Luna, Aussie shepherd mix","ATVing in Taiwan","3","Gokart racing!",
    "USCGC Eagle","I love sailing","Sea Scouts","Luna my beloved",
    "smol dog","pumpkin Luna!","Mt. Snow with dad","Luna and Molly (foster)",
    "Cuttyhunk Island","Senior picnic","baby Luna","Rock climbing at Acadia",
    "Scuba cert", "Ceramics class", "Night market"
  ];

  const links = [
    { href: "https://github.com/ryan-0816", label: "GitHub", icon: "github" },
    { href: "https://www.linkedin.com/in/ryantagen", label: "LinkedIn", icon: "linkedin" },
    { href: "mailto:rst4035@rit.edu", label: "Email", icon: "mail" },
    { href: "/Ryan Tagen Resume.pdf", label: "Resume", icon: "file" }
  ];

  type PhotoState = {
    x: number; y: number; size: number; aspectRatio: number; vx: number; vy: number; index: number;
    showCaption: boolean; scale: number; targetX?: number; targetY?: number; width: number; height: number;
    cooldownUntil: number; uniqueHits: Set<number>; lastHitWith: Map<number, number>;
  };

  let photoStates: PhotoState[] = [];
  let nodes: HTMLElement[] = [];
  let captionNodes: HTMLElement[] = [];
  let lastActivityTime = Date.now();
  let isFormingPattern = false;
  let currentPatternIndex = 0;
  let patternStartTime = 0;
  let isBrowser = false;

  // Viewport height for taskbar-aware bottom bounce
  let viewportH = 0;
  function updateViewport() {
    viewportH = Math.max(window.innerHeight || 0, 1);
  }
  function bottomLimitPercent(): number {
    const tbPct = (CONFIG.bounds.taskbarPx / viewportH) * 100;
    return Math.max(0, 100 - tbPct);
  }

  const patterns = [{ name: "Idle", positions: images.map((_, i) => ({ x: 10 + (i % 9) * 9, y: 20 + ((i / 9) | 0) * 20 })) }];

  function getInner() {
    const width = clamp(CONFIG.inner.width, 10, 90);
    const height = width * 0.75;
    const x = (100 - width) / 2;
    const y = (100 - height) / 2;
    return { x, y, width, height };
  }

  const rand = (min: number, max: number) => min + Math.random() * (max - min);

  function getAABB(p: PhotoState) {
    const scaledWidth = p.width * p.scale;
    const scaledHeight = p.height * p.scale;
    return { left: p.x - scaledWidth / 2, right: p.x + scaledWidth / 2, top: p.y - scaledHeight / 2, bottom: p.y + scaledHeight / 2, width: scaledWidth, height: scaledHeight };
  }
  function checkAABBOverlap(a: ReturnType<typeof getAABB>, b: ReturnType<typeof getAABB>) {
    return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  }

  function isOutsideInnerBox(x: number, y: number, halfW: number, halfH: number) {
    const pad = CONFIG.spawn.padding;
    const inner = getInner();
    const left = inner.x - pad;
    const right = inner.x + inner.width + pad;
    const top = inner.y - pad;
    const bottom = inner.y + inner.height + pad;

    const photoLeft = x - halfW;
    const photoRight = x + halfW;
    const photoTop = y - halfH;
    const photoBottom = y + halfH;

    return photoRight < left || photoLeft > right || photoBottom < top || photoTop > bottom;
  }

  function initializePhotos() {
    const { minSize, maxSize, minDistance } = CONFIG.spawn;
    const list = images;
    const tempStates: PhotoState[] = [];

    const imagePromises = list.map((src) =>
      new Promise<number>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img.width / img.height || 1);
        img.onerror = () => resolve(1);
        img.src = src;
      })
    );

    Promise.all(imagePromises).then((aspectRatios) => {
      for (let i = 0; i < list.length; i++) {
        const aspectRatio = aspectRatios[i] || 1;
        const size = rand(minSize, maxSize);
        const width = size;
        const height = size / aspectRatio;
        const halfW = width / 2;
        const halfH = height / 2;

        let x: number, y: number;
        let tries = 0;
        let valid = false;

        do {
          x = rand(halfW + 2, 100 - halfW - 2);
          y = rand(halfH + 2, bottomLimitPercent() - halfH - 2);
          tries++;
          if (!isOutsideInnerBox(x, y, halfW, halfH)) continue;

          valid = true;
          for (const p of tempStates) {
            const dx = Math.abs(p.x - x);
            const dy = Math.abs(p.y - y);
            const minDistX = (p.width + width) / 2 + minDistance;
            const minDistY = (p.height + height) / 2 + minDistance;
            if (dx < minDistX && dy < minDistY) { valid = false; break; }
          }
          if (tries > 1500) break;
        } while (!valid);

        const speed = rand(CONFIG.motion.minSpeed, CONFIG.motion.maxSpeed);
        const angle = rand(0, Math.PI * 2);
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        tempStates.push({
          x, y, size, aspectRatio, vx, vy, index: i, showCaption: false, scale: 1,
          width, height, cooldownUntil: 0, uniqueHits: new Set<number>(), lastHitWith: new Map<number, number>()
        });
      }
      photoStates = tempStates;
    });
  }

  function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }

  function resolveAABBCollisions(states: PhotoState[], nowMs: number) {
    const restitution = CONFIG.motion.restitution;
    const { hitsForCooldown, cooldownSeconds, hitDebounceMs } = CONFIG.physics;

    for (let i = 0; i < states.length; i++) for (let j = i + 1; j < states.length; j++) {
      const a = states[i], b = states[j];
      if (nowMs < a.cooldownUntil || nowMs < b.cooldownUntil) continue;

      const A = getAABB(a), B = getAABB(b);
      if (!checkAABBOverlap(A, B)) continue;

      const lastAB = a.lastHitWith.get(b.index) ?? 0;
      const lastBA = b.lastHitWith.get(a.index) ?? 0;
      const freshHit = (nowMs - lastAB > hitDebounceMs) && (nowMs - lastBA > hitDebounceMs);

      if (freshHit) {
        if (!a.uniqueHits.has(b.index)) { a.uniqueHits.add(b.index); if (a.uniqueHits.size >= hitsForCooldown) { a.cooldownUntil = nowMs + cooldownSeconds * 1000; a.uniqueHits.clear(); } }
        if (!b.uniqueHits.has(a.index)) { b.uniqueHits.add(a.index); if (b.uniqueHits.size >= hitsForCooldown) { b.cooldownUntil = nowMs + cooldownSeconds * 1000; b.uniqueHits.clear(); } }
        a.lastHitWith.set(b.index, nowMs); b.lastHitWith.set(a.index, nowMs);
      }

      const overlapX = Math.min(A.right - B.left, B.right - A.left);
      const overlapY = Math.min(A.bottom - B.top, B.bottom - A.top);
      if (overlapX <= 0 || overlapY <= 0) continue;

      if (overlapX < overlapY) {
        const dir = a.x < b.x ? -1 : 1;
        const sep = overlapX / 2 + 0.1;
        a.x += dir * sep;
        b.x -= dir * sep;
        const relX = a.vx - b.vx;
        if ((dir < 0 && relX < 0) || (dir > 0 && relX > 0)) { const imp = relX * restitution; a.vx -= imp; b.vx += imp; }
      } else {
        const dir = a.y < b.y ? -1 : 1;
        const sep = overlapY / 2 + 0.1;
        a.y += dir * sep;
        b.y -= dir * sep;
        const relY = a.vy - b.vy;
        if ((dir < 0 && relY < 0) || (dir > 0 && relY > 0)) { const imp = relY * restitution; a.vy -= imp; b.vy += imp; }
      }
    }
  }

  function bounceOffInnerBox(p: PhotoState) {
    if (isFormingPattern) return;
    const inner = getInner();
    const a = getAABB(p);
    const r = CONFIG.motion.restitution;

    if (a.right > inner.x && a.left < inner.x + inner.width && a.bottom > inner.y && a.top < inner.y + inner.height) {
      const dL = a.left - inner.x, dR = (inner.x + inner.width) - a.right, dT = a.top - inner.y, dB = (inner.y + inner.height) - a.bottom;
      const min = Math.min(Math.abs(dL), Math.abs(dR), Math.abs(dT), Math.abs(dB));

      if (min === Math.abs(dL)) { p.x = inner.x - a.width / 2 - 0.1; if (p.vx > 0) p.vx = -p.vx * r; }
      else if (min === Math.abs(dR)) { p.x = inner.x + inner.width + a.width / 2 + 0.1; if (p.vx < 0) p.vx = -p.vx * r; }
      else if (min === Math.abs(dT)) { p.y = inner.y - a.height / 2 - 0.1; if (p.vy > 0) p.vy = -p.vy * r; }
      else { p.y = inner.y + a.height / 2 + inner.height + 0.1; if (p.vy < 0) p.vy = -p.vy * r; }
    }
  }

  function startPatternCycle() { isFormingPattern = true; patternStartTime = Date.now(); currentPatternIndex = 0; applyPattern(patterns[currentPatternIndex]); }
  function applyPattern(pattern: typeof patterns[0]) {
    photoStates.forEach((p, i) => {
      const t = pattern.positions[i % pattern.positions.length];
      p.targetX = clamp(t.x, p.width/2, 100 - p.width/2);
      p.targetY = clamp(t.y, p.height/2, bottomLimitPercent() - p.height/2);
      p.vx *= 0.3; p.vy *= 0.3;
    });
  }
  function nextPattern() { currentPatternIndex = (currentPatternIndex + 1) % patterns.length; applyPattern(patterns[currentPatternIndex]); patternStartTime = Date.now(); }

  function stepPhysics(dt: number) {
    const now = Date.now();
    const inactive = (now - lastActivityTime) / 1000;
    if (!isFormingPattern && inactive > CONFIG.patterns.idleTimeout) startPatternCycle();
    if (isFormingPattern && (now - patternStartTime) / 1000 > CONFIG.patterns.patternDuration) nextPattern();

    const bottomPct = bottomLimitPercent();

    for (const p of photoStates) {
      if (isFormingPattern && p.targetX !== undefined && p.targetY !== undefined) {
        const dx = p.targetX - p.x, dy = p.targetY - p.y, dist = Math.hypot(dx, dy);
        if (dist > 0.5) {
          p.vx += dx * CONFIG.patterns.transitionSpeed;
          p.vy += dy * CONFIG.patterns.transitionSpeed;
          p.vx *= 0.88; p.vy *= 0.88;
          p.x += p.vx * dt; p.y += p.vy * dt;
        } else { p.x = p.targetX; p.y = p.targetY; p.vx = 0; p.vy = 0; }
      } else { p.x += p.vx * dt; p.y += p.vy * dt; }

      const a = getAABB(p);
      if (a.left < 0) { p.x = a.width / 2; p.vx = Math.abs(p.vx) * CONFIG.motion.restitution; }
      else if (a.right > 100) { p.x = 100 - a.width / 2; p.vx = -Math.abs(p.vx) * CONFIG.motion.restitution; }

      if (a.top < 0) { p.y = a.height / 2; p.vy = Math.abs(p.vy) * CONFIG.motion.restitution; }
      const bottomEdge = bottomPct;
      if (a.bottom > bottomEdge) { p.y = bottomEdge - a.height / 2; p.vy = -Math.abs(p.vy) * CONFIG.motion.restitution; }

      bounceOffInnerBox(p);

      if (now >= p.cooldownUntil && p.uniqueHits.size === 0 && p.lastHitWith.size > images.length) p.lastHitWith.clear();
    }

    if (!isFormingPattern && CONFIG.physics.collisions) resolveAABBCollisions(photoStates, now);

    for (const p of photoStates) {
      p.vx *= CONFIG.motion.damping; p.vy *= CONFIG.motion.damping;
      const a = getAABB(p);
      p.x = clamp(p.x, a.width / 2, 100 - a.width / 2);
      p.y = clamp(p.y, a.height / 2, bottomPct - a.height / 2);
    }

    for (let i = 0; i < photoStates.length; i++) {
      const p = photoStates[i]; const el = nodes[i]; const cap = captionNodes[i];
      if (!el) continue;
      el.style.left = p.x + '%';
      el.style.top = p.y + '%';
      el.style.width = p.size + '%';
      el.style.aspectRatio = String(p.aspectRatio);
      el.style.setProperty('--scale', String(p.scale));
      if (cap) {
        if (p.showCaption) {
          cap.style.display = 'block';
          cap.style.left = p.x + '%';
          cap.style.top = p.y + '%';
          cap.style.transform = 'translate(-50%, -50%)';
          cap.style.opacity = '1';
        } else {
          cap.style.opacity = '0';
          setTimeout(() => { if (cap && !photoStates[i]?.showCaption) cap.style.display = 'none'; }, 150);
        }
      }
    }
  }

  function handleMouseEnter(i: number) {
    photoStates[i].showCaption = true;
    photoStates[i].scale = CONFIG.hover.scale;
    lastActivityTime = Date.now();
    if (isFormingPattern) {
      isFormingPattern = false;
      photoStates.forEach(p => {
        p.targetX = undefined; p.targetY = undefined;
        const s = rand(CONFIG.motion.minSpeed, CONFIG.motion.maxSpeed);
        const a = rand(0, Math.PI * 2);
        p.vx = Math.cos(a) * s; p.vy = Math.sin(a) * s;
      });
    }
  }
  function handleMouseLeave(i: number) { photoStates[i].showCaption = false; photoStates[i].scale = 1; }
  function handleInteraction() {
    lastActivityTime = Date.now();
    if (isFormingPattern) {
      isFormingPattern = false;
      photoStates.forEach(p => {
        p.targetX = undefined; p.targetY = undefined;
        const s = rand(CONFIG.motion.minSpeed, CONFIG.motion.maxSpeed);
        const a = rand(0, Math.PI * 2);
        p.vx = Math.cos(a) * s; p.vy = Math.sin(a) * s;
      });
    }
  }
  function handleKeyInteraction(e: KeyboardEvent) { if (e.key === 'Enter' || e.key === ' ') handleInteraction(); }

  let rafId = 0; let lastT = 0;
  function tick(ts: number) {
    if (!lastT) lastT = ts;
    const dt = Math.min((ts - lastT) / 1000, CONFIG.motion.dtClamp);
    lastT = ts;
    stepPhysics(dt);
    rafId = requestAnimationFrame(tick);
  }

  const iconPath = (n: string) => {
    switch (n) {
      case "github": return "M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.35-1.75-1.35-1.75-1.1-.76.08-.74.08-.74 1.22.09 1.86 1.27 1.86 1.27 1.08 1.85 2.83 1.32 3.52 1.01.11-.79.42-1.32.77-1.63-2.66-.30-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.25-3.22-.13-.30-.54-1.52.12-3.16 0 0 1.01-.32 3.30 1.23a11.4 11.4 0 0 1 6.01 0c2.29-1.55 3.30-1.23 3.30-1.23.66 1.64.25 2.86.12 3.16.78.84 1.25 1.91 1.25 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.82 1.10.82 2.22v3.29c0 .33.22.70.83.58A12 12 0 0 0 12 .5Z";
      case "linkedin": return "M4.98 3.5a2.5 2.5 0 1 1-.02 5 2.5 2.5 0 0 1 .02-5zM3 8.98h3.96v12.5H3V8.98zm6.74 0H14v1.7h.05c.58-1.10 2-2.25 4.12-2.25 4.41 0 5.23 2.90 5.23 6.67v6.38H19.4v-5.66c0-1.35-.02-3.09-1.88-3.09-1.88 0-2.17 1.47-2.17 2.99v5.76H11.7V8.98z";
      case "mail": return "M2 6l10 7 10-7v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6zm20-2H2l10 7 10-7z";
      case "file": return "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z";
      default: return "";
    }
  };

  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  onMount(() => {
    if (!browser) return;
    isBrowser = true;
    // Toggle a class to disable scrolling ONLY while this page is mounted
    document.documentElement.classList.add('no-scroll');
    document.body.classList.add('no-scroll');

    updateViewport();
    window.addEventListener('resize', updateViewport, { passive: true });
    initializePhotos();
    rafId = requestAnimationFrame(tick);

    document.addEventListener('mousemove', handleInteraction, { passive: true });
    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
  });

  onDestroy(() => {
    if (!browser) return;
    if (rafId) cancelAnimationFrame(rafId);

    window.removeEventListener('resize', updateViewport);
    document.removeEventListener('mousemove', handleInteraction);
    document.removeEventListener('click', handleInteraction);
    document.removeEventListener('keydown', handleInteraction);

    // Re-enable scrolling when leaving the home page
    document.documentElement.classList.remove('no-scroll');
    document.body.classList.remove('no-scroll');
  });
</script>

<div class="page"
     role="application"
     on:mousemove={handleInteraction}
     on:click={handleInteraction}
     on:keydown={handleKeyInteraction}
     tabindex="0">
  <div class="bg"></div>

  <div class="stage" class:patterning={isFormingPattern}>
    <svg class="constellation" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {#key CONFIG.inner.width}
        {#await Promise.resolve(getInner()) then inner}
          <rect x={inner.x} y={inner.y} width={inner.width} height={inner.height} class="inner-box" rx="16" ry="16" />
        {/await}
      {/key}
    </svg>

    {#key CONFIG.inner.width}
      {#await Promise.resolve(getInner()) then inner}
        <div class="center-box" class:patterning={isFormingPattern}
             style="left:{inner.x}%; top:{inner.y}%; width:{inner.width}%; height:{inner.height}%;">
          <div class="center-content">
            <h1 class="name">{name}</h1>
            <p class="tag">{tagline}</p>
            <nav class="links" aria-label="social links">
              {#each links as l}
                <a class="pill" href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d={iconPath(l.icon)} /></svg>
                  <span>{l.label}</span>
                </a>
              {/each}
            </nav>
          </div>
        </div>
      {/await}
    {/key}

    {#if isBrowser}
      <div class="field">
        {#each photoStates as state, i}
          <div class="photo-container">
            <figure
              bind:this={nodes[i]}
              class="thumb"
              style="left:{state.x}%; top:{state.y}%; width:{state.size}%; aspect-ratio:{state.aspectRatio};"
              on:mouseenter={() => handleMouseEnter(i)}
              on:mouseleave={() => handleMouseLeave(i)}
              on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleMouseEnter(i); }}
              tabindex="0"
              role="button"
              aria-label={`View ${captions[i] ?? `Photo ${i + 1}`}`}
            >
              <img src={images[i]} alt={`${(captions[i] ?? "Gallery image")} - gallery image ${i + 1}`} loading="lazy" decoding="async" />
              <div class="gloss"></div>
            </figure>

            <div bind:this={captionNodes[i]} class="caption-box" style="display: none; opacity: 0;">
              {captions[i] ?? `Photo ${i + 1}`}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  :root{
    --bg-0:#1b1c20; --bg-1:#22242a; --bg-2:#2a2d34;
    --ink:#e8e8ee; --muted:#a9acb8;
    --deep-red:#7d0e0e; --dark-crimson:#5f0b0b; --glow-red:#c21f1f;
    --box-glow:rgba(194,31,31,0.15);
  }

  /* Only disable scrolling when the 'no-scroll' class is present (set by this component) */
  :global(html.no-scroll), :global(body.no-scroll) {
    overflow: hidden !important;
    height: 100%;
  }

  .page{
    position: relative;
    display: flex; justify-content: center; align-items: center;
    width: 100vw; height: 100vh; min-height: 100vh;
    background: var(--bg-0); color: var(--ink);
    font-family: Inter, SF Pro Text, Segoe UI, Roboto, system-ui, -apple-system, Arial, sans-serif;
    padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
    box-sizing: border-box; outline: none;
  }
  @supports (height: 100dvh){ .page{ height:100dvh; min-height:100dvh; } }
  @supports (height: 100svh){ .page{ height:100svh; min-height:100svh; } }

  .bg{
    position:absolute; inset:0; z-index:0;
    background:
      radial-gradient(120vmax 80vmax at 70% 30%, rgba(194,31,31,0.12), transparent 60%),
      radial-gradient(90vmax 90vmax at 20% 80%, rgba(125,14,14,0.12), transparent 60%),
      linear-gradient(180deg, var(--bg-2), var(--bg-1) 40%, var(--bg-0));
  }
  .bg::after{
    content:""; position:absolute; inset:-150%;
    background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
    background-size: 3px 3px; opacity:.18; animation: grain 40s linear infinite;
  }
  @keyframes grain{ to { transform: translate3d(-8%, -8%, 0); } }

  .stage{ position: absolute; inset: 0; width: 100vw; height: 100vh; z-index: 1; margin: 0; overflow: hidden; transition: filter 240ms ease; }
  .stage.patterning { filter: none; }

  .constellation{ position:absolute; inset:0; z-index:2; pointer-events:none; }
  .inner-box { fill:none; stroke:var(--box-glow); stroke-width:1.2; vector-effect:non-scaling-stroke; filter: drop-shadow(0 0 12px var(--box-glow)); transition: opacity 240ms ease; opacity: 1; }
  .stage.patterning .inner-box { opacity: 0.18; }

  .center-box{
    position:absolute; z-index:3; display:flex; justify-content:center; align-items:center;
    background: rgba(34,36,42,0.85); backdrop-filter: blur(12px);
    border: 1.5px solid var(--box-glow); border-radius: 16px;
    box-shadow: 0 0 40px rgba(194,31,31,0.15), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 0 20px rgba(194,31,31,0.05);
    transition: background 240ms ease, border-color 240ms ease, box-shadow 240ms ease, backdrop-filter 240ms ease;
  }
  .center-box.patterning{ background: rgba(34,36,42,0.1); backdrop-filter: blur(4px); border-color: rgba(194,31,31,0.20);
    box-shadow: 0 0 20px rgba(194,31,31,0.08), inset 0 1px 0 rgba(255,255,255,0.04), inset 0 0 10px rgba(194,31,31,0.03); }

  .center-content{ display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; padding:clamp(1rem, 3vmin, 2rem); width:100%; }
  .name{ font-size: clamp(1.5rem, 6vmin, 4rem); line-height:.95; margin:0 0 .5rem 0; letter-spacing:.04em;
         background: linear-gradient(180deg, #f3f3f6, #c7c9d3 65%, #9ea3b1); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .tag{ margin:0 0 1.2rem 0; color: var(--muted); font-size: clamp(.75rem, 1.8vmin, 1rem); }
  .links{ display:flex; gap:.7rem; flex-wrap:wrap; justify-content:center; }
  .pill{ display:inline-flex; align-items:center; gap:.5rem; padding:.5rem 1rem; border-radius:999px; color:#fff; text-decoration:none; font-weight:600; letter-spacing:.02em;
         background: linear-gradient(180deg, var(--deep-red), var(--dark-crimson)); box-shadow: 0 6px 18px rgba(194,31,31,.25), inset 0 0 0 1px rgba(194,31,31,.35);
         transition: transform 160ms ease, box-shadow 160ms ease; font-size: clamp(.7rem, 1.6vmin, .9rem); }
  .pill:hover{ transform: translateY(-2px); box-shadow: 0 10px 24px rgba(194,31,31,.35), inset 0 0 0 1px rgba(194,31,31,.5); }
  .pill:focus-visible { outline: 2px solid var(--glow-red); outline-offset: 2px; }
  .pill svg{ width:16px; height:16px; fill: currentColor; }

  .field{ position:absolute; inset:0; z-index:2; pointer-events:none; }
  .photo-container{ position:absolute; inset:0; pointer-events:auto; }

  .thumb{
    position:absolute; transform: translate(-50%, -50%) scale(var(--scale, 1)); transform-origin: center center;
    will-change: transform, left, top; contain: layout paint; border-radius: 12px; overflow:hidden; pointer-events:auto;
    box-shadow: 0 8px 24px rgba(0,0,0,.4), 0 0 0 1px rgba(255,255,255,.06);
    transition: transform 160ms ease, box-shadow 160ms ease; background:#2f323a; cursor:pointer; z-index:5; outline: none;
  }
  .thumb:hover, .thumb:focus { box-shadow: 0 16px 40px rgba(0,0,0,.6), 0 0 0 2px rgba(194,31,31,.6); z-index:25; }
  .thumb:focus-visible { outline: 2px solid var(--glow-red); outline-offset: 2px; }
  .thumb img{ width:100%; height:100%; object-fit:cover; display:block; filter: saturate(.95) contrast(1.05); }
  .thumb .gloss{ position:absolute; inset:0; pointer-events:none;
    background: radial-gradient(90% 90% at 85% 15%, rgba(255,255,255,.18), transparent 45%),
                linear-gradient(180deg, rgba(194,31,31,.16), transparent 45%, transparent 55%, rgba(194,31,31,.12));
    mix-blend-mode: screen; }

  .caption-box{
    position: absolute; z-index: 30; background: rgba(34,36,42,0.95); backdrop-filter: blur(8px); color: var(--ink);
    padding: 0.45rem 0.7rem; border-radius: 8px; font-size: clamp(0.6rem, 1.4vmin, 0.8rem);
    white-space: nowrap; text-align: center; border: 1px solid var(--box-glow); box-shadow: 0 4px 16px rgba(0,0,0,0.4);
    pointer-events: none; transition: opacity 150ms ease-out; transform-origin: center center;
  }

  @media (max-width: 768px) {
    .center-box { border-radius: 12px; }
    .links{ gap: .5rem; }
    .pill{ padding: .4rem .8rem; }
    .caption-box { font-size: 0.55rem; padding: 0.35rem 0.55rem; }
  }
  @media (max-width: 480px) {
    .name{ font-size: clamp(1.2rem, 5vmin, 3rem); }
    .tag{ margin-bottom: 1rem; }
    .links{ flex-direction: column; align-items: center; }
    .caption-box { font-size: 0.5rem; padding: 0.3rem 0.5rem; }
  }
</style>
