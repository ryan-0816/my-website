<script lang="ts">
  // ===== EDIT ME =====
  export let name = "RYAN TAGEN";
  const tagline = "Cybersecurity • Systems • Builder";

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
    "/photos/photo16.jpg"
  ];

  const links = [
    { href: "https://github.com/ryan-0816", label: "GitHub", icon: "github" },
    { href: "https://www.linkedin.com/in/ryantagen", label: "LinkedIn", icon: "linkedin" },
    { href: "mailto:rst4035@rit.edu", label: "Email", icon: "mail" },
    { href: "/Ryan Tagen Resume.pdf", label: "Resume", icon: "file" } // <-- added resume link
  ];
  // ====================

  // Place images on responsive rings inside a 100x100 stage (percent coords)
  type Pos = { x: number; y: number; size: number; delay: number };
  const ringRadiiPct = [24, 36, 46];     // ring radii as PERCENT of stage (fits all screens)
  const ringCount = ringRadiiPct.length;
  const perRing = Math.ceil(images.length / ringCount);

  const positions: Pos[] = images.map((_, i) => {
    const ring = Math.min(Math.floor(i / perRing), ringCount - 1);
    const idxInRing = i % perRing;
    const t = (idxInRing / perRing) * Math.PI * 2;
    const R = ringRadiiPct[ring];
    const jitter = (s: number) => Math.sin(s * 2.13) * 1.2; // small organic offset (in %)
    const x = 50 + R * Math.cos(t) + jitter(i);
    const y = 50 + R * Math.sin(t) + jitter(i + 1);
    const size = 12 + (Math.sin(i * 1.33) + 1) * 2.5;       // 12–17% of stage
    const delay = (i * 90) % 1000;
    return { x, y, size, delay };
  });

  // Minimal parallax—safe so it never breaks bounds (applied inside the stage)
  let mx = 0, my = 0; // normalized -0.5..0.5
  const onPointerMove = (e: PointerEvent) => {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    mx = (e.clientX / w) - 0.5;
    my = (e.clientY / h) - 0.5;
  };

  // Hover line to the center
  let hoverIndex: number | null = null;

  const iconPath = (name: string) => {
    switch (name) {
      case "github":
        return "M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.35-1.75-1.35-1.75-1.1-.76.08-.74.08-.74 1.22.09 1.86 1.27 1.86 1.27 1.08 1.85 2.83 1.32 3.52 1.01.11-.79.42-1.32.77-1.63-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.25-3.22-.13-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.64.25 2.86.12 3.16.78.84 1.25 1.91 1.25 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.82 1.1.82 2.22v3.29c0 .33.22.7.83.58A12 12 0 0 0 12 .5Z";
      case "linkedin":
        return "M4.98 3.5a2.5 2.5 0 1 1-.02 5 2.5 2.5 0 0 1 .02-5zM3 8.98h3.96v12.5H3V8.98zm6.74 0H14v1.7h.05c.58-1.1 2-2.25 4.12-2.25 4.41 0 5.23 2.9 5.23 6.67v6.38H19.4v-5.66c0-1.35-.02-3.09-1.88-3.09-1.88 0-2.17 1.47-2.17 2.99v5.76H11.7V8.98z";
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
            x2={positions[hoverIndex].x} y2={positions[hoverIndex].y}
            class="beam"
          />
        {/key}
      {/if}
    </svg>

    <div class="center">
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

    <div class="field">
      {#each images as src, i}
        <div class="orbit-container" style="--orbit-index: {i};">
          <figure
            class="thumb"
            style="
              left: calc({positions[i].x}% + {mx * 1.2}%);
              top:  calc({positions[i].y}% + {my * 1.2}%);
              width:{positions[i].size}%;
              height:{positions[i].size}%;
              animation-delay:{positions[i].delay}ms;"
            on:mouseenter={() => (hoverIndex = i)}
            on:mouseleave={() => (hoverIndex = null)}
          >
            <img src={src} alt="gallery image {i + 1}" loading="lazy" />
            <div class="gloss"></div>
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
  }

  /* Reset margins and padding to ensure full coverage */
  :global(html), :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  /* Full viewport + perfect centering */
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
    .page{ 
      height: 100dvh;
      min-height: 100dvh;
    }
  }
  @supports (height: 100svh){
    .page{ 
      height: 100svh;
      min-height: 100svh;
    }
  }

  /* Soft texture + crimson bloom */
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
  @keyframes grain{ 
    to { 
      transform: translate3d(-8%, -8%, 0); 
    } 
  }

  /* The magic: a perfectly centered square stage that fits any viewport */
  .stage{
    position: relative;
    width: min(90vmin, 90vh);
    height: min(90vmin, 90vh);
    aspect-ratio: 1 / 1;
    z-index: 1;
    margin: 0 auto;
  }

  /* Constellation beam lives in stage coordinates (0..100%) */
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
  @keyframes ping{ 
    from{ 
      opacity:0; 
      stroke-width:.3; 
    } 
    to{ 
      opacity:1; 
      stroke-width:.6; 
    } 
  }

  .center{
    position:absolute; 
    inset:0; 
    z-index:3;
    display:flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align:center;
    padding: 6vmin;
  }
  .name{
    font-size: clamp(2.6rem, 9vmin, 8rem);
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
    font-size: clamp(.95rem, 2.2vmin, 1.15rem);
  }
  .links{
    display:flex; 
    gap:.75rem; 
    flex-wrap:wrap; 
    justify-content:center;
  }
  .pill{
    display:inline-flex; 
    align-items:center; 
    gap:.5rem;
    padding:.65rem 1.0rem; 
    border-radius:999px;
    color:#fff; 
    text-decoration:none; 
    font-weight:600; 
    letter-spacing:.02em;
    background: linear-gradient(180deg, var(--deep-red), var(--dark-crimson));
    box-shadow: 0 8px 22px rgba(194,31,31,.25), inset 0 0 0 1px rgba(194,31,31,.35);
    transition: transform 160ms ease, box-shadow 160ms ease;
  }
  .pill:hover{ 
    transform: translateY(-2px); 
    box-shadow: 0 12px 28px rgba(194,31,31,.35), inset 0 0 0 1px rgba(194,31,31,.5); 
  }
  .pill svg{ 
    width:18px; 
    height:18px; 
    fill: currentColor; 
  }

  .field{
    position:absolute; 
    inset:0; 
    z-index:2; 
    pointer-events:none;
  }

  /* Orbit container for circular rotation */
  .orbit-container {
    position: absolute;
    inset: 0;
    pointer-events: none;
    animation: orbit 120s linear infinite;
    animation-delay: calc(var(--orbit-index) * -15s);
  }

  @keyframes orbit {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .thumb{
    position:absolute; 
    transform: translate(-50%, -50%);
    border-radius: 16px; 
    overflow:hidden;
    pointer-events:auto;
    box-shadow: 0 10px 28px rgba(0,0,0,.35), 0 0 0 1px rgba(255,255,255,.05);
    transition: transform 200ms cubic-bezier(.2,.8,.2,1), box-shadow 200ms;
    animation: bob 7s ease-in-out infinite, counter-rotate 120s linear infinite;
    background: #2f323a;
  }
  
  /* Counter-rotate the images to keep them upright */
  @keyframes counter-rotate {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(-360deg);
    }
  }

  .thumb:hover{
    transform: translate(-50%, -50%) scale(1.04) rotate(0deg) !important;
    box-shadow: 0 16px 40px rgba(0,0,0,.5), 0 0 0 1px rgba(194,31,31,.45);
    animation-play-state: paused;
  }
  @keyframes bob{ 
    0%,100%{ 
      translate:0 0; 
    } 
    50%{ 
      translate:0 .7%; 
    } 
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

  /* Thumb sizing/placement use % of stage, so they always fit */
  .thumb{ 
    width: 14%; 
    height: 14%; 
  } /* baseline; inline style overrides with positions[i].size% */

  @media (max-width: 720px){
    .stage{ 
      width: min(85vmin, 85vh); 
      height: min(85vmin, 85vh); 
    }
    .tag{ 
      margin-bottom: 1rem; 
    }
    .links {
      gap: 0.5rem;
    }
    .pill {
      padding: 0.5rem 0.8rem;
      font-size: 0.9rem;
    }
    
    /* Slow down rotation on mobile for better performance */
    .orbit-container {
      animation-duration: 180s;
    }
    
    .thumb {
      animation-duration: 7s, 180s;
    }
  }

  @media (max-width: 480px){
    .stage{ 
      width: min(80vmin, 80vh); 
      height: min(80vmin, 80vh); 
    }
    .name {
      font-size: clamp(2rem, 8vmin, 6rem);
    }
    .links {
      flex-direction: column;
      align-items: center;
    }
  }
</style>