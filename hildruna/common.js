const LANGS=['fr','de','en','es','hi','in','it','pt','ru','ur','zh','ja'];
const NAMES={fr:'Français',de:'Deutsch',en:'English',es:'Español',hi:'हिन्दी',in:'Bahasa Indonesia',it:'Italiano',pt:'Português',ru:'Русский',ur:'اردو',zh:'中文',ja:'日本語'};
const COMMON={
fr:{home:'Accueil',privacy:'Politique de confidentialité',terms:'Conditions générales',copyright:'© 2026 · Forgé dans la rage et le sang'},
de:{home:'Startseite',privacy:'Datenschutzrichtlinie',terms:'Allgemeine Bedingungen',copyright:'© 2026 · In Wut und Blut geschmiedet'},
en:{home:'Home',privacy:'Privacy policy',terms:'Terms and conditions',copyright:'© 2026 · Forged in rage and blood'},
es:{home:'Inicio',privacy:'Política de privacidad',terms:'Términos y condiciones',copyright:'© 2026 · Forjada en la ira y la sangre'},
hi:{home:'मुखपृष्ठ',privacy:'गोपनीयता नीति',terms:'नियम और शर्तें',copyright:'© 2026 · क्रोध और रक्त में गढ़ा गया'},
in:{home:'Beranda',privacy:'Kebijakan privasi',terms:'Syarat dan ketentuan',copyright:'© 2026 · Ditempa dalam amarah dan darah'},
it:{home:'Home',privacy:'Informativa sulla privacy',terms:'Termini e condizioni',copyright:'© 2026 · Forgiata nella rabbia e nel sangue'},
pt:{home:'Início',privacy:'Política de privacidade',terms:'Termos e condições',copyright:'© 2026 · Forjada na fúria e no sangue'},
ru:{home:'Главная',privacy:'Политика конфиденциальности',terms:'Условия использования',copyright:'© 2026 · Выковано в ярости и крови'},
ur:{home:'مرکزی صفحہ',privacy:'رازداری کی پالیسی',terms:'شرائط و ضوابط',copyright:'© 2026 · غضب اور خون میں ڈھالا گیا'},
zh:{home:'首页',privacy:'隐私政策',terms:'条款与条件',copyright:'© 2026 · 锻造于愤怒与鲜血'},
ja:{home:'ホーム',privacy:'プライバシーポリシー',terms:'利用規約',copyright:'© 2026 · 怒りと血で鍛えられた'}
};
const RUNES='ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ', reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
function decode(el,text){if(reduce){el.textContent=text;return}el.textContent='';[...text].forEach((ch,i)=>{const s=document.createElement('span');s.className='rune-char settling';s.textContent=/\s/.test(ch)?ch:RUNES[Math.floor(Math.random()*RUNES.length)];el.append(s);setTimeout(()=>{s.textContent=ch;s.classList.remove('settling')},16*i+100)})}
function setLang(lang){if(!LANGS.includes(lang))lang='en';localStorage.setItem('hildrunaLang',lang);document.documentElement.lang=lang;document.documentElement.dir=lang==='ur'?'rtl':'ltr';const d=Object.assign({},COMMON[lang],(window.PAGE_TRANSLATIONS||{})[lang]||{});document.querySelectorAll('[data-i18n]').forEach(el=>{const v=d[el.dataset.i18n];if(v)decode(el,v)});document.querySelector('#langMenu')?.classList.remove('open')}
document.addEventListener('DOMContentLoaded',()=>{const menu=document.querySelector('#langMenu');LANGS.forEach(code=>{const b=document.createElement('button');b.textContent=NAMES[code];b.onclick=()=>setLang(code);menu.append(b)});document.querySelector('#langBtn').onclick=()=>menu.classList.toggle('open');document.addEventListener('click',e=>{if(!e.target.closest('.lang'))menu.classList.remove('open')});const raw=(navigator.language||'en').toLowerCase(), auto=raw.startsWith('id')?'in':raw.slice(0,2);setLang(localStorage.getItem('hildrunaLang')||auto);const p=document.querySelector('#particles'),r=document.querySelector('.runes');for(let i=0;i<32;i++){const s=document.createElement('i');s.className='spark';s.style.left=Math.random()*100+'%';s.style.animationDuration=5+Math.random()*8+'s';s.style.animationDelay=-Math.random()*12+'s';s.style.setProperty('--x',(Math.random()*90-45)+'px');p.append(s)}for(let i=0;i<14;i++){const x=document.createElement('i');x.className='rune';x.textContent=RUNES[Math.floor(Math.random()*RUNES.length)];x.style.left=Math.random()*100+'%';x.style.animationDelay=-Math.random()*12+'s';x.style.animationDuration=9+Math.random()*10+'s';r.append(x)}});
