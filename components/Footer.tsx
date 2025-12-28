
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">SB</div>
              <span className="text-xl font-bold text-slate-800">ShopBlue</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Your one-stop destination for modern trends, electronics, and lifestyle products. We leverage AI-driven dropshipping to bring you the best value globally.
            </p>
            <div className="flex space-x-4">
              {['🌐', '📸', '💼', '🐦'].map((icon, i) => (
                <button key={i} className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-8 uppercase text-xs tracking-widest">Shop</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/shop" className="hover:text-blue-600 transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop" className="hover:text-blue-600 transition-colors">Best Sellers</Link></li>
              <li><Link to="/shop" className="hover:text-blue-600 transition-colors">Electronics</Link></li>
              <li><Link to="/shop" className="hover:text-blue-600 transition-colors">Fashion</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-8 uppercase text-xs tracking-widest">Support</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Shipping Info</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-8 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/about" className="hover:text-blue-600 transition-colors">Our Story</Link></li>
              <li><Link to="/about" className="hover:text-blue-600 transition-colors">Careers</Link></li>
              <li><Link to="/about" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/about" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          <p>© 2024 ShopBlue Inc. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <span className="cursor-pointer hover:text-blue-600">English (US)</span>
            <span className="cursor-pointer hover:text-blue-600">USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
