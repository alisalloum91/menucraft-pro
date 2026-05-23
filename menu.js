/**
 * MenuCraft Pro — Menu Viewer JS (Responsive + Popular + Reviews)
 */

// ── CONSTANTS ──
const CATS_BG = ['#1a3a28','#1a3020','#2e1c08','#2a2200','#131a2a','#2a1318','#1a1a2e','#1a2a0a'];
const AVATAR_COLORS = ['#c9a84c','#1B7040','#2980b9','#8e44ad','#e74c3c','#16a085','#e67e22','#e91e8c'];

// ── STATE ──
let MENU = null;
let ACCENT = '#c9a84c';
let CART = [];
let revStars = 5;
let curCat = null;

// ── STORAGE KEY FOR REVIEWS ──
function revKey(slug) { return `mc_reviews_${slug}`; }
function loadReviews(slug) { try { return JSON.parse(localStorage.getItem(revKey(slug)) || '[]'); } catch { return []; } }
function saveReviews(slug, arr) { localStorage.setItem(revKey(slug), JSON.stringify(arr)); }

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const slug = params.get('slug') || params.get('id');

  // loading animation
  let prog = 0;
  const fill = document.getElementById('lbar');
  if (fill) { fill.style.width = '70%'; setTimeout(() => fill && (fill.style.width = '100%'), 300); }

  if (!slug) { showError('لم يتم تحديد منيو.'); return; }

  MENU = DB.bySlug(slug);
  if (!MENU) { showError('المنيو غير موجود أو تم حذفه.'); return; }

  setTimeout(() => init(), 500);
});

function init() {
  document.title = `${MENU.name} — MenuCraft Pro`;
  ACCENT = MENU.color || '#c9a84c';
  document.documentElement.style.setProperty('--accent', ACCENT);

  drawBg();
  updateBannerInfo();
  renderPopular();
  renderCats();

  // load persisted reviews
  const saved = loadReviews(MENU.slug);
  MENU._reviews = saved;
  renderReviews();
  updateBannerRating();

  // stars color
  document.querySelectorAll('.rfc-star').forEach((s, i) => { s.style.color = i < revStars ? ACCENT : 'var(--bg4)'; });

  window.addEventListener('resize', drawBg);
}

// ── BANNER BACKGROUND (canvas) ──
function drawBg() {
  const cv = document.getElementById('bg-canvas');
  if (!cv) return;
  cv.width  = cv.offsetWidth  || 800;
  cv.height = cv.offsetHeight || 400;
  const cx = cv.getContext('2d');

  // base gradient
  const g = cx.createLinearGradient(0, 0, cv.width, cv.height);
  g.addColorStop(0, '#1a0e05'); g.addColorStop(.5, '#0d0803'); g.addColorStop(1, '#050300');
  cx.fillStyle = g; cx.fillRect(0, 0, cv.width, cv.height);

  // subtle lines texture
  cx.globalAlpha = .055;
  for (let i = 0; i < 55; i++) {
    cx.strokeStyle = 'rgba(201,168,76,.25)'; cx.lineWidth = 1;
    cx.beginPath();
    cx.moveTo(i * cv.width / 55 + Math.random() * 18, 0);
    cx.lineTo(i * cv.width / 55 + Math.random() * 28, cv.height); cx.stroke();
  }
  cx.globalAlpha = 1;

  // accent light circles
  [[cv.width * .12, cv.height * .35, 110], [cv.width * .5, cv.height * .2, 140], [cv.width * .88, cv.height * .45, 120]].forEach(([x, y, r]) => {
    const rg = cx.createRadialGradient(x, y, 0, x, y, r);
    rg.addColorStop(0, ACCENT + '14'); rg.addColorStop(1, 'transparent');
    cx.fillStyle = rg; cx.beginPath(); cx.arc(x, y, r, 0, Math.PI * 2); cx.fill();
  });

  // faint initials watermark
  const initials = (MENU?.name || 'CT').split(' ').filter(Boolean).map(w => w[0]).join('').toUpperCase().slice(0, 2);
  cx.globalAlpha = .035; cx.font = `bold ${Math.round(cv.height * .58)}px serif`;
  cx.fillStyle = ACCENT; cx.textAlign = 'center';
  cx.fillText(initials, cv.width * .5, cv.height * .72); cx.globalAlpha = 1;
}

