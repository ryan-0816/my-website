<!-- AboutStack.svelte — stacked, scrollable “hero” cards with gray glass backgrounds + side accent lines -->
<script lang="ts">
  const CONFIG = {
    width: 92,
    maxWidth: 1100,
    cardPad: 14,
    gap: 14,
    cardHeight: 360 // <-- change this to adjust card height (px)
  };

  export let name = "RYAN TAGEN";
  const tagline = "Cybersecurity";

  const baseAbout = `
  Hi! I’m Ryan, an accelerated BS/MS cybersecurity student at RIT. I love partaking in 
  cybersecurity related activities, playing sports, and my sense community here at college!
  I am currently looking to apply my technical and practical skills in a co-op in summer of 
  2026 in cybersecurity, computer science, information technology, or a related field. The 
  rest of this page summarizes my resume, along with some other hobbies and things about me!
  `;

  const about2 = `
  About me as well!
  
  `

  const about3 = `
  number 3
  `

  const about4 = `
  4
  `

  type Card = {
    heading: string;
    sub?: string;
    about: string;
    photo: string;
    links?: { href: string; label: string; icon: "github" | "linkedin" | "mail" | "file" }[];
  };

  const defaultLinks: Card["links"] = [
    { href: "https://github.com/ryan-0816", label: "GitHub", icon: "github" },
    { href: "https://www.linkedin.com/in/ryantagen", label: "LinkedIn", icon: "linkedin" },
    { href: "mailto:rst4035@rit.edu", label: "Email", icon: "mail" },
    { href: "/Ryan Tagen Resume.pdf", label: "Resume", icon: "file" }
  ];

  const sections: Card[] = [
    { heading: name, sub: tagline, about: baseAbout, photo: "/photos/photo5.jpg", links: defaultLinks },
    { heading: "Personal Projects", sub: "Builds • Scripts • Infra", about: about2, photo: "/photos/photo9.jpg" },
    { heading: "Work Experience", sub: "Labs • Clubs • Ops", about: about3, photo: "/photos/photo14.jpg" },
    { heading: "Hobbies", sub: "Skiing • Sailing • Tinkering", about: about4, photo: "/photos/photo18.jpg" }
  ];

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

