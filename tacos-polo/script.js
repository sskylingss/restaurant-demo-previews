const header=document.querySelector('.site-header');
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#primary-nav');
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>24),{passive:true});
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduced){document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}else{const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
