/**
 * MenuCraft Pro — Storage Engine
 * Handles all localStorage operations
 */

const DB = {
  K: { M: 'mc_pro_menus', I: 'mc_pro_imgs' },

  all() { try { return JSON.parse(localStorage.getItem(this.K.M) || '[]'); } catch { return []; } },

  save(m) {
    const a = this.all(), i = a.findIndex(x => x.id === m.id);
    if (i >= 0) a[i] = m; else a.push(m);
    localStorage.setItem(this.K.M, JSON.stringify(a));
  },

  get(id) { return this.all().find(m => m.id === id) || null; },

  del(id) {
    localStorage.setItem(this.K.M, JSON.stringify(this.all().filter(m => m.id !== id)));
    const im = this.imgs(); delete im[id];
    localStorage.setItem(this.K.I, JSON.stringify(im));
  },

  imgs() { try { return JSON.parse(localStorage.getItem(this.K.I) || '{}'); } catch { return {}; } },

  saveImg(mid, k, url) {
    const im = this.imgs();
    if (!im[mid]) im[mid] = {};
    im[mid][k] = url;
    localStorage.setItem(this.K.I, JSON.stringify(im));
  },

  mImgs(mid) { return this.imgs()[mid] || {}; },

  uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 5); },

  slug(n) {
    return n.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim() || 'menu-' + Date.now().toString(36);
  },

  stats() {
    const ms = this.all();
    let ti = 0, tc = 0;
    ms.forEach(m => { ti += (m.items || []).length; tc += (m.cats || []).length; });
    return { m: ms.length, i: ti, c: tc };
  },

  bySlug(slug) { return this.all().find(m => m.slug === slug) || null; },

  exportAll() {
    const data = { version: '2.0', exported: new Date().toISOString(), menus: this.all(), images: this.imgs() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `menucraft-backup-${Date.now()}.json`;
    a.click();
  },

  importAll(jsonStr) {
    try {
      const d = JSON.parse(jsonStr);
      if (d.menus) localStorage.setItem(this.K.M, JSON.stringify(d.menus));
      if (d.images) localStorage.setItem(this.K.I, JSON.stringify(d.images));
      return true;
    } catch { return false; }
  },
};

window.DB = DB;
