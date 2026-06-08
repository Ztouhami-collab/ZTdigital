// ===== ZT DIGITAL — SHARED SCRIPT =====

// Language: persist across pages
function setLang(l){
  try{ localStorage.setItem('zt_lang', l); }catch(e){}
  applyLang(l);
}
function applyLang(l){
  document.body.className = document.body.className.replace(/lang-\w+/g,'').trim() + ' lang-' + l;
  document.documentElement.lang = l;
  document.querySelectorAll('.lang-btn').forEach(b=>{
    b.classList.toggle('active', b.dataset.lang === l);
  });
}
(function(){
  let saved = 'nl';
  try{ saved = localStorage.getItem('zt_lang') || 'nl'; }catch(e){}
  applyLang(saved);
})();

// Nav scroll state
const navEl = document.querySelector('nav');
function onScroll(){
  if(window.scrollY > 30){ navEl.classList.add('scrolled'); }
  else{ navEl.classList.remove('scrolled'); }
}
window.addEventListener('scroll', onScroll);
onScroll();

// Mobile menu
function toggleMenu(){
  const m = document.querySelector('.mobile-menu');
  if(m) m.classList.toggle('open');
}
function closeMenu(){
  const m = document.querySelector('.mobile-menu');
  if(m) m.classList.remove('open');
}

// Reveal on scroll
const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); }
  });
},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// Contact form (Formspree)
const ztForm = document.getElementById('ztForm');
if(ztForm){
  ztForm.addEventListener('submit', async function(e){
    e.preventDefault();
    const form = e.target;
    try{
      const res = await fetch(form.action, {
        method:'POST',
        body:new FormData(form),
        headers:{'Accept':'application/json'}
      });
      if(res.ok){
        form.style.display='none';
        document.getElementById('ztSuccess').style.display='block';
      } else {
        alert('Er ging iets mis. Mail gerust direct naar info@ztdigital.nl');
      }
    }catch(err){
      alert('Er ging iets mis. Mail gerust direct naar info@ztdigital.nl');
    }
  });
}