// ── BANNER INFO ──
function updateBannerInfo() {
  const name = MENU.name || "Chef's Table";
  const sub  = MENU.sub  || 'Fine Dining';
  const initials = name.split(' ').filter(Boolean).map(w => w[0]).join('').toUpperCase().slice(0, 2);

  const logoEl = document.getElementById('banner-logo');
  logoEl.textContent = initials;
  logoEl.style.color = ACCENT; logoEl.style.borderColor = ACCENT;
  document.getElementById('banner-fine').textContent = sub.toUpperCase();
  document.getElementById('banner-name').textContent = name.toUpperCase();
  document.getElementById('stat-dishes').textContent = (MENU.items || []).length;
}

function updateBannerRating() {
  const reviews = MENU._reviews || [];
  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.stars, 0) / reviews.length).toFixed(1) : '0.0';
  const starsEl = document.getElementById('banner-stars');
  starsEl.innerHTML = '★★★★★'.split('').map((s, i) =>
    `<span style="color:${i < Math.round(parseFloat(avg)) ? ACCENT : '#2a2a2a'};font-size:13px">${s}</span>`
  ).join('');
  document.getElementById('banner-rating').textContent = `${avg} (${reviews.length})`;
  document.getElementById('stat-rating').textContent = avg;
}

// ── POPULAR ──
function renderPopular() {
  const items = MENU.items || [];
  // sort by orders count (tag = 'الأكثر طلباً' gets boost, or use random orders if not set)
  const sorted = [...items].sort((a, b) => {
    const aScore = (a.tag === 'الأكثر طلباً' ? 1000 : 0) + (parseFloat(a.orders) || Math.random() * 200);
    const bScore = (b.tag === 'الأكثر طلباً' ? 1000 : 0) + (parseFloat(b.orders) || Math.random() * 200);
    return bScore - aScore;
  }).slice(0, 8);

  const cats = MENU.cats || MENU.categories || [];
  document.getElementById('popular-row').innerHTML = sorted.map(it => {
    const cat = cats.find(c => c.id === it.catId);
    const catIdx = cats.indexOf(cat);
    const catBg = catIdx >= 0 ? CATS_BG[catIdx % CATS_BG.length] : '#1a1a1a';
    return `<div class="pop-card" onclick="addToCart('${it.id}')">
      <div class="pop-img" style="background:${catBg}">
        <span>${cat?.ico || '🍽️'}</span>
        ${it.tag ? `<div class="pop-badge" style="background:${ACCENT};color:#1a0e00">${it.tag}</div>` : ''}
      </div>
      <div class="pop-body">
        <div class="pop-name">${it.name}</div>
        <div class="pop-prices">
          ${it.oldPrice ? `<span class="pop-old">${it.oldPrice}</span>` : ''}
          <span class="pop-price" style="color:${ACCENT}">${it.price} ${MENU.currency || 'ر.س'}</span>
        </div>
      </div>
    </div>`;
  }).join('');
}

// ── CATEGORIES ──
function renderCats() {
  const cats = MENU.cats || MENU.categories || [];
  const items = MENU.items || [];
  document.getElementById('cats-count').textContent = `${cats.length} صنف`;
  document.getElementById('cats-grid').innerHTML = cats.map((cat, i) => `
    <div class="cat-card" onclick="openCat('${cat.id}')">
      <div class="cat-top" style="background:${CATS_BG[i % CATS_BG.length]}">
        <div class="cat-tex"></div>
        <div class="cat-ico" style="background:${ACCENT}18;border-color:${ACCENT}30">${cat.ico || '🍽️'}</div>
      </div>
      <div class="cat-bot">
        <div class="cat-name">${cat.name}</div>
        <div class="cat-count">${items.filter(it => it.catId === cat.id).length} أطباق</div>
      </div>
    </div>`).join('');
}

// ── OPEN CATEGORY ──
function openCat(catId) {
  curCat = catId;
  const cats  = MENU.cats || MENU.categories || [];
  const items = MENU.items || [];
  const cat   = cats.find(c => c.id === catId);
  const catItems = items.filter(it => it.catId === catId);
  const catIdx   = cats.indexOf(cat);
  const cur      = MENU.currency || 'ر.س';

  document.getElementById('items-view-title').textContent = cat?.name || '';
  document.getElementById('items-view-sub').textContent   = `${catItems.length} أطباق`;

  document.getElementById('items-list').innerHTML = catItems.map(it => buildItemRow(it, cat, catIdx, cur)).join('');
  showItemsView();
}

