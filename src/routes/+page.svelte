<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  let images = [
    "/image.jpg",
    "/image1.jpg",
    "/image2.jpg",
    "/image3.jpg"
  ];

  let logoImage = "/logo.jpg";

  let current = 0;
  let total = images.length;

  const showScrollHint = writable(true);
  const showCopiedNotification = writable(false);
  /**
     * @type {number | undefined}
     */
  let notificationTimeout;

  // E-Board members data
  const eboardMembers = [
    { position: "President", name: "Emereson Ostrander", email: "eeo7010@rit.edu" },
    { position: "Vice President", name: "Jack Smith", email: "jas3139@rit.edu" },
    { position: "Treasurer", name: "Emma Duprey", email: "ead8357@rit.edu" },
    { position: "Treasurer", name: "Finn Sheridan-Crane", email: "fms7124@rit.edu" },
    { position: "Secretary", name: "Ryan Tagen", email: "rst4035@rit.edu" },
    { position: "Public Relations", name: "Julia Kress", email: "jek5095@rit.edu" }
  ];

  function handleScroll() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= fullHeight - 100) {
      showScrollHint.set(false);
    } else {
      showScrollHint.set(true);
    }
  }

  async function copyPassword() {
    try {
      await navigator.clipboard.writeText(password);
      if (notificationTimeout) clearTimeout(notificationTimeout);
      showCopiedNotification.set(true);
      notificationTimeout = setTimeout(() => {
        showCopiedNotification.set(false);
      }, 1500);
    } catch (err) {
      // Fail silently
    }
  }

  onMount(() => {
    const interval = setInterval(() => {
      current = (current + 1) % total;
    }, 4000);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
      if (notificationTimeout) clearTimeout(notificationTimeout);
    };
  });

  let qrCodeSrc = "/qr-code.png";
  const password = "alpine25";
</script>

