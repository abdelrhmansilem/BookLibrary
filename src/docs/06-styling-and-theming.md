# 6. التصميم والثيمات

## نظام التصميم

كل الألوان والمسافات والحدود في ملف واحد: `src/styles/variables.css`. المكوّنات تستخدم المتغيّرات ولا تكتب قيمًا مباشرة:

```css
.card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}
```

## كيف يعمل الوضع الداكن؟

عندنا مجموعتان من القيم: واحدة على `:root` (الفاتح) وأخرى على `[data-theme="dark"]` (الداكن). `ThemeContext` يغيّر السمة على عنصر `html`:

```js
document.documentElement.setAttribute("data-theme", theme);
```

فتتبدّل كل المتغيّرات في لحظة، دون إعادة رسم أي مكوّن ودون أي منطق ألوان في JavaScript.

## CSS Modules

كل مكوّن له ملف `.module.css` بجانبه:

```jsx
import styles from "./BookCard.module.css";
<article className={styles.card}>
```

Vite يولّد أسماء أصناف فريدة، فلا تتعارض الأنماط بين المكوّنات، ونحصل على عزل تلقائي دون أي إعداد.

## الاتجاهين RTL و LTR

نستخدم الخصائص المنطقية بدل `left` و `right`:

- `margin-inline-start` بدل `margin-left`.
- `padding-inline` بدل `padding-left` و `padding-right`.
- `inset-inline-end` بدل `right`.

عند تبديل `dir` على `html`، تنقلب الواجهة كاملة دون تعديل أي ملف CSS.

الأيقونات التي تشير إلى اتجاه (مثل السهم) تنعكس عبر:

```css
:root[dir="rtl"] .flip-rtl { transform: scaleX(-1); }
```

## الخطوط

- العربية: **Cairo**.
- الإنجليزية: **Inter**.
- التحميل من Google Fonts مع `display=swap` حتى لا يتوقف النص عن الظهور.

الخط يُختار عبر `:root[lang="ar"] body`، أي أن تبديل اللغة يبدّل الخط تلقائيًا.

## التجاوب

التصميم يبدأ من الموبايل:

- أقل من 600px: عمودان للكتب.
- 600px: ثلاثة أعمدة.
- 900px: أربعة أعمدة وشريط تنقّل كامل.
- 1200px: خمسة أعمدة.

## الوصول (Accessibility)

- لكل صورة `alt`، ولكل حقل `label`.
- الزر الذي يحتوي أيقونة فقط له `aria-label`.
- `:focus-visible` واضح في كل العناصر.
- التباين محقّق في الثيمين.
