// dashboard.js - improved UX: keyboard navigation, active menu state, sidebar toggle, debounce resize
document.addEventListener('DOMContentLoaded',()=>{
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const panels = Array.from(document.querySelectorAll('.panel'));
  const menuButtons = Array.from(document.querySelectorAll('.menu-item'));
  const itemsPanel = document.getElementById('items');

  // Utility: show a panel and hide others
  function showPanel(id){
    panels.forEach(p=>{
      const shouldShow = p.id === id;
      if(shouldShow){
        p.removeAttribute('hidden');
        p.style.display = '';
        p.setAttribute('tabindex','0');
      } else {
        p.setAttribute('hidden','');
        p.style.display = '';
      }
    });

    // Update menu aria-current
    menuButtons.forEach(b=>{
      const isActive = b.dataset.id === id;
      b.setAttribute('aria-current', isActive ? 'true' : 'false');
    });

    // persist last open panel
    try{ localStorage.setItem('alura2:lastPanel', id); }catch(e){}
  }

  // Toggle sidebar on small screens
  function setSidebar(open){
    const isOpen = !!open;
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if(isOpen){
      sidebar.classList.remove('closed');
      // move focus to first menu item for keyboard users
      const first = sidebar.querySelector('.menu-item');
      if(first) first.focus();
    } else {
      sidebar.classList.add('closed');
    }
  }

  menuToggle.addEventListener('click', ()=>{
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    setSidebar(!expanded);
  });

  // Menu navigation (keyboard + click)
  menuButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.id;
      showPanel(id);
      // close sidebar on small screens
      if(window.innerWidth < 900) setSidebar(false);
    });

    btn.addEventListener('keydown',(e)=>{
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        btn.click();
      }
      // simple up/down navigation
      if(e.key === 'ArrowDown' || e.key === 'ArrowUp'){
        e.preventDefault();
        const idx = menuButtons.indexOf(btn);
        const next = e.key === 'ArrowDown' ? (idx+1)%menuButtons.length : (idx-1+menuButtons.length)%menuButtons.length;
        menuButtons[next].focus();
      }
    });
  });

  // Initialize panels: show last selected or dashboard
  const last = (function(){ try{ return localStorage.getItem('alura2:lastPanel'); }catch(e){return null;} })();
  const initial = last || 'dashboard';
  showPanel(initial);

  // Controls
  const toggleAnim = document.getElementById('toggle-anim');
  const bgColor = document.getElementById('bg-color');
  const btnClear = document.getElementById('btn-clear');

  toggleAnim.addEventListener('change', ()=>{
    window.toggleAnimation(toggleAnim.checked);
    try{ localStorage.setItem('alura2:anim', toggleAnim.checked ? '1' : '0'); }catch(e){}
  });

  bgColor.addEventListener('input', ()=>{
    window.setBgColor(bgColor.value);
    try{ localStorage.setItem('alura2:bg', bgColor.value); }catch(e){}
  });

  btnClear.addEventListener('click', ()=>{
    window.clearCanvas();
  });

  // Items list (simple add/remove) with accessible remove buttons
  const itemForm = document.getElementById('item-form');
  const itemText = document.getElementById('item-text');
  const itemList = document.getElementById('item-list');

  function renderSavedItems(){
    try{
      const raw = localStorage.getItem('alura2:items');
      if(!raw) return;
      const list = JSON.parse(raw);
      list.forEach(v=> addItemToDom(v));
    }catch(e){}
  }

  function persistItems(){
    try{
      const values = Array.from(itemList.querySelectorAll('li')).map(li=> li.firstChild.textContent);
      localStorage.setItem('alura2:items', JSON.stringify(values));
    }catch(e){}
  }

  function addItemToDom(value){
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = value;
    const btn = document.createElement('button');
    btn.textContent = 'Remover';
    btn.setAttribute('aria-label', `Remover ${value}`);
    btn.addEventListener('click', ()=>{ li.remove(); persistItems(); });
    li.appendChild(span);
    li.appendChild(btn);
    itemList.appendChild(li);
  }

  itemForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const v = itemText.value.trim();
    if(!v) return;
    addItemToDom(v);
    persistItems();
    itemText.value = '';
    itemText.focus();
  });

  // Accessibility: Escape closes sidebar and focuses toggle
  document.addEventListener('keyup', (e)=>{
    if(e.key === 'Escape'){
      setSidebar(false);
      menuToggle.focus();
    }
  });

  // Ensure canvas resizes to container on load, with debounce
  const resizeDebounce = (fn, wait=150)=>{
    let t;
    return ()=>{ clearTimeout(t); t = setTimeout(fn, wait); };
  };

  const onResize = resizeDebounce(()=>{
    if(typeof windowResized === 'function') windowResized();
  }, 120);

  window.addEventListener('resize', onResize);

  // Restore settings
  try{
    const savedBg = localStorage.getItem('alura2:bg');
    if(savedBg){ bgColor.value = savedBg; window.setBgColor(savedBg); }
    const savedAnim = localStorage.getItem('alura2:anim');
    if(savedAnim === '1'){ toggleAnim.checked = true; window.toggleAnimation(true); }
  }catch(e){}

  renderSavedItems();

  // Open/close sidebar initial state on small screens
  if(window.innerWidth < 900) setSidebar(false);
});
