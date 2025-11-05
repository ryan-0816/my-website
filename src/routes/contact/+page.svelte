<script lang="ts">
  export let name = "RYAN TAGEN";
  const tagline = "Get in touch";

  // Your links
  const links = [
    { href: "mailto:rst4035@rit.edu", label: "Email", icon: "mail" },
    { href: "https://github.com/ryan-0816", label: "GitHub", icon: "github" },
    { href: "https://www.linkedin.com/in/ryantagen", label: "LinkedIn", icon: "linkedin" },
    { href: "/Ryan Tagen Resume.pdf", label: "Resume", icon: "file" }
  ];

  // Copy-to-clipboard handling
  let emailCopied = false;
  let discordCopied = false;
  const email = "rst4035@rit.edu";
  const discord = "ryantagen";

  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;

  function handleMouseMove(e: MouseEvent) {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    emailCopied = true;
    setTimeout(() => (emailCopied = false), 1400);
  }

  async function copyDiscord() {
    try {
      await navigator.clipboard.writeText(discord);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = discord;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    discordCopied = true;
    setTimeout(() => (discordCopied = false), 1400);
  }

  const iconPath = (name: string) => ({
    github: "M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.35-1.75-1.35-1.75-1.1-.76.08-.74.08-.74 1.22.09 1.86 1.27 1.86 1.27 1.08 1.85 2.83 1.32 3.52 1.01.11-.79.42-1.32.77-1.63-2.66-.30-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.25-3.22-.13-.30-.54-1.52.12-3.16 0 0 1.01-.32 3.30 1.23a11.4 11.4 0 0 1 6.01 0c2.29-1.55 3.30-1.23 3.30-1.23.66 1.64.25 2.86.12 3.16.78.84 1.25 1.91 1.25 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.82 1.10.82 2.22v3.29c0 .33.22.70.83.58A12 12 0 0 0 12 .5Z",
    linkedin: "M4.98 3.5a2.5 2.5 0 1 1-.02 5 2.5 2.5 0 0 1 .02-5zM3 8.98h3.96v12.5H3V8.98zm6.74 0H14v1.7h.05c.58-1.10 2-2.25 4.12-2.25 4.41 0 5.23 2.90 5.23 6.67v6.38H19.4v-5.66c0-1.35-.02-3.09-1.88-3.09-1.88 0-2.17 1.47-2.17 2.99v5.76H11.7V8.98z",
    mail: "M2 6l10 7 10-7v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6zm20-2H2l10 7 10-7z",
    file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"
  }[name] || "");
</script>

<svelte:window on:mousemove={handleMouseMove} />

<div class="page" tabindex="0">
  <div class="bg" style="transform: translate({mouseX * 0.5}px, {mouseY * 0.5}px)">
    <!-- Left side lines -->
    <div class="red-line line1" style="transform: translate({mouseX * 0.3}px, {mouseY * 0.3}px) rotate(25deg)"></div>
    <div class="red-line line2" style="transform: translate({mouseX * 0.4}px, {mouseY * 0.4}px) rotate(-15deg)"></div>
    <div class="red-line line3" style="transform: translate({mouseX * 0.35}px, {mouseY * 0.35}px) rotate(45deg)"></div>
    <div class="red-line line4" style="transform: translate({mouseX * 0.45}px, {mouseY * 0.45}px) rotate(-30deg)"></div>
    <div class="red-line line5" style="transform: translate({mouseX * 0.38}px, {mouseY * 0.38}px) rotate(12deg)"></div>
    
    <!-- Center lines -->
    <div class="red-line line6" style="transform: translate({mouseX * 0.5}px, {mouseY * 0.5}px) rotate(-42deg)"></div>
    <div class="red-line line7" style="transform: translate({mouseX * 0.42}px, {mouseY * 0.42}px) rotate(60deg)"></div>
    <div class="red-line line8" style="transform: translate({mouseX * 0.48}px, {mouseY * 0.48}px) rotate(-8deg)"></div>
    <div class="red-line line9" style="transform: translate({mouseX * 0.46}px, {mouseY * 0.46}px) rotate(35deg)"></div>
    <div class="red-line line10" style="transform: translate({mouseX * 0.44}px, {mouseY * 0.44}px) rotate(-52deg)"></div>
    
    <!-- Right side lines -->
    <div class="red-line line11" style="transform: translate({mouseX * 0.52}px, {mouseY * 0.52}px) rotate(18deg)"></div>
    <div class="red-line line12" style="transform: translate({mouseX * 0.36}px, {mouseY * 0.36}px) rotate(-38deg)"></div>
    <div class="red-line line13" style="transform: translate({mouseX * 0.54}px, {mouseY * 0.54}px) rotate(52deg)"></div>
    <div class="red-line line14" style="transform: translate({mouseX * 0.4}px, {mouseY * 0.4}px) rotate(-22deg)"></div>
    <div class="red-line line15" style="transform: translate({mouseX * 0.47}px, {mouseY * 0.47}px) rotate(68deg)"></div>
    
    <!-- Additional scattered lines -->
    <div class="red-line line16" style="transform: translate({mouseX * 0.33}px, {mouseY * 0.33}px) rotate(-48deg)"></div>
    <div class="red-line line17" style="transform: translate({mouseX * 0.55}px, {mouseY * 0.55}px) rotate(8deg)"></div>
    <div class="red-line line18" style="transform: translate({mouseX * 0.39}px, {mouseY * 0.39}px) rotate(42deg)"></div>
    <div class="red-line line19" style="transform: translate({mouseX * 0.51}px, {mouseY * 0.51}px) rotate(-28deg)"></div>
    <div class="red-line line20" style="transform: translate({mouseX * 0.43}px, {mouseY * 0.43}px) rotate(72deg)"></div>
    
    <div class="glow-orb orb1" style="transform: translate({mouseX * 0.6}px, {mouseY * 0.6}px)"></div>
    <div class="glow-orb orb2" style="transform: translate({mouseX * -0.4}px, {mouseY * -0.4}px)"></div>
    <div class="glow-orb orb3" style="transform: translate({mouseX * 0.5}px, {mouseY * -0.5}px)"></div>
  </div>

  <div class="stage">
    <svg class="constellation" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <rect x="25" y="18.75" width="50" height="37.5" class="inner-box" rx="16" ry="16" />
    </svg>

    <section class="center-box">
      <header class="head">
        <h1 class="name">{name}</h1>
        <p class="tag">{tagline}</p>
      </header>

      <div class="grid">
        <!-- Email row -->
        <div class="row">
          <span class="label">Email</span>
          <div class="value">
            <a class="mono" href="mailto:{email}">{email}</a>
            <button class="tiny" type="button" on:click={copyEmail} aria-label="Copy email to clipboard">
              {emailCopied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </div>

        <!-- Discord row -->
        <div class="row">
          <span class="label">Discord</span>
          <div class="value">
            <span class="mono">{discord}</span>
            <button class="tiny" type="button" on:click={copyDiscord} aria-label="Copy Discord to clipboard">
              {discordCopied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </div>

        <!-- Links -->
        <div class="row">
          <span class="label">Links</span>
          <nav class="links" aria-label="contact links">
            {#each links as l}
              <a class="pill" href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d={iconPath(l.icon)} /></svg>
                <span>{l.label}</span>
              </a>
            {/each}
          </nav>
        </div>

        <!-- Note -->
        <div class="row">
          <span class="label">Note</span>
          <p class="note">
            I check my email often, so I prefer communications there. I do also check linkedin occasionally, but only if I get an email about it.
          </p>
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  :root{
    --bg-0:#1b1c20; --bg-1:#22242a; --bg-2:#2a2d34;
    --ink:#e8e8ee; --muted:#a9acb8;
    --deep-red:#7d0e0e; --dark-crimson:#5f0b0b; --glow-red:#c21f1f;
    --box-glow:rgba(194,31,31,0.15);
  }

  :global(html), :global(body) { margin:0; padding:0; width:100%; height:100%; overflow:hidden; }

  .page{
    position:relative; display:flex; justify-content:center; align-items:center;
    width:100vw; height:100vh; background:var(--bg-0); color:var(--ink);
    font-family:Inter,SF Pro Text,Segoe UI,Roboto,system-ui,-apple-system,Arial,sans-serif;
    padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
    box-sizing:border-box; outline:none;
  }

  .bg{
    position:absolute; inset:0; z-index:0;
    background:
      radial-gradient(120vmax 80vmax at 70% 30%, rgba(194,31,31,0.12), transparent 60%),
      radial-gradient(90vmax 90vmax at 20% 80%, rgba(125,14,14,0.12), transparent 60%),
      linear-gradient(180deg, var(--bg-2), var(--bg-1) 40%, var(--bg-0));
    transition: transform 0.3s ease-out;
  }
  .bg::after{
    content:""; position:absolute; inset:-150%;
    background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
    background-size: 3px 3px; opacity:.18; animation: grain 40s linear infinite;
  }
  @keyframes grain{ to { transform: translate3d(-8%, -8%, 0); } }

  /* Animated red lines at various angles */
  .red-line {
    position: absolute; 
    width: 150%; 
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(194,31,31,0.4), transparent);
    filter: blur(1px); 
    box-shadow: 0 0 8px rgba(194,31,31,0.5);
    transform-origin: center;
    transition: transform 0.3s ease-out;
  }

  @keyframes float {
    0%, 100% { translate: 0 0; }
    50% { translate: 10px -20px; }
  }
  @keyframes float2 {
    0%, 100% { translate: 0 0; }
    50% { translate: -15px 15px; }
  }
  @keyframes float3 {
    0%, 100% { translate: 0 0; }
    50% { translate: 20px -10px; }
  }
  @keyframes glow {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.7; }
  }

  /* Left side lines */
  .line1 { top: 12%; left: 15%; animation: float 8s ease-in-out infinite; }
  .line2 { top: 28%; left: 8%; animation: float2 10s ease-in-out infinite 1s; }
  .line3 { top: 45%; left: 12%; animation: float3 12s ease-in-out infinite 2s; }
  .line4 { top: 62%; left: 18%; animation: float 9s ease-in-out infinite 1.5s; }
  .line5 { top: 78%; left: 10%; animation: float2 11s ease-in-out infinite 0.5s; }
  
  /* Center lines */
  .line6 { top: 20%; left: 50%; animation: float3 13s ease-in-out infinite 2.5s; }
  .line7 { top: 35%; left: 50%; animation: float 14s ease-in-out infinite 3s; }
  .line8 { top: 50%; left: 50%; animation: float2 9s ease-in-out infinite 1.8s; }
  .line9 { top: 65%; left: 50%; animation: float3 10.5s ease-in-out infinite 0.8s; }
  .line10 { top: 85%; left: 50%; animation: float 11.5s ease-in-out infinite 2.2s; }
  
  /* Right side lines */
  .line11 { top: 15%; left: 75%; animation: float2 12.5s ease-in-out infinite 1.2s; }
  .line12 { top: 32%; left: 82%; animation: float3 9.5s ease-in-out infinite 0.7s; }
  .line13 { top: 48%; left: 78%; animation: float 13.5s ease-in-out infinite 2.8s; }
  .line14 { top: 58%; left: 85%; animation: float2 10.8s ease-in-out infinite 1.4s; }
  .line15 { top: 75%; left: 80%; animation: float3 11.8s ease-in-out infinite 2.1s; }
  
  /* Additional scattered lines */
  .line16 { top: 8%; left: 38%; animation: float 15s ease-in-out infinite 3.5s; }
  .line17 { top: 92%; left: 62%; animation: float2 8.5s ease-in-out infinite 0.3s; }
  .line18 { top: 38%; left: 25%; animation: float3 14.5s ease-in-out infinite 2.9s; }
  .line19 { top: 72%; left: 68%; animation: float 10.2s ease-in-out infinite 1.6s; }
  .line20 { top: 55%; left: 35%; animation: float2 12.8s ease-in-out infinite 2.4s; }

  /* Glowing orbs */
  .glow-orb {
    position: absolute; border-radius: 50%; filter: blur(60px);
    animation: glow 6s ease-in-out infinite;
    transition: transform 0.3s ease-out;
  }
  .orb1 {
    top: 10%; left: 15%; width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(194,31,31,0.3), transparent);
  }
  .orb2 {
    bottom: 15%; right: 20%; width: 250px; height: 250px;
    background: radial-gradient(circle, rgba(125,14,14,0.25), transparent);
    animation-delay: 2s;
  }
  .orb3 {
    top: 50%; right: 10%; width: 180px; height: 180px;
    background: radial-gradient(circle, rgba(194,31,31,0.2), transparent);
    animation-delay: 4s;
  }

  .stage{ position:absolute; inset:0; width:100vw; height:100vh; z-index:1; overflow:hidden; }
  .constellation{ position:absolute; inset:0; z-index:2; pointer-events:none; }
  .inner-box {
    fill:none; stroke:var(--box-glow); stroke-width:1.2; vector-effect:non-scaling-stroke;
    filter: drop-shadow(0 0 12px var(--box-glow));
  }

  .center-box{
    position:relative; z-index:3; width:min(780px, 92vw);
    margin:0 auto; padding: clamp(1rem, 3vmin, 2rem);
    background: rgba(34,36,42,0.85); backdrop-filter: blur(12px);
    border: 1.5px solid var(--box-glow); border-radius: 16px;
    box-shadow: 0 0 40px rgba(194,31,31,0.15),
                inset 0 1px 0 rgba(255,255,255,0.08),
                inset 0 0 20px rgba(194,31,31,0.05);
  }

  .head{ text-align:center; margin-bottom: 1rem; }
  .name{
    font-size: clamp(1.6rem, 6vmin, 3.2rem);
    line-height:.95; margin:0 .2rem .4rem .2rem; letter-spacing:.04em;
    background: linear-gradient(180deg, #f3f3f6, #c7c9d3 65%, #9ea3b1);
    -webkit-background-clip:text; background-clip:text; color:transparent;
  }
  .tag{ margin:0; color: var(--muted); font-size: clamp(.8rem, 1.8vmin, 1rem); }

  .grid{ display:flex; flex-direction:column; gap: 1rem; margin-top:.5rem; }

  .row{
    display:grid; grid-template-columns: 120px 1fr; gap: 1rem;
    align-items:center; padding: .8rem;
    background: rgba(34,36,42,0.6);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
  }
  .label{ color: var(--muted); font-weight:600; letter-spacing:.02em; }
  .value{ display:flex; align-items:center; gap:.6rem; flex-wrap:wrap; }

  .mono{
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
    color:#fff; text-decoration:none; background:rgba(0,0,0,.25);
    padding:.35rem .55rem; border-radius:8px; border:1px solid rgba(255,255,255,.06);
  }

  .tiny{
    font-size:.8rem; padding:.35rem .6rem; border-radius:999px; border:1px solid rgba(255,255,255,.08);
    background: linear-gradient(180deg, var(--deep-red), var(--dark-crimson));
    color:#fff; cursor:pointer;
    box-shadow: 0 6px 18px rgba(194,31,31,.25), inset 0 0 0 1px rgba(194,31,31,.35);
    transition: transform 120ms ease, box-shadow 120ms ease;
  }
  .tiny:hover{ transform: translateY(-1px); box-shadow: 0 10px 24px rgba(194,31,31,.35), inset 0 0 0 1px rgba(194,31,31,.5); }
  .tiny:focus-visible { outline: 2px solid var(--glow-red); outline-offset: 2px; }

  .links{ display:flex; gap:.6rem; flex-wrap:wrap; align-items:center; }
  .pill{
    display:inline-flex; align-items:center; gap:.5rem; padding:.5rem 1rem; border-radius:999px;
    color:#fff; text-decoration:none; font-weight:600; letter-spacing:.02em;
    background: linear-gradient(180deg, var(--deep-red), var(--dark-crimson));
    box-shadow: 0 6px 18px rgba(194,31,31,.25), inset 0 0 0 1px rgba(194,31,31,.35);
    transition: transform 160ms ease, box-shadow 160ms ease;
    font-size: clamp(.75rem, 1.6vmin, .95rem);
  }
  .pill:hover{ transform: translateY(-2px); box-shadow: 0 10px 24px rgba(194,31,31,.35), inset 0 0 0 1px rgba(194,31,31,.5); }
  .pill:focus-visible { outline: 2px solid var(--glow-red); outline-offset: 2px; }
  .pill svg{ width:16px; height:16px; fill: currentColor; }

  .note{ margin:0; color: var(--ink); opacity:.85; }

  @media (max-width: 560px){
    .row{ grid-template-columns: 1fr; }
    .label{ opacity:.8; }
    .center-box{ border-radius: 12px; }
  }
</style>