import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "../features/shared/layout/Layout";
import ProductDetail from "../features/products/pages/ProductDetail";
import Products from "../features/products/pages/Products";
import CreateProduct from "../features/products/pages/CreateProduct";
import NotFound from "../features/shared/components/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/products/new" element={<CreateProduct />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
