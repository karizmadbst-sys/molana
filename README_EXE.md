# 🪟 دليل تحويل اللعبة إلى برنامج Windows (.exe) عبر GitHub Actions

تم تجهيز المشروع بالكامل ليتم تحويله تلقائياً إلى لعبة ويندوز بصيغة **EXE** عبر **GitHub Actions Workflow** باستخدام **Electron** و **Electron Builder** مع تسريع كامل للرسوميات ثلاثية الأبعاد (WebGL Hardware Acceleration).

---

## 🎮 ماذا ينتج عن البناء؟

ينتج الـ Workflow نسختين لنظام Windows 64-bit:
1. **نسخة محمولة (Portable EXE)**:
   - `ECHO-The-World-Remembers-Portable.exe`
   - تعمل مباشرة بنقرة مزدوجة بدون أي تثبيت!
2. **ملف تثبيت احترافي (Installer EXE)**:
   - `ECHO-The-World-Remembers-1.0.0-x64-nsis.exe`
   - يثبّت اللعبة على الجهاز وينشئ اختصاراً على سطح المكتب وقائمة ابدأ.

---

## ⚙️ الملفات المضافة للمشروع

- **`.github/workflows/build-exe.yml`**: ملف GitHub Workflow الذي يعمل على خادم `windows-latest` لبناء ملفات `.exe` تلقائياً.
- **`electron/main.cjs`**: مشغّل اللعبة على ويندوز (يدير نافذة اللعبة، خادم الملفات المحلي السريع، تسريع GPU/WebGL، ودعم ملء الشاشة عبر `F11` أو `Alt+Enter`).
- **`electron/preload.cjs`**: جسر آمن للتحكم بنافذة سطح المكتب.
- **`electron/icon.png`**: أيقونة اللعبة الرسمية لملفات `.exe`.

---

## 📋 خطوات بناء وتحميل ملف الـ EXE على GitHub:

### الخطوة 1: رفع التعديلات إلى GitHub
```bash
git add .
git commit -m "Add Windows EXE build workflow"
git push origin main
```

### الخطوة 2: تشغيل الـ Workflow
بمجرد عمل `push` سيبدأ البناء تلقائياً، أو يمكنك تشغيله يدوياً:
1. ادخل إلى مستودعك على **GitHub**.
2. افتح تبويب **Actions**.
3. من القائمة اليسرى اختر **🪟 Build Windows EXE (ECHO)**.
4. اضغط **Run workflow** واختر نوع البناء (`both` / `portable` / `installer`) ثم اضغط **Run workflow**.

### الخطوة 3: تحميل ملفات الـ EXE
1. انتظر حتى تكتمل المهمة وتظهر علامة صح خضراء ✅.
2. اضغط على اسم العملية المكتملة.
3. انزل لأسفل الصفحة إلى قسم **Artifacts**.
4. اضغط على **ECHO-Windows-EXE** لتحميل الملف المضغوط الذي يحتوي على ملفات `.exe`.

---

## 🏷️ نشر إصدار رسمي (GitHub Release) تلقائياً:
عند تفعيل خيار `Publish EXE files as a GitHub Release` أثناء التشغيل اليدوي، أو عند رفع Tag جديد:
```bash
git tag v1.0.0
git push origin v1.0.0
```
سيتم إرفاق ملفات `.exe` مباشرة في صفحة **Releases** لتحميلها بسهولة.
