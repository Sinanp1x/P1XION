const NAV_LINKS = [
  { label: 'Home', href: 'index.html', page: 'home' },
  { label: 'Services', href: 'services.html', page: 'services' },
  { label: 'Projects', href: 'projects.html', page: 'projects' },
  { label: 'Team', href: 'team.html', page: 'team' },
];

const SITE_DATA = {
  services: [],
  projects: [],
  founder: null,
  openRoles: [],
};

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function accentClass(accent) {
  return accent === 'tertiary' ? 'text-tertiary' : accent === 'secondary' ? 'text-secondary' : 'text-primary';
}

function renderServicePreviewCard(service) {
  return `
    <div class="glass-card p-8 rounded-xl hover:translate-y-[-8px]">
      <div class="w-full h-48 object-cover rounded-lg mb-8 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
        <span class="material-symbols-outlined text-5xl ${accentClass(service.accent)}/40">${service.icon}</span>
      </div>
      <h4 class="font-headline-lg text-headline-lg text-on-surface mb-2">${escapeHtml(service.title)}</h4>
      <p class="text-on-surface-variant mb-6">${escapeHtml(service.short)}</p>
      <div class="flex flex-wrap gap-2">
        ${service.features.slice(0, 2).map(feature => `<span class="px-3 py-1 bg-surface-container-high rounded text-label-sm font-label-sm">${escapeHtml(feature)}</span>`).join('')}
      </div>
    </div>
  `;
}

function renderServiceDetailCard(service) {
  return `
    <div class="glass-card rounded-xl overflow-hidden flex flex-col">
      <div class="h-32 w-full bg-gradient-to-br from-surface-container-high to-background flex items-end p-6 relative">
        <div class="absolute top-6 right-6 px-3 py-1 ${service.accent === 'tertiary' ? 'bg-tertiary/20 border-tertiary/30 text-tertiary' : service.accent === 'secondary' ? 'bg-secondary/20 border-secondary/30 text-secondary' : 'bg-primary/20 border-primary/30 text-primary'} border rounded-full text-[10px] font-tech-accent uppercase tracking-wider">${escapeHtml(service.badge)}</div>
        <div class="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center border border-glass-border ${service.accent === 'tertiary' ? 'text-tertiary' : service.accent === 'secondary' ? 'text-secondary' : 'text-primary'}">
          <span class="material-symbols-outlined text-3xl">${service.icon}</span>
        </div>
      </div>
      <div class="p-8 flex-grow">
        <h3 class="font-headline-lg text-headline-lg mb-4">${escapeHtml(service.title)}</h3>
        <p class="text-on-surface-variant mb-6 text-sm leading-relaxed">${escapeHtml(service.details)}</p>
        <ul class="space-y-3">
          ${service.features.map(feature => `<li class="flex items-center gap-3 text-sm text-on-surface"><span class="material-symbols-outlined text-primary text-lg">check_circle</span>${escapeHtml(feature)}</li>`).join('')}
        </ul>
        <a class="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-primary-container px-5 py-3 text-sm font-bold text-on-primary-container transition-transform hover:scale-105" href="${service.contact || 'https://wa.me/+917559981062'}" target="_blank" rel="noreferrer">
          Connect on WhatsApp
          <span class="material-symbols-outlined text-base">chat</span>
        </a>
      </div>
    </div>
  `;
}

