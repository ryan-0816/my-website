<script lang="ts">
  // ===== EDIT ME =====
  export let name = "RYAN TAGEN";
  const tagline = "Cybersecurity BS/MS at Rochester Institute of Technology";

  const images: string[] = [
    "/photos/photo1.jpg",
    "/photos/photo2.jpg",
    "/photos/photo3.jpg",
    "/photos/photo4.jpg",
    "/photos/photo5.jpg",
    "/photos/photo6.jpg",
    "/photos/photo7.jpg",
    "/photos/photo8.jpg",
    "/photos/photo9.jpg",
    "/photos/photo10.jpg",
    "/photos/photo11.jpg",
    "/photos/photo12.jpg",
    "/photos/photo13.jpg",
    "/photos/photo14.jpg",
    "/photos/photo15.jpg",
    "/photos/photo16.jpg",
    "/photos/photo17.jpg",
    "/photos/photo18.jpg",
    "/photos/photo19.jpg",
    "/photos/photo20.jpg",
    "/photos/photo21.jpg",
    "/photos/photo22.jpg",
    "/photos/photo23.jpg",
    "/photos/photo24.jpg"
  ];

  // Add captions for each image
  const captions: string[] = [
    "Cybersecurity project",
    "Campus life at RIT",
    "Technical workshop",
    "Team collaboration",
    "Security conference",
    "Programming session",
    "Network security lab",
    "Research presentation",
    "Hackathon event",
    "Code review",
    "System architecture",
    "Security analysis",
    "Project demonstration",
    "Technical training",
    "Team building",
    "Innovation showcase",
    "Security audit",
    "Development work",
    "Academic project",
    "Professional event",
    "Technical discussion",
    "Security research",
    "Collaborative work",
    "Achievement celebration"
  ];

  const links = [
    { href: "https://github.com/ryan-0816", label: "GitHub", icon: "github" },
    { href: "https://www.linkedin.com/in/ryantagen", label: "LinkedIn", icon: "linkedin" },
    { href: "mailto:rst4035@rit.edu", label: "Email", icon: "mail" },
    { href: "/Ryan Tagen Resume.pdf", label: "Resume", icon: "file" }
  ];
  // ====================

  // Stationary photo positions + motion
  type PhotoState = {
    x: number;   // % of stage width
    y: number;   // % of stage height
    size: number; // % (width = height = size)
    vx: number;  // % per second
    vy: number;  // % per second
    index: number;
    showCaption: boolean;
  };

  let photoStates: PhotoState[] = [];

  // Center box boundaries (% of stage) — increased size
  let innerBox = { x: 20, y: 20, width: 60, height: 60 };

  // Random helpers
  const rand = (min: number, max: number) => min + Math.random() * (max - min);
  const sign = () => (Math.random() < 0.5 ? -1 : 1);

  // Ensure a point is outside the inner box (with margin = half photo size)
  function isOutsideInnerBox(x: number, y: number, radius: number): boolean {
    return !(
      x + radius > innerBox.x &&
      x - radius < innerBox.x + innerBox.width &&
      y + radius > innerBox.y &&
      y - radius < innerBox.y + innerBox.height
    );
  }

  // Initialize photos at random positions BETWEEN inner box and outer border
  function initializePhotos() {
    // Slow speeds, small random sizes (slightly larger average)
    const minSize = 8;
    const maxSize = 12;

    photoStates = images.map((_, i) => {
      const size = rand(minSize, maxSize);
      const r = size / 2;

      // Keep trying random spots until we're outside the inner box and inside the stage
      let x = 50, y = 50;
      let tries = 0;
      do {
        // Keep photos within screen bounds (account for radius)
        x = rand(r + 1, 100 - (r + 1));
        y = rand(r + 1, 100 - (r + 1));
        tries++;
        if (tries > 200) break; // just in case
      } while (!isOutsideInnerBox(x, y, r));

      // Slow velocities in % per second (time-based)
      const speed = rand(2, 6); // % per second (slow)
      const angle = rand(0, Math.PI * 2);
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      return {
        x, y, size,
        vx, vy,
        index: i,
        showCaption: false
      };
    });
  }

  // Hover line to the center (optional visual)
  let hoverIndex: number | null = null;

  // Physics tick — gentle and efficient
  let rafId = 0;
  let lastT = 0;
  const frameInterval = 1000 / 30; // ~30 FPS
  let accum = 0;

  function tick(ts: number) {
    if (!lastT) lastT = ts;
    const dtMs = ts - lastT;
    lastT = ts;
    accum += dtMs;

    // Update only at ~30fps to reduce CPU/GPU
    if (accum >= frameInterval) {
      const dt = accum / 1000; // seconds since last update batch
      accum = 0;

      stepPhysics(dt);
    }

    rafId = requestAnimationFrame(tick);
  }

  function clamp(val: number, lo: number, hi: number) {
    return Math.max(lo, Math.min(hi, val));
  }

  // Simple circle-based collision between photos (elastic-ish, cheap)
  function resolveCollisions(states: PhotoState[]) {
    for (let i = 0; i < states.length; i++) {
      for (let j = i + 1; j < states.length; j++) {
        const a = states[i];
        const b = states[j];
        const ra = a.size / 2;
        const rb = b.size / 2;

        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist2 = dx * dx + dy * dy;
        const minDist = ra + rb;

        if (dist2 > 0 && dist2 < minDist * minDist) {
          const dist = Math.sqrt(dist2);
          const nx = dx / (dist || 1);
          const ny = dy / (dist || 1);

          // Push them apart minimally
          const overlap = (minDist - dist) / 2;
          a.x -= nx * overlap;
          a.y -= ny * overlap;
          b.x += nx * overlap;
          b.y += ny * overlap;

          // Reflect velocities along the collision normal (very cheap elastic)
          const vaDotN = a.vx * nx + a.vy * ny;
          const vbDotN = b.vx * nx + b.vy * ny;

          const vaNx = vaDotN * nx;
          const vaNy = vaDotN * ny;
          const vbNx = vbDotN * nx;
          const vbNy = vbDotN * ny;

          // Swap normal components (equal mass approximation)
          a.vx += (vbNx - vaNx);
          a.vy += (vbNy - vaNy);
          b.vx += (vaNx - vbNx);
          b.vy += (vaNy - vbNy);
        }
      }
    }
  }

  function bounceOffInnerBox(p: PhotoState) {
    const r = p.size / 2;
    const left = innerBox.x;
    const right = innerBox.x + innerBox.width;
    const top = innerBox.y;
    const bottom = innerBox.y + innerBox.height;

    // If circle intersects the inner box rectangle, reflect against nearest side
    const insideX = p.x + r > left && p.x - r < right;
    const insideY = p.y + r > top && p.y - r < bottom;

    if (insideX && insideY) {
      // Find minimal penetration side
      const penLeft = Math.abs((p.x + r) - left);
      const penRight = Math.abs(right - (p.x - r));
      const penTop = Math.abs((p.y + r) - top);
      const penBottom = Math.abs(bottom - (p.y - r));
      const minPen = Math.min(penLeft, penRight, penTop, penBottom);

      if (minPen === penLeft) {
        p.x = left - r; // move left of box
        p.vx = -Math.abs(p.vx);
      } else if (minPen === penRight) {
        p.x = right + r; // move right of box
        p.vx = Math.abs(p.vx);
      } else if (minPen === penTop) {
        p.y = top - r; // move above box
        p.vy = -Math.abs(p.vy);
      } else {
        p.y = bottom + r; // move below box
        p.vy = Math.abs(p.vy);
      }
    }
  }

  function stepPhysics(dt: number) {
    // Move
    for (const p of photoStates) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      const r = p.size / 2;

      // Bounce off screen edges
      if (p.x - r < 0) {
        p.x = r;
        p.vx = Math.abs(p.vx);
      } else if (p.x + r > 100) {
        p.x = 100 - r;
        p.vx = -Math.abs(p.vx);
      }
      if (p.y - r < 0) {
        p.y = r;
        p.vy = Math.abs(p.vy);
      } else if (p.y + r > 100) {
        p.y = 100 - r;
        p.vy = -Math.abs(p.vy);
      }

      // Bounce off inner box
      bounceOffInnerBox(p);
    }

    // Collisions between photos
    resolveCollisions(photoStates);

    // Mild damping to avoid runaway precision drift
    for (const p of photoStates) {
      p.vx *= 0.999;
      p.vy *= 0.999;
      // Clamp positions defensively
      const r = p.size / 2;
      p.x = clamp(p.x, r, 100 - r);
      p.y = clamp(p.y, r, 100 - r);
    }
  }

  // Hover behavior: caption + big zoom handled via CSS, just toggle caption
  function handleMouseEnter(i: number) {
    hoverIndex = i;
    photoStates[i].showCaption = true;
  }
  function handleMouseLeave(i: number) {
    if (hoverIndex === i) hoverIndex = null;
    photoStates[i].showCaption = false;
  }

  // Start on mount
  import { onMount, onDestroy } from 'svelte';
  onMount(() => {
    initializePhotos();
    rafId = requestAnimationFrame(tick);
  });
  onDestroy(() => {
    if (rafId) cancelAnimationFrame(rafId);
  });

  // Pointer parallax (kept but super minimal)
  let mx = 0, my = 0;
  const onPointerMove = (e: PointerEvent) => {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    mx = (e.clientX / w) - 0.5;
    my = (e.clientY / h) - 0.5;
  };

  const iconPath = (name: string) => {
    switch (name) {
      case "github":
        return "M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.35-1.75-1.35-1.75-1.1-.76.08-.74.08-.74 1.22.09 1.86 1.27 1.86 1.27 1.08 1.85 2.83 1.32 3.52 1.01.11-.79.42-1.32.77-1.63-2.66-.30-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.25-3.22-.13-.30-.54-1.52.12-3.16 0 0 1.01-.32 3.30 1.23a11.4 11.4 0 0 1 6.01 0c2.29-1.55 3.30-1.23 3.30-1.23.66 1.64.25 2.86.12 3.16.78.84 1.25 1.91 1.25 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.82 1.10.82 2.22v3.29c0 .33.22.70.83.58A12 12 0 0 0 12 .5Z";
      case "linkedin":
        return "M4.98 3.5a2.5 2.5 0 1 1-.02 5 2.5 2.5 0 0 1 .02-5zM3 8.98h3.96v12.5H3V8.98zm6.74 0H14v1.7h.05c.58-1.10 2-2.25 4.12-2.25 4.41 0 5.23 2.90 5.23 6.67v6.38H19.4v-5.66c0-1.35-.02-3.09-1.88-3.09-1.88 0-2.17 1.47-2.17 2.99v5.76H11.7V8.98z";
      case "mail":
        return "M2 6l10 7 10-7v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6zm20-2H2l10 7 10-7z";
      case "file":
        return "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z";
      default:
        return "";
    }
  };
