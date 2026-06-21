# MenuCraft Pro — إعداد Supabase

## الخطوات (15 دقيقة)

### 1. أنشئ مشروع Supabase مجاني
- اذهب إلى: https://supabase.com
- سجّل دخول بـ GitHub أو Google
- اضغط **New Project**
- اختر اسماً للمشروع واختر منطقة `Middle East (Bahrain)` للسرعة
- انتظر دقيقتين لإنشاء المشروع

### 2. شغّل ملف قاعدة البيانات
- افتح مشروعك في Supabase
- اضغط **SQL Editor** من القائمة اليسرى
- اضغط **New Query**
- انسخ محتوى ملف `supabase-setup.sql` والصقه
- اضغط **Run**

### 3. احصل على مفاتيح API
- اذهب إلى **Settings → API**
- انسخ:
  - `Project URL` → يبدأ بـ `https://xxxx.supabase.co`
  - `anon public key` → مفتاح طويل

### 4. أضف المفاتيح للمشروع
- افتح ملف `js/supabase-config.js`
- استبدل:
  ```js
  const SUPABASE_URL = 'YOUR_SUPABASE_URL';     // ← ضع Project URL هنا
  const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY'; // ← ضع anon key هنا
  ```

### 5. انشر المشروع
خيارات النشر المجانية:
- **Netlify**: اسحب مجلد المشروع على netlify.com/drop
- **Vercel**: `npx vercel` من مجلد المشروع
- **GitHub Pages**: ارفع الكود وفعّل Pages من Settings

---

## هيكل الصفحات

| الصفحة | الوصف |
|--------|-------|
| `index.html` | Landing page |
| `register.html` | إنشاء حساب جديد |
| `login.html` | تسجيل الدخول |
| `dashboard.html` | إدارة المنيو + Analytics + QR |
| `menu.html?r=SLUG` | صفحة المنيو العامة للزبائن |

## قاعدة البيانات

| الجدول | الوصف |
|--------|-------|
| `restaurants` | بيانات كل مطعم |
| `menu_items` | أصناف المنيو |
| `menu_views` | تتبع الزيارات |
| `orders` | الطلبات الواردة |
