(function(){
 function openAnchor(){
  var key=decodeURIComponent(location.hash.slice(1));if(!key)return;
  var el=document.getElementById(key);
  if(!el&&key==='arrivo')el=document.querySelector('[data-arrival-target]');
  if(!el)return;
  var parent=el;while(parent){if(parent.tagName==='DETAILS')parent.open=true;parent=parent.parentElement;}
  if(key==='arrivo'&&typeof showCheckinPanel==='function')showCheckinPanel('self');
  setTimeout(function(){el.scrollIntoView({block:'start'});},80);
 }
 window.addEventListener('hashchange',openAnchor);openAnchor();
})();
