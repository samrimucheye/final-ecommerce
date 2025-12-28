
import React from 'react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

interface WishlistProps {
  products: Product[];
  addToCart: (p: Product) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
}

const Wishlist: React.FC<WishlistProps> = ({ products, addToCart, wishlist, onToggleWishlist }) => {
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-800">My Wishlist</h1>
          <p className="text-gray-500 mt-2">Products you've saved for later.</p>
        </div>
        <Link to="/shop" className="text-sm font-bold text-blue-600 hover:underline">
          Continue Shopping →
        </Link>
      </div>

      {wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map(p => (
            <ProductCard 
              key={p.id} 
              product={p} 
              onAddToCart={() => addToCart(p)} 
              isWishlisted={true}
              onToggleWishlist={() => onToggleWishlist(p.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-white rounded-[40px] border border-gray-100">
          <div className="text-6xl mb-6">🖤</div>
          <h3 className="text-2xl font-black text-slate-800 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            You haven't saved any items yet. Start browsing our shop to find something you love!
          </p>
          <Link to="/shop" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition">
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
