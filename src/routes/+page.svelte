<script lang="ts">
  // ===== ONE PLACE TO EDIT =====
  const CONFIG = {
    hover: {
      scale: 1.6,
      captionDelay: 0
    },
    inner: {
      width: 50 // % of stage width; height will be width * 0.75 to keep 4:3 ratio
    },
    spawn: {
      padding: 5,
      minSize: 7,
      maxSize: 8,
      minDistance: 20
    },
    motion: {
      minSpeed: 0.8,
      maxSpeed: 2.5,
      damping: 0.998,
      dtClamp: 1 / 30,
      restitution: 0.6 // bounciness factor
    },
    patterns: {
      idleTimeout: 30,       // seconds before patterns start
      patternDuration: 30,  // seconds each pattern displays
      transitionSpeed: 0.02 // speed of transition to pattern positions
    },
    physics: {
      collisions: true // ENABLE photo hitbox bouncing (photo-on-photo collisions)
    }
  };
  // =============================

  // ===== EDIT ME (content) =====
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
    "Cybersecurity project","Campus life at RIT","Technical workshop","Team collaboration",
    "Security conference","Programming session","Network security lab","Research presentation",
    "Hackathon event","Code review","System architecture","Security analysis",
    "Project demonstration","Technical training","Team building","Innovation showcase",
    "Security audit","Development work","Academic project","Professional event",
    "Technical discussion","Security research","Collaborative work","Achievement celebration",
    "Final project", "Collaboration", "Innovation"
  ];

  const links = [
    { href: "https://github.com/ryan-0816", label: "GitHub", icon: "github" },
    { href: "https://www.linkedin.com/in/ryantagen", label: "LinkedIn", icon: "linkedin" },
    { href: "mailto:rst4035@rit.edu", label: "Email", icon: "mail" },
    { href: "/Ryan Tagen Resume.pdf", label: "Resume", icon: "file" }
  ];
  // =============================

  type PhotoState = {
    x: number;
    y: number;
    size: number;
    aspectRatio: number;
    vx: number;
    vy: number;
    index: number;
    showCaption: boolean;
    scale: number;
    targetX?: number;
    targetY?: number;
    width: number;
    height: number;
  };

  let photoStates: PhotoState[] = [];
  let nodes: HTMLElement[] = [];
  let captionNodes: HTMLElement[] = [];
  let lastActivityTime = Date.now();
  let isFormingPattern = false;
  let currentPatternIndex = 0;
  let patternStartTime = 0;
  let isBrowser = false;

  // ===== PATTERNS =====
  const patterns = [
    {
      name: "HI",
      positions: [
        { x: 16, y: 30 }, { x: 16, y: 40 }, { x: 16, y: 50 }, { x: 16, y: 60 }, { x: 16, y: 70 },
        { x: 26, y: 30 }, { x: 26, y: 40 }, { x: 26, y: 50 }, { x: 26, y: 60 }, { x: 26, y: 70 },
        { x: 21, y: 50 },
        { x: 74, y: 30 }, { x: 74, y: 40 }, { x: 74, y: 50 }, { x: 74, y: 60 }, { x: 74, y: 70 },
        { x: 70, y: 30 }, { x: 78, y: 30 }, { x: 70, y: 70 }, { x: 78, y: 70 },
        { x: 50, y: 20 }, { x: 50, y: 80 }, { x: 10, y: 20 }, { x: 90, y: 80 }, { x: 10, y: 80 },
        { x: 90, y: 20 }, { x: 50, y: 50 }
      ]
    },
    {
      name: "Circle",
      positions: [
        { x: 50, y: 15 }, { x: 62, y: 20 }, { x: 72, y: 30 }, { x: 80, y: 43 }, { x: 83, y: 57 },
        { x: 80, y: 70 }, { x: 71, y: 82 }, { x: 60, y: 89 }, { x: 50, y: 90 }, { x: 40, y: 88 },
        { x: 29, y: 80 }, { x: 20, y: 68 }, { x: 16, y: 55 }, { x: 18, y: 41 }, { x: 26, y: 29 },
        { x: 38, y: 20 }, { x: 48, y: 16 },
        { x: 50, y: 28 }, { x: 58, y: 33 }, { x: 65, y: 42 }, { x: 67, y: 54 }, { x: 63, y: 65 },
        { x: 55, y: 72 }, { x: 45, y: 73 }, { x: 36, y: 67 }, { x: 32, y: 56 }, { x: 34, y: 44 }
      ].slice(0, 27)
    },
    {
      name: "Spiral",
      positions: (() => {
        const spiral = [];
        const centerX = 50, centerY = 50, turns = 3, points = 27, minR = 22;
        for (let i = 0; i < points; i++) {
          const angle = (i / points) * Math.PI * 2 * turns;
          const radius = minR + (i / points) * 28;
          spiral.push({ x: centerX + Math.cos(angle) * radius, y: centerY + Math.sin(angle) * radius });
        }
        return spiral;
      })()
    },
    {
      name: "Frame",
      positions: (() => {
        const pts = [];
        const cols = 7, rows = 5;
        const startX = 6, endX = 94, startY = 8, endY = 92;
        const stepX = (endX - startX) / (cols - 1);
        const stepY = (endY - startY) / (rows - 1);
        for (let c = 0; c < cols && pts.length < 27; c++) pts.push({ x: startX + c * stepX, y: startY });
        for (let r = 1; r < rows - 1 && pts.length < 27; r++) pts.push({ x: endX, y: startY + r * stepY });
        for (let c = cols - 1; c >= 0 && pts.length < 27; c--) pts.push({ x: startX + c * stepX, y: endY });
        for (let r = rows - 2; r > 0 && pts.length < 27; r--) pts.push({ x: startX, y: startY + r * stepY });
        return pts.slice(0, 27);
      })()
    },
    {
      name: "Heart",
      positions: (() => {
        const heart = [];
        const centerX = 50, centerY = 52, size = 2.6;
        for (let i = 0; i < 27; i++) {
          const t = (i / 26) * Math.PI * 2;
          const x = centerX + size * 16 * Math.pow(Math.sin(t), 3);
          const y = centerY - size * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
          heart.push({ x, y });
        }
        return heart;
      })()
    },
    {
      name: "Arrow",
      positions: [
        { x: 12, y: 24 }, { x: 22, y: 24 }, { x: 32, y: 24 }, { x: 42, y: 24 }, { x: 52, y: 24 },
        { x: 62, y: 24 }, { x: 72, y: 24 }, { x: 82, y: 24 },
        { x: 82, y: 24 }, { x: 78, y: 18 }, { x: 78, y: 30 },
        { x: 86, y: 16 }, { x: 86, y: 22 }, { x: 86, y: 26 }, { x: 86, y: 32 }, { x: 88, y: 24 },
        { x: 8, y: 20 }, { x: 8, y: 24 }, { x: 8, y: 28 },
        { x: 4, y: 18 }, { x: 4, y: 22 }, { x: 4, y: 26 }, { x: 4, y: 30 },
        { x: 0 + 2, y: 20 }, { x: 2, y: 24 }, { x: 2, y: 28 }
      ]
    }
  ];

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
    return {
      left: p.x - scaledWidth / 2,
      right: p.x + scaledWidth / 2,
      top: p.y - scaledHeight / 2,
      bottom: p.y + scaledHeight / 2,
      width: scaledWidth,
      height: scaledHeight
    };
  }

  function checkAABBOverlap(aabb1: ReturnType<typeof getAABB>, aabb2: ReturnType<typeof getAABB>): boolean {
    return aabb1.left < aabb2.right && 
           aabb1.right > aabb2.left && 
           aabb1.top < aabb2.bottom && 
           aabb1.bottom > aabb2.top;
  }

  function isOutsideInnerBox(x: number, y: number, halfWidth: number, halfHeight: number): boolean {
    const pad = CONFIG.spawn.padding;
    const inner = getInner();
    const left = inner.x - pad;
    const right = inner.x + inner.width + pad;
    const top = inner.y - pad;
    const bottom = inner.y + inner.height + pad;
    
    const photoLeft = x - halfWidth;
    const photoRight = x + halfWidth;
    const photoTop = y - halfHeight;
    const photoBottom = y + halfHeight;
    
    return photoRight < left || photoLeft > right || photoBottom < top || photoTop > bottom;
  }

  function initializePhotos() {
    const { minSize, maxSize, minDistance } = CONFIG.spawn;
    const list = images;
    const tempStates: PhotoState[] = [];

    const imagePromises = list.map((src) => {
      return new Promise<number>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img.width / img.height);
        img.onerror = () => resolve(1);
        img.src = src;
      });
    });

    Promise.all(imagePromises).then((aspectRatios) => {
      for (let i = 0; i < list.length; i++) {
        const aspectRatio = aspectRatios[i];
        const size = rand(minSize, maxSize);
        const width = size;
        const height = size / aspectRatio;
        const halfW = width / 2;
        const halfH = height / 2;
        
        let x: number, y: number;
        let tries = 0;
        let validPosition = false;

        do {
          x = rand(halfW + 2, 100 - halfW - 2);
          y = rand(halfH + 2, 100 - halfH - 2);
          tries++;
          
          // Check if outside inner box
          if (!isOutsideInnerBox(x, y, halfW, halfH)) continue;
          
          // Check distance to all existing photos using AABB
          validPosition = true;
          for (const p of tempStates) {
            const dx = Math.abs(p.x - x);
            const dy = Math.abs(p.y - y);
            const minDistX = (p.width + width) / 2 + minDistance;
            const minDistY = (p.height + height) / 2 + minDistance;
            
            if (dx < minDistX && dy < minDistY) {
              validPosition = false;
              break;
            }
          }
          
          if (tries > 1000) break;
        } while (!validPosition);

        const speed = rand(CONFIG.motion.minSpeed, CONFIG.motion.maxSpeed);
        const angle = rand(0, Math.PI * 2);
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        tempStates.push({ 
          x, y, 
          size, 
          aspectRatio, 
          vx, vy, 
          index: i, 
          showCaption: false, 
          scale: 1,
          width,
          height
        });
      }

      photoStates = tempStates;
    });
  }

  function clamp(val: number, lo: number, hi: number) {
    return Math.max(lo, Math.min(hi, val));
  }

  function resolveAABBCollisions(states: PhotoState[]) {
    const restitution = CONFIG.motion.restitution;
    
    for (let i = 0; i < states.length; i++) {
      for (let j = i + 1; j < states.length; j++) {
        const a = states[i], b = states[j];
        
        const aabbA = getAABB(a);
        const aabbB = getAABB(b);
        
        if (!checkAABBOverlap(aabbA, aabbB)) continue;

        // Calculate overlap
        const overlapX = Math.min(aabbA.right - aabbB.left, aabbB.right - aabbA.left);
        const overlapY = Math.min(aabbA.bottom - aabbB.top, aabbB.bottom - aabbA.top);

        // Only resolve if there's actual overlap
        if (overlapX <= 0 || overlapY <= 0) continue;

        // Resolve along axis of least penetration
        if (overlapX < overlapY) {
          // Horizontal separation
          const direction = a.x < b.x ? -1 : 1;
          const separation = overlapX / 2 + 0.1; // Add small buffer
          
          a.x += direction * separation;
          b.x -= direction * separation;
          
          // Elastic collision for horizontal velocities
          const relVelX = a.vx - b.vx;
          if ((direction < 0 && relVelX < 0) || (direction > 0 && relVelX > 0)) {
            const impulse = relVelX * restitution;
            a.vx -= impulse;
            b.vx += impulse;
          }
        } else {
          // Vertical separation
          const direction = a.y < b.y ? -1 : 1;
          const separation = overlapY / 2 + 0.1; // Add small buffer
          
          a.y += direction * separation;
          b.y -= direction * separation;
          
          // Elastic collision for vertical velocities
          const relVelY = a.vy - b.vy;
          if ((direction < 0 && relVelY < 0) || (direction > 0 && relVelY > 0)) {
            const impulse = relVelY * restitution;
            a.vy -= impulse;
            b.vy += impulse;
          }
        }
      }
    }
  }

  function bounceOffInnerBox(p: PhotoState) {
    if (isFormingPattern) return;

    const inner = getInner();
    const aabb = getAABB(p);
    const restitution = CONFIG.motion.restitution;

    // Check each edge separately
    if (aabb.right > inner.x && aabb.left < inner.x + inner.width &&
        aabb.bottom > inner.y && aabb.top < inner.y + inner.height) {
      
      // Inside inner box - push out
      const distLeft = aabb.left - inner.x;
      const distRight = (inner.x + inner.width) - aabb.right;
      const distTop = aabb.top - inner.y;
      const distBottom = (inner.y + inner.height) - aabb.bottom;
      
      const minDist = Math.min(Math.abs(distLeft), Math.abs(distRight), Math.abs(distTop), Math.abs(distBottom));
      
      if (minDist === Math.abs(distLeft)) {
        p.x = inner.x - aabb.width / 2 - 0.1;
        if (p.vx > 0) p.vx = -p.vx * restitution;
      } else if (minDist === Math.abs(distRight)) {
        p.x = inner.x + inner.width + aabb.width / 2 + 0.1;
        if (p.vx < 0) p.vx = -p.vx * restitution;
      } else if (minDist === Math.abs(distTop)) {
        p.y = inner.y - aabb.height / 2 - 0.1;
        if (p.vy > 0) p.vy = -p.vy * restitution;
      } else {
        p.y = inner.y + inner.height + aabb.height / 2 + 0.1;
        if (p.vy < 0) p.vy = -p.vy * restitution;
      }
    }
  }

  function startPatternCycle() {
    isFormingPattern = true;
    patternStartTime = Date.now();
    currentPatternIndex = 0;
    applyPattern(patterns[currentPatternIndex]);
  }

  function applyPattern(pattern: typeof patterns[0]) {
    photoStates.forEach((p, i) => {
      const targetPos = pattern.positions[i % pattern.positions.length];
      p.targetX = clamp(targetPos.x, p.width/2, 100 - p.width/2);
      p.targetY = clamp(targetPos.y, p.height/2, 100 - p.height/2);
      p.vx *= 0.3;
      p.vy *= 0.3;
    });
  }

  function nextPattern() {
    currentPatternIndex = (currentPatternIndex + 1) % patterns.length;
    applyPattern(patterns[currentPatternIndex]);
    patternStartTime = Date.now();
  }

  function stepPhysics(dt: number) {
    const now = Date.now();
    const inactiveTime = (now - lastActivityTime) / 1000;
    
    if (!isFormingPattern && inactiveTime > CONFIG.patterns.idleTimeout) {
      startPatternCycle();
    }

    if (isFormingPattern && (now - patternStartTime) / 1000 > CONFIG.patterns.patternDuration) {
      nextPattern();
    }

    for (const p of photoStates) {
      if (isFormingPattern && p.targetX !== undefined && p.targetY !== undefined) {
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 0.5) {
          p.vx += dx * CONFIG.patterns.transitionSpeed;
          p.vy += dy * CONFIG.patterns.transitionSpeed;
          p.vx *= 0.85;
          p.vy *= 0.85;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
        } else {
          p.x = p.targetX;
          p.y = p.targetY;
          p.vx = 0;
          p.vy = 0;
        }
      } else {
        // Normal physics
        p.x += p.vx * dt;
        p.y += p.vy * dt;
      }

      const aabb = getAABB(p);

      // Outer bounds
      if (aabb.left < 0) {
        p.x = aabb.width / 2;
        p.vx = Math.abs(p.vx) * CONFIG.motion.restitution;
      } else if (aabb.right > 100) {
        p.x = 100 - aabb.width / 2;
        p.vx = -Math.abs(p.vx) * CONFIG.motion.restitution;
      }

      if (aabb.top < 0) {
        p.y = aabb.height / 2;
        p.vy = Math.abs(p.vy) * CONFIG.motion.restitution;
      } else if (aabb.bottom > 100) {
        p.y = 100 - aabb.height / 2;
        p.vy = -Math.abs(p.vy) * CONFIG.motion.restitution;
      }

      bounceOffInnerBox(p);
    }

    // Only resolve collisions during free motion
    if (!isFormingPattern && CONFIG.physics.collisions) {
      resolveAABBCollisions(photoStates);
    }

    // Apply damping
    for (const p of photoStates) {
      p.vx *= CONFIG.motion.damping;
      p.vy *= CONFIG.motion.damping;
      
      const aabb = getAABB(p);
      p.x = clamp(p.x, aabb.width / 2, 100 - aabb.width / 2);
      p.y = clamp(p.y, aabb.height / 2, 100 - aabb.height / 2);
    }

    // Update DOM
    for (let i = 0; i < photoStates.length; i++) {
      const p = photoStates[i];
      const el = nodes[i];
      const captionEl = captionNodes[i];
      
      if (!el) continue;
      
      el.style.left = p.x + '%';
      el.style.top = p.y + '%';
      el.style.width = p.size + '%';
      el.style.aspectRatio = String(p.aspectRatio);
      el.style.setProperty('--scale', String(p.scale));

      if (captionEl) {
        if (p.showCaption) {
          const scaledWidth = p.width * p.scale;
          captionEl.style.display = 'block';
          captionEl.style.left = p.x + '%';
          captionEl.style.top = (p.y + (p.height * p.scale) / 2) + '%';
          captionEl.style.width = scaledWidth + '%';
          captionEl.style.transform = 'translate(-50%, 0.5rem)';
          captionEl.style.opacity = '1';
        } else {
          captionEl.style.opacity = '0';
          setTimeout(() => {
            if (captionEl && !photoStates[i]?.showCaption) {
              captionEl.style.display = 'none';
            }
          }, 150);
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
        p.targetX = undefined; 
        p.targetY = undefined;
        const speed = rand(CONFIG.motion.minSpeed, CONFIG.motion.maxSpeed);
        const angle = rand(0, Math.PI * 2);
        p.vx = Math.cos(angle) * speed;
        p.vy = Math.sin(angle) * speed;
      });
    }
  }

  function handleMouseLeave(i: number) {
    photoStates[i].showCaption = false;
    photoStates[i].scale = 1;
  }

  function handleInteraction() {
    lastActivityTime = Date.now();
    if (isFormingPattern) {
      isFormingPattern = false;
      photoStates.forEach(p => { 
        p.targetX = undefined; 
        p.targetY = undefined;
        const speed = rand(CONFIG.motion.minSpeed, CONFIG.motion.maxSpeed);
        const angle = rand(0, Math.PI * 2);
        p.vx = Math.cos(angle) * speed;
        p.vy = Math.sin(angle) * speed;
      });
    }
  }

  function handleKeyInteraction(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      handleInteraction();
    }
  }

  let rafId = 0;
  let lastT = 0;
  function tick(ts: number) {
    if (!lastT) lastT = ts;
    const dt = Math.min((ts - lastT) / 1000, CONFIG.motion.dtClamp);
    lastT = ts;

    stepPhysics(dt);
    rafId = requestAnimationFrame(tick);
  }

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
      default: return "";
    }
  };

  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  
  onMount(() => { 
    isBrowser = browser;
    if (browser) {
      initializePhotos(); 
      rafId = requestAnimationFrame(tick);
      document.addEventListener('mousemove', handleInteraction);
      document.addEventListener('click', handleInteraction);
      document.addEventListener('keydown', handleInteraction);
    }
  });
  
  onDestroy(() => { 
    if (isBrowser && rafId) {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', handleInteraction);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    }
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
          <rect
            x={inner.x}
            y={inner.y}
            width={inner.width}
            height={inner.height}
            class="inner-box"
            rx="16" ry="16"
          />
        {/await}
      {/key}
    </svg>

    {#key CONFIG.inner.width}
      {#await Promise.resolve(getInner()) then inner}
        <div
          class="center-box"
          class:patterning={isFormingPattern}
          style="
            left:{inner.x}%;
            top:{inner.y}%;
            width:{inner.width}%;
            height:{inner.height}%;
          "
        >
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
              on:keydown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleMouseEnter(i);
                }
              }}
              tabindex="0"
              role="button"
              aria-label={`View ${captions[i] ?? `Photo ${i + 1}`}`}
            >
              <img src={images[i]} alt={`${(captions[i] ?? "Gallery image")} - gallery image ${i + 1}`} loading="lazy" decoding="async" />
              <div class="gloss"></div>
            </figure>
            
            <div
              bind:this={captionNodes[i]}
              class="caption-box"
              style="display: none; opacity: 0;"
            >
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

  :global(html), :global(body) {
    margin: 0; padding: 0; width: 100%; height: 100%;
    overflow: hidden;
  }

  .page{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw; height: 100vh;
    min-height: 100vh;
    background: var(--bg-0);
    color: var(--ink);
    font-family: Inter, SF Pro Text, Segoe UI, Roboto, system-ui, -apple-system, Arial, sans-serif;
    padding: env(safe-area-inset-top) env(safe-area-inset-right)
             env(safe-area-inset-bottom) env(safe-area-inset-left);
    box-sizing: border-box;
    outline: none;
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

  .stage{
    position: absolute;
    inset: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    margin: 0;
    overflow: hidden;
    transition: filter 240ms ease;
  }
  .stage.patterning { filter: none; }

  .constellation{ position:absolute; inset:0; z-index:2; pointer-events:none; }
  .inner-box {
    fill:none;
    stroke:var(--box-glow);
    stroke-width:1.2;
    vector-effect:non-scaling-stroke;
    filter: drop-shadow(0 0 12px var(--box-glow));
    transition: opacity 240ms ease;
    opacity: 1;
  }
  .stage.patterning .inner-box {
    opacity: 0.18;
  }

  .center-box{
    position:absolute;
    z-index:3; display:flex; justify-content:center; align-items:center;
    background: rgba(34,36,42,0.85);
    backdrop-filter: blur(12px);
    border: 1.5px solid var(--box-glow); border-radius: 16px;
    box-shadow: 0 0 40px rgba(194,31,31,0.15),
                inset 0 1px 0 rgba(255,255,255,0.08),
                inset 0 0 20px rgba(194,31,31,0.05);
    transition: background 240ms ease, border-color 240ms ease, box-shadow 240ms ease, backdrop-filter 240ms ease;
  }
  .center-box.patterning{
    background: rgba(34,36,42,0.1);
    backdrop-filter: blur(4px);
    border-color: rgba(194,31,31,0.20);
    box-shadow: 0 0 20px rgba(194,31,31,0.08),
                inset 0 1px 0 rgba(255,255,255,0.04),
                inset 0 0 10px rgba(194,31,31,0.03);
  }

  .center-content{ display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; padding:clamp(1rem, 3vmin, 2rem); width:100%; }
  .name{ font-size: clamp(1.5rem, 6vmin, 4rem); line-height:.95; margin:0 0 .5rem 0; letter-spacing:.04em;
         background: linear-gradient(180deg, #f3f3f6, #c7c9d3 65%, #9ea3b1);
         -webkit-background-clip:text; background-clip:text; color:transparent; }
  .tag{ margin:0 0 1.2rem 0; color: var(--muted); font-size: clamp(.75rem, 1.8vmin, 1rem); }
  .links{ display:flex; gap:.7rem; flex-wrap:wrap; justify-content:center; }
  .pill{
    display:inline-flex; align-items:center; gap:.5rem; padding:.5rem 1rem; border-radius:999px;
    color:#fff; text-decoration:none; font-weight:600; letter-spacing:.02em;
    background: linear-gradient(180deg, var(--deep-red), var(--dark-crimson));
    box-shadow: 0 6px 18px rgba(194,31,31,.25), inset 0 0 0 1px rgba(194,31,31,.35);
    transition: transform 160ms ease, box-shadow 160ms ease;
    font-size: clamp(.7rem, 1.6vmin, .9rem);
  }
  .pill:hover{ transform: translateY(-2px); box-shadow: 0 10px 24px rgba(194,31,31,.35), inset 0 0 0 1px rgba(194,31,31,.5); }
  .pill:focus-visible { outline: 2px solid var(--glow-red); outline-offset: 2px; }
  .pill svg{ width:16px; height:16px; fill: currentColor; }

  .field{ position:absolute; inset:0; z-index:2; pointer-events:none; }
  .photo-container{ position:absolute; inset:0; pointer-events:auto; }

  .thumb{
    position:absolute;
    transform: translate(-50%, -50%) scale(var(--scale, 1));
    transform-origin: center center;
    will-change: transform;
    contain: layout paint;
    border-radius: 12px; overflow:hidden; pointer-events:auto;
    box-shadow: 0 8px 24px rgba(0,0,0,.4), 0 0 0 1px rgba(255,255,255,.06);
    transition: transform 180ms ease, box-shadow 180ms ease;
    background:#2f323a; cursor:pointer; z-index:5;
    outline: none;
  }
  .thumb:hover,
  .thumb:focus {
    box-shadow: 0 16px 40px rgba(0,0,0,.6), 0 0 0 2px rgba(194,31,31,.6);
    z-index:25;
  }
  .thumb:focus-visible { outline: 2px solid var(--glow-red); outline-offset: 2px; }

  .thumb img{ width:100%; height:100%; object-fit:cover; display:block; filter: saturate(.95) contrast(1.05); }
  .thumb .gloss{
    position:absolute; inset:0; pointer-events:none;
    background:
      radial-gradient(90% 90% at 85% 15%, rgba(255,255,255,.18), transparent 45%),
      linear-gradient(180deg, rgba(194,31,31,.16), transparent 45%, transparent 55%, rgba(194,31,31,.12));
    mix-blend-mode: screen;
  }

  .caption-box{
    position: absolute;
    z-index: 30;
    background: rgba(34,36,42,0.95);
    backdrop-filter: blur(8px);
    color: var(--ink);
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    font-size: clamp(0.6rem, 1.4vmin, 0.8rem);
    white-space: nowrap;
    text-align: center;
    border: 1px solid var(--box-glow);
    box-shadow: 0 4px 16px rgba(0,0,0,0.4);
    pointer-events: none;
    transition: opacity 150ms ease-out;
    transform-origin: top center;
    max-width: none;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    .center-box { border-radius: 12px; }
    .links{ gap: .5rem; }
    .pill{ padding: .4rem .8rem; }
    .caption-box {
      font-size: 0.55rem;
      padding: 0.4rem 0.6rem;
    }
  }
  @media (max-width: 480px) {
    .name{ font-size: clamp(1.2rem, 5vmin, 3rem); }
    .tag{ margin-bottom: 1rem; }
    .links{ flex-direction: column; align-items: center; }
    .caption-box {
      font-size: 0.5rem;
      padding: 0.3rem 0.5rem;
    }
  }
</style>