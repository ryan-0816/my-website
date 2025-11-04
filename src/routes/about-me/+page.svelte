<!-- AboutStack.svelte — scrollable "hero" cards with gray glass backgrounds -->
<!-- about me page-->
<script lang="ts">
  const CONFIG = {
    width: 92,
    maxWidth: 1100,
    cardPad: 14,
    gap: 14,
    cardHeight: 360 // default height if a section doesn't override it
  };

  export let name = "RYAN TAGEN";
  const tagline = "Cybersecurity";

  const baseAbout = `Hi! I'm Ryan, an accelerated BS/MS cybersecurity student at RIT. I love partaking in cybersecurity related activities, playing sports, and my sense community here at college! I am currently looking to apply my technical and practical skills in a co-op in summer of 2026 in cybersecurity, computer science, information technology, or a related field. The rest of this page summarizes my resume, along with some other hobbies and things about me!`;

  const about2 = `<b>Static Website Deployment with Terraform</b>
  • Provisioned modular, version-controlled static web hosting using infrastructure as code
  • Deployed optimized assets for a consistent, reliable experience and repeatable builds

  <b>Network Intrusion Monitor Script</b>
  • Built a lightweight Network Intrusion Monitor in Python using Scapy to parse live traffic and capture forensic PCAPs.
  • Detects behavioral threats: port scans, SSH brute-force attempts, and anomalous DNS responses using sliding-window heuristics.
  • Emits structured JSONL alerts and timestamped evidence files for easy analysis.
  • Designed for safe lab demos (isolated VMs + test harnesses), with clear tuning notes to reduce false positives.

  <b>Website Development</b>
  • Developed Svelte-based webpages for student organizations such as the Alpine Ski Club and Chinese Conversation Table Club
  • Integrated google services such as calendar to convey schedules

  <b>Northland Hackathon</b>
  • Minnesota's largest hackathon (one of my team members' home state)
  • Working in a team of 3, we developed a course recommendation webpage based on student academic history
  • Included webscraping RIT's Student Information System for class information, databasing it with PostgreSQL, then integrating a frontend user interface using Svelte. 
  `;

  const about3 = `<b>Student Inventory Control Specialist | RIT, NY</b>
  • Managed tools, parts, and supply logistics across campus in collaboration with mechanics.
  • Maintained inventory records and enforced access control to secure storage areas.

  <b>Ski Instructor | Yawgoo Valley, RI</b>
  • Taught skiing fundamentals to students of all levels, prioritizing safety and engagement.
  • Adapted lesson plans dynamically based on student age, ability, and weather conditions.
  
  <b>Park Ranger II | Fort Adams, RI</b>
  • Provided customer service, directions, and information to park, beach, and fort visitors. 
  • Patrolled to enforce rules, assisted with safety concerns, and mitigated hazards.
  
  <b>Assistant Teacher | Circuit Lab, RI</b>
  • Led hands-on STEM activities in electronics, robotics, and programming for youth aged 6–14.
  • Delivered engaging lessons while supporting classroom safety and individual learning.

  `;

  const about4 = `<b>Lego!</b>
  I love building Lego. My wallet does not. In particular I love the Lego Star Wars series. I have the Imperial Star Destroyer (75394), and from the starship collection: Millenium Falcon (75375), Executive Super Star Destroyer (75356), and am awaiting the Venator next year.
  
  <b>Typing</b>
  I have always enjoyed typing as something simple and repetitive to destress. There are a variety of fun typing games that I have enjoyed. I also explored different layouts, having switched to Colemak for about half a year. It was a cool experience, even though it didn't stick. 
  
  <b>Stenography</b>
  I started stenography about two years ago, buying a hobbyist keyboard to get started. Since then I have practiced in my free time. I enjoy learning new words and briefs every day, and am up to 100 wpm at 97.4% accuracy as of 11/2/25. 
  `;

  const about5 = `<b>Alpine Skiing</b>
  I grew up skiing at the only hill in Rhode Island, taking the occasional trip up to Vermont. Winter has always been my favorite season in part due to this. When I came to RIT and saw they had an alpine ski team, I immediately joined despite never having thought of racing before. I had a blast my first winter in New York, and plan to ski even more this season.

  <b>Sailing</b>
  I started sailing on a Snapir OD 11 and a Sunfish, but really started learning when I joined my high school's 420 fleet, practicing dinghy sailing as a crew and attending regattas throughout the state. I also joined my local Sea Scouts chapter to gain more experience, sailing keelboats weekly through the summers. One of my favorite memories was sailing for a week and climbing the yardarms on the USCGC Eagle. Some of my favorite classes to sail/race are the C420, Farr 40, Laser, and J110. 

  <b>Casual</b>
  I am currently taking the beginner pickleball wellness course at RIT, and am enjoying it immensely. I am also participating in intramural beginner volleyball on the RITSEC team, which has also been a blast. I plan to play next semester as well, either on the RITSEC team again or with the ski team. I am also looking to get on an intramural soccer or futsal team in the future when my schedule allows, as I grew up playing soccer on my town's competitive team. I also go to both table tennis and badminton weekly clubs as well.

  <b>Badminton</b>
  I had only really played during gym class before coming here, but now that I have had access to a great gym and community to play with, I have found how much I really enjoy playing. I have participated in intramural intermediate badminton for two seasons, along with heading to the gym and playing casual badminton whenever time allows in my schedule.
  `;

  const about6 = `<b>RIT Cybersecurity Club</b>
  RITSEC is a large organization made up of mostly cybersecurity majors. Through this club, I have participated in competitions such as Incident Response Security Competition (IRSEC) and Cyber Operations Remediation Assessment (CORA). I have also attended interest groups focusing on topics such as CTF competitions, vulnerability assesments, and offensive security techniques. I have also done mentorships focusing on Terraform and Scapy. Lastly, I attend weekly meetings and workshops to stay current on cybersecurity tools and threats.
  
  <b>Chinese Conversation Table</b>
  This club meets weekly to better each other's Mandarin speaking skills by talking about various topics. We also celebrate traditions such as Mid-Autumn Moon Festival, Chinese New Year, and Lantern Festival. I joined this club last year, and took on the role of treasurer this year.
  
  <b>Climate and Sustainability Leadership Organization</b>
  Dedicated to furthering sustainability initiatives both at RIT and for individual members, I have attended volunteering opportunities and other things through this club.
  
  <b>Outing Club</b>
  I enjoy hiking and being outside, and this club caters to that type by hosting weekend getaways to various hiking trails every weekend.
  `

  type IconName = "github" | "linkedin" | "mail" | "file";

  type Card = {
    heading: string;
    sub?: string;
    about: string;                 // may contain inline HTML (e.g., <b>)
    photo?: string;                // single image path (non-project sections)
    photoGrid?: { src: string; href: string; alt?: string; }[]; // for 4 stacked images
    height?: number | "auto";      // per-section height control
    links?: { href: string; label: string; icon: IconName }[];      // first card links
    extraLinks?: { href: string; label: string; icon: IconName }[]; // bottom links per card
  };

  const defaultLinks: Card["links"] = [
    { href: "https://github.com/ryan-0816", label: "GitHub", icon: "github" },
    { href: "https://www.linkedin.com/in/ryantagen", label: "LinkedIn", icon: "linkedin" },
    { href: "mailto:rst4035@rit.edu", label: "Email", icon: "mail" },
    { href: "/Ryan Tagen Resume.pdf", label: "Resume", icon: "file" }
  ];

  const projectTiles: Required<Card>["photoGrid"] = [
    { src: "/terraform.png",  href: "https://github.com/ryan-0816/terraform", alt: "Terraform static hosting" },
    { src: "/photos/photo10.jpg", href: "https://github.com/ryan-0816/Scripts", alt: "Network intrusion monitor" },
    { src: "/ski website.png", href: "https://github.com/ryan-0816/ski", alt: "Ski Club Website" },
    { src: "/photos/photo12.jpg", href: "#", alt: "Hackathon demo" }
  ];

  const workExperienceTiles: Required<Card>["photoGrid"] = [
    { src: "/photos/truck.jpg", href: "https://www.rit.edu/fa/auxiliary-services", alt: "RIT Inventory Control" },
    { src: "/photos/yawgoo.jpg", href: "https://yawgoo.com/", alt: "Ski Instructor" },
    { src: "/photos/sky.jpg", href: "https://riparks.ri.gov/parks/fort-adams-state-park", alt: "Park Ranger" },
    { src: "/photos/circuit.png", href: "https://www.circuit-lab.com/", alt: "Circuit Lab Teaching" }
  ];

  const clubsTiles: Required<Card>["photoGrid"] = [
    { src: "/photos/truck.jpg", href: "https://www.rit.edu/fa/auxiliary-services", alt: "RIT Inventory Control" },
    { src: "/photos/yawgoo.jpg", href: "https://yawgoo.com/", alt: "Ski Instructor" },
    { src: "/photos/sky.jpg", href: "https://riparks.ri.gov/parks/fort-adams-state-park", alt: "Park Ranger" },
    { src: "/photos/circuit.png", href: "https://www.circuit-lab.com/", alt: "Circuit Lab Teaching" }
  ];

  const sportsTiles: Required<Card>["photoGrid"] = [
    { src: "/photos/photo15.jpg", href: "#", alt: "Alpine Skiing" },
    { src: "/photos/photo16.jpg", href: "#", alt: "Sailing" },
    { src: "/photos/photo17.jpg", href: "#", alt: "Pickleball" },
    { src: "/photos/photo18.jpg", href: "#", alt: "Badminton" },
    { src: "/photos/photo19.jpg", href: "#", alt: "Table Tennis" },
    { src: "/photos/photo20.jpg", href: "#", alt: "Volleyball" },
    { src: "/photos/photo21.jpg", href: "#", alt: "Ski Racing" },
    { src: "/photos/photo22.jpg", href: "#", alt: "Sailing Regatta" }
  ];

  const projectExtraLinks: Card["extraLinks"] = [
    { href: "https://github.com/ryan-0816", label: "Project Repos", icon: "github" },
    { href: "/Ryan Tagen Resume.pdf", label: "Project Summary (PDF)", icon: "file" }
  ];

  const sections: Card[] = [
    { heading: name, about: baseAbout, photo: "/photos/photo5.jpg", links: defaultLinks, height: 380 },
    { heading: "Personal Projects", about: about2, photoGrid: projectTiles, extraLinks: projectExtraLinks, height: 720 },
    { heading: "Work Experience", about: about3, photoGrid: workExperienceTiles, height: 720 },
    { heading: "Sports", about: about5, photoGrid: sportsTiles, height: 720 },
    { heading: "Clubs", about: about6, photoGrid: clubsTiles, height: 600 },
    { heading: "Hobbies", about: about4, photo: "/photos/photo18.jpg", height: "auto" }
  ];

  const iconPath = (name: IconName) => {
    switch (name) {
      case "github": return "M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.35-1.75-1.35-1.75-1.1-.76.08-.74.08-.74 1.22.09 1.86 1.27 1.86 1.27 1.08 1.85 2.83 1.32 3.52 1.01.11-.79.42-1.32.77-1.63-2.66-.30-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.25-3.22-.13-.30-.54-1.52.12-3.16 0 0 1.01-.32 3.30 1.23a11.4 11.4 0 0 1 6.01 0c2.29-1.55 3.30-1.23 3.30-1.23.66 1.64.25 2.86.12 3.16.78.84 1.25 1.91 1.25 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.82 1.10.82 2.22v3.29c0 .33.22.70.83.58A12 12 0 0 0 12 .5Z";
      case "linkedin": return "M4.98 3.5a2.5 2.5 0 1 1-.02 5 2.5 2.5 0 0 1 .02-5zM3 8.98h3.96v12.5H3V8.98zm6.74 0H14v1.7h.05c.58-1.10 2-2.25 4.12-2.25 4.41 0 5.23 2.90 5.23 6.67v6.38H19.4v-5.66c0-1.35-.02-3.09-1.88-3.09-1.88 0-2.17 1.47-2.17 2.99v5.76H11.7V8.98z";
      case "mail": return "M2 6l10 7 10-7v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6zm20-2H2l10 7 10-7z";
      case "file": return "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z";
    }
  };
