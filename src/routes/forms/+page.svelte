<script lang="ts">
  // List your forms here with display name and file URL
  const forms = [
    { name: "Safety Waiver", url: "/form1.pdf" },
    { name: "Academic Eligibility", url: "/form2.pdf" },
    { name: "Form 3", url: "/form3.pdf" },
    { name: "Form 4", url: "/form4.pdf" },
    { name: "Form 5", url: "/form5.pdf" },
  ];
</script>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
    -webkit-text-size-adjust: 100%;
  }

  main {
    max-width: 1000px;
    margin: 1.5rem auto 3rem;
    padding: 0 1rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #2a423d;
    box-sizing: border-box;
    width: 100%;
  }

  h1 {
    font-size: 2.2rem;
    font-weight: 900;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #264d40;
    text-align: center;
    margin-bottom: 1.5rem;
    text-shadow:
      0 0 8px #a3c4f3bb,
      0 0 16px #a3c4f355;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }

  li {
    background: linear-gradient(135deg, #cde3f7, #a0b8d9);
    border: 3px solid #5a6f54;
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px 3px rgba(90, 111, 84, 0.3);
    box-sizing: border-box;
  }

  .form-name {
    margin-right: 0;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: 700;
    user-select: text;
    text-align: center;
    word-break: break-word;
  }

  .buttons {
    display: flex;
    gap: 0.8rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  button, a.button-link {
    background: #264d40;
    color: #d9f0ff;
    border: none;
    border-radius: 14px;
    padding: 0.6rem 1.2rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 0 8px 2px #a3c4f3aa;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
    font-size: 1rem;
    min-width: 100px;
    min-height: 44px; /* Minimum touch target size */
  }

  button:hover, a.button-link:hover {
    background: #3b6e47;
  }

  @media (min-width: 768px) {
    main {
      margin: 3rem auto 6rem;
      padding: 0 1.5rem;
    }

    h1 {
      font-size: 3.5rem;
      letter-spacing: 0.1em;
      margin-bottom: 2rem;
    }

    li {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      border-radius: 25px;
      border-width: 4px;
      margin-bottom: 1.5rem;
    }

    .form-name {
      margin-right: 2rem;
      margin-bottom: 0;
      font-size: 1.4rem;
      text-align: left;
    }

    .buttons {
      gap: 1rem;
      flex-wrap: nowrap;
    }

    button, a.button-link {
      padding: 0.6rem 1.4rem;
      border-radius: 18px;
    }
  }
</style>

<main>
  <h1>Forms</h1>

  <ul>
    {#each forms as form}
      <li>
        <span class="form-name">{form.name}</span>
        <div class="buttons">
          <a
            class="button-link"
            href={form.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${form.name} in a new tab`}
          >
            Open
          </a>
          <a
            class="button-link"
            href={form.url}
            download
            aria-label={`Download ${form.name}`}
          >
            Download
          </a>
        </div>
      </li>
    {/each}
  </ul>
</main>