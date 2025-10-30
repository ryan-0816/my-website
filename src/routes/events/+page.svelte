<svelte:head>
    <title>Events</title>
    <meta name="description" content="Chinese Conversation Table Events" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
</svelte:head>

<script>
    import { onMount } from 'svelte';
    
    let isMobile = false;
    
    onMount(() => {
        // Check if mobile device
        isMobile = window.innerWidth < 768;
        
        // Update on resize
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });
    
    function handleResize() {
        isMobile = window.innerWidth < 768;
    }
    
    // Base calendar URL
    const calendarSrc = "https://calendar.google.com/calendar/embed";
    
    // Calendar ID
    const calendarId = "c_6ac1852bd4d4f0dda436ea5287d982ec447e70bdb49a2bb3c3764c7012cb1b63%40group.calendar.google.com";
    
    // Get the appropriate calendar URL based on device
    $: calendarUrl = isMobile 
        ? `${calendarSrc}?src=${calendarId}&mode=AGENDA&ctz=America%2FNew_York`
        : `${calendarSrc}?src=${calendarId}&ctz=America%2FNew_York`;
</script>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        width: 100%;
        overflow-x: hidden;
        -webkit-text-size-adjust: 100%;
    }

    .page-container {
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        padding: 1rem;
        box-sizing: border-box;
    }

    h1 {
        text-align: center;
        font-size: 2rem;
        margin: 1rem 0 1.5rem;
        color: #264d40;
    }

    .calendar-wrapper {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 100%; /* Square aspect ratio for mobile */
        overflow: hidden;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .calendar-iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
    }

    @media (min-width: 768px) {
        h1 {
            font-size: 2.5rem;
            margin: 1.5rem 0 2rem;
        }

        .calendar-wrapper {
            padding-bottom: 75%; /* 4:3 aspect ratio for desktop */
        }

        .page-container {
            padding: 1.5rem;
        }
    }

    @media (min-width: 1024px) {
        .calendar-wrapper {
            padding-bottom: 60%; /* Wider aspect ratio for larger screens */
        }
    }
</style>

<div class="page-container">
    <h1>Events</h1>
    <div class="calendar-wrapper">
        <iframe 
            class="calendar-iframe"
            src={calendarUrl}
            frameborder="0" 
            scrolling="no"
            title="Chinese Conversation Table Events Calendar"
        ></iframe>
    </div>
</div>