/**
 * MenuCraft Pro — Menu Viewer
 */

let MENU = null;
let CART = [];
let curView = 'home';
let curCat  = null;

function initMenu() {
  const params = new URLSearchParams(location.search);
  const slug   = params.get('slug') || params.get('id');

  // Animate loading bar
  const lbar = document.getElementById('lbar');
  if (lbar) { lbar.style.width = '70%'; setTimeout(() => lbar.style.width = '100%', 300); }

  if (!slug) { showError('لم يتم تحديد منيو.'); return; }

  MENU = DB.bySlug(slug);
  if (!MENU) { showError('المنيو غير موجود أو تم حذفه.'); return; }

  setTimeout(() => {
    document.title = `${MENU.name} — MenuCraft Pro`;
    applyTheme();
    buildHome();
  }, 600);
}

function applyTheme() {
  document.documentElement.style.setProperty('--accent', MENU.color || '#1B7040');
  document.documentElement.style.setProperty('--accent-dk', MENU.colorDk || '#0F4424');
  if (MENU.style === 2) document.body.classList.add('theme-light');
}

function buildHome() {
  const col = MENU.color || '#1B7040';
  const cd  = MENU.colorDk || '#0F4424';
  const cats = MENU.categories || MENU.cats || [];
  const items = MENU.items || [];
  const catBgs = ['#1a3a28','#1a3020','#2e1c08','#2a2200','#131a2a','#2a1318','#1a1a2e','#1a2a0a'];

  document.getElementById('menu-root').innerHTML = `
    <div class="menu-wrap">
      ${buildTopbar(col)}
      <div class="menu-hero" style="background:${cd}">
        <div class="menu-hero-bg"></div>
        <div class="menu-hero-inner">
          <div>
            <div class="menu-hero-badge">SPECIAL OFFERS</div>
            <div class="menu-hero-title">${(MENU.name||'').toUpperCase()}</div>
            <div class="menu-hero-sub">${MENU.desc || 'أشهى الأطباق بأفضل الأسعار'}</div>
          </div>
          <div class="menu-hero-orb">${MENU.ico || '🍽️'}</div>
        </div>
      </div>
      <div class="menu-sec-hdr">
        <span class="menu-sec-title">القائمة</span>
        <span class="menu-sec-count" style="color:${col}">${cats.length} أصناف</span>
      </div>
      <div class="cats-grid">
        ${cats.map((cat, i) => {
          const count = items.filter(it => it.catId === cat.id).length;
          return `<div class="cat-card fade-up" style="animation-delay:${i*.07}s" onclick="openCat('${cat.id}')">
            <div class="cat-card-top" style="background:${catBgs[i%catBgs.length]}">
              <div class="cat-card-texture"></div>
              <div class="cat-card-ico" style="background:${col}20;border-color:${col}30">${cat.ico||'🍽️'}</div>
            </div>
            <div class="cat-card-bot">
              <div class="cat-card-name">${cat.name}</div>
              <div class="cat-card-count">${count} أطباق</div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;

  curView = 'home'; curCat = null;
  updateCartBadge();
}

function buildTopbar(col) {
  return `
    <div class="menu-topbar">
      <div class="menu-ibtn" onclick="history.back()"><i class="ti ti-arrow-right"></i></div>
      <div style="text-align:center;flex:1">
        <div class="menu-brand">${(MENU.name||'').toUpperCase()}</div>
        <div class="menu-sub" style="color:${col}">${(MENU.sub||'').toUpperCase()}</div>
      </div>
      <div style="position:relative">
        <div class="menu-ibtn" onclick="openCart()"><i class="ti ti-shopping-cart"></i>
          <div class="cart-count-badge" id="cart-badge" style="display:none">0</div>
        </div>
      </div>
    </div>`;
}

function openCat(catId) {
  curCat = catId;
  const cat   = (MENU.cats || MENU.categories || []).find(c => c.id === catId);
  const items = (MENU.items || []).filter(it => it.catId === catId);
  const imgs  = DB.mImgs(MENU.id);
  const col   = MENU.color || '#1B7040';
  const cd    = MENU.colorDk || '#0F4424';
  const cur   = MENU.currency || 'ر.س';

  document.getElementById('menu-root').innerHTML = `
    <div class="menu-wrap">
      <div class="items-topbar">
        <div class="items-back" onclick="buildHome()"><i class="ti ti-arrow-right"></i></div>
        <div style="flex:1">
          <div class="items-cat-name">${cat?.name || ''}</div>
          <div class="items-cat-sub">${items.length} أطباق</div>
        </div>
        <div style="position:relative">
          <div class="menu-ibtn" onclick="openCart()"><i class="ti ti-shopping-cart"></i>
            <div class="cart-count-badge" id="cart-badge" style="${cartCount()?'':'display:none'}">${cartCount()}</div>
          </div>
        </div>
      </div>
      <div style="padding-top:10px;padding-bottom:60px">
        ${items.length ? items.map((it, i) => buildItemRow(it, cat, imgs, col, cd, cur, i)).join('')
          : '<div class="empty-state" style="padding:40px"><i class="ti ti-bowl-chopsticks"></i><p>لا توجد أطباق في هذه الفئة</p></div>'}
      </div>
    </div>`;

  curView = 'items';
  updateCartBadge();
}

