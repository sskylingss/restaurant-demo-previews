const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("in");revealObserver.unobserve(entry.target)}}),{threshold:.14});
document.querySelectorAll(".reveal").forEach(node=>revealObserver.observe(node));
