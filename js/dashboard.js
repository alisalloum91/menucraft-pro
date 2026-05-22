/**
 * MenuCraft Pro — Dashboard Logic (محدَّث بالبانر)
 */
const PHOTO_LIB = {
  chicken: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Joojeh_kabab.jpg/320px-Joojeh_kabab.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/320px-Good_Food_Display_-_NCI_Visuals_Online.jpg',
  ],
  salad: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Caesar_salad_(1).jpg/320px-Caesar_salad_(1).jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Ensalada_griega.jpg/320px-Ensalada_griega.jpg',
  ],
  pizza: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/320px-Eq_it-na_pizza-margherita_sep2005_sml.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Supreme_pizza.jpg/320px-Supreme_pizza.jpg',
  ],
  steak: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Sirloin_steak_on_BBQ.jpg/320px-Sirloin_steak_on_BBQ.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/T_bone_steak.jpg/320px-T_bone_steak.jpg',
  ],
  grill: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Kubideh_kabab.jpg/320px-Kubideh_kabab.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Joojeh_kabab.jpg/320px-Joojeh_kabab.jpg',
  ],
  pasta: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Spaghetti_bolognese_(hozinja).jpg/320px-Spaghetti_bolognese_(hozinja).jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/320px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
  ],
  dessert: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Creme_brulee.jpg/320px-Creme_brulee.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Chocolate_fudge_cake.jpg/320px-Chocolate_fudge_cake.jpg',
  ],
  drinks: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/320px-A_small_cup_of_coffee.JPG',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Mango_juice.jpg/320px-Mango_juice.jpg',
  ],
};

// ── BANNER ─────────────────────────────────────────────────────
function makeBgDataUrl() {
  const cv = document.createElement('canvas');
  cv.width = 680; cv.height = 240;
  const cx = cv.getContext('2d');
  const g1 = cx.createLinearGradient(0,0,680,240);
  g1.addColorStop(0,'#1a0e05'); g1.addColorStop(.5,'#0d0803'); g1.addColorStop(1,'#050300');
  cx.fillStyle = g1; cx.fillRect(0,0,680,240);
  cx.globalAlpha = .06;
  for(let i=0;i<40;i++){
    cx.strokeStyle='rgba(201,168,76,0.2)'; cx.lineWidth=1;
    cx.beginPath(); cx.moveTo(i*20+Math.random()*10,0);
    cx.lineTo(i*20+Math.random()*30,240); cx.stroke();
  }
  cx.globalAlpha=1;
  [[120,60,80],[340,40,100],[560,70,90]].forEach(([x,y,r])=>{
    const rg=cx.createRadialGradient(x,y,0,x,y,r);
    rg.addColorStop(0,'rgba(201,168,76,.07)'); rg.addColorStop(1,'transparent');
    cx.fillStyle=rg; cx.beginPath(); cx.arc(x,y,r,0,Math.PI*2); cx.fill();
  });
  cx.globalAlpha=.04; cx.font='bold 140px serif'; cx.fillStyle='#c9a84c';
  cx.textAlign='center'; cx.fillText('CT',340,160); cx.globalAlpha=1;
  return cv.toDataURL('image/jpeg',.85);
}

let _bannerBg = null;
function getBannerBg() { if(!_bannerBg) _bannerBg = makeBgDataUrl(); return _bannerBg; }

