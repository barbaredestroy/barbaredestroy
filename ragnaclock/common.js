(function(){
  var translations=window.pageTranslations||{};
  var rtl=['ur'];
  var langButton=document.getElementById('langBtn');
  var langMenu=document.getElementById('langMenu');
  var RUNES='áš áš¢áš¦áš¨áš±áš²áš·áš¹ášºáš¾á›á›ƒá›‡á›ˆá›‰á›Šá›á›’á›–á›—á›šá›œá›žá›Ÿ';
  var reduceMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var animationRun=0;
  var runeStyle=document.createElement('style');
  runeStyle.textContent='.rune-char{display:inline}.rune-char.settling{color:var(--c);text-shadow:0 0 10px rgba(47,255,234,.72);transition:color 1s ease,text-shadow 1s ease}';
  document.head.appendChild(runeStyle);

  function randomRune(){return RUNES[Math.floor(Math.random()*RUNES.length)];}

  function decodeText(element,text,delay,run){if(text!==undefined)element.textContent=text;}

  function setLanguage(lang){
    var dictionary=translations[lang]||translations.fr;if(!dictionary)return;
    animationRun++;var run=animationRun;
    document.documentElement.lang=lang;
    document.documentElement.dir=rtl.includes(lang)?'rtl':'ltr';
    var targets=Array.from(document.querySelectorAll('h1:not([data-i18n]),[data-i18n],footer small'));
    targets.forEach(function(element,index){
      var key=element.dataset.i18n;
      var text=key&&dictionary[key]!==undefined?dictionary[key]:element.textContent;
      decodeText(element,text,index*180,run);
    });
    try{localStorage.setItem('ragnaLang',lang)}catch(error){}
  }

  if(langButton&&langMenu){
    langButton.onclick=function(event){event.stopPropagation();langMenu.classList.toggle('open');};
    document.onclick=function(){langMenu.classList.remove('open');};
    langMenu.querySelectorAll('button').forEach(function(button){button.onclick=function(){setLanguage(button.dataset.lang);};});
  }

  var language='fr';
  try{language=localStorage.getItem('ragnaLang')||(navigator.language||'fr').slice(0,2);if(language==='id')language='in';}catch(error){}
  setLanguage(translations[language]?language:'fr');

  var particles=document.getElementById('particles');
  if(particles){
    for(var i=0;i<26;i++){
      var spark=document.createElement('div');spark.className='spark';
      var size=2+Math.random()*2.5;
      spark.style.left=Math.random()*100+'vw';spark.style.width=size+'px';spark.style.height=size+'px';
      spark.style.setProperty('--drift',(Math.random()*80-40)+'px');
      spark.style.animationDuration=6+Math.random()*6+'s';spark.style.animationDelay=Math.random()*10+'s';
      particles.appendChild(spark);
    }
  }
})();