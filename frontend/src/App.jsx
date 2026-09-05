import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/customer/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Products from "./pages/customer/Products";
import CustomerLayout from "./layouts/CustomerLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminProducts from "./pages/admin/AdminProducts";
import Dashboard from "./pages/admin/Dashboard";
import Categories from "./pages/admin/Categories";
import AdminOrders from "./pages/admin/AdminOrders";
import Analytics from "./pages/admin/Analytics";
import { Toaster } from "react-hot-toast";
import ProductDetails from "./pages/customer/ProductDetails";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import Orders from "./pages/customer/Orders";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={true} />
        <Routes>
          {/* Customer Routes */}
          {/* Customer Routes */}
          <Route element={<CustomerLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
          {/* Authentication Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          {/* Admin routes */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