<style>
  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
    -webkit-text-size-adjust: 100%; /* Prevent font scaling in landscape */
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0 6rem;
    width: 100%;
    max-width: 100vw;
    box-sizing: border-box;
  }

  .welcome-box {
    background-color: #e6f0e8;
    border: 4px solid #5a6f54;
    padding: 2rem 1.5rem;
    border-radius: 25px;
    box-shadow: 0 0 30px 8px rgba(60, 130, 180, 0.5);
    text-align: center;
    width: 1000px;
    max-width: 95vw;
    margin-bottom: 2rem;
    box-sizing: border-box;
  }

  .welcome-box h1 {
    margin: 0;
    font-size: 4rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #264d40;
    text-shadow:
      0 0 8px #a3c4f3bb,
      0 0 16px #a3c4f355;
  }

  @media (max-width: 768px) {
    .welcome-box h1 {
      font-size: 2.5rem;
      line-height: 1.2;
    }
  }

  .content-container {
    width: 1000px;
    max-width: 95vw;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 2rem;
    align-items: stretch;
  }

  @media (min-width: 1024px) {
    .content-container {
      flex-direction: row;
    }
  }

  .left-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: flex-start;
  }

  .carousel {
    height: 380px;
    border-radius: 25px;
    overflow: hidden;
    border: 4px solid #5a6f54;
    box-shadow: 0 0 30px 6px rgba(60, 130, 180, 0.3);
    background: #f9fbf9;
    position: relative;
  }

  @media (max-width: 768px) {
    .carousel {
      height: 250px;
    }
  }

  .carousel img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 1.2s ease-in-out;
  }

  .carousel img.active {
    opacity: 1;
    z-index: 1;
  }

  .logo-box {
    border-radius: 25px;
    overflow: hidden;
    border: 4px solid #5a6f54;
    box-shadow: 0 0 30px 6px rgba(60, 130, 180, 0.3);
    background: #f9fbf9;
    flex-grow: 1;
    height: auto;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-box img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 1rem;
    box-sizing: border-box;
  }

  .about-us {
    flex: 1;
    background: linear-gradient(135deg, #cde3f7, #a0b8d9);
    border: 4px solid #5a6f54;
    border-radius: 25px;
    padding: 1.5rem;
    box-shadow: 0 0 30px 6px rgba(90, 111, 84, 0.3);
    color: #213544;
    font-size: 1.1rem;
    line-height: 1.6;
    user-select: text;
    overflow-y: auto;
    min-height: auto;
  }

  @media (min-width: 768px) {
    .about-us {
      font-size: 1.3rem;
      min-height: 600px;
    }
  }

  /* E-Board Section Styles */
  .eboard-container {
    width: 1000px;
    max-width: 95vw;
    background: linear-gradient(135deg, #e6f0e8, #cde3f7);
    border: 4px solid #5a6f54;
    border-radius: 25px;
    padding: 2rem 1.5rem;
    box-shadow: 0 0 30px 6px rgba(60, 130, 180, 0.3);
    margin-bottom: 2rem;
    color: #213544;
    box-sizing: border-box;
  }

  .eboard-container h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #264d40;
    text-shadow: 0 0 5px #a3c4f3bb;
  }

  @media (min-width: 768px) {
    .eboard-container h2 {
      font-size: 2.5rem;
    }
  }

  .eboard-grid {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1.5rem;
    max-width: 90%;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    .eboard-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  .eboard-member {
    background: rgba(255, 255, 255, 0.7);
    padding: 1.2rem;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .signup-box {
    background: linear-gradient(135deg, #3b6e47, #264d40);
    border-radius: 25px;
    box-shadow: 0 0 40px 10px rgba(38, 77, 64, 0.9);
    padding: 2rem 1.5rem 4rem;
    text-align: center;
    width: 1000px;
    max-width: 95vw;
    color: #d9f0ff;
    position: relative;
    overflow: visible;
    box-sizing: border-box;
  }

  .signup-box h1 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-shadow: 0 0 10px #a3c4f3dd;
  }

  @media (min-width: 768px) {
    .signup-box h1 {
      font-size: 3.5rem;
      margin-bottom: 2rem;
    }
    .signup-box {
      padding: 3rem 2rem 5rem;
    }
  }

  .signup-link {
    display: inline-block;
    font-weight: 700;
    font-size: 1.2rem;
    color: #d9f0ff;
    text-decoration: none;
    border: 3px solid #d9f0ff;
    padding: 0.9rem 2rem;
    border-radius: 18px;
    transition: background-color 0.35s ease, color 0.35s ease, box-shadow 0.35s ease;
    box-shadow: 0 0 12px 3px #a3c4f3aa;
    min-width: 200px;
  }

  @media (min-width: 768px) {
    .signup-link {
      font-size: 1.5rem;
    }
  }

  .signup-link:hover,
  .signup-link:focus {
    background-color: #d9f0ff;
    color: #264d40;
    box-shadow: 0 0 20px 6px #ffffffcc;
    outline: none;
  }

  .password-container {
    margin-top: 1rem;
    font-size: 1rem;
    color: #d9f0ff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    user-select: text;
    position: relative;
    flex-wrap: wrap;
  }

  @media (min-width: 768px) {
    .password-container {
      font-size: 1.1rem;
      flex-wrap: nowrap;
    }
  }

  .copy-notification {
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    color: black;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 1rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    white-space: nowrap;
  }

  .copy-notification.show {
    opacity: 1;
  }

  .qr-container {
    max-width: 220px;
    margin: 2rem auto 0;
    border-radius: 25px;
    box-shadow: 0 0 20px 5px #a3c4f3cc;
    overflow: hidden;
  }

  @media (min-width: 768px) {
    .qr-container {
      margin: 3rem auto 0;
    }
  }

  .qr-container img {
    width: 100%;
    height: auto;
    display: block;
  }

  .scroll-hint {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.2rem;
    font-weight: 700;
    color: #000000ee;
    text-shadow: none;
    animation: bounce 2.5s infinite ease-in-out;
    user-select: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    z-index: 9999;
    pointer-events: none;
    transition: opacity 0.5s ease;
  }

  .scroll-hint.hidden {
    opacity: 0;
    pointer-events: none;
  }

  .scroll-hint svg {
    width: 24px;
    height: 24px;
    stroke: #000000ee;
    stroke-width: 3;
    fill: none;
    animation: arrowDown 2.5s infinite ease-in-out;
  }

  @keyframes bounce {
    0%, 100% { transform: translate(-50%, 0); }
    50% { transform: translate(-50%, 15px); }
  }

  @keyframes arrowDown {
    0%, 100% { opacity: 1; transform: translateY(0); }
    50% { opacity: 0.4; transform: translateY(8px); }
  }
</style>

<main>
  <div class="welcome-box" role="banner">
    <h1>Welcome to RIT Alpine Ski Club!</h1>
  </div>

  <div class="content-container">
    <div class="left-column">
      <div class="carousel" aria-label="Ski Club photo carousel">
        {#each images as src, i}
          <img src={src} alt={`Ski Club image ${i + 1}`} class={i === current ? 'active' : ''} />
        {/each}
      </div>
      <div class="logo-box" aria-label="Club logo">
        <img src={logoImage} alt="RIT Alpine Ski Club logo" />
      </div>
    </div>

    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <section class="about-us" aria-labelledby="about-heading" tabindex="0">
      <p>
        RIT Alpine Ski Club! Operating during spring semester, we have two halves: recreation and race. Recreation hosts 
        trips locally, such as to Swain Resort or Bristol Mountain, on a weekly basis. Joining the team gets you access
        to those group discounts, carpool/transportation, and other things. The race team competes against nearby colleges
        in both slalom and giant slalom, frequenting resorts such as Labrador Mountain, Greek Peak, Bristol Resort, and West 
        Mountain. They also train two days a week at Swain Resort. The ski team also hosts an annual trip to Jay Peak on the 
        last week of winter break. This is an insane package consisting of several days of amazing skiing and very fun nights for an 
        excellent deal. If you enjoy or would like to try skiing, please reach out and see what we 
        can set up! Any level of skiing is welcomed!
      </p>
    </section>
  </div>

  <!-- E-Board Section -->
  <div class="eboard-container" role="region" aria-labelledby="eboard-heading">
    <h2 id="eboard-heading">Meet Our Ski-Board</h2>
    <div class="eboard-grid">
      {#each eboardMembers as member}
        <div class="eboard-member">
          <div class="eboard-position">{member.position}</div>
          <div class="eboard-name">{member.name}</div>
          <div class="eboard-email">{member.email}</div>
        </div>
      {/each}
    </div>
  </div>

  <div class="signup-box" role="region" aria-labelledby="signup-heading">
    <h1 id="signup-heading">Ready to ski?</h1>
    <a
      class="signup-link"
      href="https://campusgroups.rit.edu/AlpineSki/club_signup"
      target="_blank"
      rel="noopener noreferrer"
    >
      Sign Up Here
    </a>

    <div class="password-container">
      <span><strong>Password:</strong> alpine25</span>
      <!-- svelte-ignore a11y_mouse_events_have_key_events -->
      <button
        on:click={copyPassword}
        style="
          background: #d9f0ff;
          border: none;
          border-radius: 12px;
          padding: 0.3rem 0.8rem;
          font-weight: 700;
          color: #264d40;
          cursor: pointer;
          box-shadow: 0 0 6px #a3c4f3cc;
          transition: background-color 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 44px;
          min-height: 44px;
        "
        on:mouseover={e => e.currentTarget.style.backgroundColor = '#bcd8ff'}
        on:mouseout={e => e.currentTarget.style.backgroundColor = '#d9f0ff'}
        aria-label="Copy password alpine 24 to clipboard"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="none"
          stroke="#264d40"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <rect x="2" y="2" width="13" height="13" rx="2" ry="2"></rect>
        </svg>
      </button>
      {#if $showCopiedNotification}
        <div class="copy-notification show">
          Copied to clipboard!
        </div>
      {/if}
    </div>

    <div class="qr-container" aria-label="QR code to join RIT Alpine Ski Club">
      <img src={"/qrcode.jpg"} alt="QR code for RIT Alpine Ski Club signup" />
    </div>
  </div>

  {#if $showScrollHint}
    <div class="scroll-hint" aria-hidden="true">
      <span>Scroll down</span>
      <svg viewBox="0 0 24 24" >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  {/if}
</main>