function renderProjectCard(project) {
  return `
    <div class="glass-card p-6 rounded-xl flex flex-col gap-4 min-w-[320px]">
      <div class="flex justify-between items-start gap-4">
        <div class="w-12 h-12 rounded-lg bg-white/5 border border-glass-border flex items-center justify-center overflow-hidden">
          ${project.logo ? `<img alt="${escapeHtml(project.title)} logo" class="w-full h-full object-contain p-1" src="${project.logo}"/>` : `<span class="material-symbols-outlined text-primary">${project.icon}</span>`}
        </div>
        <span class="px-3 py-1 ${project.badge === 'Completed' ? 'bg-primary/20 text-primary' : project.badge === 'Planning' ? 'bg-secondary/20 text-secondary' : 'bg-tertiary/20 text-tertiary'} text-label-sm font-label-sm rounded-full">${escapeHtml(project.badge)}</span>
      </div>
      <h4 class="font-headline-lg text-headline-lg">${escapeHtml(project.title)}</h4>
      <p class="text-on-surface-variant text-body-md line-clamp-2">${escapeHtml(project.details || project.short)}</p>
      <div class="mt-auto pt-4 border-t border-glass-border flex justify-between items-center">
        <span class="text-label-sm font-label-sm text-on-surface-variant">${escapeHtml(project.type)}</span>
        ${project.website ? `<a class="text-primary font-label-sm text-label-sm hover:underline" href="${project.website}" target="_blank" rel="noreferrer">Visit</a>` : `<span class="material-symbols-outlined text-primary">hourglass_top</span>`}
      </div>
    </div>
  `;
}

function renderTeamFounderCard() {
  const founder = SITE_DATA.founder;
  return `
    <div class="glass-card rounded-xl p-8 group">
      <div class="primary-icon">
        <span class="material-symbols-outlined text-5xl">developer_mode</span>
      </div>
      <h3 class="font-headline-lg text-2xl text-white mb-1 text-center">${escapeHtml(founder.name)}</h3>
      <p class="font-tech-accent text-primary mb-4 text-center">${escapeHtml(founder.role)}</p>
      <p class="font-body-md text-on-surface-variant mb-6 text-center">${escapeHtml(founder.bio)}</p>
      <div class="flex gap-4 justify-center">
        <a class="text-on-surface-variant hover:text-primary transition-all" href="${founder.social.instagram}" target="_blank" rel="noreferrer"><span class="material-symbols-outlined">alternate_email</span></a>
        <a class="text-on-surface-variant hover:text-primary transition-all" href="${founder.social.whatsapp}" target="_blank" rel="noreferrer"><span class="material-symbols-outlined">chat</span></a>
        <a class="text-on-surface-variant hover:text-primary transition-all" href="${founder.portfolio}" target="_blank" rel="noreferrer"><span class="material-symbols-outlined">link</span></a>
      </div>
    </div>
  `;
}

function renderRoleCard(role) {
  return `
    <div class="border-2 border-dashed border-glass-border rounded-xl p-8 flex flex-col items-center justify-center text-center group hover:bg-white/5 transition-all">
      <div class="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-6 text-${role.accent} group-hover:scale-110 transition-transform">
        <span class="material-symbols-outlined text-4xl">developer_mode</span>
      </div>
      <h3 class="font-headline-lg text-xl text-white mb-2">${escapeHtml(role.title)}</h3>
      <p class="font-body-md text-on-surface-variant mb-6">${escapeHtml(role.description)}</p>
      <a href="mailto:support@p1xion.app?subject=Application: ${escapeHtml(role.title)}" class="inline-block font-label-sm text-label-sm text-${role.accent} uppercase tracking-widest font-bold hover:opacity-80 transition-colors mt-auto">${escapeHtml(role.action)}</a>
    </div>
  `;
}

function renderHomeContent() {
  if (!SITE_DATA.services.length || !SITE_DATA.projects.length || !SITE_DATA.openRoles.length || !SITE_DATA.founder) {
    return;
  }

  const sections = document.querySelectorAll('main > section');
  const servicesGrid = sections[2]?.querySelector('.grid');
  const projectsStrip = sections[3]?.querySelector('.flex.gap-gutter');
  const teamGrid = sections[4]?.querySelector('.grid');

  if (servicesGrid) {
    servicesGrid.innerHTML = SITE_DATA.services.map(renderServicePreviewCard).join('');
  }

  if (projectsStrip) {
    projectsStrip.innerHTML = SITE_DATA.projects.map(renderProjectCard).join('');
  }

  if (teamGrid) {
    teamGrid.innerHTML = [renderTeamFounderCard(), ...SITE_DATA.openRoles.map(renderRoleCard)].join('');
  }
}