function buildBanner(name, sub, col, cd, ico) {
  const initials = (name||'CT').split(' ').filter(Boolean).map(w=>w[0]).join('').toUpperCase().slice(0,2);
  const stars = '★★★★★'.split('').map(s=>`<span style="color:${col};font-size:12px">${s}</span>`).join('');
  return `
<div style="position:relative;font-family:'Cairo',sans-serif;direction:rtl">
  <div style="position:relative;height:220px;overflow:hidden">
    <img src="${getBannerBg()}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
    <div style="position:absolute;inset:0;background:rgba(0,0,0,.5)"></div>
    <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.92) 0%,rgba(0,0,0,.2) 55%,transparent 100%)"></div>
    <!-- شريط علوي -->
    <div style="position:absolute;top:0;left:0;right:0;z-index:3;padding:11px 14px;display:flex;align-items:center;justify-content:space-between">
      <div style="position:relative;width:36px;height:36px;border-radius:9px;background:rgba(20,20,20,.8);border:0.5px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center">
        <i class="ti ti-shopping-cart" style="font-size:15px;color:rgba(255,255,255,.75)"></i>
        <div style="position:absolute;top:-5px;left:-5px;width:16px;height:16px;border-radius:50%;background:${col};color:#1a0e00;font-size:8px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid rgba(0,0,0,.5)">3</div>
      </div>
      <div style="background:rgba(10,10,10,.75);border:0.5px solid rgba(255,255,255,.18);border-radius:24px;padding:5px 13px;display:flex;align-items:center;gap:6px">
        <div style="width:6px;height:6px;border-radius:50%;background:#4ade80"></div>
        <span style="font-size:10px;font-weight:700;color:#fff">مفتوح الآن</span>
      </div>
      <div style="width:36px;height:36px;border-radius:9px;background:rgba(20,20,20,.8);border:0.5px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center">
        <i class="ti ti-menu-2" style="font-size:15px;color:rgba(255,255,255,.75)"></i>
      </div>
    </div>
    <!-- محتوى الأسفل -->
    <div style="position:absolute;bottom:0;left:0;right:0;z-index:3;padding:13px 16px 16px;display:flex;align-items:flex-end;justify-content:space-between">
      <div style="background:${col};color:#1a0e00;font-size:12px;font-weight:700;padding:7px 18px;border-radius:20px;cursor:pointer">اطلب الآن</div>
      <div style="text-align:right;display:flex;align-items:center;gap:12px">
        <div>
          <div style="font-size:9px;font-weight:700;color:${col};letter-spacing:2.5px;margin-bottom:4px">${(sub||'FINE DINING').toUpperCase()}</div>
          <div style="font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:2px;color:#fff;line-height:1;margin-bottom:4px">${(name||"CHEF'S TABLE").toUpperCase()}</div>
          <div style="display:flex;align-items:center;justify-content:flex-end;gap:7px">
            <span style="font-size:10px;color:rgba(255,255,255,.4)">(238) 4.9</span>
            <div style="display:flex;gap:2px">${stars}</div>
          </div>
        </div>
        <div style="width:58px;height:58px;border-radius:12px;border:2px solid ${col};background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:'Bebas Neue',sans-serif;font-size:22px;color:${col};letter-spacing:1px">${initials}</div>
      </div>
    </div>
  </div>
  <!-- شريط الإحصائيات -->
  <div style="background:#06060A;display:grid;grid-template-columns:1fr 1fr 1fr;border-top:0.5px solid rgba(255,255,255,.06)">
    ${[['ti-clock','30 د','توصيل'],['ti-bowl-chopsticks','120+','طبق'],['ti-star','4.9','تقييم']].map(([ic,n,l],i)=>`
    <div style="display:flex;flex-direction:column;align-items:center;padding:10px 0;${i>0?'border-right:0.5px solid rgba(255,255,255,.06)':''}">
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:2px">
        <i class="ti ${ic}" style="font-size:13px;color:${col}"></i>
        <span style="font-family:'Bebas Neue',sans-serif;font-size:16px;color:${col}">${n}</span>
      </div>
      <div style="font-size:9px;font-weight:700;color:rgba(255,255,255,.3)">${l}</div>
    </div>`).join('')}
  </div>
</div>`;
}
// ── END BANNER ──────────────────────────────────────────────────

// ── STATE ──
let S = { id: null, cats: [], items: [], imgs: {}, style: 1, color: '#1B7040', colorDk: '#0F4424' };
let CART = [];
let phoneCat = null;

const SDEFS = [
  { id: 1, name: 'داكن كلاسيكي', bg: '#0d0d0d', ac: '#1B7040' },
  { id: 2, name: 'فاتح أنيق',    bg: '#f5f5f5', ac: '#2d6a4f' },
  { id: 3, name: 'ذهبي فاخر',   bg: '#0a0800', ac: '#c9a84c' },
  { id: 4, name: 'زجاجي',       bg: '#0f172a', ac: '#60a5fa' },
  { id: 5, name: 'بني دافئ',    bg: '#d4c4a8', ac: '#7a4f2d' },
  { id: 6, name: 'نيون',        bg: '#050505', ac: '#39ff14' },
];
const COLS = [
  { c: '#1B7040', cd: '#0F4424' }, { c: '#c0392b', cd: '#962d22' },
  { c: '#2980b9', cd: '#1f6390' }, { c: '#8e44ad', cd: '#6c3483' },
  { c: '#e67e22', cd: '#ca6f1e' }, { c: '#c9a84c', cd: '#a0813a' },
  { c: '#e91e8c', cd: '#b5156d' }, { c: '#16a085', cd: '#0e6655' },
];
const CAT_BKGS = ['#1a3a28','#1a3020','#2e1c08','#2a2200','#131a2a','#2a1318','#1a1a2e','#1a2a0a'];

document.addEventListener('DOMContentLoaded', () => {
  renderDesign();
  renderPhoneHome();
  updateClock();
  setInterval(updateClock, 30000);
  const params = new URLSearchParams(location.search);
  const editId = params.get('edit');
  if (editId) loadMenuForEdit(editId);
});

function showPage(id, el) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.nav-item').forEach(b => { b.classList.remove('active'); b.removeAttribute('aria-current'); });
  document.getElementById('pg-' + id).classList.add('on');
  el.classList.add('active'); el.setAttribute('aria-current', 'page');
  const titles = { info: 'معلومات المطعم', data: 'بيانات المنيو', design: 'التصميم', menus: 'منيوهاتي' };
  const subs   = { info: 'أدخل تفاصيل مطعمك', data: 'ارفع Excel أو أضف يدوياً', design: 'اختر الستايل واللون', menus: 'جميع منيوهاتك المحفوظة' };
  document.getElementById('cp-title').textContent = titles[id] || '';
  document.getElementById('cp-sub').textContent   = subs[id]   || '';
  if (id === 'design') renderDesign();
  if (id === 'menus')  { renderMenusList(); updateStats(); }
}

