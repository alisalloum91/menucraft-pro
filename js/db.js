/**
 * MenuCraft Pro — Database Layer (Supabase)
 * Replaces localStorage storage.js
 */

import { supabase } from './supabase-config.js';

// ─── Auth ────────────────────────────────────────────────
export const Auth = {
  async signUp(email, password, restaurantName) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    // Create restaurant profile after signup
    if (data.user) {
      await DB.createRestaurant(data.user.id, restaurantName);
    }
    return data;
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async signOut() {
    await supabase.auth.signOut();
    window.location.href = '/login.html';
  },

  async getUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  async requireAuth() {
    const user = await this.getUser();
    if (!user) { window.location.href = '/login.html'; return null; }
    return user;
  },
};

// ─── Database ─────────────────────────────────────────────
export const DB = {

  // ── Restaurants ──────────────────────────────────────────
  async createRestaurant(ownerId, name) {
    const slug = name.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim() || 'restaurant-' + Date.now().toString(36);

    const { data, error } = await supabase
      .from('restaurants')
      .insert({ owner_id: ownerId, name, slug })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getMyRestaurant() {
    const user = await Auth.getUser();
    if (!user) return null;
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('owner_id', user.id)
      .single();
    if (error) return null;
    return data;
  },

  async updateRestaurant(id, updates) {
    const { data, error } = await supabase
      .from('restaurants')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getRestaurantBySlug(slug) {
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error) return null;
    return data;
  },

  // ── Menu Items ───────────────────────────────────────────
  async getItems(restaurantId) {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('sort_order');
    if (error) throw error;
    return data || [];
  },

  async saveItem(restaurantId, item) {
    if (item.id) {
      const { data, error } = await supabase
        .from('menu_items')
        .update({ ...item, restaurant_id: restaurantId })
        .eq('id', item.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase
        .from('menu_items')
        .insert({ ...item, restaurant_id: restaurantId })
        .select()
        .single();
      if (error) throw error;
      return data;
    }
  },

  async deleteItem(itemId) {
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', itemId);
    if (error) throw error;
  },

  async saveItems(restaurantId, items) {
    // Delete all existing and re-insert (bulk replace)
    await supabase.from('menu_items').delete().eq('restaurant_id', restaurantId);
    if (!items.length) return [];
    const rows = items.map((item, i) => ({ ...item, restaurant_id: restaurantId, sort_order: i }));
    const { data, error } = await supabase.from('menu_items').insert(rows).select();
    if (error) throw error;
    return data;
  },

  // ── Analytics — Views ─────────────────────────────────────
  async logView(restaurantId) {
    const device = /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
    await supabase.from('menu_views').insert({ restaurant_id: restaurantId, device_type: device });
  },

  async getViewStats(restaurantId) {
    const now = new Date();
    const day  = new Date(now); day.setHours(0,0,0,0);
    const week = new Date(now); week.setDate(now.getDate() - 7);
    const month= new Date(now); month.setDate(now.getDate() - 30);

    const { data, error } = await supabase
      .from('menu_views')
      .select('viewed_at, device_type')
      .eq('restaurant_id', restaurantId);
    if (error) return { today: 0, week: 0, month: 0, total: 0, mobile: 0, desktop: 0 };

    const total   = data.length;
    const today   = data.filter(v => new Date(v.viewed_at) >= day).length;
    const week7   = data.filter(v => new Date(v.viewed_at) >= week).length;
    const month30 = data.filter(v => new Date(v.viewed_at) >= month).length;
    const mobile  = data.filter(v => v.device_type === 'mobile').length;
    const desktop = data.filter(v => v.device_type === 'desktop').length;

    return { today, week: week7, month: month30, total, mobile, desktop };
  },

  // ── Analytics — Orders ────────────────────────────────────
  async saveOrder(restaurantId, items, total, customerName, customerPhone) {
    const { data, error } = await supabase
      .from('orders')
      .insert({ restaurant_id: restaurantId, items, total, customer_name: customerName, customer_phone: customerPhone })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getOrders(restaurantId) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('created_at', { ascending: false });
    if (error) return [];
    return data;
  },

  async getOrderStats(restaurantId) {
    const orders = await this.getOrders(restaurantId);
    const total  = orders.reduce((s, o) => s + (o.total || 0), 0);
    const today  = new Date(); today.setHours(0,0,0,0);
    const todayOrders = orders.filter(o => new Date(o.created_at) >= today);
    return {
      count: orders.length,
      revenue: total,
      todayCount: todayOrders.length,
      todayRevenue: todayOrders.reduce((s, o) => s + (o.total || 0), 0),
    };
  },

  async updateOrderStatus(orderId, status) {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);
    if (error) throw error;
  },

  // ── Image Upload ──────────────────────────────────────────
  async uploadImage(restaurantId, file) {
    const ext  = file.name.split('.').pop();
    const path = `${restaurantId}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from('menu-images')
      .upload(path, file, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from('menu-images').getPublicUrl(path);
    return data.publicUrl;
  },
};

window.Auth = Auth;
window.DB   = DB;
