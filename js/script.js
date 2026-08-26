// ===== STAR CANVAS =====
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const stars = Array.from({ length: 220 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  r: Math.random() * 1.8 + 0.2,
  speed: Math.random() * 0.008 + 0.002,
  twinkle: Math.random() * Math.PI * 2
}));

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    s.twinkle += s.speed;
    const a = 0.3 + 0.7 * Math.abs(Math.sin(s.twinkle));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${a})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// ===== SCROLL SPY =====
const sections = ['home', 'about', 'skills', 'projects', 'wall', 'contact'];
const navLinks = {};
sections.forEach(id => { navLinks[id] = document.getElementById('nav-' + id); });

function updateScrollSpy() {
  let current = 'home';
  const scrollY = window.scrollY || window.pageYOffset;
  const windowHeight = window.innerHeight;
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight
  );

  // If scrolled to or near the bottom of the page, automatically activate contact
  if (scrollY + windowHeight >= documentHeight - 80) {
    current = 'contact';
  } else {
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop - 180;
        if (scrollY >= top) {
          current = id;
        }
      }
    });
  }

  sections.forEach(id => {
    if (navLinks[id]) {
      if (id === current) {
        navLinks[id].classList.add('active');
      } else {
        navLinks[id].classList.remove('active');
      }
    }
  });
}

window.addEventListener('scroll', updateScrollSpy, { passive: true });
window.addEventListener('resize', updateScrollSpy, { passive: true });
document.addEventListener('DOMContentLoaded', updateScrollSpy);
updateScrollSpy();

// ===== FADE IN OBSERVER =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===== WALL STICKY =====
const colors = ['#fce4ec', '#e8eaf6', '#e0f2f1', '#fff9c4', '#f3e5f5', '#e3f2fd', '#fff3e0'];
const rotations = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

function postSticky() {
  const name = document.getElementById('wallName').value.trim();
  const msg = document.getElementById('wallMsg').value.trim();
  if (!name || !msg) { alert('Silakan isi nama dan pesanmu terlebih dahulu!'); return; }
  const area = document.getElementById('notesArea');
  const color = colors[Math.floor(Math.random() * colors.length)];
  const r = rotations[Math.floor(Math.random() * rotations.length)];
  const top = Math.random() * 300;
  const left = Math.random() * 200;
  const el = document.createElement('div');
  el.className = 'sticky';
  el.style.cssText = `top:${top}px;left:${left}px;background:${color};color:#333;transform:rotate(${r}deg)`;
  el.innerHTML = `<span class="sticky-name">${name} <span class="sticky-time">just now</span></span><span class="sticky-text">"${msg}"</span>`;
  area.appendChild(el);
  document.getElementById('wallName').value = '';
  document.getElementById('wallMsg').value = '';
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
  });
});

