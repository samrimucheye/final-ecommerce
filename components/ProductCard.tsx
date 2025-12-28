
import React from 'react';
import { Product } from '../types';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 p-3 hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50 mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-md transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.318L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
        </button>
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </div>
        )}
      </div>
      
      <div className="px-1 pb-2">
        <div className="flex justify-between items-start mb-1">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">{product.name}</h3>
          </Link>
          <div className="flex items-center text-[10px] text-yellow-500 font-bold bg-yellow-50 px-1.5 py-0.5 rounded">
            ★ {product.rating.toFixed(1)}
          </div>
        </div>
        <p className="text-gray-500 text-xs mb-3 line-clamp-1">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-blue-600 font-bold text-lg">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-gray-400 text-xs line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button 
            onClick={onAddToCart}
            className="w-10 h-10 bg-gray-50 hover:bg-blue-600 hover:text-white text-blue-600 rounded-xl flex items-center justify-center transition-all border border-blue-100 hover:border-blue-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
