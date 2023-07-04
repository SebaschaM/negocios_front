import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Cart,
  Dashboard,
  Home,
  Login,
  Order,
  Products,
  Profile,
  Register,
} from "../pages";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
