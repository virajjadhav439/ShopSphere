import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // DeskTop Ribbon 
  <nav className="w-full px-6 py-4 bg-white border-b shadow-sm">
      {/* Desktop Navbar */}
      <div className="hidden md:flex w-full justify-center py-1">
        <div className='flex justify-between'>
        <Link to="/" className="px-8 mr-10">
  ShopSphere
  </Link>
        <div className="flex items-center gap-7.5 px-10">
          <Link to="/">
          <span>Home</span>
          </Link>
          <Link to="/products">
          <span>Products</span>
          </Link>
          <Link to="/categories">
          <span>Categories</span>
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <Link to="/wishlist">
          <span>Wishlist</span>
          </Link>
          <Link to="/cart">
          <span>Cart</span>
          </Link>
          <Link to="/login">
          <span>Login</span>
          </Link>
        </div>
        </div>
      </div>

    
      <div className="md:hidden">

  {/* Mobile Header */}
  <div className="flex items-center justify-between px-1.5 py-2">
    
    <Link to="/">
      ShopSphere
    </Link>

    <button onClick={() => setIsOpen(!isOpen)}  className='font-bold'>
      {isOpen ? "✕" : "☰"}
    </button>

  </div>

  {/* Mobile Sidebar */}
  {isOpen && (
    <div className="flex flex-col gap-4 mt-4">
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/categories">Categories</Link>
      <Link to="/wishlist">Wishlist</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/login">Login</Link>
    </div>
  )}

</div>
    </nav>
    
    
    
    
  );
};
export default Navbar