// ===== 28 INTERACTIVE FLOATING TECH STACK PILLS WITH REAL LOGOS =====
const techItems = [
  // Web & Code
  { name: 'HTML', cat: 'web', color: '#e34f26', icon: 'devicon-html5-plain colored' },
  { name: 'CSS', cat: 'web', color: '#1572b6', icon: 'devicon-css3-plain colored' },
  { name: 'JavaScript', cat: 'web', color: '#f7df1e', icon: 'devicon-javascript-plain colored' },
  { name: 'PHP', cat: 'web', color: '#777bb4', icon: 'devicon-php-plain colored' },
  { name: 'Node.js', cat: 'web', color: '#339933', icon: 'devicon-nodejs-plain colored' },
  { name: 'C++', cat: 'web', color: '#00599c', icon: 'devicon-cplusplus-plain colored' },
  { name: 'SQL', cat: 'web', color: '#00758f', icon: 'devicon-mysql-original colored' },
  { name: 'Postman', cat: 'web', color: '#ff6c37', icon: 'devicon-postman-plain colored' },
  { name: 'Supabase', cat: 'web', color: '#3ecf8e', icon: 'devicon-supabase-plain colored' },

  // Data & AI / Databases
  { name: 'Python', cat: 'data', color: '#3776ab', icon: 'devicon-python-plain colored' },
  { name: 'NumPy', cat: 'data', color: '#4dabcf', icon: 'devicon-numpy-original colored' },
  { name: 'Pandas', cat: 'data', color: '#e70488', icon: 'devicon-pandas-original colored' },
  { name: 'R Studio', cat: 'data', color: '#75aadb', icon: 'devicon-rstudio-plain colored' },
  { name: 'MariaDB', cat: 'data', color: '#003545', icon: 'devicon-mariadb-original colored' },
  { name: 'Google Colab', cat: 'data', color: '#f9ab00', svg: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>' },
  { name: 'Tableau', cat: 'data', color: '#e97627', svg: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M11 2h2v4h-2V2zm0 16h2v4h-2v-4zm-9-9h4v2H2V9zm16 0h4v2h-4V9zm-8-3h2v12h-2V6zm-5 5h12v2H6v-2z"/></svg>' },

  // Game & 3D
  { name: 'Unity', cat: 'game', color: '#ffffff', icon: 'devicon-unity-original' },
  { name: 'GameMaker', cat: 'game', color: '#5c9e31', svg: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.5h-2v-2h2zm0-4h-2V7h2z"/></svg>' },
  { name: 'Blender', cat: 'game', color: '#ea7600', icon: 'devicon-blender-original colored' },

  // Design & Media
  { name: 'Figma', cat: 'design', color: '#f24e1e', icon: 'devicon-figma-plain colored' },
  { name: 'Adobe Photoshop', cat: 'design', color: '#31a8ff', icon: 'devicon-photoshop-plain colored' },
  { name: 'Adobe Illustrator', cat: 'design', color: '#ff9a00', icon: 'devicon-illustrator-plain colored' },
  { name: 'Premiere Pro', cat: 'design', color: '#9999ff', icon: 'devicon-premierepro-plain colored' },
  { name: 'LMMS', cat: 'design', color: '#158c42', svg: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>' },

  // System & Cloud
  { name: 'Linux', cat: 'sys', color: '#fcc624', icon: 'devicon-linux-plain' },
  { name: 'Ubuntu', cat: 'sys', color: '#e95420', icon: 'devicon-ubuntu-plain colored' },
  { name: 'Cisco', cat: 'sys', color: '#1ba0d7', svg: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M4 10a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1zm5 4a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1zm-15 8a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1zm5 4a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1z"/></svg>' },
  { name: 'PuTTY', cat: 'sys', color: '#4a90e2', svg: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><polyline points="7 9 10 12 7 15" stroke="currentColor" stroke-width="2" fill="none"/><line x1="12" y1="15" x2="16" y2="15" stroke="currentColor" stroke-width="2"/></svg>' }
];

function initTechStack() {
  const wrap = document.getElementById('techSpaceWrap');
  const layer = document.getElementById('techSpaceLayer');
  if (!wrap || !layer) return;

  let width = wrap.clientWidth;
  let height = wrap.clientHeight;

  const pills = [];

  // Pre-calculate scattered starting positions
  const cols = 6;
  const rows = 6;
  const cellW = width / cols;
  const cellH = height / rows;

  techItems.forEach((tech, i) => {
    const el = document.createElement('div');
    el.className = 'tech-pill';
    el.dataset.cat = tech.cat;
    el.style.borderColor = tech.color + '44';

    const iconHtml = tech.icon 
      ? `<i class="${tech.icon} tech-pill-icon"></i>` 
      : `<span class="tech-pill-svg" style="color:${tech.color}">${tech.svg}</span>`;

    el.innerHTML = `
      ${iconHtml}
      <span class="tech-pill-text">${tech.name}</span>
    `;

    // Hover glow
    el.addEventListener('mouseenter', () => {
      el.style.borderColor = tech.color;
      el.style.boxShadow = `0 0 25px ${tech.color}66, 0 8px 25px rgba(0,0,0,0.5)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.borderColor = tech.color + '44';
      el.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.45)';
    });

    layer.appendChild(el);

    // Grid jitter for good initial dispersion without overlapping
    const c = i % cols;
    const r = Math.floor(i / cols);
    const initX = c * cellW + Math.random() * Math.max(10, cellW - 140) + 15;
    const initY = r * cellH + Math.random() * Math.max(10, cellH - 45) + 15;

    const angle = (Math.random() - 0.5) * 36; // -18 to +18 deg rotation
    const speed = 0.25 + Math.random() * 0.35;
    const dir = Math.random() * Math.PI * 2;

    const pObj = {
      el,
      tech,
      x: Math.max(10, Math.min(width - 150, initX)),
      y: Math.max(10, Math.min(height - 55, initY)),
      vx: Math.cos(dir) * speed,
      vy: Math.sin(dir) * speed,
      angle: angle,
      vAngle: (Math.random() - 0.5) * 0.1,
      w: 140, // will be measured
      h: 42,
      isDragging: false,
      dragStartX: 0,
      dragStartY: 0,
      pillStartX: 0,
      pillStartY: 0,
      lastX: 0,
      lastY: 0,
      lastTime: 0
    };

    // Measure actual element size after mounting
    requestAnimationFrame(() => {
      pObj.w = el.offsetWidth || 140;
      pObj.h = el.offsetHeight || 42;
    });

    // --- DRAG & THROW PHYSICS ---
    function onStart(clientX, clientY) {
      pObj.isDragging = true;
      pObj.dragStartX = clientX;
      pObj.dragStartY = clientY;
      pObj.pillStartX = pObj.x;
      pObj.pillStartY = pObj.y;
      pObj.lastX = clientX;
      pObj.lastY = clientY;
      pObj.lastTime = performance.now();
      pObj.vx = 0;
      pObj.vy = 0;
      el.style.transition = 'none';
    }

    function onMove(clientX, clientY) {
      if (!pObj.isDragging) return;
      const now = performance.now();
      const dt = Math.max(1, now - pObj.lastTime);
      const dx = clientX - pObj.lastX;
      const dy = clientY - pObj.lastY;

      pObj.vx = (dx / dt) * 12;
      pObj.vy = (dy / dt) * 12;

      pObj.lastX = clientX;
      pObj.lastY = clientY;
      pObj.lastTime = now;

      pObj.x = pObj.pillStartX + (clientX - pObj.dragStartX);
      pObj.y = pObj.pillStartY + (clientY - pObj.dragStartY);

      // Clamp to boundaries while dragging
      pObj.x = Math.max(0, Math.min(width - pObj.w, pObj.x));
      pObj.y = Math.max(0, Math.min(height - pObj.h, pObj.y));

      el.style.transform = `translate3d(${pObj.x}px, ${pObj.y}px, 0) rotate(${pObj.angle}deg) scale(1.08)`;
    }

    function onEnd() {
      if (!pObj.isDragging) return;
      pObj.isDragging = false;
      // Cap maximum throw velocity
      const maxV = 6;
      pObj.vx = Math.max(-maxV, Math.min(maxV, pObj.vx));
      pObj.vy = Math.max(-maxV, Math.min(maxV, pObj.vy));
    }

    // Mouse Events
    el.addEventListener('mousedown', e => {
      e.preventDefault();
      onStart(e.clientX, e.clientY);

      function handleMouseMove(ev) { onMove(ev.clientX, ev.clientY); }
      function handleMouseUp() {
        onEnd();
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      }
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    });

    // Touch Events
    el.addEventListener('touchstart', e => {
      if (e.touches.length === 1) {
        const t = e.touches[0];
        onStart(t.clientX, t.clientY);
      }
    }, { passive: true });

    el.addEventListener('touchmove', e => {
      if (e.touches.length === 1 && pObj.isDragging) {
        const t = e.touches[0];
        onMove(t.clientX, t.clientY);
      }
    }, { passive: true });

    el.addEventListener('touchend', () => onEnd());
    el.addEventListener('touchcancel', () => onEnd());

    pills.push(pObj);
  });

  // Handle container resize
  window.addEventListener('resize', () => {
    width = wrap.clientWidth;
    height = wrap.clientHeight;
    pills.forEach(p => {
      p.x = Math.max(0, Math.min(width - p.w, p.x));
      p.y = Math.max(0, Math.min(height - p.h, p.y));
    });
  });

  // --- ANIMATION LOOP (Smooth Zero-Gravity Floating & Wall Bounce) ---
  function updatePhysics() {
    pills.forEach(p => {
      if (p.isDragging) return;

      // Apply velocities
      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.vAngle;

      // Air damping for natural float
      p.vx *= 0.996;
      p.vy *= 0.996;

      // Gentle cosmic drift
      const speed = Math.hypot(p.vx, p.vy);
      if (speed < 0.2) {
        const angle = Math.random() * Math.PI * 2;
        p.vx += Math.cos(angle) * 0.05;
        p.vy += Math.sin(angle) * 0.05;
      }

      // Bounce on horizontal walls
      if (p.x <= 0) {
        p.x = 0;
        p.vx = Math.abs(p.vx) * 0.85;
        p.vAngle = (Math.random() - 0.5) * 0.15;
      } else if (p.x + p.w >= width) {
        p.x = width - p.w;
        p.vx = -Math.abs(p.vx) * 0.85;
        p.vAngle = (Math.random() - 0.5) * 0.15;
      }

      // Bounce on vertical walls
      if (p.y <= 0) {
        p.y = 0;
        p.vy = Math.abs(p.vy) * 0.85;
        p.vAngle = (Math.random() - 0.5) * 0.15;
      } else if (p.y + p.h >= height) {
        p.y = height - p.h;
        p.vy = -Math.abs(p.vy) * 0.85;
        p.vAngle = (Math.random() - 0.5) * 0.15;
      }

      p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.angle}deg)`;
    });

    requestAnimationFrame(updatePhysics);
  }
  requestAnimationFrame(updatePhysics);

  // --- CATEGORY FILTER INTERACTION ---
  const filterBtns = document.querySelectorAll('.tech-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      pills.forEach(p => {
        if (filter === 'all' || p.tech.cat === filter) {
          p.el.classList.remove('dimmed');
        } else {
          p.el.classList.add('dimmed');
        }
      });
    });
  });
}

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initTechStack();
    initHeroTypewriter();
  });
} else {
  initTechStack();
  initHeroTypewriter();
}

// ===== HERO TYPEWRITER EFFECT =====
function initHeroTypewriter() {
  const el = document.getElementById('heroTypewriter');
  if (!el) return;

  const lines = ['Gabriel', 'Ibanez', 'Purnomo'];
  let lineIdx = 0;
  let charIdx = 0;
  let currentHtml = '';

  function typeNext() {
    if (lineIdx < lines.length) {
      const currentWord = lines[lineIdx];
      if (charIdx < currentWord.length) {
        currentHtml += currentWord[charIdx];
        charIdx++;
        el.innerHTML = currentHtml;
        const delay = Math.random() * 45 + 75; // realistic typing rhythm
        setTimeout(typeNext, delay);
      } else {
        lineIdx++;
        charIdx = 0;
        if (lineIdx < lines.length) {
          currentHtml += '<br>';
          el.innerHTML = currentHtml;
          setTimeout(typeNext, 200); // pause between lines
        }
      }
    }
  }

  // Start after a brief entrance delay
  setTimeout(typeNext, 350);
}