function openAllItems() {
  curCat = null;
  const cats  = MENU.cats || MENU.categories || [];
  const items = [...(MENU.items || [])];
  const cur   = MENU.currency || 'ر.س';

  // sort popular first
  items.sort((a, b) => {
    const aS = a.tag === 'الأكثر طلباً' ? 1 : 0;
    const bS = b.tag === 'الأكثر طلباً' ? 1 : 0;
    return bS - aS;
  });

  document.getElementById('items-view-title').textContent = 'كل الأطباق';
  document.getElementById('items-view-sub').textContent   = `${items.length} طبق`;
  document.getElementById('items-list').innerHTML = items.map(it => {
    const cat    = cats.find(c => c.id === it.catId);
    const catIdx = cats.indexOf(cat);
    return buildItemRow(it, cat, catIdx, cur);
  }).join('');
  showItemsView();
}

function buildItemRow(it, cat, catIdx, cur) {
  const catBg = catIdx >= 0 ? CATS_BG[catIdx % CATS_BG.length] : '#1a1a1a';
  return `<div class="item-row">
    <div class="item-thumb" style="background:${catBg}">${cat?.ico || '🍽️'}</div>
    <div class="item-body">
      ${it.tag ? `<div class="item-tag" style="background:${ACCENT}18;color:${ACCENT}">${it.tag}</div>` : '<div style="height:4px"></div>'}
      <div class="item-name">${it.name}</div>
      ${it.desc ? `<div class="item-desc">${it.desc}</div>` : ''}
      <div class="item-foot">
        <div class="item-prices">
          ${it.oldPrice ? `<span class="item-old">${it.oldPrice}</span>` : ''}
          <span class="item-price" style="color:${ACCENT}">${it.price} ${cur}</span>
        </div>
        <button class="item-add" style="background:${ACCENT}" onclick="addToCart('${it.id}')" aria-label="إضافة ${it.name} للسلة">
          <i class="ti ti-plus" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>`;
}

