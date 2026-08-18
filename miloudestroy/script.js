const products=[...document.querySelectorAll('.product')];
const filterButtons=[...document.querySelectorAll('[data-filter]')];
let cart=0;

function showToast(message){
  const toast=document.getElementById('toast');
  toast.textContent=message;toast.classList.add('visible');
  clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>toast.classList.remove('visible'),2200);
}
function filterProducts(type){
  products.forEach(p=>p.hidden=type!=='all'&&p.dataset.type!==type);
  filterButtons.forEach(b=>b.classList.toggle('active',b.dataset.filter===type));
}
filterButtons.forEach(button=>button.addEventListener('click',()=>filterProducts(button.dataset.filter)));
document.querySelectorAll('[data-filter-link]').forEach(link=>link.addEventListener('click',()=>filterProducts(link.dataset.filterLink)));
document.querySelectorAll('.add').forEach(button=>button.addEventListener('click',()=>{cart++;document.getElementById('cart-count').textContent=cart;showToast('Hop ! La création a rejoint ton panier ✨')}));
document.getElementById('newsletter').addEventListener('submit',event=>{event.preventDefault();event.target.reset();showToast('Bienvenue dans l’équipage ! 🐙')});
