# 🍽️ MenuCraft Pro

> منصة مفتوحة المصدر لإنشاء منيوهات المطاعم الرقمية — تصميم احترافي، رفع Excel، سلة طلبات

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## ✨ المميزات

| الميزة | التفاصيل |
|--------|----------|
| 📊 رفع Excel | قراءة تلقائية للأطباق والفئات والأسعار |
| 🎨 مولّد الستايلات | 6 أنماط + مولّد إبداعي عشوائي |
| 🍽️ أشكال بطاقات | 5 أشكال فريدة للأطباق |
| 📱 معاينة مباشرة | هاتف تفاعلي في لوحة التحكم |
| 🛒 سلة طلبات | إضافة، تعديل، تأكيد الطلب |
| 🔗 رابط خاص | رابط فريد لكل مطعم |
| 🖼️ رفع صور | مطابقة تلقائية بأسماء الأطباق |
| 💾 حفظ محلي | بدون قاعدة بيانات — localStorage |

---

## 🚀 تشغيل المشروع

### مباشرة في المتصفح
```bash
# افتح index.html مباشرة — لا يحتاج سيرفر
open index.html
```

### سيرفر محلي (موصى به)
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .

# VS Code
# استخدم امتداد Live Server
```
ثم افتح: `http://localhost:8000`

---

## 📁 هيكل المشروع

```
menucraft-pro/
├── index.html           ← صفحة الترحيب
├── dashboard.html       ← لوحة التحكم الكاملة
├── menu.html            ← عارض المنيو
│
├── css/
│   ├── main.css         ← الأنماط الأساسية المشتركة
│   ├── landing.css      ← صفحة الترحيب
│   ├── dashboard.css    ← لوحة التحكم
│   └── menu.css         ← عارض المنيو
│
├── js/
│   ├── storage.js       ← محرك التخزين (localStorage)
│   ├── dashboard.js     ← منطق لوحة التحكم
│   └── menu.js          ← منطق عارض المنيو
│
├── README.md
├── LICENSE
└── .gitignore
```

---

## 📊 نموذج Excel

| الفئة | الاسم | السعر | الوصف | سعر قديم | شارة |
|-------|-------|-------|-------|----------|------|
| المقبلات | شيش طاووق مشوي | 55 | دجاج طري متبّل... | 75 | الأكثر طلباً |
| البيتزا | مارغريتا | 58 | صوص طماطم... | | كلاسيك |

**الأعمدة المدعومة بالعربي والإنجليزي:**
- الفئة / Category / Cat
- الاسم / Name
- السعر / Price
- الوصف / Description / Desc
- سعر قديم / Old
- شارة / Tag / Badge

---

## 🔗 كيف يعمل الرابط

```
menu.html?slug=my-restaurant
```

كل منيو له `slug` فريد تحدده في لوحة التحكم.  
البيانات محفوظة في `localStorage` المتصفح.

---

## 🌐 النشر على GitHub Pages

```bash
# 1. أنشئ مستودع جديد على GitHub
git init
git add .
git commit -m "🚀 Initial release — MenuCraft Pro"
git remote add origin https://github.com/YOUR_USERNAME/menucraft-pro.git
git push -u origin main

# 2. فعّل GitHub Pages:
# Settings → Pages → Deploy from branch → main → / (root) → Save

# 3. رابطك سيكون:
# https://YOUR_USERNAME.github.io/menucraft-pro/
```

---

## 🛠️ التقنيات

| التقنية | الاستخدام |
|---------|-----------|
| HTML5 / CSS3 | البنية والتصميم |
| Vanilla JavaScript | المنطق الكامل |
| SheetJS (xlsx) | قراءة ملفات Excel |
| Tabler Icons | أيقونات الواجهة |
| Google Fonts | Bebas Neue + Cairo |
| localStorage API | حفظ البيانات |

---

## 🎨 ستايلات المنيو

1. **داكن كلاسيكي** — خلفية سوداء، ألوان خضراء
2. **فاتح أنيق** — خلفية بيضاء نظيفة
3. **ذهبي فاخر** — ذهبي على أسود
4. **زجاجي** — Glass Morphism أزرق
5. **بني دافئ** — بني ودافئ
6. **نيون** — نيون على أسود

## 🍽️ أشكال بطاقات الأطباق

1. **Dark Luxury** — بطاقات داكنة فاخرة
2. **Polaroid Stack** — بطاقات بولارويد
3. **Diagonal Slash** — قطع قطري
4. **Arch Cards** — قوس معماري
5. **Wave Ribbon** — شرائط متموجة

---

## 📄 الرخصة

MIT License — استخدم بحرية في مشاريعك التجارية والشخصية.

---

## 💡 ملاحظات مهمة

- التخزين محلي في المتصفح — البيانات لا تُشارك تلقائياً بين أجهزة مختلفة
- للنشر السحابي الحقيقي، يحتاج ربط بقاعدة بيانات مثل Supabase أو Firebase
- استخدم "تصدير البيانات" في لوحة التحكم لنسخ احتياطية JSON

---

صُنع بـ ❤️ لأصحاب المطاعم