async function loadSiteData() {
  try {
    const [servicesResponse, projectsResponse, teamResponse] = await Promise.all([
      fetch('data/services.json'),
      fetch('data/projects.json'),
      fetch('data/team.json'),
    ]);

    const [services, projects, team] = await Promise.all([
      servicesResponse.json(),
      projectsResponse.json(),
      teamResponse.json(),
    ]);

    SITE_DATA.services = services;
    SITE_DATA.projects = projects;
    SITE_DATA.founder = team.founder;
    SITE_DATA.openRoles = team.openRoles || [];
  } catch (error) {
    console.warn('P1XION data files could not be loaded.', error);
  }
}

function renderServicesPageContent() {
  if (!SITE_DATA.services.length) {
    return;
  }

  const servicesGrid = document.querySelector('body[data-page="services"] main > section:nth-of-type(2) .grid');
  if (servicesGrid) {
    servicesGrid.innerHTML = SITE_DATA.services.map(renderServiceDetailCard).join('');
  }
}

function renderProjectsPageContent() {
  if (!SITE_DATA.projects.length) {
    return;
  }

  const projectsGrid = document.querySelector('body[data-page="projects"] main > section:nth-of-type(2) .grid');
  if (projectsGrid) {
    const moreComingSoon = `
      <div class="glass-card p-8 rounded-xl flex flex-col h-full group">
        <div class="w-16 h-16 rounded-lg bg-gradient-to-br from-outline to-surface-container-highest flex items-center justify-center mb-6">
          <span class="material-symbols-outlined text-on-surface text-3xl">rocket_launch</span>
        </div>
        <div class="flex items-center gap-3 mb-4">
          <span class="bg-tertiary/10 text-tertiary text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded border border-tertiary/20">In Pipeline</span>
          <span class="text-on-surface-variant/60 font-tech-accent text-tech-accent">Next Build</span>
        </div>
        <h3 class="font-headline-lg text-headline-lg text-on-surface mb-3 group-hover:text-tertiary transition-colors">More Coming Soon</h3>
        <p class="font-body-md text-body-md text-on-surface-variant mb-8 flex-grow">We are currently shaping the next wave of systems, products, and design-led experiments.</p>
        <div class="text-on-surface-variant/40 font-label-sm text-label-sm italic">Stealth mode</div>
      </div>
    `;
    projectsGrid.innerHTML = SITE_DATA.projects.map(renderProjectCard).join('') + moreComingSoon;
  }
}

function renderTeamPageContent() {
  if (!SITE_DATA.founder || !SITE_DATA.openRoles.length) {
    return;
  }

  const teamGrid = document.querySelector('body[data-page="team"] main > section:nth-of-type(2) .grid');
  if (teamGrid) {
    teamGrid.innerHTML = [renderTeamFounderCard(), ...SITE_DATA.openRoles.map(renderRoleCard)].join('');
  }
}

function getActivePage() {
  return document.body?.dataset?.page || 'home';
}