function loadSample() {
  S.cats = [
    { id: 'c1', name: 'المقبلات', ico: '🍖' }, { id: 'c2', name: 'السلطات', ico: '🥗' },
    { id: 'c3', name: 'البيتزا',  ico: '🍕' }, { id: 'c4', name: 'المشاوي', ico: '🔥' },
    { id: 'c5', name: 'الحلويات', ico: '🍮' },
  ];
  S.items = [
    { id: 'i1',  catId: 'c1', name: 'شيش طاووق مشوي',       price: '55', oldPrice: '75', desc: 'دجاج طري متبّل بالثوم والليمون',   tag: 'الأكثر طلباً' },
    { id: 'i2',  catId: 'c1', name: 'سبرنج رول الدجاج',     price: '38', oldPrice: '',   desc: 'معجنات هشة محشوة بالدجاج',         tag: '' },
    { id: 'i3',  catId: 'c1', name: 'حواوشي اللحم',         price: '42', oldPrice: '55', desc: 'لحم مفروم متبل داخل عجينة',         tag: 'مميز' },
    { id: 'i4',  catId: 'c2', name: 'سلطة سيزر الكلاسيكية', price: '35', oldPrice: '45', desc: 'خس روماني وصوص سيزر كريمي',        tag: 'كلاسيك' },
    { id: 'i5',  catId: 'c2', name: 'سلطة يونانية',         price: '32', oldPrice: '',   desc: 'طماطم وخيار وزيتون وجبنة فيتا',    tag: '' },
    { id: 'i6',  catId: 'c3', name: 'مارغريتا كلاسيكية',    price: '58', oldPrice: '',   desc: 'صوص طماطم وموتزاريلا وريحان',      tag: 'كلاسيك' },
    { id: 'i7',  catId: 'c3', name: 'بيبروني الحار',        price: '68', oldPrice: '85', desc: 'بيبروني وفلفل حار وموتزاريلا',     tag: 'حار' },
    { id: 'i8',  catId: 'c3', name: 'أربع جبن',             price: '75', oldPrice: '',   desc: 'موتزاريلا وفيتا وشيدر وبارميزان', tag: 'مميز' },
    { id: 'i9',  catId: 'c4', name: 'مشاوي مختلطة',         price: '95', oldPrice: '120',desc: 'شيش طاووق وكفتة وقطع لحم',         tag: 'الأكثر طلباً' },
    { id: 'i10', catId: 'c4', name: 'ستيك فيليه',           price: '120',oldPrice: '',   desc: 'فيليه بقري مشوي بالزبدة',          tag: 'مميز' },
    { id: 'i11', catId: 'c5', name: 'كريم برولي الفانيليا', price: '38', oldPrice: '',   desc: 'كاسترد فانيليا بقشرة كراميل',      tag: 'مميز' },
    { id: 'i12', catId: 'c5', name: 'كيك الشوكولا الساخن',  price: '42', oldPrice: '52', desc: 'كيك دافئ بمركز سائل',              tag: 'خاص' },
  ];
  if (!document.getElementById('r-name').value) {
    document.getElementById('r-name').value  = "Chef's Table";
    document.getElementById('r-ico').value   = '🍽️';
    document.getElementById('r-sub').value   = 'Fine Dining Experience';
    document.getElementById('r-slug').value  = 'chefs-table';
    document.getElementById('r-desc').value  = 'أشهى الأطباق بمكونات طازجة ومذاق لا يُنسى';
  }
  renderItemsTable(); syncPhone();
  toast('✦ تم تحميل 12 طبق في 5 فئات');
}

