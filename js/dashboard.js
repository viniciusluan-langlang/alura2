// dashboard.js - controla o menu, painel e interações
document.addEventListener('DOMContentLoaded',()=>{
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const panels = document.querySelectorAll('.panel');
  const itemsPanel = document.getElementById('items');

  // Toggle sidebar on small screens
  menuToggle.addEventListener('click', ()=>{
    sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
  });

  // Menu navigation (show/hide panels)
  document.querySelectorAll('.menu-item').forEach(mi=>{
    mi.addEventListener('click', ()=>{
      const id = mi.dataset.id;
      panels.forEach(p=> p.style.display = (p.id === id) ? 'block' : 'none');
      if(window.innerWidth < 900) sidebar.style.display = 'none';
    });
  });

  // Initialize panels visibility
  panels.forEach(p=> p.style.display = (p.id === 'controls') ? 'block' : 'none');

  // Controls
  const toggleAnim = document.getElementById('toggle-anim');
  const bgColor = document.getElementById('bg-color');
  const btnClear = document.getElementById('btn-clear');

  toggleAnim.addEventListener('change', ()=>{
    window.toggleAnimation(toggleAnim.checked);
  });

  bgColor.addEventListener('input', ()=>{
    window.setBgColor(bgColor.value);
  });

  btnClear.addEventListener('click', ()=>{
    window.clearCanvas();
  });

  // Items list (simple add/remove)
  const itemForm = document.getElementById('item-form');
  const itemText = document.getElementById('item-text');
  const itemList = document.getElementById('item-list');

  itemForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const v = itemText.value.trim();
    if(!v) return;
    const li = document.createElement('li');
    li.textContent = v;
    const btn = document.createElement('button');
    btn.textContent = 'Remover';
    btn.addEventListener('click', ()=> li.remove());
    li.appendChild(btn);
    itemList.appendChild(li);
    itemText.value = '';
  });

  // Accessibility: simple keyboard navigation
  document.addEventListener('keyup', (e)=>{
    if(e.key === 'Escape'){
      sidebar.style.display = 'none';
    }
  });

  // Ensure canvas resizes to container on load
  setTimeout(()=>{
    if(typeof windowResized === 'function') windowResized();
  }, 50);
});
