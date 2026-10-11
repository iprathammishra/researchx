import {sound,initSound} from './audio.js';
import {readingPresentation,pickFocus} from './motion.mjs';
import {matchesSearch} from './search.mjs';
initSound();
const $=selector=>document.querySelector(selector);
const reader=$('.reading-stack'),entries=[...document.querySelectorAll('.reading-entry')],panel=$('#search-panel'),input=$('#article-search');
const reduced=matchMedia('(prefers-reduced-motion:reduce)');
let visible=entries,active=null,frame=0,audibleUntil=0,keyboardMode=false,navigationTarget=null;
function paint(){
 frame=0;if(document.hidden||!visible.length)return;
 const bounds=reader.getBoundingClientRect(),height=bounds.height,centre=bounds.top+height/2;
 const distances=visible.map(entry=>{const r=entry.getBoundingClientRect();return (r.top+r.height/2-centre)/height;});
 const next=visible[pickFocus(distances,visible.indexOf(active))];
 visible.forEach((entry,i)=>{const motion=readingPresentation(distances[i],reduced.matches),inner=entry.firstElementChild;inner.style.transform=`translateY(${motion.shift}px) scale(${motion.scale})`;inner.style.opacity=motion.opacity;entry.classList.toggle('is-active',entry===next);const link=entry.querySelector('a');if(entry===next)link.setAttribute('aria-current','true');else link.removeAttribute('aria-current');});
 if(active&&next!==active&&performance.now()<audibleUntil)sound.play('tick');active=next;
}
function requestPaint(){if(!frame)frame=requestAnimationFrame(paint);}
reader.addEventListener('scroll',requestPaint,{passive:true});
reader.addEventListener('wheel',()=>{navigationTarget=null;audibleUntil=performance.now()+1200;},{passive:true});
reader.addEventListener('touchstart',()=>{navigationTarget=null;audibleUntil=performance.now()+1800;},{passive:true});
reader.addEventListener('touchmove',()=>{audibleUntil=performance.now()+1800;},{passive:true});
reader.addEventListener('touchend',()=>{audibleUntil=performance.now()+1800;},{passive:true});
document.addEventListener('pointerdown',event=>{keyboardMode=false;navigationTarget=null;if(event.target.closest('a,button,input'))audibleUntil=0;else audibleUntil=performance.now()+1800;},{capture:true});
reader.addEventListener('scrollend',()=>{navigationTarget=null;});
function centreEntry(entry,animate=true){if(!entry)return;const r=entry.getBoundingClientRect(),bounds=reader.getBoundingClientRect();reader.scrollTo({top:reader.scrollTop+r.top-bounds.top+r.height/2-bounds.height/2,behavior:animate&&!reduced.matches?'smooth':'instant'});}
document.addEventListener('keydown',event=>{
 keyboardMode=true;
 if(event.metaKey||event.ctrlKey||event.altKey)return;
 if(event.key==='Escape'&&!panel.hidden){event.preventDefault();closeSearch();return;}
 if(event.target.matches('input'))return;
 if(event.key==='/'){event.preventDefault();openSearch();return;}
 if(!panel.hidden||!visible.length)return;
 if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key)){
  if(event.key===' '&&event.target.closest('button,a'))return;
  event.preventDefault();audibleUntil=performance.now()+1400;
  const current=navigationTarget??Math.max(0,visible.indexOf(active));let index=current;
  if(event.key==='Home')index=0;else if(event.key==='End')index=visible.length-1;else index=current+((['ArrowDown','PageDown'].includes(event.key)||(event.key===' '&&!event.shiftKey))?1:-1);
  navigationTarget=Math.max(0,Math.min(visible.length-1,index));centreEntry(visible[navigationTarget]);
 }else audibleUntil=0;
});
reader.addEventListener('focusin',event=>{const entry=event.target.closest('.reading-entry');if(keyboardMode&&entry){audibleUntil=0;centreEntry(entry);}});
function openSearch(){audibleUntil=0;navigationTarget=null;panel.hidden=false;$('#search-toggle').setAttribute('aria-expanded','true');input.focus();}
function closeSearch(restoreFocus=true){panel.hidden=true;$('#search-toggle').setAttribute('aria-expanded','false');if(restoreFocus)$('#search-toggle').focus();}
$('#search-toggle').addEventListener('click',()=>panel.hidden?openSearch():closeSearch());
$('.close-search').addEventListener('click',event=>{event.preventDefault();closeSearch();});
$('#search-form').addEventListener('submit',event=>{event.preventDefault();closeSearch();visible[0]?.querySelector('a').focus();});
document.addEventListener('pointerdown',event=>{if(!panel.hidden&&!event.target.closest('#search-panel,#search-toggle'))closeSearch(false);},{capture:true});
function filter(){audibleUntil=0;active=null;entries.forEach(entry=>{entry.hidden=!matchesSearch(entry.dataset.search,input.value);});visible=entries.filter(entry=>!entry.hidden);reader.scrollTo({top:0,behavior:'instant'});$('#empty-result').hidden=visible.length>0;$('#search-status').textContent=visible.length?`${visible.length} matching ${visible.length===1?'source':'sources'}`:'No matching articles';$('#search-toggle').classList.toggle('has-query',Boolean(input.value));requestPaint();}
input.addEventListener('input',filter);$('#clear-search').addEventListener('click',()=>{input.value='';filter();});
addEventListener('resize',()=>{audibleUntil=0;requestPaint();});reduced.addEventListener('change',()=>{audibleUntil=0;requestPaint();});
document.addEventListener('visibilitychange',()=>{audibleUntil=0;if(document.hidden){cancelAnimationFrame(frame);frame=0;}else requestPaint();});
addEventListener('pagehide',()=>{cancelAnimationFrame(frame);frame=0;});addEventListener('pageshow',requestPaint);requestPaint();
