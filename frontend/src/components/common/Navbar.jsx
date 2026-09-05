import React from 'react'
import { Link } from 'react-router-dom';
import {Sheet,SheetContent,SheetHeader,SheetTitle,SheetTrigger,SheetClose} from "@/components/ui/sheet";
import {
  Home,
  Package,
  Grid2X2,
  Heart,
  ShoppingCart,
  User,
  Menu,
} from "lucide-react";

const Navbar = () => {

  return (
    // DeskTop Ribbon 
  <nav className="w-full px-6 py-4 bg-white border-b shadow-sm">
      {/* Desktop Navbar */}
<div className="hidden md:flex w-full justify-center py-1">
  <div className="flex items-center justify-between w-full max-w-6xl">

    {/* Logo */}
    <Link
      to="/"
      className="font-bold text-xl"
    >
      ShopSphere
    </Link>

    {/* Main Navigation */}
    <div className="flex items-center gap-8">

      <Link
        to="/"
        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
      >
        <Home size={18} />
        <span>Home</span>
      </Link>

      <Link
        to="/products"
        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
      >
        <Package size={18} />
        <span>Products</span>
      </Link>

      <Link
        to="/categories"
        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
      >
        <Grid2X2 size={18} />
        <span>Categories</span>
      </Link>

    </div>

    {/* User Actions */}
    <div className="flex items-center gap-5">

      <Link
        to="/wishlist"
        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
      >
        <Heart size={18} />
        <span>Wishlist</span>
      </Link>

      <Link
        to="/cart"
        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
      >
        <ShoppingCart size={18} />
        <span>Cart</span>
      </Link>

      <Link
        to="/login"
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
      >
        <User size={18} />
        <span>Login</span>
      </Link>

    </div>

  </div>
</div>
    
      <div className="md:hidden">

  {/* Mobile Header */}
  <div className="flex items-center justify-between px-1.5 py-2 font-medium text-xl">
    
    <Link
  to="/"
  className="font-bold text-xl"
>
  ShopSphere
</Link>

    


  {/* Mobile Sidebar */}
    <Sheet>

      <SheetTrigger
  render={
    <button type="button">
      <Menu size={28} />
    </button>
  }
/>

      <SheetContent side="left">

        <SheetHeader>
          <SheetTitle>
            ShopSphere
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-5 mt-8 px-5 text-2xl">

          <SheetClose
  render={
    <Link
      to="/"
      className="flex items-center gap-4 hover:text-primary transition-colors"
    />
  }
>
  <Home size={24} />
  Home
</SheetClose>

          <SheetClose
  render={
    <Link
      to="/products"
      className="flex items-center gap-4 hover:text-primary transition-colors"
    />
  }
>
  <Package size={24} />
  Products
</SheetClose>

          <SheetClose
  render={
    <Link
      to="/categories"
      className="flex items-center gap-4 hover:text-primary transition-colors"
    />
  }
>
  <Grid2X2 size={24} />
  Categories
</SheetClose>

          <SheetClose
  render={
    <Link
      to="/wishlist"
      className="flex items-center gap-4 hover:text-primary transition-colors"
    />
  }
>
  <Heart size={24} />
  Wishlist
</SheetClose>

          <SheetClose
  render={
    <Link
      to="/cart"
      className="flex items-center gap-4 hover:text-primary transition-colors"
    />
  }
>
  <ShoppingCart size={24} />
  Cart
</SheetClose>

          <SheetClose
  render={
    <Link
      to="/login"
      className="flex items-center gap-4 hover:text-primary transition-colors"
    />
  }
>
  <User size={24} />
  Login
</SheetClose>

        </div>

      </SheetContent>

    </Sheet>


  </div>
</div>
    </nav>
    
    
    
    
  );
};
export default Navbar