const header=document.querySelector('[data-header]');
const toggle=document.querySelector('[data-nav-toggle]');
const nav=document.querySelector('[data-nav]');
const updateHeader=()=>header?.classList.toggle('scrolled',window.scrollY>24);
updateHeader();window.addEventListener('scroll',updateHeader,{passive:true});
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':''});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');document.body.style.overflow=''}));
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduce){document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in-view'))}else{const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el))}
