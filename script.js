const body = document.body;
const theme = document.querySelector('.theme-toggle');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const cursor = document.querySelector('.cursor-dot');

document.querySelector('#year').textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem('akbar-theme');
if (savedTheme === 'light') body.classList.add('light');
theme.addEventListener('click', () => {
  body.classList.toggle('light');
  localStorage.setItem('akbar-theme', body.classList.contains('light') ? 'light' : 'dark');
});

menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
  menu.textContent = open ? 'Close' : 'Menu';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.textContent = 'Menu';
}));

window.addEventListener('scroll', () => document.querySelector('.site-header').classList.toggle('scrolled', scrollY > 8), { passive: true });

if (matchMedia('(pointer:fine)').matches) {
  window.addEventListener('pointermove', event => {
    cursor.style.opacity = '1'; cursor.style.left = `${event.clientX}px`; cursor.style.top = `${event.clientY}px`;
    document.querySelectorAll('.drift').forEach(item => {
      const depth = Number(item.dataset.depth); const rect = item.parentElement.getBoundingClientRect();
      const x = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
      const y = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
      item.style.translate = `${x * depth}px ${y * depth}px`;
    });
  });
}

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.animate([{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'none' }], { duration: 650, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'forwards' }); observer.unobserve(entry.target); }
}), { threshold: .16 });
document.querySelectorAll('.project, .supporting-work article, .principles, .about-strip').forEach(item => { item.style.opacity = '0'; observer.observe(item); });
