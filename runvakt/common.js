const RUNES='ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ';
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
document.addEventListener('DOMContentLoaded',()=>{
  if(reduce)return;
  const particles=document.querySelector('#particles');
  const runes=document.querySelector('.floating-runes');
  for(let i=0;i<34;i++){
    const spark=document.createElement('i');
    spark.className='spark';spark.style.left=Math.random()*100+'%';
    spark.style.animationDuration=5+Math.random()*8+'s';
    spark.style.animationDelay=-Math.random()*12+'s';
    spark.style.setProperty('--x',(Math.random()*90-45)+'px');particles.append(spark);
  }
  for(let i=0;i<15;i++){
    const rune=document.createElement('i');rune.className='rune';
    rune.textContent=RUNES[Math.floor(Math.random()*RUNES.length)];
    rune.style.left=Math.random()*100+'%';rune.style.animationDelay=-Math.random()*12+'s';
    rune.style.animationDuration=9+Math.random()*10+'s';runes.append(rune);
  }
});
