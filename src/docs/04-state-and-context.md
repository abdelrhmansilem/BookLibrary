# 4. الحالة و Context

## ما هي «الحالة»؟

أي قيمة تتغيّر مع الوقت ويجب أن تظهر الواجهة بشكل مختلف بناءً عليها. أمثلة في مشروعنا: اللغة الحالية، الثيم، قائمة المفضلة، نتيجة البحث.

## لماذا Context وليس Redux؟

القيم المشتركة عندنا قليلة وبسيطة. `Context` مدمج في React ولا يحتاج مكتبة ولا إعدادات، وهو مفهوم واحد يمكن شرحه في دقيقة:

```jsx
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const value = { theme, setTheme };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

## المزوّدات الثلاثة

### I18nContext — اللغة

- يحتفظ باللغة الحالية (`ar` أو `en`).
- يضبط `document.documentElement.lang` و `dir` عند كل تغيير.
- يوفّر الدالة `t(path)` لترجمة أي نص.
- يقرأ اللغة المحفوظة من `localStorage`، وإن لم توجد يستخدم لغة المتصفح.

### ThemeContext — الثيم

- يحتفظ بـ `light` أو `dark`.
- يضبط `data-theme` على عنصر `html`.
- القيمة الافتراضية من إعدادات نظام المستخدم `prefers-color-scheme`.

### FavouritesContext — المفضلة

- يحتفظ بمصفوفة من معرّفات الكتب.
- `toggleFavourite(id)` تضيف أو تحذف.
- `isFavourite(id)` تجيب هل الكتاب محفوظ.
- كل تغيير يُكتب في `localStorage` تلقائيًا.

## الحالة المحلية

ليست كل حالة عالمية. مثال: نص البحث في صفحة الكتب حالة محلية داخل الصفحة عبر `useState`، ولا داعي لوضعها في Context لأن صفحة واحدة فقط تحتاجها.

> القاعدة: ارفع الحالة إلى Context فقط عندما تحتاجها أكثر من صفحة.

## localStorage وحدوده

- البيانات تخصّ متصفحًا واحدًا وجهازًا واحدًا، ولا تُزامَن.
- وضع التصفح الخاص قد يمنع الكتابة، لذلك كل كتابة داخل `try/catch`.
- المفتاح دائمًا مسبوق بالاسم: `booklibrary.theme`، `booklibrary.lang`، `booklibrary.favourites`.
