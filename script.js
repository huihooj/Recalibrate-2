// Nav scroll state
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Hero parallax + subtle parallax for split image
const heroBg = document.getElementById('heroBg');
const parallaxImgs = document.querySelectorAll('.parallax-img');

let ticking = false;
const onParallax = () => {
  const y = window.scrollY;
  if (heroBg) {
    heroBg.style.transform = `scale(1.05) translateY(${y * 0.35}px)`;
  }
  parallaxImgs.forEach((img) => {
    const rect = img.getBoundingClientRect();
    const offset = (rect.top - window.innerHeight / 2) * -0.08;
    img.style.transform = `translateY(${offset}px) scale(1.08)`;
  });
  ticking = false;
};
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(onParallax);
    ticking = true;
  }
}, { passive: true });
onParallax();
