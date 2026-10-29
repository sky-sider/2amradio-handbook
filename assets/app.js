(()=>{'use strict';
const $=id=>document.getElementById(id);
const sidebar=$('sidebar'),veil=$('veil'),menu=$('menuToggle'),close=$('closeMenu'),search=$('siteSearch'),results=$('searchResults'),toggle=$('themeToggle');
let isOpen=false;
function openMenu(next){isOpen=next;sidebar?.classList.toggle('open',next);veil?.classList.toggle('show',next);menu?.setAttribute('aria-expanded',String(next));document.body.style.overflow=next?'hidden':'';if(next)search?.focus();}
menu?.addEventListener('click',()=>openMenu(!isOpen));close?.addEventListener('click',()=>openMenu(false));veil?.addEventListener('click',()=>openMenu(false));document.addEventListener('keydown',e=>{if(e.key==='Escape'){openMenu(false);if(search){search.value='';filter('');}}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(matchMedia('(max-width:820px)').matches)openMenu(true);search?.focus();}});
const key='radio_2am_devdocs_theme';let value='dark';try{value=localStorage.getItem(key)||'dark';}catch(e){}document.body.dataset.theme=value;
toggle?.addEventListener('click',()=>{const v=document.body.dataset.theme==='light'?'dark':'light';document.body.dataset.theme=v;try{localStorage.setItem(key,v)}catch(e){}});
const current=document.body.dataset.page;document.querySelector(`[data-nav="${current}"]`)?.classList.add('active');
const data=window.__HANDBOOK_SEARCH__||[];
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function normalize(s){return String(s).toLocaleLowerCase('ja-JP').replace(/\s+/g,' ').trim()}
function filter(q){q=normalize(q);if(!q){results.classList.remove('open');results.innerHTML='';document.querySelector('.sidebar nav').hidden=false;return;}const words=q.split(' ').filter(Boolean);let matches=data.map(d=>{const whole=normalize(d.title+' '+d.summary+' '+d.text),score=words.reduce((v,t)=>v+(d.title.toLowerCase().includes(t)?16:0)+(d.summary.toLowerCase().includes(t)?5:0)+(whole.includes(t)?1:0),0);return {...d,score};}).filter(d=>d.score>0&&words.every(w=>normalize(d.title+' '+d.summary+' '+d.text).includes(w))).sort((a,b)=>b.score-a.score).slice(0,22);
results.classList.add('open');document.querySelector('.sidebar nav').hidden=true;results.innerHTML=`<div class="search-summary">検索結果：${matches.length}件${matches.length===22?'以上':''}</div>`+matches.map(d=>{let pos=d.text.toLowerCase().indexOf(words[0]);let start=Math.max(0,pos-45);return `<a href="${escapeHtml(d.url)}"><strong>${escapeHtml(d.title)}</strong><small>${escapeHtml((start?'…':'')+d.text.slice(start,start+135).trim())}…</small></a>`;}).join('')+(matches.length?'':'<p class="search-summary">一致するページがありません。別の語で検索してください。</p>');}
search?.addEventListener('input',e=>filter(e.target.value));
})();
