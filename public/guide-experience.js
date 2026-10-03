(function(){
'use strict';
document.querySelectorAll('details').forEach(function(d){d.open=false;});
document.addEventListener('click',function(e){var a=e.target.closest('a[href]');if(!a)return;var u=new URL(a.href,location.href);if(u.pathname!==location.pathname||!u.hash)return;var el=document.getElementById(decodeURIComponent(u.hash.slice(1)));if(el&&el.tagName==='DETAILS')el.open=true;});
if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var active=false;
var words={
 it:{label:'Scopri la storia di Marco',title:'Vuoi conoscere la storia della casa e di Marco?',yes:'Sì, raccontamela',no:'Magari dopo'},
 en:{label:'Discover Marco’s story',title:'Would you like to discover the story of the house and Marco?',yes:'Yes, tell me',no:'Maybe later'},
 es:{label:'Descubre la historia de Marco',title:'¿Quieres conocer la historia de la casa y de Marco?',yes:'Sí, cuéntamela',no:'Quizás después'},
 fr:{label:'Découvrez l’histoire de Marco',title:'Voulez-vous découvrir l’histoire de la maison et de Marco ?',yes:'Oui, racontez-moi',no:'Peut-être plus tard'},
 de:{label:'Marcos Geschichte entdecken',title:'Möchtet ihr die Geschichte des Hauses und von Marco kennenlernen?',yes:'Ja, erzählt sie mir',no:'Vielleicht später'}
};
function language(){return document.documentElement.lang||'it';}
function visit(){
 if(active||document.hidden)return;active=true;
 var bird=document.createElement('button');bird.type='button';bird.className='visiting-robin';bird.setAttribute('aria-label',(words[language()]||words.it).label);bird.setAttribute('aria-haspopup','dialog');
 var sprite=document.createElement('span');sprite.className='robin-flight-sprite';sprite.setAttribute('aria-hidden','true');bird.append(sprite);bird.style.setProperty('--robin-peck-period',(3.8+Math.random()*1.2)+'s');document.body.append(bird);
 var right=Math.random()>.5,w=window.innerWidth,h=window.innerHeight;
 var targets=Array.from(document.querySelectorAll('h2,summary,.section-tile,.lang-box')).filter(function(el){var r=el.getBoundingClientRect();return r.top>85&&r.top<h-90&&r.width>60&&el.getClientRects().length;});
 var rect=targets.length?targets[Math.floor(Math.random()*targets.length)].getBoundingClientRect():null;
 var x=rect?Math.min(w-85,Math.max(20,rect.right-75)):Math.max(20,Math.min(w-85,w*.72));var y=rect?rect.top-70:h*.65-20;
 var start=right?w+90:-90,finish=right?-90:w+90,flip=right?-1:1,dialog=null,raf=0,state='';
 var anim=bird.animate([
  {transform:'translate('+start+'px,'+(h*.22)+'px) scaleX('+flip+')',opacity:0},
  {transform:'translate('+(x+(right?75:-75))+'px,'+(y-50)+'px) rotate(-7deg) scaleX('+flip+')',opacity:1,offset:.13},
  {transform:'translate('+x+'px,'+y+'px) scaleX('+flip+')',opacity:1,offset:3/14},
  {transform:'translate('+x+'px,'+y+'px) scaleX('+flip+')',opacity:1,offset:10.8/14},
  {transform:'translate('+(x+(right?-60:60))+'px,'+(y-60)+'px) scaleX('+flip+')',opacity:1,offset:.85},
  {transform:'translate('+finish+'px,'+(h*.18)+'px) scaleX('+flip+')',opacity:0}
 ].map(function(frame){frame.easing='ease-in-out';return frame;}),{duration:14000,easing:'linear',fill:'forwards'});
 function clean(){cancelAnimationFrame(raf);window.removeEventListener('scroll',onScroll);if(dialog){dialog.remove();dialog=null;}bird.remove();active=false;}
 function tick(){var t=Number(anim.currentTime)||0;var next=t<3000?'flying':t<3640?'landing':t<10800?'perched':'flying';if(next!==state){bird.classList.remove('landing','perched');if(next!=='flying')bird.classList.add(next);state=next;}raf=requestAnimationFrame(tick);}
 tick();anim.onfinish=clean;
 var lastY=window.scrollY;
 function onScroll(){var d=Math.abs(window.scrollY-lastY);if(d<24)return;lastY=window.scrollY;if(dialog)return;var t=Number(anim.currentTime)||0;if(t>=3000&&t<10800)anim.currentTime=10800;}
 window.addEventListener('scroll',onScroll,{passive:true});
 function dismiss(){if(dialog){dialog.close();dialog.remove();dialog=null;}bird.classList.remove('invitation-open');anim.play();bird.focus({preventScroll:true});}
 function story(){
  var lang=language();if(dialog){dialog.close();dialog.remove();dialog=null;}anim.cancel();clean();
  var section=document.getElementById('marco-section');
  if(section){if(typeof window.showSite==='function')window.showSite(lang);history.replaceState(null,'','#marco-section');section.scrollIntoView({behavior:'smooth',block:'start'});var heading=section.querySelector('h2')||section;heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});}
  else{var u=new URL('index.html',location.href);u.searchParams.set('lang',lang);var g=new URLSearchParams(location.search).get('g');if(g)u.searchParams.set('g',g);u.hash='marco-section';location.assign(u.pathname+u.search+u.hash);}
 }
 bird.addEventListener('click',function(){
  if(dialog)return;var t=words[language()]||words.it;anim.pause();bird.classList.add('invitation-open');
  dialog=document.createElement('dialog');dialog.className='robin-story-invitation';dialog.setAttribute('aria-labelledby','robin-story-question');
  var title=document.createElement('h2');title.id='robin-story-question';title.textContent=t.title;
  var actions=document.createElement('div');actions.className='robin-story-actions';
  var yes=document.createElement('button');yes.type='button';yes.textContent=t.yes;yes.addEventListener('click',story);
  var no=document.createElement('button');no.type='button';no.className='secondary';no.textContent=t.no;no.addEventListener('click',dismiss);
  actions.append(yes,no);dialog.append(title,actions);document.body.append(dialog);
  dialog.addEventListener('cancel',function(e){e.preventDefault();dismiss();});
  dialog.addEventListener('click',function(e){if(e.target!==dialog)return;var r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dismiss();});
  dialog.showModal();yes.focus();
 });
}
function schedule(){setTimeout(function(){if(Math.random()<.65)visit();schedule();},45000+Math.random()*90000);}
if(typeof Element.prototype.animate==='function'){Promise.all(['assets/robin-flight-v2.png','assets/robin-ground.png'].map(function(src){return new Promise(function(resolve,reject){var img=new Image();img.onload=resolve;img.onerror=reject;img.src=src;});})).then(function(){setTimeout(visit,900);schedule();}).catch(function(){/* Optional mascot does not block the guide. */});}
})();
