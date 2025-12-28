
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface ProductDetailsProps {
  products: Product[];
  addToCart: (p: Product) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ products, addToCart, wishlist, onToggleWishlist }) => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [qty, setQty] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    window.scrollTo(0, 0);
    setQty(1);
    setIsZoomed(false);
  }, [id]);

  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-bold dark:text-white">Product not found</h2>
      <Link to="/shop" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">Back to Shop</Link>
    </div>
  );

  const isWishlisted = wishlist.includes(product.id);
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 8);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-20">
      <div className="flex flex-col lg:flex-row gap-12 bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
        {/* Gallery */}
        <div className="flex-1 space-y-4">
          <div 
            className="aspect-square bg-gray-50 dark:bg-slate-800 rounded-2xl overflow-hidden relative cursor-zoom-in"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className={`w-full h-full object-cover transition-transform duration-200 ease-out pointer-events-none ${
                isZoomed ? 'scale-[2.5]' : 'scale-100'
              }`} 
              style={{ transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }}
            />
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product.id);
              }}
              className={`absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 pointer-events-auto z-10 ${
                isWishlisted ? 'bg-red-500 text-white' : 'bg-white dark:bg-slate-700 text-gray-400 hover:text-red-500'
              }`}
            >
              <svg className="w-6 h-6" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.318L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">{product.category}</span>
            <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white">{product.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-yellow-500 font-bold">
                ★ {product.rating.toFixed(1)}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-end space-x-4">
              <span className="text-4xl font-black text-blue-600 dark:text-blue-400">${product.price.toFixed(2)}</span>
            </div>
          </div>

          <div className="h-[1px] bg-gray-100 dark:bg-slate-800"></div>

          <div className="space-y-4">
            <h4 className="font-bold text-slate-800 dark:text-white">Description</h4>
            <p className="text-gray-500 dark:text-slate-400 leading-relaxed text-sm">
              {product.description}
            </p>
          </div>

          <div className="space-y-6 pt-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-200 dark:border-slate-800 rounded-xl overflow-hidden h-14 bg-gray-50 dark:bg-slate-800 transition-colors">
                <button onClick={() => setQty(q => Math.max(1, q-1))} className="px-5 h-full hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white transition">-</button>
                <span className="w-12 text-center font-bold text-slate-800 dark:text-white">{qty}</span>
                <button onClick={() => setQty(q => q+1)} className="px-5 h-full hover:bg-gray-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white transition">+</button>
              </div>
              <button 
                onClick={() => addToCart({ ...product })}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-xl font-bold transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98]"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
