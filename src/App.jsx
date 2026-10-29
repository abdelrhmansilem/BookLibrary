import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import About from "./pages/About";
import BookDetails from "./pages/BookDetails";
import Books from "./pages/Books";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";
import DocsPage from "./pages/DocsPage";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

/**
 * The route table. `Layout` is the parent route: navbar and footer are rendered once
 * and every page is injected into its <Outlet />.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
