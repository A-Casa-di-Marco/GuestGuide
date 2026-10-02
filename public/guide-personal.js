(function(){
'use strict';
var id=new URLSearchParams(location.search).get('g');
var labels={it:'Una guida per ',en:'A guide for ',es:'Una guía para ',fr:'Un guide pour ',de:'Ein Guide für '};
function links(){if(!id)return;document.querySelectorAll('a[href]').forEach(function(a){var u;try{u=new URL(a.getAttribute('href'),location.href);}catch(e){return;}if(u.origin===location.origin&&(/\.html$/.test(u.pathname)||u.pathname==='/')){u.searchParams.set('g',id);a.setAttribute('href',u.pathname+u.search+u.hash);}});}
function render(){
 links();var name=window.guideStay.name;if(!name)return;
 var lang=document.documentElement.lang||'it';
 var main=document.querySelector('#site main')||document.querySelector('main');if(!main)return;
 var banner=document.querySelector('.personal-guide-banner');if(!banner){banner=document.createElement('p');banner.className='personal-guide-banner';var phase=main.querySelector('#home-menu');if(phase)phase.insertAdjacentElement('afterend',banner);else{var nav=main.querySelector('.route-shortcuts');if(nav)nav.insertAdjacentElement('afterend',banner);else main.prepend(banner);}}
 banner.textContent=(labels[lang]||labels.it)+name;
 if(typeof window.showGuestWelcome==='function')window.showGuestWelcome();
 document.querySelectorAll('.stay-highlight').forEach(function(panel){var n=panel.querySelector('.stay-guest-name');if(!n){n=document.createElement('p');n.className='stay-guest-name';panel.prepend(n);}n.textContent=name;});
}
var original=window.showSite;if(typeof original==='function')window.showSite=function(lang){original(lang);render();};
new MutationObserver(function(){render();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
document.addEventListener('click',function(){links();},true);
links();
if(!id)return;
fetch('/api/guide?g='+encodeURIComponent(id),{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('Unavailable');return r.json();}).then(function(data){
 if(!data.stay)return;
 window.guideStay={name:data.stay.name,checkin:data.stay.checkin,checkout:data.stay.checkout};render();
 if(typeof window.updateCheckoutReminder==='function')window.updateCheckoutReminder();
 if(data.stay.checkin&&data.stay.checkout){var today=new Date().toLocaleDateString('en-CA');var index=today>=data.stay.checkout?2:today>=data.stay.checkin?1:0;var btn=document.querySelector('[data-phase="'+index+'"]');if(btn)btn.click();}
 links();
}).catch(function(){/* The general guide stays available when personalization cannot load. */});
})();
