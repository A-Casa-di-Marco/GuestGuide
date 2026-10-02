(function(){
  'use strict';
  var selectedPhase = null;
  function language(){return document.documentElement.lang || 'it';}
  function syncLinks(){
    document.querySelectorAll('[data-guide-link]').forEach(function(a){
      var href=a.dataset.guideLink;
      if(href[0]==='#'||/^https?:/.test(href)){a.href=href;return;}
      var u=new URL(href,location.href);u.searchParams.set('lang',language());a.href=u.pathname+u.search+u.hash;
    });
    var select=document.querySelector('.lang-select');if(select)select.value=language();
  }
  function selectPhase(index,manual){
    selectedPhase=index;
    document.querySelectorAll('[data-phase]').forEach(function(b){b.setAttribute('aria-selected',String(Number(b.dataset.phase)===index));});
    document.querySelectorAll('.stay-panel').forEach(function(p,i){p.hidden=i!==index;});
    if(manual){try{sessionStorage.setItem('guideChosenPhase',String(index));}catch(e){}}
  }
  function inferPhase(){
    var p=typeof getGuestProfile==='function'?getGuestProfile():{};
    var now=new Date(),today=new Date(now.getFullYear(),now.getMonth(),now.getDate());
    var end=p.checkout?new Date(p.checkout+'T00:00:00'):null;
    var start=p.checkin?new Date(p.checkin+'T00:00:00'):null;
    if(end&&today>=new Date(end.getTime()-86400000))return 2;
    if(start&&today>=start&&(!end||today<end))return 1;
    return 0;
  }
  document.querySelectorAll('[data-phase]').forEach(function(b){
    b.addEventListener('click',function(){selectPhase(Number(b.dataset.phase),true);});
    b.addEventListener('keydown',function(e){
      if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();var i=(Number(b.dataset.phase)+(e.key==='ArrowRight'?1:2))%3;selectPhase(i,true);document.querySelector('[data-phase="'+i+'"]').focus();}
    });
  });
  var originalShowSite=window.showSite;
  window.showSite=function(lang){originalShowSite(lang);syncLinks();if(selectedPhase===null)selectPhase(inferPhase(),false);};
  var save=document.getElementById('saveGuestStayBtn');
  if(save)save.addEventListener('click',function(){selectPhase(inferPhase(),false);syncLinks();});
  syncLinks();selectPhase(inferPhase(),false);
  var q=new URLSearchParams(location.search).get('lang'),hash=location.hash.slice(1),saved=null;
  try{saved=localStorage.getItem('guestGuideLang');}catch(e){}
  if(['it','en','es','fr','de'].includes(q)||['it','en','es','fr','de'].includes(window.guideInitialHash.slice(1))){
    var lang=[q,hash,saved].find(function(x){return ['it','en','es','fr','de'].includes(x);});
    if(lang)window.showSite(lang);
  } else { window.showLangScreen();
  }
  // Every existing page remains accessible with the selected language.
  document.querySelectorAll('#site a[href]').forEach(function(a){
    if(!a.dataset.guideLink&&/^[^:#?]+\.html(?:[?#]|$)/.test(a.getAttribute('href')))a.dataset.guideLink=a.getAttribute('href');
  });
  syncLinks();
})();
document.addEventListener('click',function(e){
  if(e.target.closest('.guest-edit-btn')){
    var options=document.querySelector('.guide-options');if(options)options.open=true;
  }
},true);
