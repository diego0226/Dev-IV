import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../features/shared/layout/Layout";
import ProductDetail from "../features/products/pages/ProductDetail";
import Products from "../features/products/pages/Products";
import CreateProduct from "../features/products/pages/CreateProduct";
import UserDetail from "../features/users/pages/UserDetail";
import Users from "../features/users/pages/Users";
import CreateUser from "../features/users/pages/CreateUser";
import NotFound from "../features/shared/components/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/products/new" element={<CreateProduct />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="/users/new" element={<CreateUser />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