function dropExcel(e) { e.preventDefault(); document.getElementById('ez').classList.remove('drag'); const f = e.dataTransfer.files[0]; if (f) loadExcel(f); }
function loadExcel(file) {
  if (!file) return;
  const r = new FileReader();
  r.onload = ev => {
    try {
      const wb = XLSX.read(new Uint8Array(ev.target.result), { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      processRows(XLSX.utils.sheet_to_json(ws, { defval: '' }));
    } catch { toast('⚠️ خطأ في قراءة الملف'); }
  };
  r.readAsArrayBuffer(file);
}
function processRows(rows) {
  if (!rows.length) { toast('⚠️ الملف فارغ'); return; }
  const k = Object.keys(rows[0]);
  const col = ts => k.find(c => ts.some(t => new RegExp(t, 'i').test(c)));
  const cc = col(['^(category|cat|فئة|الفئة)$']);
  const nc = col(['^(name|اسم|الاسم)$']);
  const pc = col(['^(price|سعر|السعر)$']);
  const dc = col(['^(desc|description|وصف|الوصف)$']);
  const oc = col(['^(old|قديم)$']);
  const tc = col(['^(tag|badge|شارة)$']);
  const cats = {}; const items = [];
  rows.forEach(row => {
    const cn = String(row[cc || k[0]] || 'عام').trim();
    if (!cats[cn]) cats[cn] = { id: DB.uid(), name: cn, ico: '🍽️' };
    const name = String(row[nc || k[1]] || '').trim();
    if (!name) return;
    items.push({ id: DB.uid(), catId: cats[cn].id, name,
      price: String(row[pc || k[2]] || '0').trim(),
      oldPrice: oc ? String(row[oc] || '').trim() : '',
      desc: dc ? String(row[dc] || '').trim() : '',
      tag: tc ? String(row[tc] || '').trim() : '',
    });
  });
  S.cats = Object.values(cats); S.items = items;
  const exMsg = document.getElementById('ex-msg');
  exMsg.textContent = `تم تحميل ${items.length} طبق في ${Object.keys(cats).length} فئة`;
  exMsg.style.display = 'block';
  renderItemsTable(); syncPhone();
  toast(`✅ ${items.length} طبق`);
}

function dropImg(e) { e.preventDefault(); document.getElementById('iz').classList.remove('drag'); loadImgs(e.dataTransfer.files); }
function loadImgs(files) {
  if (!files?.length) return; let done = 0;
  Array.from(files).forEach(f => {
    const r = new FileReader();
    r.onload = ev => {
      const k = f.name.toLowerCase().replace(/\.[^.]+$/, '');
      S.imgs[k] = ev.target.result; S.imgs[f.name.toLowerCase()] = ev.target.result;
      done++; if (done === files.length) renderImgGrid();
    };
    r.readAsDataURL(f);
  });
}
function renderImgGrid() {
  const g = document.getElementById('img-grid');
  const ent = Object.entries(S.imgs).filter(([k]) => !k.includes('.'));
  if (!ent.length) { g.style.display = 'none'; return; }
  g.style.display = 'grid';
  g.innerHTML = ent.slice(0, 10).map(([k, url]) => `
    <div class="img-thumb">
      <img src="${url}" alt="${k}" onerror="this.style.display='none'">
      <div class="img-thumb-lbl">${k}</div>
    </div>`).join('');
  toast(`🖼️ ${ent.length} صورة`);
}

function addManual() {
  const name  = document.getElementById('m-name').value.trim();
  const price = document.getElementById('m-price').value.trim();
  if (!name || !price) { toast('⚠️ أدخل الاسم والسعر'); return; }
  const cn = document.getElementById('m-cat').value.trim() || 'عام';
  let cat = S.cats.find(c => c.name === cn);
  if (!cat) { cat = { id: DB.uid(), name: cn, ico: '🍽️' }; S.cats.push(cat); }
  S.items.push({ id: DB.uid(), catId: cat.id, name, price,
    oldPrice: document.getElementById('m-old').value.trim(),
    desc:     document.getElementById('m-desc').value.trim(),
    tag:      document.getElementById('m-tag').value.trim(),
  });
  ['m-name','m-price','m-old','m-desc','m-tag'].forEach(id => document.getElementById(id).value = '');
  renderItemsTable(); syncPhone(); toast('✅ تمت الإضافة');
}

function renderItemsTable() {
  const cur = getCur();
  document.getElementById('items-badge').textContent = `${S.items.length} طبق`;
  const w = document.getElementById('items-table-wrap');
  if (!S.items.length) {
    w.innerHTML = '<div class="empty-state"><i class="ti ti-bowl-chopsticks"></i><p>لا توجد أطباق بعد</p><small>ارفع Excel أو أضف يدوياً</small></div>';
    return;
  }
  w.innerHTML = `
    <table class="items-table" aria-label="قائمة الأطباق">
      <thead><tr><th>الفئة</th><th>الاسم</th><th>السعر</th><th>الشارة</th><th></th></tr></thead>
      <tbody>
        ${S.items.map((it, i) => {
          const cat = S.cats.find(c => c.id === it.catId);
          return `<tr>
            <td><span class="cat-pill">${cat?.name || '—'}</span></td>
            <td style="font-weight:600">${it.name}</td>
            <td class="price-tag">${it.price} ${cur}</td>
            <td class="tag-label">${it.tag || '—'}</td>
            <td><button class="del-btn" onclick="delItem(${i})" aria-label="حذف ${it.name}">
              <i class="ti ti-trash" aria-hidden="true"></i>
            </button></td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>`;
}
function delItem(i) { S.items.splice(i, 1); renderItemsTable(); syncPhone(); toast('🗑 حُذف'); }

function renderDesign() {
  document.getElementById('style-grid').innerHTML = SDEFS.map(s => `
    <div class="scard ${s.id === S.style ? 'on' : ''}" onclick="setStyle(${s.id}, this)">
      <div class="scard-prev" style="background:${s.bg}">
        <div class="scard-prev-grid">
          ${''.padEnd(4).split('').map(() => `<div class="scard-prev-cell" style="background:${s.ac}22;border:0.5px solid ${s.ac}44"></div>`).join('')}
        </div>
      </div>
      <div class="scard-name">${s.name}</div>
    </div>`).join('');
  const swHtml = COLS.map(c => `
    <div class="cswatch ${c.c === S.color ? 'on' : ''}" style="background:${c.c}"
      onclick="setColor('${c.c}','${c.cd}',this)"
      role="radio" aria-checked="${c.c === S.color}" aria-label="لون ${c.c}" tabindex="0"></div>`).join('');
  document.getElementById('color-row').innerHTML = swHtml;
  const rc = document.getElementById('rc-swatches');
  if (rc) rc.innerHTML = COLS.map(c => `
    <div class="cswatch ${c.c === S.color ? 'on' : ''}" style="background:${c.c};width:20px;height:20px"
      onclick="setColor('${c.c}','${c.cd}',this)"></div>`).join('');
}

function setStyle(id, el) {
  S.style = id;
  document.querySelectorAll('.scard').forEach(s => s.classList.remove('on'));
  el.classList.add('on'); syncPhone();
}
function setColor(c, cd, el) {
  S.color = c; S.colorDk = cd;
  document.querySelectorAll('.cswatch').forEach(p => { p.classList.remove('on'); p.setAttribute('aria-checked', 'false'); });
  el.classList.add('on'); el.setAttribute('aria-checked', 'true'); syncPhone();
}
function randomStyle() { const id = Math.floor(Math.random() * SDEFS.length) + 1; S.style = id; renderDesign(); syncPhone(); toast('✦ ستايل جديد!'); }

const DISH_STYLES = [
  { name: 'DARK LUXURY', ac: '#c9a84c', build() { const cur = getCur(); return `<div style="background:#080808;padding:10px;display:grid;grid-template-columns:1fr 1fr;gap:7px">${getSampleDishes().map(d => `<div style="background:#111;border-radius:9px;overflow:hidden;border:0.5px solid #2a2a2a"><div style="height:60px;background:#1a1a1a;display:flex;align-items:center;justify-content:center;font-size:20px">${d.ico}</div><div style="padding:6px 8px"><div style="font-size:9px;font-weight:700;color:#c9a84c;margin-bottom:1px">${d.n}</div><div style="font-family:'Bebas Neue',sans-serif;font-size:12px;color:#fff">${d.p} ${cur}</div></div></div>`).join('')}</div>`; } },
  { name: 'WAVE RIBBON', ac: '#ec4899', build() { const cur = getCur(); return `<div style="background:#0f0014;padding:10px 0">${getSampleDishes().map((d, i) => `<div style="height:52px;position:relative;overflow:hidden;${i > 0 ? 'margin-top:-6px' : ''}"><div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(15,0,20,.88),rgba(15,0,20,.2) 50%,rgba(15,0,20,.88));display:flex;align-items:center;padding:0 13px;justify-content:space-between;z-index:2"><div style="display:flex;align-items:center;gap:7px"><span style="font-size:16px">${d.ico}</span><div style="font-size:10px;font-weight:600;color:#fff">${d.n}</div></div><div style="background:rgba(236,72,153,.18);border:0.5px solid rgba(236,72,153,.4);border-radius:20px;padding:2px 9px;font-size:9px;font-weight:700;color:#ec4899;white-space:nowrap">${d.p} ${cur}</div></div></div>`).join('')}</div>`; } },
];

function getSampleDishes() {
  const items = S.items.slice(0, 4);
  if (items.length >= 4) return items.map(it => ({ n: it.name.split(' ').slice(0, 2).join(' '), p: it.price, ico: S.cats.find(c => c.id === it.catId)?.ico || '🍽️', s: it.desc?.slice(0, 20) || '' }));
  return [{ n: 'شيش طاووق', p: '55', ico: '🍗', s: '' }, { n: 'سلطة سيزر', p: '35', ico: '🥗', s: '' }, { n: 'مارغريتا', p: '58', ico: '🍕', s: '' }, { n: 'كريم برولي', p: '38', ico: '🍮', s: '' }];
}

const GEN_MSGS = ['جاري الابتكار...', 'تشكيل الكروت...', 'ضبط الألوان...', 'اللمسات الأخيرة...'];
let dgUsed = [];
async function runDishGen() {
  const btn = document.querySelector('#pg-design .btn-a');
  btn.style.opacity = '.5'; btn.style.pointerEvents = 'none';
  const ld = document.getElementById('gen-loader'), fill = document.getElementById('gen-fill'), gt = document.getElementById('gen-txt');
  ld.style.display = 'flex';
  const msgs = [...GEN_MSGS].sort(() => Math.random() - .5); let prog = 0;
  const iv = setInterval(() => { prog += Math.random() * 14 + 6; if (prog > 92) prog = 92; fill.style.width = prog + '%'; gt.textContent = msgs[Math.min(Math.floor(prog / 25), msgs.length - 1)]; }, 110);
  await new Promise(r => setTimeout(r, 800 + Math.random() * 400));
  clearInterval(iv); fill.style.width = '100%'; await new Promise(r => setTimeout(r, 180));
  ld.style.display = 'none'; fill.style.width = '0';
  const av = DISH_STYLES.map((_, i) => i).filter(i => !dgUsed.includes(i));
  if (!av.length) dgUsed = [];
  const idx = (av.length ? av : DISH_STYLES.map((_, i) => i))[Math.floor(Math.random() * (av.length || DISH_STYLES.length))];
  dgUsed.push(idx); const ds = DISH_STYLES[idx];
  const res = document.getElementById('gen-result'), div = document.createElement('div'); div.className = 'gen-item';
  div.innerHTML = `<div class="gen-item-head"><span class="gen-item-name" style="color:${ds.ac}">${ds.name}</span><button class="gen-del-btn" onclick="this.closest('.gen-item').remove()"><i class="ti ti-x"></i></button></div>${ds.build()}`;
  res.insertBefore(div, res.firstChild);
  btn.style.opacity = '1'; btn.style.pointerEvents = 'auto'; toast('✦ شكل إبداعي جديد!');
}

function getCur() { return document.getElementById('r-cur')?.value || 'ر.س'; }
function saveMenu() {
  const name = document.getElementById('r-name').value.trim();
  if (!name) { toast('⚠️ أدخل اسم المطعم'); return; }
  if (!S.items.length) { toast('⚠️ أضف بيانات أولاً'); return; }
  const slug = document.getElementById('r-slug').value.trim() || DB.slug(name);
  const id = S.id || DB.uid();
  const menu = { id, slug, name, sub: document.getElementById('r-sub').value.trim(), ico: document.getElementById('r-ico').value.trim() || '🍽️', currency: getCur(), desc: document.getElementById('r-desc').value.trim(), style: S.style, color: S.color, colorDk: S.colorDk, cats: S.cats, items: S.items, savedAt: new Date().toISOString() };
  DB.save(menu);
  Object.entries(S.imgs).forEach(([k, v]) => DB.saveImg(id, k, v));
  S.id = id;
  document.getElementById('link-url-txt').textContent = `menucraft.app/m/${slug}`;
  document.getElementById('link-box-wrap').style.display = 'block';
  toast('✅ تم الحفظ بنجاح!');
}
function copyLink() { navigator.clipboard?.writeText(document.getElementById('link-url-txt').textContent).then(() => toast('📋 تم نسخ الرابط')); }
function autoSlug() { const n = document.getElementById('r-name').value.trim(); if (n) document.getElementById('r-slug').value = DB.slug(n); }
function resetAll() {
  S = { id: null, cats: [], items: [], imgs: {}, style: 1, color: '#1B7040', colorDk: '#0F4424' };
  ['r-name','r-sub','r-ico','r-slug','r-desc'].forEach(id => document.getElementById(id).value = '');
  renderItemsTable(); syncPhone();
  document.getElementById('link-box-wrap').style.display = 'none';
  document.getElementById('ex-msg').style.display = 'none';
  CART = []; toast('↺ تم التعيين');
}

function renderMenusList() {
  const menus = DB.all().reverse(), w = document.getElementById('menus-list');
  if (!menus.length) { w.innerHTML = '<div class="empty-state"><i class="ti ti-layout-grid"></i><p>لا توجد منيوهات</p><small>احفظ منيو أولاً</small></div>'; return; }
  w.innerHTML = menus.map(m => `<div class="menu-list-item"><div class="mli-thumb" style="background:${m.color || '#1a3a28'}">${m.ico || '🍽️'}</div><div class="mli-info"><div class="mli-name">${m.name}</div><div class="mli-meta">${(m.items || []).length} طبق · ${(m.cats || []).length} فئة</div></div><div class="mli-actions"><button class="mla" onclick="editMenu('${m.id}')"><i class="ti ti-edit"></i></button><button class="mla primary" onclick="previewMenu('${m.id}')"><i class="ti ti-eye"></i></button><button class="mla" onclick="copyMenuLink('${m.slug}')"><i class="ti ti-link"></i></button><button class="mla" onclick="openMenu('${m.slug}')"><i class="ti ti-external-link"></i></button><button class="mla" onclick="delMenu('${m.id}')" style="color:#E24B4A"><i class="ti ti-trash"></i></button></div></div>`).join('');
}
function updateStats() { const s = DB.stats(); document.getElementById('st-m').textContent = s.m; document.getElementById('st-i').textContent = s.i; document.getElementById('st-c').textContent = s.c; }
function editMenu(id) {
  const m = DB.get(id); if (!m) return;
  S = { id, cats: m.cats||[], items: m.items||[], imgs: DB.mImgs(id)||{}, style: m.style||1, color: m.color||'#1B7040', colorDk: m.colorDk||'#0F4424' };
  document.getElementById('r-name').value = m.name||''; document.getElementById('r-sub').value = m.sub||''; document.getElementById('r-ico').value = m.ico||''; document.getElementById('r-slug').value = m.slug||''; document.getElementById('r-desc').value = m.desc||''; document.getElementById('r-cur').value = m.currency||'ر.س';
  showPage('info', document.querySelector('.nav-item')); renderItemsTable(); syncPhone(); toast('✏️ تحميل للتعديل');
}
function previewMenu(id) {
  const m = DB.get(id); if (!m) return;
  S.cats = m.cats||[]; S.items = m.items||[]; S.color = m.color||'#1B7040'; S.colorDk = m.colorDk||'#0F4424'; S.imgs = DB.mImgs(id)||{};
  document.getElementById('r-name').value = m.name; document.getElementById('r-sub').value = m.sub||''; document.getElementById('r-ico').value = m.ico||'🍽️'; document.getElementById('r-cur').value = m.currency||'ر.س'; document.getElementById('r-desc').value = m.desc||'';
  syncPhone(); toast('👁 تم تحميل المعاينة');
}
function delMenu(id) { if (!confirm('حذف المنيو نهائياً؟')) return; DB.del(id); renderMenusList(); updateStats(); toast('🗑 تم الحذف'); }
function copyMenuLink(slug) { navigator.clipboard?.writeText(`menucraft.app/m/${slug}`).then(() => toast('📋 تم نسخ الرابط')); }
function openMenu(slug) { window.open(`menu.html?slug=${slug}`, '_blank'); }
function loadMenuForEdit(id) { const m = DB.get(id); if (m) editMenu(id); }

function dlTpl() {
  const data = [['الفئة','الاسم','السعر','الوصف','سعر قديم','شارة'],['المقبلات','شيش طاووق مشوي','55','دجاج طري متبّل بالثوم','75','الأكثر طلباً'],['المقبلات','سبرنج رول الدجاج','38','معجنات هشة محشوة بالدجاج','',''],['السلطات','سلطة سيزر الكلاسيكية','35','خس روماني وصوص سيزر','45','كلاسيك'],['البيتزا','مارغريتا كلاسيكية','58','صوص طماطم وموتزاريلا','','كلاسيك'],['البيتزا','بيبروني الحار','68','بيبروني وفلفل حار','85','حار 🌶️'],['الحلويات','كريم برولي','38','كاسترد فانيليا بقشرة كراميل','','مميز']];
  const wb = XLSX.utils.book_new(), ws = XLSX.utils.aoa_to_sheet(data);
  ws['!cols'] = [{ wch: 14 },{ wch: 22 },{ wch: 8 },{ wch: 30 },{ wch: 10 },{ wch: 14 }];
  XLSX.utils.book_append_sheet(wb, ws, 'Menu'); XLSX.writeFile(wb, 'menucraft-template.xlsx');
  toast('⬇ تم تحميل النموذج');
}

// ── PHONE RENDERING ──
function syncPhone() { renderPhoneHome(); }
let phoneView = 'home';
function setPhoneView(view, el) {
  phoneView = view;
  document.querySelectorAll('.rc-btn').forEach(b => b.classList.remove('on'));
  el?.classList.add('on');
  if (view === 'home') renderPhoneHome();
  else if (view === 'items') renderPhoneItems(S.cats[0]?.id || 'c1');
  else if (view === 'cart') renderPhoneCart();
}
function defaultCats() { return [{ id: 'dc1', name: 'المقبلات', ico: '🍖', bg: '#1a3a28' },{ id: 'dc2', name: 'السلطات', ico: '🥗', bg: '#1a3020' },{ id: 'dc3', name: 'البيتزا', ico: '🍕', bg: '#2e1c08' },{ id: 'dc4', name: 'الحلويات', ico: '🍮', bg: '#2a2200' }]; }

function renderPhoneHome() {
  const name = document.getElementById('r-name')?.value || "Chef's Table";
  const sub  = document.getElementById('r-sub')?.value  || 'Fine Dining';
  const ico  = document.getElementById('r-ico')?.value  || '🍽️';
  const desc = document.getElementById('r-desc')?.value || 'أشهى الأطباق بأفضل الأسعار';
  const col = S.color, cd = S.colorDk;
  const isLight = S.style === 2 || S.style === 5;
  const bg  = isLight ? '#f5f5f5' : '#06060A';
  const bg1 = isLight ? '#ffffff' : '#0D0D12';
  const bg2 = isLight ? '#f0f0f0' : '#141419';
  const br  = isLight ? '#e5e5e5' : '#1C1C24';
  const txP = isLight ? '#111'    : '#FAFAF8';
  const txM = isLight ? '#888'    : '#4A4845';

  // ✅ البانر يظهر أعلى المعاينة
  const banner = buildBanner(name, sub, col, cd, ico);

  document.getElementById('phone-content').innerHTML = banner + `
    <div style="background:${bg};min-height:300px">
      <div class="pm-sec">
        <span style="color:${txM}">القائمة</span>
        <span style="color:${col}">${(S.cats.length || 4)} أصناف</span>
      </div>
      <div class="pm-grid">
        ${(S.cats.length ? S.cats : defaultCats()).map((cat, i) => `
          <div class="pm-cat" style="background:${isLight?'#fff':bg1};border-color:${br}" onclick="renderPhoneItems('${cat.id}')">
            <div class="pm-cat-top" style="background:${isLight ? (cat.bg||CAT_BKGS[i%8])+'18' : CAT_BKGS[i%8]}">
              <div class="pm-cat-tex"></div>
              <div class="pm-cat-ico" style="background:${col}18;border-color:${col}25">${cat.ico||'🍽️'}</div>
            </div>
            <div class="pm-cat-bot" style="border-top-color:${isLight?'#eee':'rgba(255,255,255,.04)'}">
              <div class="pm-cat-name" style="color:${txP}">${cat.name}</div>
              <div class="pm-cat-count" style="color:${txM}">${S.items.filter(it=>it.catId===cat.id).length||3} أطباق</div>
            </div>
          </div>`).join('')}
      </div>
    </div>`;
}

function renderPhoneItems(catId) {
  phoneCat = catId;
  const cat = S.cats.find(c => c.id === catId) || { name: 'المقبلات', ico: '🍖', id: catId };
  const items = S.items.filter(it => it.catId === catId);
  const col = S.color, cd = S.colorDk, cur = getCur();
  const isLight = S.style === 2 || S.style === 5;
  const bg  = isLight ? '#f5f5f5' : '#06060A';
  const bg2 = isLight ? '#fff'    : '#141419';
  const br  = isLight ? '#e5e5e5' : '#1C1C24';
  const txP = isLight ? '#111'    : '#FAFAF8';
  document.getElementById('phone-content').innerHTML = `
    <div style="background:${bg};min-height:440px;padding-bottom:16px">
      <div class="pm-items-bar" style="background:${isLight?'rgba(245,245,245,.95)':'rgba(6,6,10,.95)'};border-bottom-color:${br}">
        <button class="pm-back" onclick="renderPhoneHome()" style="background:${isLight?'#e5e5e5':'#141419'};border-color:${br}"><i class="ti ti-arrow-right"></i></button>
        <div><div class="pm-cat-label" style="color:${txP}">${cat.name.toUpperCase()}</div><div class="pm-cat-sub">${items.length} أطباق</div></div>
      </div>
      <div style="padding-top:8px">
        ${items.length ? items.map((it) => `
          <div class="pm-item" style="background:${bg2};border-color:${br}">
            <div class="pm-ithumb" style="background:${cd}">${it.ico || cat.ico || '🍽️'}</div>
            <div class="pm-ibody">
              ${it.tag ? `<div class="pm-itag" style="background:${col}18;color:${col}">${it.tag}</div>` : '<div style="height:3px"></div>'}
              <div class="pm-iname" style="color:${txP}">${it.name}</div>
              ${it.desc ? `<div class="pm-idesc">${it.desc.slice(0,38)}</div>` : ''}
              <div class="pm-ifoot">
                <div style="display:flex;align-items:baseline;gap:3px">
                  <span class="pm-iprice" style="color:${col}">${it.price} ${cur}</span>
                  ${it.oldPrice ? `<span class="pm-iold">${it.oldPrice}</span>` : ''}
                </div>
                <button class="pm-iadd" style="background:${col}" onclick="addToCart('${it.id}',this)"><i class="ti ti-plus"></i></button>
              </div>
            </div>
          </div>`).join('')
        : '<div class="empty-state"><i class="ti ti-bowl-chopsticks"></i><p>لا توجد أطباق</p></div>'}
      </div>
      ${CART.length ? renderCartSection() : ''}
    </div>`;
}

function renderPhoneCart() {
  document.getElementById('phone-content').innerHTML = `
    <div style="background:#06060A;min-height:440px">
      <div class="pm-items-bar"><button class="pm-back" onclick="renderPhoneHome()"><i class="ti ti-arrow-right"></i></button><div><div class="pm-cat-label">سلة الطلب</div><div class="pm-cat-sub">${CART.reduce((s,c) => s+c.qty, 0)} عنصر</div></div></div>
      ${CART.length ? renderCartSection() : '<div class="empty-state"><i class="ti ti-shopping-cart-off"></i><p>السلة فارغة</p></div>'}
    </div>`;
}

function renderCartSection() {
  const cur = getCur(), col = S.color;
  const total = CART.reduce((s, c) => s + c.price * c.qty, 0);
  return `<div class="pm-cart">
    <div class="pm-cart-title">سلة الطلب <span style="font-size:10px;color:${col}">${CART.reduce((s,c)=>s+c.qty,0)} عنصر</span></div>
    ${CART.map((c, i) => `<div class="pm-cart-row"><div class="pm-cn">${c.name}</div><div class="pm-cq"><button class="pm-cqb" style="background:#2a2a2a" onclick="chQty(${i},-1)">−</button><span style="font-size:10px;font-weight:700;min-width:12px;text-align:center">${c.qty}</span><button class="pm-cqb" style="background:${col}" onclick="chQty(${i},1)">+</button></div><span class="pm-cp" style="color:${col}">${Math.round(c.price * c.qty)} ${cur}</span></div>`).join('')}
    <div class="pm-cart-total"><span style="font-size:10px;color:var(--tx2)">المجموع</span><span style="font-family:var(--font-display);font-size:16px;color:${col}">${Math.round(total)} ${cur}</span></div>
    <button class="pm-order-btn" style="background:${col}" onclick="placeOrder()">تأكيد الطلب</button>
  </div>`;
}

function addToCart(id, btn) {
  const it = S.items.find(i => i.id === id); if (!it) return;
  const ex = CART.find(c => c.id === id);
  if (ex) ex.qty++; else CART.push({ id, name: it.name, price: parseFloat(it.price) || 0, qty: 1 });
  btn.innerHTML = '<i class="ti ti-check"></i>'; btn.style.transform = 'scale(.85)';
  setTimeout(() => { btn.innerHTML = '<i class="ti ti-plus"></i>'; btn.style.transform = ''; }, 600);
  toast('🛒 أُضيف للسلة');
}
function chQty(i, d) { CART[i].qty += d; if (CART[i].qty <= 0) CART.splice(i, 1); if (phoneCat) renderPhoneItems(phoneCat); else renderPhoneCart(); }
function placeOrder() { CART = []; renderPhoneHome(); toast('🎉 تم إرسال طلبك!'); }

function toast(msg) { const t = document.getElementById('toast-msg'); t.textContent = msg; t.classList.add('show'); clearTimeout(t._to); t._to = setTimeout(() => t.classList.remove('show'), 2400); }
function updateClock() { const n = new Date(), el = document.getElementById('psb-time'); if (el) el.textContent = `${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}`; }
