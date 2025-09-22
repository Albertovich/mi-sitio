// Helpers
const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => Array.from(el.querySelectorAll(s));


// Año dinámico
$('#year').textContent = new Date().getFullYear();


// Menú móvil
const menuToggle = $('#menuToggle');
const mobileMenu = $('#mobileMenu');
if (menuToggle) menuToggle.addEventListener('click', () => {
const open = mobileMenu.classList.toggle('open');
mobileMenu.setAttribute('aria-modal', String(open));
menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});
$$('#mobileMenu a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));


// Tema claro/oscuro (persistente)
const themeToggle = $('#themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.classList.toggle('light', savedTheme === 'light');
if (themeToggle) themeToggle.addEventListener('click', () => {
const isLight = document.documentElement.classList.toggle('light');
localStorage.setItem('theme', isLight ? 'light' : 'dark');
});


// Reveal on scroll
const io = new IntersectionObserver((entries) => {
entries.forEach(e => {
if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
});
}, { threshold: 0.15 });
$$('.reveal').forEach(el => io.observe(el));


// Progreso de lectura + botón to-top
const progress = $('.progress');
const onScroll = () => {
const h = document.documentElement;
const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
progress.style.width = (scrolled * 100) + '%';
$('#toTop').classList.toggle('show', h.scrollTop > 400);
};
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();


// FAQ acordeón
$$('.faq .item').forEach(item => {
const btn = $('button', item);
const ans = $('.answer', item);
btn.addEventListener('click', () => {
const open = btn.getAttribute('aria-expanded') === 'true';
btn.setAttribute('aria-expanded', String(!open));
ans.style.maxHeight = open ? '0px' : (ans.scrollHeight + 'px');
});
});


// Validación del formulario
const form = $('#contactForm');
const ok = $('#formSuccess');
const err = $('#formError');
if (form) form.addEventListener('submit', (e) => {
e.preventDefault();
if (err) err.style.display = 'none';
if (ok) ok.style.display = 'none';
const data = new FormData(form);
const name = String(data.get('name') || '').trim();
const email = String(data.get('email') || '').trim();
const message = String(data.get('message') || '').trim();
const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
if (!name || !validEmail || !message) { if (err) err.style.display = 'block'; return; }
setTimeout(() => { if (ok) ok.style.display = 'block'; form.reset(); }, 400);
});
