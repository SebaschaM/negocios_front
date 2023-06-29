import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Cart, Home, Login, Products, Register } from "../pages";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
};
