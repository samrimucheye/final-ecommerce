
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onCartClick: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, wishlistCount, onCartClick, searchQuery, setSearchQuery }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPath = location.pathname.startsWith('/admin');

  const isActive = (path: string) => location.pathname === path;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (location.pathname !== '/shop' && value.trim().length > 0) {
      navigate('/shop');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">SB</div>
              <span className="text-xl font-bold text-slate-800">ShopBlue</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className={`text-sm font-bold transition ${isActive('/') ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>Home</Link>
              <Link to="/shop" className={`text-sm font-bold transition ${isActive('/shop') ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>Shop</Link>
              <Link to="/about" className={`text-sm font-bold transition ${isActive('/about') ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>About</Link>
              <Link to="/contact" className={`text-sm font-bold transition ${isActive('/contact') ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>Contact</Link>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8 hidden lg:block">
            <div className="relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search products..." 
                className="w-full bg-gray-100 border-none rounded-full py-2 px-10 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/admin" className={`px-4 py-2 rounded-lg font-bold text-xs transition ${isAdminPath ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}>
              Admin Panel
            </Link>

            <Link to="/wishlist" className="relative cursor-pointer group p-2 hover:bg-gray-50 rounded-full transition">
              <svg className={`w-6 h-6 ${isActive('/wishlist') ? 'text-red-500' : 'text-gray-700 group-hover:text-red-500'}`} fill={isActive('/wishlist') ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.318L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg shadow-red-500/30">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            <div onClick={onCartClick} className="relative cursor-pointer group p-2 hover:bg-gray-50 rounded-full transition">
              <svg className="w-6 h-6 text-gray-700 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg shadow-blue-500/30">
                  {cartCount}
                </span>
              )}
            </div>
            
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden cursor-pointer border border-gray-100 group">
              <img src="https://picsum.photos/seed/user/32/32" alt="Avatar" className="group-hover:scale-110 transition" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
