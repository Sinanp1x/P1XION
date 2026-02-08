// main.js (ES module)
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const mainNav = document.getElementById('mainNav');
const header = document.getElementById('siteHeader');
const tracker = document.getElementById('navTracker');

// NOTE: mobile nav toggle handled later (consolidated) to target the <nav id="mainNav"> element

// sticky header + show tracker when scrolled past hero
const hero = document.getElementById('home');
function onScroll() {
  const y = window.scrollY;
  if (hero && y > hero.offsetHeight * 0.6) {
    header.classList.add('scrolled');
    tracker?.classList.add('show');
    tracker?.setAttribute('aria-hidden','false');
  } else {
    header.classList.remove('scrolled');
    tracker?.classList.remove('show');
    tracker?.setAttribute('aria-hidden','true');
  }
}
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// build tracker dots from sections present on page
function buildTracker() {
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  if (!tracker) return;
  tracker.innerHTML = '';
  sections.forEach(sec => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.type = 'button';
    dot.title = sec.getAttribute('id');
    dot.dataset.target = sec.id;
    dot.addEventListener('click', () => document.getElementById(sec.id).scrollIntoView({behavior:'smooth'}));
    tracker.appendChild(dot);
  });

  // scroll spy
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tracker.querySelectorAll('.dot').forEach(d => d.classList.toggle('active', d.dataset.target === id));
        // highlight nav links too
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href')?.includes('#'+id)));
      }
    });
  }, { threshold: 0.56 });

  sections.forEach(s => obs.observe(s));
}
buildTracker();

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Back to top handler
document.addEventListener('click', (e) => {
  const t = e.target;
  if (t && t.id === 'backToTop') {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    header.classList.remove('scrolled');
  }
});

// Minimal site behavior: mobile nav toggle + video autoplay fallback + accessible close handlers

document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile hamburger toggle (works on Android & Safari) ---
  function createMobileNav() {
    const nav = document.createElement('nav');
    nav.id = 'mobileNav';
    nav.className = 'nav-active animate-fade-in';
    nav.setAttribute('aria-hidden', 'false');
    nav.innerHTML = `
      <ul class="flex flex-col">
        <li class="mb-2"><a href="index.html#home" class="text-gray-700 hover:text-blue-600">Home</a></li>
        <li class="mb-2"><a href="services.html" class="text-gray-700 hover:text-blue-600">Services</a></li>
        <li class="mb-2"><a href="index.html#projects" class="text-gray-700 hover:text-blue-600">Projects</a></li>
        <li class="mb-2"><a href="team.html" class="text-gray-700 hover:text-blue-600">Team</a></li>
        <li class="mb-2"><a href="index.html#contact" class="text-gray-700 hover:text-blue-600">Contact</a></li>
      </ul>
    `;
    return nav;
  }

  const hamburgers = document.querySelectorAll('#hamburger');
  const navBackdrop = document.getElementById('navBackdrop');
  let currentHamburger = null;
  function escHandler(e) {
    if (e.key === 'Escape') {
      closeMobileNav(currentHamburger);
      document.removeEventListener('keydown', escHandler);
    }
  }

  function openMobileNav(button) {
    if (document.getElementById('mobileNav')) return;
    const mobileNav = createMobileNav();
    // append to body for fixed positioning
    document.body.appendChild(mobileNav);
    if (navBackdrop) {
      navBackdrop.classList.remove('hidden');
      navBackdrop.removeAttribute('hidden');
      navBackdrop.setAttribute('aria-hidden', 'false');
    }
    button.setAttribute('aria-expanded', 'true');

    // close on link click
    mobileNav.addEventListener('click', e => {
      if (e.target.tagName === 'A') closeMobileNav(button);
    });

    // close on Escape
    document.addEventListener('keydown', escHandler);
  }

  function closeMobileNav(button) {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
      mobileNav.classList.add('animate-fade-out');
      setTimeout(() => {
        mobileNav.remove();
        if (navBackdrop) {
          navBackdrop.classList.add('hidden');
          navBackdrop.setAttribute('hidden', '');
          navBackdrop.setAttribute('aria-hidden', 'true');
        }
      }, 300);
      if (button) button.setAttribute('aria-expanded', 'false');
      document.removeEventListener('keydown', escHandler);
    }
  }

  // bind hamburger click
  hamburgers.forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      currentHamburger = btn;
      if (expanded) closeMobileNav(btn); else openMobileNav(btn);
    });
  });

  // close on backdrop click
  if (navBackdrop) {
    navBackdrop.addEventListener('click', () => closeMobileNav(currentHamburger));
  }

  // --- Video autoplay handling (try intro, fall back to loop, resume on user gesture) ---
  const intro = document.getElementById('introVideo');
  const loop = document.getElementById('loopVideo');
  const playButton = document.getElementById('playButton');

  function tryPlayIntro() {
    if (!intro) return Promise.resolve();
    // ensure muted & playsInline for Safari/iOS
    try { intro.muted = true; intro.playsInline = true; intro.setAttribute('playsinline', ''); intro.setAttribute('webkit-playsinline', ''); } catch (e) {}
    return intro.play().then(() => {
      // playing successfully, hide play button
      if (playButton) playButton.classList.add('hidden');
    }).catch(() => {
      // autoplay blocked: hide intro and show loop; attempt to play loop
      if (intro) intro.classList.add('hidden');
      if (loop) {
        loop.classList.remove('hidden');
        try { loop.muted = true; loop.playsInline = true; loop.setAttribute('playsinline', ''); loop.setAttribute('webkit-playsinline', ''); } catch (e) {}
        return loop.play().then(() => {
          if (playButton) playButton.classList.add('hidden');
        }).catch(() => {
          // loop also blocked, show play button
          if (playButton) playButton.classList.remove('hidden');
          return Promise.resolve();
        });
      }
      // show play button if no video plays
      if (playButton) playButton.classList.remove('hidden');
      return Promise.resolve();
    });
  }

  // Attempt immediately, and also on first user gesture (tap) resume playback if blocked
  tryPlayIntro();
  const resumeOnGesture = () => {
    tryPlayIntro();
    window.removeEventListener('touchstart', resumeOnGesture);
    window.removeEventListener('click', resumeOnGesture);
  };
  window.addEventListener('touchstart', resumeOnGesture, { passive: true });
  window.addEventListener('click', resumeOnGesture, { passive: true });

  // Play button click handler
  if (playButton) {
    playButton.querySelector('button').addEventListener('click', (e) => {
      e.stopPropagation(); // prevent triggering other gestures
      tryPlayIntro();
    });
  }

  // Hide play button when any video starts playing
  [intro, loop].forEach(video => {
    if (video) {
      video.addEventListener('play', () => {
        if (playButton) playButton.classList.add('hidden');
      });
      video.addEventListener('pause', () => {
        // optional: show button if paused, but for now, only show on initial failure
      });
    }
  });
});