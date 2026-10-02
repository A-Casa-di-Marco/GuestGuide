(function(){
'use strict';
function lang(){return document.documentElement.lang||'it';}
function icons(){if(window.lucide)window.lucide.createIcons({attrs:{width:22,height:22}});}
function route(href){var u=new URL(href,location.href);u.searchParams.set('lang',lang());return u.pathname+u.search+u.hash;}
if(document.body.classList.contains('guide-inner')&&!location.pathname.endsWith('check-in-out.html')){
 var text={it:['Guida','Check-in','Casa','Esplora','Aiuto'],en:['Guide','Check-in','House','Explore','Help'],es:['Guía','Check-in','Casa','Explorar','Ayuda'],fr:['Guide','Check-in','Maison','Explorer','Aide'],de:['Guide','Check-in','Haus','Entdecken','Hilfe']}[lang()]||['Guida','Check-in','Casa','Esplora','Aiuto'];
 var nav=document.createElement('nav');nav.className='route-shortcuts';nav.setAttribute('aria-label',text[0]);
 ['index.html','checkin.html#checkin','manuale.html','luoghi.html','index.html#contatti'].forEach(function(href,i){
  var a=document.createElement('a');a.href=route(href);var icon=document.createElement('i');icon.dataset.lucide=['house','key-round','book-open','compass','message-circle'][i];icon.setAttribute('aria-hidden','true');a.append(icon,document.createTextNode(text[i]));nav.append(a);
 });
 var back=document.querySelector('.back-home');if(back)back.insertAdjacentElement('afterend',nav);
}
var phaseButtons=document.querySelectorAll('[data-journey]');
function journey(key){
 phaseButtons.forEach(function(b){b.setAttribute('aria-selected',String(b.dataset.journey===key));});
 document.querySelectorAll('[data-journey-section]').forEach(function(s){s.hidden=s.dataset.journeySection!==key;});
 var details=document.getElementById(key);if(details)details.open=true;
}
phaseButtons.forEach(function(b){b.addEventListener('click',function(){
 journey(b.dataset.journey);
 history.replaceState(null,'','#'+b.dataset.journey);
 });});
var step=0,steps=Array.from(document.querySelectorAll('[data-step]'));
function showStep(index){
 if(!steps.length)return;
 step=Math.max(0,Math.min(steps.length-1,index));
 steps.forEach(function(s,i){s.hidden=i!==step;});
 document.querySelectorAll('[data-arrival-step]').forEach(function(b){b.setAttribute('aria-pressed',String(Number(b.dataset.arrivalStep)===step));});
 var prev=document.getElementById('arrival-prev'),next=document.getElementById('arrival-next'),count=document.getElementById('arrival-step-count');
 if(prev)prev.disabled=step===0;if(next)next.disabled=step===steps.length-1;
 if(count)count.textContent=(step+1)+' / '+steps.length;
}
document.querySelectorAll('[data-arrival-step]').forEach(function(b){b.addEventListener('click',function(){showStep(Number(b.dataset.arrivalStep));});});
var prev=document.getElementById('arrival-prev'),next=document.getElementById('arrival-next');
if(prev)prev.addEventListener('click',function(){showStep(step-1);});
if(next)next.addEventListener('click',function(){showStep(step+1);document.querySelector('.step-strip').scrollIntoView({block:'start',behavior:'smooth'});});
if(phaseButtons.length){
 journey(location.hash==='#checkout'?'checkout':'checkin');
 if(typeof window.showCheckinPanel==='function')window.showCheckinPanel('self');
 showStep(0);
 window.addEventListener('hashchange',function(){if(location.hash==='#checkout'||location.hash==='#checkin'||location.hash==='#arrivo')journey(location.hash==='#checkout'?'checkout':'checkin');});
}
icons();
})();
if(document.body.classList.contains('guide-home')&&window.guideInitialHash){
 var anchor=window.guideInitialHash.slice(1);
 if(!['it','en','es','fr','de','lang'].includes(anchor)){
  var target=document.getElementById(anchor);
  if(target){history.replaceState(null,'','#'+anchor);setTimeout(function(){target.scrollIntoView({block:'start'});},100);}
 }
}
