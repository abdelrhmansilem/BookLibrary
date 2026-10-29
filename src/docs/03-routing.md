# 3. التوجيه (Routing)

نستخدم **React Router 7** للتنقل بين الصفحات داخل تطبيق صفحة واحدة (SPA): المتصفح لا يطلب صفحة جديدة من الخادم، بل يبدّل المكوّن المعروض فقط.

## جدول المسارات

| المسار | الصفحة |
|---|---|
| `/` | Home |
| `/books` | Books |
| `/books/:id` | BookDetails |
| `/categories` | Categories |
| `/about` | About |
| `/contact` | Contact |
| `/docs` | DocsPage |
| `*` | NotFound |

## أين يُعرَّف كل شيء؟

في `src/App.jsx`:

```jsx
<Routes>
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/books" element={<Books />} />
    <Route path="/books/:id" element={<BookDetails />} />
    ...
  </Route>
</Routes>
```

`Layout` مسار أب بلا مسار (`path`)، ويحتوي `Outlet`. معنى ذلك أن الشريط العلوي والتذييل يظهران في كل الصفحات، والمحتوى فقط يتغيّر.

## الرابط النشط

نستخدم `NavLink` بدل `Link` لأنه يمرّر `isActive` تلقائيًا:

```jsx
<NavLink className={({ isActive }) => isActive ? styles.active : styles.link} to="/books">
```

## قراءة قيم من الرابط

صفحة الكتب تقرأ `q` و `subject` من العنوان:

```jsx
const [searchParams, setSearchParams] = useSearchParams();
const subject = searchParams.get("subject") ?? "";
```

الفائدة: رابط مثل `/books?subject=history` قابل للمشاركة ويُفتح على نفس النتيجة.

## 404

المسار `*` يلتقط أي رابط غير معروف ويعرض صفحة واضحة مع زر رجوع، بدل شاشة بيضاء.

## مشكلة شائعة على Vercel

عندما يفتح المستخدم `/books/OL45804W` مباشرة، يذهب الطلب إلى الخادم الذي لا يعرف هذا الملف. الحل في `vercel.json`:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

فيعيد الخادم `index.html` دائمًا، ويتولى React Router الباقي.