function renderHeader() {
  const headerMount = document.querySelector('[data-site-header]');
  if (!headerMount) return;

  const activePage = getActivePage();
  headerMount.innerHTML = `
    <header class="site-header">
      <div class="site-header__backdrop">
        <div class="flex justify-between items-center h-20 px-margin-desktop max-w-container-max mx-auto relative">
          <a class="flex items-center gap-3 font-headline-lg text-headline-lg font-bold tracking-tighter text-on-surface" href="index.html" aria-label="P1XION home">
            <img alt="P1XION logo" class="h-8 w-8" src="assets/logo.svg"/>
            <span>P1ΞON</span>
          </a>
          <nav class="hidden md:flex items-center gap-8" aria-label="Primary">
            ${NAV_LINKS.map(link => `
              <a class="site-header__nav-link font-label-sm text-label-sm text-on-surface-variant hover:text-primary" href="${link.href}" data-active="${link.page === activePage}">${link.label}</a>
            `).join('')}
          </nav>
          <a class="hidden md:inline-flex bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-label-sm text-label-sm font-bold active:scale-95 transition-transform hover:opacity-90" href="https://wa.me/+917559981062" target="_blank" rel="noreferrer">Build With Us</a>
          <button class="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-glass-border text-on-surface" type="button" aria-label="Open menu" aria-expanded="false" data-nav-toggle>
            <span class="material-symbols-outlined">menu</span>
          </button>
          <div class="site-mobile-panel hidden md:hidden p-4" data-nav-panel>
            <div class="flex flex-col gap-2">
              ${NAV_LINKS.map(link => `
                <a class="rounded-lg px-4 py-3 text-on-surface-variant hover:text-primary hover:bg-white/5" href="${link.href}" data-active="${link.page === activePage}">${link.label}</a>
              `).join('')}
              <a class="mt-2 inline-flex justify-center rounded-full bg-primary-container px-5 py-3 font-label-sm text-label-sm font-bold text-on-primary-container" href="https://wa.me/+917559981062" target="_blank" rel="noreferrer">Build With Us</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;

  const toggle = headerMount.querySelector('[data-nav-toggle]');
  const panel = headerMount.querySelector('[data-nav-panel]');
  if (toggle && panel) {
    toggle.addEventListener('click', () => {
      const isHidden = panel.classList.toggle('hidden');
      toggle.setAttribute('aria-expanded', String(!isHidden));
    });
    panel.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        panel.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

function renderFooter() {
  const footerMount = document.querySelector('[data-site-footer]');
  if (!footerMount) return;

  footerMount.innerHTML = `
    <footer class="site-footer">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop py-section-gap max-w-container-max mx-auto">
        <div class="col-span-1 md:col-span-2">
          <div class="font-headline-lg text-headline-lg text-on-surface mb-4 font-bold tracking-tighter">P1ΞON</div>
          <p class="font-body-md text-body-md text-on-surface-variant max-w-sm mb-6">Precision and Glow for the Technical Frontier.</p>
          <div class="flex gap-4">
            <a class="text-on-surface-variant hover:text-primary transition-colors" href="https://instagram.com/p1xion.official" target="_blank" rel="noreferrer"><span class="material-symbols-outlined">hub</span></a>
            <a class="text-on-surface-variant hover:text-primary transition-colors" href="https://wa.me/+917559981062" target="_blank" rel="noreferrer"><span class="material-symbols-outlined">terminal</span></a>
            <a class="text-on-surface-variant hover:text-primary transition-colors" href="index.html"><span class="material-symbols-outlined">language</span></a>
          </div>
        </div>
        <div>
          <h4 class="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-6">Navigation</h4>
          <ul class="space-y-4">
            <li><a class="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="index.html">Home</a></li>
            <li><a class="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="services.html">Services</a></li>
            <li><a class="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="projects.html">Projects</a></li>
            <li><a class="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="team.html">Team</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-6">Contact</h4>
          <ul class="space-y-4">
            <li><a class="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="https://wa.me/+917559981062" target="_blank" rel="noreferrer">WhatsApp</a></li>
            <li><a class="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="https://www.instagram.com/p1xion.official" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a class="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="mailto:support@p1xion.app">support@p1xion.app</a></li>
            <li><a class="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="https://muhammedsinanp1x.netlify.app" target="_blank" rel="noreferrer">Founder Portfolio</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-glass-border py-8 text-center text-label-sm font-label-sm text-on-surface-variant">
        © 2024 P1ΞON. Precision and Glow for the Technical Frontier.
      </div>
    </footer>
  `;
}

function closeMobilePanelsOnResize() {
  if (window.innerWidth >= 768) {
    const panel = document.querySelector('[data-nav-panel]');
    const toggle = document.querySelector('[data-nav-toggle]');
    if (panel && toggle) {
      panel.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    }
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadSiteData();
  renderHeader();
  renderFooter();
  const activePage = getActivePage();
  if (activePage === 'home') {
    renderHomeContent();
  } else if (activePage === 'services') {
    renderServicesPageContent();
  } else if (activePage === 'projects') {
    renderProjectsPageContent();
  } else if (activePage === 'team') {
    renderTeamPageContent();
  }
  window.addEventListener('resize', closeMobilePanelsOnResize, { passive: true });
});