function showItemsView() {
  document.getElementById('view-home').style.display  = 'none';
  document.getElementById('view-items').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showHome() {
  document.getElementById('view-home').style.display  = 'block';
  document.getElementById('view-items').style.display = 'none';
  curCat = null;
}

// ── REVIEWS ──
function renderReviews() {
  const reviews = MENU._reviews || [];
  const cur = MENU.currency || 'ر.س';
  if (!reviews.length) {
    document.getElementById('reviews-row').innerHTML =
      '<div class="empty-state" style="min-width:220px"><i class="ti ti-message-circle"></i><p>لا توجد تقييمات بعد — كن الأول!</p></div>';
    return;
  }
  document.getElementById('reviews-row').innerHTML = reviews.map((r, i) => `
    <div class="rev-card">
      <div class="rev-top">
        <div class="rev-avatar" style="background:${r.color}20;color:${r.color}">${r.name[0].toUpperCase()}</div>
        <div>
          <div class="rev-info-name">${r.name}</div>
          <div class="rev-info-date">${r.date}</div>
        </div>
      </div>
      <div class="rev-stars">${'★★★★★'.split('').map((s, j) =>
        `<span style="color:${j < r.stars ? ACCENT : '#2a2a2a'};font-size:14px">${s}</span>`
      ).join('')}</div>
      <div class="rev-text">${r.text}</div>
    </div>`).join('');
}

// ── REVIEW FORM ──
function setRevStar(n) {
  revStars = n;
  document.querySelectorAll('.rfc-star').forEach((s, i) => {
    s.classList.toggle('on', i < n);
    s.style.color = i < n ? ACCENT : 'var(--bg4)';
  });
}

function submitReview() {
  const name = document.getElementById('rf-name').value.trim();
  const text = document.getElementById('rf-text').value.trim();
  if (!name) { document.getElementById('rf-name').focus(); showToast('⚠️ أدخل اسمك أولاً'); return; }
  if (!text) { document.getElementById('rf-text').focus(); showToast('⚠️ اكتب تقييمك'); return; }

  const now = new Date();
  const review = {
    name, stars: revStars, text,
    date: `${now.toLocaleDateString('ar-SA')}`,
    color: AVATAR_COLORS[(MENU._reviews || []).length % AVATAR_COLORS.length],
  };

  MENU._reviews = [review, ...(MENU._reviews || [])];
  saveReviews(MENU.slug, MENU._reviews);

  document.getElementById('rf-name').value = '';
  document.getElementById('rf-text').value = '';
  setRevStar(5);
  renderReviews();
  updateBannerRating();
  showToast(`✅ شكراً ${name}! تم إضافة تقييمك`);
  document.getElementById('reviews-row').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── CART ──
function addToCart(id) {
  const items = MENU.items || [];
  const it = items.find(i => i.id === id); if (!it) return;
  const ex = CART.find(c => c.id === id);
  if (ex) ex.qty++; else CART.push({ id, name: it.name, price: parseFloat(it.price) || 0, qty: 1 });
  updateCartBadge();
  showToast(`🛒 أُضيف: ${it.name}`);
}

function updateCartBadge() {
  const n = CART.reduce((s, c) => s + c.qty, 0);
  const badge = document.getElementById('cart-badge');
  badge.textContent = n;
  badge.style.display = n ? 'flex' : 'none';
}

function toggleCartDrawer() {
  const drawer  = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (drawer.classList.contains('open')) {
    closeCartDrawer();
  } else {
    renderCartDrawer();
    drawer.classList.add('open');
    overlay.classList.add('open');
  }
}

function closeCartDrawer() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
}

function renderCartDrawer() {
  const cur = MENU.currency || 'ر.س';
  const total = Math.round(CART.reduce((s, c) => s + c.price * c.qty, 0));
  const body   = document.getElementById('cart-body');
  const footer = document.getElementById('cart-footer');
  const orderBtn = document.getElementById('cd-order-btn');

  if (!CART.length) {
    body.innerHTML = '<div class="empty-state"><i class="ti ti-shopping-cart-off" aria-hidden="true"></i><p>السلة فارغة</p></div>';
    footer.style.display = 'none';
    return;
  }

  body.innerHTML = CART.map((c, i) => `
    <div class="cd-row">
      <div class="cd-item-name">${c.name}</div>
      <div class="cd-qty-wrap">
        <button class="cd-qty-btn" style="background:var(--bg4)" onclick="changeQty(${i},-1)">−</button>
        <span class="cd-qty-num">${c.qty}</span>
        <button class="cd-qty-btn" style="background:${ACCENT};color:#1a0e00" onclick="changeQty(${i},1)">+</button>
      </div>
      <span class="cd-item-price" style="color:${ACCENT}">${Math.round(c.price * c.qty)} ${cur}</span>
    </div>`).join('');

  document.getElementById('cart-total').textContent = `${total} ${cur}`;
  document.getElementById('cart-total').style.color = ACCENT;
  orderBtn.style.background = ACCENT; orderBtn.style.color = '#1a0e00';
  footer.style.display = 'block';
}

function changeQty(i, d) {
  CART[i].qty += d;
  if (CART[i].qty <= 0) CART.splice(i, 1);
  updateCartBadge();
  renderCartDrawer();
}

function placeOrder() {
  const n = CART.reduce((s, c) => s + c.qty, 0);
  CART = [];
  updateCartBadge();
  closeCartDrawer();
  showToast(`🎉 تم إرسال طلبك (${n} عنصر) بنجاح!`);
}

// ── TOAST ──
let _toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast-msg');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}

// ── ERROR ──
function showError(msg) {
  document.getElementById('app').innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg0);text-align:center;padding:40px">
      <div>
        <i class="ti ti-mood-sad" style="font-size:52px;color:var(--tx3);display:block;margin-bottom:16px;opacity:.2"></i>
        <h2 style="font-size:18px;font-weight:700;color:var(--tx0);margin-bottom:8px">${msg}</h2>
        <p style="font-size:13px;color:var(--tx2);margin-bottom:20px">تأكد من صحة الرابط</p>
        <a href="index.html" style="background:var(--accent);color:#1a0e00;padding:10px 24px;border-radius:24px;font-weight:700;font-size:13px;text-decoration:none">← العودة للرئيسية</a>
      </div>
    </div>`;
}