</script>

<div class="page">
  <div class="bg"></div>
  <div class="edge-shade" aria-hidden="true"></div>
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
    "
  >
    <div class="stack">
      {#each sections as s, i}
        <section
          class="hero card"
          style="height: {s.height === 'auto' ? 'auto' : (s.height ?? CONFIG.cardHeight) + 'px'}"
        >
          <!-- TEXT COLUMN -->
          <div class="hero-text">
            <h1 class="name">{s.heading}</h1>
            {#if s.sub}<p class="tag">{s.sub}</p>{/if}

            <div class="lead">{@html s.about}</div>

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

            {#if s.extraLinks}
              <nav class="links bottom-links" aria-label="{s.heading} links">
                {#each s.extraLinks as l}
                  <a class="pill" href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d={iconPath(l.icon)} /></svg>
                    <span>{l.label}</span>
                  </a>
                {/each}
              </nav>
            {/if}
          </div>

          <!-- IMAGE COLUMN -->
          {#if s.photoGrid}
            <div class="hero-photo-grid {i === 3 ? 'sports-grid' : 'projects-grid'}" aria-label="section previews">
              {#each s.photoGrid as tile}
                <a class="project-thumb" href={tile.href} target="_blank" rel="noopener noreferrer" aria-label={tile.alt ?? 'Section link'}>
                  <img src={tile.src} alt={tile.alt ?? 'Section image'} loading="lazy" decoding="async" />
                  <div class="gloss"></div>
                </a>
              {/each}
            </div>
          {:else}
            {#if s.photo}
              <figure class="hero-photo" aria-label="illustrative photo">
                <img src={s.photo} alt="Section photo" loading="lazy" decoding="async" />
                <div class="gloss"></div>
              </figure>
            {/if}
          {/if}
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
    --card:#2a2d34cc;
    --card-border:#ffffff1f;
  }

  /* Ensure this page scrolls */
  :global(html), :global(body){
    margin: 0;
    padding: 0;
    min-height: 100%;
    background: var(--bg-0);
    color: var(--ink);
    font-family: Inter, SF Pro Text, Segoe UI, Roboto, system-ui, -apple-system, Arial, sans-serif;
    overflow-y: auto !important;
    overflow-x: hidden !important;
  }

  .page { position: relative; min-height: 100vh; }

  .bg{
    position: fixed; inset: 0; z-index: 0;
    background:
      radial-gradient(120vmax 80vmax at 70% 30%, rgba(194,31,31,0.12), transparent 60%),
      radial-gradient(90vmax 90vmax at 20% 80%, rgba(125,14,14,0.12), transparent 60%),
      linear-gradient(180deg, var(--bg-2), var(--bg-1) 40%, var(--bg-0));
  }

  .edge-shade{
    position: fixed; inset: 0; z-index: 1; pointer-events: none;
    background:
      linear-gradient(90deg,
        rgba(0,0,0,.65) 0%,
        rgba(0,0,0,.45) 6%,
        rgba(0,0,0,.20) 12%,
        transparent 20%,
        transparent 80%,
        rgba(0,0,0,.20) 88%,
        rgba(0,0,0,.45) 94%,
        rgba(0,0,0,.65) 100%);
  }

  .side-lines{
    position: fixed; inset: 0; pointer-events: none; z-index: 2;
    background:
      linear-gradient(90deg, transparent 0, transparent calc(50% - 1px), rgba(255,255,255,0.06) calc(50% - 1px), rgba(255,255,255,0.06) calc(50% + 1px), transparent calc(50% + 1px)),
      linear-gradient(0deg, rgba(255,255,255,0.04), transparent 30%, transparent 70%, rgba(255,255,255,0.04));
    mix-blend-mode: overlay;
    mask-image: linear-gradient(180deg, transparent, #000 10%, #000 90%, transparent);
  }

  .wrap{ position: relative; z-index: 3; width: min(var(--wrap-w), var(--wrap-max)); margin: 0 auto; padding: 6vmin 2vmin; }
  .stack{ display: grid; gap: var(--stack-gap); }

  .card{
    background: var(--card);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06);
    padding: var(--card-pad);
    backdrop-filter: blur(12px);
  }

  .hero{
    display: grid;
    grid-template-columns: 1.2fr 1fr; /* default layout */
    gap: 16px;
    align-items: stretch;
  }

  /* === Target cards with photo grids (Personal Projects, Work Experience, AND Sports) === */
  .stack > section.hero:nth-of-type(2),
  .stack > section.hero:nth-of-type(3),
  .stack > section.hero:nth-of-type(4),
  .stack > section.hero:nth-of-type(5) {
    grid-template-columns: 1.5fr 0.9fr; /* more room for text, pushes images right */
  }
  .stack > section.hero:nth-of-type(2) .projects-grid,
  .stack > section.hero:nth-of-type(3) .projects-grid,
  .stack > section.hero:nth-of-type(4) .sports-grid,
  .stack > section.hero:nth-of-type(5) .projects-grid {
    margin-left: 1rem;            /* shifts the left border of images to the right */
    min-height: 520px;            /* taller image column for more visual area */
  }

  @media (max-width: 880px){
    .hero{ grid-template-columns: 1fr; height: auto !important; }
    .stack > section.hero:nth-of-type(2) .projects-grid,
    .stack > section.hero:nth-of-type(3) .projects-grid,
    .stack > section.hero:nth-of-type(4) .sports-grid {
      margin-left: 0;             /* reset on mobile */
      min-height: 360px;
    }
  }

  .hero-text { display: flex; flex-direction: column; align-items: center; justify-content: flex-start; text-align: center; gap: .6rem; }
  .hero-text .name {
    align-self: stretch; text-align: center; font-size: clamp(1.8rem, 6vmin, 3.2rem);
    line-height: .95; margin: 0; letter-spacing: .04em;
    background: linear-gradient(180deg, #f3f3f6, #c7c9d3 65%, #9ea3b1);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .tag { margin: 0; color: var(--muted); font-size: clamp(.9rem, 2vmin, 1.05rem); }

  .lead { margin: .2rem 0 0 0; line-height: 1.45; color: #ececf2; max-width: 700px; white-space: pre-line; }
  .lead b, .lead strong { font-weight: 800; color: #f0f2f8; }

  .links.first-card, .links.bottom-links {
    display: flex; justify-content: center; align-items: center; gap: .6rem; flex-wrap: wrap; margin-top: .9rem;
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

  .hero-photo{
    position: relative; border-radius: 14px; overflow: hidden; margin: 0; height: 100%; min-height: 180px; background: #2a2d34;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
  }
  .hero-photo img{ display:block; width:100%; height:100%; object-fit:cover; filter: saturate(.97) contrast(1.04); }
  .hero-photo .gloss{ position:absolute; inset:0; pointer-events:none;
    background: radial-gradient(60% 60% at 80% 10%, rgba(255,255,255,.16), transparent 55%),
                linear-gradient(180deg, rgba(255,255,255,.06), transparent 45%, transparent 55%, rgba(255,255,255,.05));
    mix-blend-mode: screen; }

  /* Standard 1x4 grid for Personal Projects and Work Experience */
  .hero-photo-grid.projects-grid{
    display: grid; grid-template-rows: repeat(4, 1fr); gap: 8px; height: 100%; min-height: 220px;
  }

  /* 2x4 grid for Sports section */
  .hero-photo-grid.sports-grid{
    display: grid; 
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(4, 1fr);
    gap: 6px; /* Slightly smaller gap for the 2-column layout */
    height: 100%; 
    min-height: 220px;
  }

  .project-thumb{
    position: relative; display: block; width: 100%; height: 100%; border-radius: 12px; overflow: hidden; background: #2a2d34;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.05); transition: transform 140ms ease, box-shadow 140ms ease;
  }
  .project-thumb:hover{ transform: translateY(-1px); box-shadow: 0 10px 28px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,0.06); }
  .project-thumb:focus-visible{ outline: 2px solid var(--glow-red); outline-offset: 2px; }
  .project-thumb img{ display:block; width:100%; height:100%; object-fit:cover; filter: saturate(.98) contrast(1.04); }
  .project-thumb .gloss{ position:absolute; inset:0; pointer-events:none;
    background: radial-gradient(60% 60% at 80% 10%, rgba(255,255,255,.14), transparent 55%),
                linear-gradient(180deg, rgba(255,255,255,.05), transparent 45%, transparent 55%, rgba(255,255,255,.04));
    mix-blend-mode: screen; }

  @media (max-width: 880px){ 
    .hero-photo-grid{ min-height: 300px; } 
    /* On mobile, switch sports grid back to single column */
    .hero-photo-grid.sports-grid{
      grid-template-columns: 1fr;
      grid-template-rows: repeat(8, 1fr);
    }
  }
</style>