<div class="page">
  <div class="bg"></div>
  <div class="side-lines" aria-hidden="true"></div>

  <main
    class="wrap"
    role="main"
    aria-label="About Ryan"
    style="
      --wrap-w: {CONFIG.width}vw;
      --wrap-max: {CONFIG.maxWidth}px;
      --card-pad: {CONFIG.cardPad}px;
      --stack-gap: {CONFIG.gap}px;
      --card-h: {CONFIG.cardHeight}px; /* CSS var used for card height */
    "
  >
    <div class="stack">
      {#each sections as s, i}
        <section class="hero card">
          <!-- TEXT COLUMN -->
          <div class="hero-text">
            <h1 class="name">{s.heading}</h1>
            {#if s.sub}<p class="tag">{s.sub}</p>{/if}
            <p class="lead">{s.about}</p>

            {#if i === 0 && s.links}
              <nav class="links first-card" aria-label="links">
                {#each s.links as l}
                  <a class="pill" href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d={iconPath(l.icon)} /></svg>
                    <span>{l.label}</span>
                  </a>
                {/each}
              </nav>
            {/if}
          </div>

          <!-- IMAGE COLUMN -->
          <figure class="hero-photo" aria-label="illustrative photo">
            <img src={s.photo} alt="Section photo" loading="lazy" decoding="async" />
            <div class="gloss"></div>
          </figure>
        </section>
      {/each}
    </div>
  </main>
</div>

<style>
  :root{
    --bg-0:#1b1c20; --bg-1:#22242a; --bg-2:#2a2d34;
    --ink:#e8e8ee; --muted:#a9acb8;
    --deep-red:#7d0e0e; --dark-crimson:#5f0b0b; --glow-red:#c21f1f;
    --card:#2a2d34cc; /* gray glass */
    --card-border:#ffffff1f;
  }

  /* Make page scrollable */
  :global(html), :global(body) {
    margin: 0;
    padding: 0;
    min-height: 100%;
    height: auto;
    background: var(--bg-0);
    color: var(--ink);
    font-family: Inter, SF Pro Text, Segoe UI, Roboto, system-ui, -apple-system, Arial, sans-serif;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .page { position: relative; min-height: 100vh; }

  .bg{
    position:absolute; inset:0; z-index:0;
    background:
      radial-gradient(120vmax 80vmax at 70% 30%, rgba(194,31,31,0.12), transparent 60%),
      radial-gradient(90vmax 90vmax at 20% 80%, rgba(125,14,14,0.12), transparent 60%),
      linear-gradient(180deg, var(--bg-2), var(--bg-1) 40%, var(--bg-0));
  }

  .side-lines{
    position: fixed; inset: 0; pointer-events: none; z-index: 1;
    background:
      linear-gradient(90deg, transparent 0, transparent calc(50% - 1px), rgba(255,255,255,0.06) calc(50% - 1px), rgba(255,255,255,0.06) calc(50% + 1px), transparent calc(50% + 1px)),
      linear-gradient(0deg, rgba(255,255,255,0.04), transparent 30%, transparent 70%, rgba(255,255,255,0.04));
    mix-blend-mode: overlay;
    mask-image: linear-gradient(180deg, transparent, #000 10%, #000 90%, transparent);
  }

  .wrap{
    position: relative; z-index: 2;
    width: min(var(--wrap-w), var(--wrap-max));
    margin: 0 auto;
    padding: 6vmin 2vmin;
  }

  .stack{
    display: grid;
    gap: var(--stack-gap);
  }

  /* Card */
  .card{
    background: var(--card);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06);
    padding: var(--card-pad);
    backdrop-filter: blur(12px);
  }

  /* Hero layout: FIXED height from CSS var (editable). */
  .hero{
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 16px;
    align-items: start;
    height: var(--card-h);            /* <-- use CSS var directly for height */
  }

  /* On narrow screens, let height auto so content can expand naturally. */
  @media (max-width: 880px){
    .hero{
      grid-template-columns: 1fr;
      height: auto;                   /* mobile: don't force a fixed height */
    }
  }

  /* TEXT COLUMN */
  .hero-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    gap: .4rem;
  }

  .hero-text .name {
    align-self: stretch;
    text-align: center;
    font-size: clamp(1.8rem, 6vmin, 3.2rem);
    line-height: .95;
    margin: 0;
    letter-spacing: .04em;
    background: linear-gradient(180deg, #f3f3f6, #c7c9d3 65%, #9ea3b1);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .tag {
    margin: 0;
    color: var(--muted);
    font-size: clamp(.9rem, 2vmin, 1.05rem);
  }

  .lead {
    margin: .4rem 0 0 0;
    line-height: 1.45;
    color: #ececf2;
    max-width: 700px;
  }

  /* First card links under the about text */
  .links.first-card {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .6rem;
    flex-wrap: wrap;
    margin-top: .9rem;
  }

  .pill{
    display:inline-flex; align-items:center; gap:.5rem; padding:.55rem 1rem; border-radius:999px;
    color:#fff; text-decoration:none; font-weight:600; letter-spacing:.02em;
    background: linear-gradient(180deg, var(--deep-red), var(--dark-crimson));
    box-shadow: 0 6px 18px rgba(194,31,31,.25), inset 0 0 0 1px rgba(194,31,31,.35);
    transition: transform 160ms ease, box-shadow 160ms ease;
    font-size: clamp(.78rem, 1.8vmin, .95rem);
  }
  .pill:hover{ transform: translateY(-2px); box-shadow: 0 10px 24px rgba(194,31,31,.35), inset 0 0 0 1px rgba(194,31,31,.5); }
  .pill:focus-visible { outline: 2px solid var(--glow-red); outline-offset: 2px; }
  .pill svg{ width:16px; height:16px; fill: currentColor; }

  /* IMAGE COLUMN — image fills the box height while preserving composition */
  .hero-photo{
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    margin: 0;
    height: 100%;                     /* match .hero (card) height */
    min-height: 180px;
    background: #2a2d34;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
  }
  .hero-photo img{
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;                 /* fit inside fixed box */
    filter: saturate(.97) contrast(1.04);
  }
  .hero-photo .gloss{
    position:absolute; inset:0; pointer-events:none;
    background:
      radial-gradient(60% 60% at 80% 10%, rgba(255,255,255,.16), transparent 55%),
      linear-gradient(180deg, rgba(255,255,255,.06), transparent 45%, transparent 55%, rgba(255,255,255,.05));
    mix-blend-mode: screen;
  }
</style>
