# Nexa

نموذج أولي احترافي لـ **Nexa**: وكيل ذكاء اصطناعي موجّه للتطوير البرمجي، بواجهة مستقبلية وتجربة استخدام متكاملة.

## ما الذي يحتويه هذا الإصدار؟

- شاشة بداية (Splash) بأنيميشن Particles + Glow + Typewriter.
- تدفق بدء الاستخدام: Start → إدخال الاسم → دخول إلى واجهة الشات.
- واجهة شات مستقبلية (Dark UI) مع Split View للأكواد.
- معاينة كود احترافية مع أزرار:
  - Copy
  - Run (JavaScript sandbox محدود)
  - Download
- شخصية Nexa واضحة داخل الواجهة والرسائل الافتتاحية.
- لوحة "Nexa Builder" تعرض Workflow تحويل مشاريع GitHub إلى Android/APK بشكل منظم.
- بنية جاهزة للتوسعة وربط Back-end لاحقًا.

## التشغيل

بما أن المشروع Frontend فقط في هذه المرحلة:

1. افتح الملف `index.html` مباشرة في المتصفح.
2. أو شغّل خادمًا بسيطًا:

```bash
python3 -m http.server 8080
```

ثم افتح:

`http://localhost:8080`

## ملاحظات تقنية

- `app.js` يحتوي منطق:
  - إدارة الحالة (اسم المستخدم، الرسائل، المود).
  - تحليل كتل الكود markdown وعرضها في pane منفصل.
  - أوامر سريعة تُظهر قدرات Nexa المتقدمة كنماذج أولية.
- `styles.css` يقدم نظام ألوان Neon/Dark مع أنيميشنات ناعمة.

## خارطة تطوير مقترحة

- ربط LLM حقيقي (OpenAI/Local Model Gateway).
- إضافة GitHub ingestion service (clone + analyze + summarize).
- إضافة Android build pipeline (Flutter/Kotlin/WebView wrapper).
- إضافة Job queue + sandboxed runners + audit logs.