</script>

<div class="page" on:pointermove={onPointerMove}>
  <div class="bg"></div>

  <div class="stage">
    <svg class="constellation" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {#if hoverIndex !== null}
        {#key hoverIndex}
          <line
            x1="50" y1="50"
            x2={photoStates[hoverIndex]?.x || 50} y2={photoStates[hoverIndex]?.y || 50}
            class="beam"
          />
        {/key}
      {/if}
      
      <!-- Inner box border -->
      <rect
        x={innerBox.x} y={innerBox.y}
        width={innerBox.width} height={innerBox.height}
        class="inner-box"
        rx="16" ry="16"
      />
    </svg>

    <div class="center-box">
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

    <div class="field">
      {#each photoStates as state, i}
        <!-- container fills the stage so percentage positioning works -->
        <div class="photo-container">
          <figure
            class="thumb"
            style="
              left: {state.x}%;
              top: {state.y}%;
              width: {state.size}%;
              height: {state.size}%;
            "
            on:mouseenter={() => handleMouseEnter(i)}
            on:mouseleave={() => handleMouseLeave(i)}
          >
            <img src={images[i]} alt={`gallery image ${i + 1}`} loading="lazy" decoding="async" />
            <div class="gloss"></div>

            <!-- Caption tethered to photo, always placed just below -->
            {#if state.showCaption}
              <figcaption class="caption">{captions[i]}</figcaption>
            {/if}
          </figure>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  /* ——— Palette: dark red & gray ——— */
  :root{
    --bg-0:#1b1c20;
    --bg-1:#22242a;
    --bg-2:#2a2d34;
    --ink:#e8e8ee;
    --muted:#a9acb8;
    --deep-red:#7d0e0e;
    --dark-crimson:#5f0b0b;
    --glow-red:#c21f1f;
    --box-glow:rgba(194,31,31,0.15);
  }

  :global(html), :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .page{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    min-height: 100vh;
    background: var(--bg-0);
    overflow: hidden;
    position: relative;
    color: var(--ink);
    font-family: Inter, SF Pro Text, Segoe UI, Roboto, system-ui, -apple-system, Arial, sans-serif;
    padding: env(safe-area-inset-top) env(safe-area-inset-right)
             env(safe-area-inset-bottom) env(safe-area-inset-left);
    box-sizing: border-box;
  }
  @supports (height: 100dvh){
    .page{ height: 100dvh; min-height: 100dvh; }
  }
  @supports (height: 100svh){
    .page{ height: 100svh; min-height: 100svh; }
  }

  .bg{
    position:absolute; 
    inset:0; 
    z-index:0;
    background:
      radial-gradient(120vmax 80vmax at 70% 30%, rgba(194,31,31,0.12), transparent 60%),
      radial-gradient(90vmax 90vmax at 20% 80%, rgba(125,14,14,0.12), transparent 60%),
      linear-gradient(180deg, var(--bg-2), var(--bg-1) 40%, var(--bg-0));
  }
  .bg::after{
    content:""; 
    position:absolute; 
    inset:-150%;
    background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
    background-size: 3px 3px; 
    opacity:.18;
    animation: grain 40s linear infinite;
  }
  @keyframes grain{ to { transform: translate3d(-8%, -8%, 0); } }

  .stage{
    position: relative;
    width: min(90vmin, 90vh);
    height: min(90vmin, 90vh);
    aspect-ratio: 1 / 1;
    z-index: 1;
    margin: 0 auto;
  }

  .constellation{
    position:absolute; 
    inset:0; 
    z-index:2; 
    pointer-events:none;
  }
  .beam{
    stroke: var(--glow-red);
    stroke-width: .6; 
    vector-effect: non-scaling-stroke; 
    stroke-linecap: round;
    filter: drop-shadow(0 0 .6vmin rgba(194,31,31,.65));
    animation: ping 360ms ease-out;
  }
  @keyframes ping{ from{ opacity:0; stroke-width:.3; } to{ opacity:1; stroke-width:.6; } }

  .inner-box {
    fill: none;
    stroke: var(--box-glow);
    stroke-width: 1.2;
    vector-effect: non-scaling-stroke;
    filter: drop-shadow(0 0 12px var(--box-glow));
  }

  /* Bigger center box */
  .center-box {
    position: absolute;
    top: 20%;
    left: 20%;
    width: 60%;
    height: 60%;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(34, 36, 42, 0.85);
    backdrop-filter: blur(12px);
    border: 1.5px solid var(--box-glow);
    border-radius: 16px;
    box-shadow: 
      0 0 40px rgba(194, 31, 31, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      inset 0 0 20px rgba(194, 31, 31, 0.05);
  }

  .center-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2.5vmin;
    width: 100%;
  }

  .name{
    font-size: clamp(2rem, 7vmin, 6rem);
    line-height: .95; 
    margin: 0 0 .5rem 0;
    letter-spacing: .04em;
    background: linear-gradient(180deg, #f3f3f6, #c7c9d3 65%, #9ea3b1);
    -webkit-background-clip:text; 
    background-clip:text; 
    color: transparent;
  }
  .tag{
    margin: 0 0 1.2rem 0;
    color: var(--muted);
    font-size: clamp(.85rem, 2vmin, 1.1rem);
  }
  .links{
    display:flex; 
    gap:.7rem; 
    flex-wrap:wrap; 
    justify-content:center;
  }
  .pill{
    display:inline-flex; 
    align-items:center; 
    gap:.5rem;
    padding:.6rem 1rem; 
    border-radius:999px;
    color:#fff; 
    text-decoration:none; 
    font-weight:600; 
    letter-spacing:.02em;
    background: linear-gradient(180deg, var(--deep-red), var(--dark-crimson));
    box-shadow: 0 6px 18px rgba(194,31,31,.25), inset 0 0 0 1px rgba(194,31,31,.35);
    transition: transform 160ms ease, box-shadow 160ms ease;
    font-size: clamp(.8rem, 1.8vmin, 1rem);
  }
  .pill:hover{ 
    transform: translateY(-2px); 
    box-shadow: 0 10px 24px rgba(194,31,31,.35), inset 0 0 0 1px rgba(194,31,31,.5); 
  }
  .pill svg{ width:16px; height:16px; fill: currentColor; }

  .field{
    position:absolute; 
    inset:0; 
    z-index:2; 
    pointer-events:none;
  }

  .photo-container {
    position: absolute;
    inset: 0;
    pointer-events: auto;
  }

  .thumb{
    position:absolute; 
    transform: translate(-50%, -50%);
    border-radius: 12px; 
    overflow:hidden;
    pointer-events:auto;
    box-shadow: 0 8px 24px rgba(0,0,0,.4), 0 0 0 1px rgba(255,255,255,.06);
    transition: transform 180ms ease, box-shadow 180ms ease;
    background: #2f323a;
    cursor: pointer;
    z-index: 5;
  }

  /* Hover blow-up (GPU-cheap) */
  .thumb:hover{
    transform: translate(-50%, -50%) scale(1.6);
    box-shadow: 0 16px 40px rgba(0,0,0,.6), 0 0 0 2px rgba(194,31,31,.6);
    z-index: 25;
  }

  .thumb img{ 
    width:100%; 
    height:100%; 
    object-fit:cover; 
    display:block; 
    filter: saturate(.95) contrast(1.05); 
  }
  .thumb .gloss{
    position:absolute; 
    inset:0; 
    pointer-events:none;
    background:
      radial-gradient(90% 90% at 85% 15%, rgba(255,255,255,.18), transparent 45%),
      linear-gradient(180deg, rgba(194,31,31,.16), transparent 45%, transparent 55%, rgba(194,31,31,.12));
    mix-blend-mode: screen;
  }

  /* Caption attached to the photo, below it */
  .caption {
    position: absolute;
    left: 50%;
    bottom: -0.1rem;
    transform: translate(-50%, 100%); /* just below the thumb */
    background: rgba(34, 36, 42, 0.95);
    backdrop-filter: blur(8px);
    color: var(--ink);
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
    font-size: 0.8rem;
    white-space: nowrap;
    z-index: 30;
    border: 1px solid var(--box-glow);
    box-shadow: 0 4px 16px rgba(0,0,0,.4);
    pointer-events: none;
    animation: fadeIn 150ms ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translate(-50%, calc(100% + 8px)); }
    to   { opacity: 1; transform: translate(-50%, 100%); }
  }

  @media (max-width: 720px){
    .stage{ width: min(85vmin, 85vh); height: min(85vmin, 85vh); }
    .center-box { top: 18%; left: 18%; width: 64%; height: 64%; }
    .name { font-size: clamp(1.8rem, 6vmin, 5rem); }
    .links { gap: 0.5rem; }
    .pill { padding: 0.5rem 0.8rem; font-size: 0.85rem; }
  }

  @media (max-width: 480px){
    .stage{ width: min(80vmin, 80vh); height: min(80vmin, 80vh); }
    .center-box { top: 16%; left: 16%; width: 68%; height: 68%; }
    .name { font-size: clamp(1.6rem, 5vmin, 4rem); }
    .links { flex-direction: column; align-items: center; }
    .tag { margin-bottom: 1rem; }
    .caption { font-size: 0.72rem; padding: 0.35rem 0.7rem; }
  }
</style>
