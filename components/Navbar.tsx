
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User } from '../types';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onCartClick: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  user: User | null;
  onLogout: () => void;
  onLoginClick: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  wishlistCount, 
  onCartClick, 
  searchQuery, 
  setSearchQuery,
  user,
  onLogout,
  onLoginClick,
  theme,
  toggleTheme
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPath = location.pathname.startsWith('/admin');

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (location.pathname !== '/shop' && value.trim().length > 0) {
      navigate('/shop');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 shrink-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">SB</div>
              <span className="text-xl font-bold text-slate-800 dark:text-white">ShopBlue</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className={`text-sm font-bold transition ${isActive('/') ? 'text-blue-600' : 'text-gray-500 dark:text-slate-400 hover:text-blue-600'}`}>Home</Link>
              <Link to="/shop" className={`text-sm font-bold transition ${isActive('/shop') ? 'text-blue-600' : 'text-gray-500 dark:text-slate-400 hover:text-blue-600'}`}>Shop</Link>
              <Link to="/about" className={`text-sm font-bold transition ${isActive('/about') ? 'text-blue-600' : 'text-gray-500 dark:text-slate-400 hover:text-blue-600'}`}>About</Link>
              <Link to="/contact" className={`text-sm font-bold transition ${isActive('/contact') ? 'text-blue-600' : 'text-gray-500 dark:text-slate-400 hover:text-blue-600'}`}>Contact</Link>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8 hidden lg:block">
            <div className="relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search products..." 
                className="w-full bg-gray-100 dark:bg-slate-800 border-none rounded-full py-2 px-10 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all dark:text-white"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>

          <div className="flex items-center space-x-1 md:space-x-4">
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-gray-700 dark:text-slate-300"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              )}
            </button>

            <Link to="/admin" className={`hidden md:block px-4 py-2 rounded-lg font-bold text-xs transition ${isAdminPath ? 'bg-blue-600 text-white' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100'}`}>
              Admin
            </Link>

            <Link to="/wishlist" className="relative cursor-pointer group p-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-full transition">
              <svg className={`w-6 h-6 ${isActive('/wishlist') ? 'text-red-500' : 'text-gray-700 dark:text-slate-300 group-hover:text-red-500'}`} fill={isActive('/wishlist') ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.318L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg shadow-red-500/30">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            <div onClick={onCartClick} className="relative cursor-pointer group p-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-full transition">
              <svg className="w-6 h-6 text-gray-700 dark:text-slate-300 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg shadow-blue-500/30">
                  {cartCount}
                </span>
              )}
            </div>
            
            {user ? (
              <div className="hidden sm:flex items-center space-x-3 pl-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 overflow-hidden border border-gray-100 dark:border-slate-700">
                   <img src={user.avatar} alt={user.name} />
                </div>
                <button onClick={onLogout} className="text-xs font-bold text-gray-400 hover:text-red-500 transition">Logout</button>
              </div>
            ) : (
              <button 
                onClick={onLoginClick}
                className="hidden sm:block text-xs font-bold text-slate-800 dark:text-slate-200 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 px-4 py-2 rounded-xl border border-gray-100 dark:border-slate-700 transition"
              >
                Sign In
              </button>
            )}

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 shadow-xl transition-all duration-300 origin-top transform ${isMenuOpen ? 'scale-y-100 opacity-100 visible' : 'scale-y-0 opacity-0 invisible'}`}>
        <div className="px-6 py-8 space-y-6">
          <div className="flex flex-col space-y-4">
            <Link to="/" className={`text-lg font-bold transition ${isActive('/') ? 'text-blue-600' : 'text-slate-800 dark:text-slate-200 hover:text-blue-600'}`}>Home</Link>
            <Link to="/shop" className={`text-lg font-bold transition ${isActive('/shop') ? 'text-blue-600' : 'text-slate-800 dark:text-slate-200 hover:text-blue-600'}`}>Shop</Link>
            <Link to="/about" className={`text-lg font-bold transition ${isActive('/about') ? 'text-blue-600' : 'text-slate-800 dark:text-slate-200 hover:text-blue-600'}`}>About</Link>
            <Link to="/contact" className={`text-lg font-bold transition ${isActive('/contact') ? 'text-blue-600' : 'text-slate-800 dark:text-slate-200 hover:text-blue-600'}`}>Contact</Link>
          </div>

          <div className="pt-6 border-t border-gray-100 dark:border-slate-800 space-y-4">
            {user ? (
               <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden border border-white dark:border-slate-600">
                    <img src={user.avatar} alt={user.name} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">{user.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Logged In</p>
                  </div>
                </div>
                <button onClick={onLogout} className="text-xs font-bold text-red-500 hover:underline">Logout</button>
              </div>
            ) : (
              <button 
                onClick={onLoginClick}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20"
              >
                Sign In / Register
              </button>
            )}
            <Link 
              to="/admin" 
              className={`block w-full text-center py-4 rounded-xl font-bold transition ${isAdminPath ? 'bg-blue-600 text-white' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100'}`}
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