function buildItemRow(item, cat, imgs, col, cd, cur, idx) {
  // Try to find matching image
  let imgSrc = null;
  if (item.imgKey) imgSrc = imgs[item.imgKey] || imgs[item.imgKey.toLowerCase()];
  if (!imgSrc) {
    const kn = (item.name || '').toLowerCase().replace(/\s+/g,'-').replace(/[^\w-]/g,'');
    imgSrc = imgs[kn] || null;
    if (!imgSrc) {
      const keys = Object.keys(imgs);
      const m = keys.find(k => kn && (k.includes(kn.slice(0,5)) || kn.includes(k.slice(0,5))));
      if (m) imgSrc = imgs[m];
    }
  }
  const thumbHtml = imgSrc
    ? `<img src="${imgSrc}" alt="${item.name}" onerror="this.parentElement.innerHTML='${cat?.ico||'🍽️'}'">` 
    : (cat?.ico || '🍽️');

  return `
    <div class="item-row fade-up" style="animation-delay:${idx*.06}s">
      <div class="item-thumb" style="background:${cd}">${thumbHtml}</div>
      <div class="item-body">
        ${item.tag ? `<div class="item-tag" style="background:${col}18;color:${col}">${item.tag}</div>` : '<div style="height:4px"></div>'}
        <div class="item-name">${item.name || ''}</div>
        ${item.desc ? `<div class="item-desc">${item.desc}</div>` : ''}
        <div class="item-foot">
          <div style="display:flex;align-items:baseline;gap:4px">
            <span class="item-price" style="color:${col}">${item.price} ${cur}</span>
            ${item.oldPrice ? `<span class="item-old">${item.oldPrice}</span>` : ''}
          </div>
          <button class="item-add" style="background:${col}" onclick="addToCart('${item.id}',this)" aria-label="إضافة ${item.name} للسلة">
            <i class="ti ti-plus"></i>
          </button>
        </div>
      </div>
    </div>`;
}

// ── CART ──
function cartCount() { return CART.reduce((s, c) => s + c.qty, 0); }

function addToCart(id, btn) {
  const item = (MENU.items || []).find(it => it.id === id); if (!item) return;
  const ex = CART.find(c => c.id === id);
  if (ex) ex.qty++; else CART.push({ id, name: item.name, price: parseFloat(item.price) || 0, qty: 1 });
  btn.innerHTML = '<i class="ti ti-check"></i>'; btn.style.transform = 'scale(.8)';
  setTimeout(() => { btn.innerHTML = '<i class="ti ti-plus"></i>'; btn.style.transform = ''; }, 700);
  updateCartBadge();
  showToast('أُضيف للسلة 🛒');
}

function updateCartBadge() {
  const n = cartCount();
  document.querySelectorAll('#cart-badge, .cart-count-badge').forEach(el => {
    el.style.display = n ? 'flex' : 'none'; el.textContent = n;
  });
}

function openCart() {
  if (!CART.length) { showToast('السلة فارغة'); return; }
  renderCartDrawer();
  document.getElementById('cart-overlay').style.display = 'block';
  document.getElementById('cart-drawer').style.display = 'flex';
}

function closeCart() {
  document.getElementById('cart-overlay').style.display = 'none';
  document.getElementById('cart-drawer').style.display = 'none';
}

function renderCartDrawer() {
  const col  = MENU.color || '#1B7040';
  const cur  = MENU.currency || 'ر.س';
  const total = CART.reduce((s, c) => s + c.price * c.qty, 0);

  document.getElementById('cart-items').innerHTML = CART.length
    ? CART.map((c, i) => `
        <div class="cd-row">
          <div class="cd-name">${c.name}</div>
          <div class="cd-qty-wrap">
            <button class="cd-qty-btn" style="background:var(--bg5)" onclick="changeQty(${i},-1)">−</button>
            <span class="cd-qty">${c.qty}</span>
            <button class="cd-qty-btn" style="background:${col}" onclick="changeQty(${i},1)">+</button>
          </div>
          <span class="cd-price" style="color:${col}">${Math.round(c.price * c.qty)} ${cur}</span>
        </div>`).join('')
    : '<div class="empty-state"><i class="ti ti-shopping-cart-off"></i><p>السلة فارغة</p></div>';

  document.getElementById('cart-total-price').textContent = `${Math.round(total)} ${cur}`;
  document.getElementById('cart-total-price').style.color = col;
  document.getElementById('cart-footer').style.display = CART.length ? 'block' : 'none';
  document.getElementById('order-btn').style.background = col;
}

function changeQty(i, d) {
  CART[i].qty += d;
  if (CART[i].qty <= 0) CART.splice(i, 1);
  updateCartBadge();
  if (!CART.length) closeCart();
  else renderCartDrawer();
}

function placeOrder() {
  CART = []; updateCartBadge(); closeCart();
  showToast('🎉 تم إرسال طلبك بنجاح!');
}

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast-msg');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._to); t._to = setTimeout(() => t.classList.remove('show'), 2200);
}

// ── ERROR ──
function showError(msg) {
  document.getElementById('menu-root').innerHTML = `
    <div class="not-found">
      <div>
        <i class="ti ti-mood-sad" aria-hidden="true"></i>
        <h2>${msg}</h2>
        <p>تأكد من صحة الرابط أو ابحث عن المنيو مجدداً</p>
        <a href="index.html" class="btn-hero-primary">← العودة للرئيسية</a>
      </div>
    </div>`;
}

document.addEventListener('DOMContentLoaded', initMenu);
