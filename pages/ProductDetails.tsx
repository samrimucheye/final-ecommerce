
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductDetailsProps {
  products: Product[];
  addToCart: (p: Product) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ products, addToCart }) => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [qty, setQty] = useState(1);

  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-bold">Product not found</h2>
      <Link to="/shop" className="text-blue-600 hover:underline mt-4 inline-block">Back to Shop</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
        {/* Gallery */}
        <div className="flex-1 space-y-4">
          <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-50 cursor-pointer hover:ring-2 hover:ring-blue-600 transition">
                <img src={`https://picsum.photos/seed/${product.id}${i}/200`} alt="Thumb" className="w-full h-full object-cover opacity-60 hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{product.category}</span>
            <h1 className="text-4xl font-extrabold text-slate-800">{product.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-yellow-500 font-bold">
                ★ {product.rating.toFixed(1)} <span className="text-gray-400 font-normal text-xs ml-2">(128 reviews)</span>
              </div>
              <div className="h-4 w-[1px] bg-gray-200"></div>
              <div className={`text-sm font-bold ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-end space-x-4">
              <span className="text-4xl font-black text-blue-600">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through mb-1">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <p className="text-sm text-gray-500">Free worldwide shipping on orders over $50.</p>
          </div>

          <div className="h-[1px] bg-gray-100"></div>

          <div className="space-y-4">
            <h4 className="font-bold text-slate-800">Description</h4>
            <p className="text-gray-500 leading-relaxed text-sm">
              {product.description} Experience the ultimate in design and functionality. This premium item is crafted with attention to every detail, ensuring you get the best performance and style. 
              {product.importedFrom === 'CJ' && " Imported via CJ Dropshipping logistics for direct-to-door delivery."}
            </p>
          </div>

          <div className="space-y-6 pt-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden h-14 bg-gray-50">
                <button onClick={() => setQty(q => Math.max(1, q-1))} className="px-5 h-full hover:bg-gray-100 text-slate-800 transition">-</button>
                <span className="w-12 text-center font-bold text-slate-800">{qty}</span>
                <button onClick={() => setQty(q => q+1)} className="px-5 h-full hover:bg-gray-100 text-slate-800 transition">+</button>
              </div>
              <button 
                onClick={() => addToCart({ ...product })}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-xl font-bold transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98]"
              >
                Add to Cart
              </button>
            </div>
            <button className="w-full h-14 rounded-xl border-2 border-slate-800 text-slate-800 font-bold hover:bg-slate-800 hover:text-white transition-all">Buy It Now</button>
          </div>

          <div className="flex items-center space-x-8 pt-4">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center">✓</span>
              <span>1 Year Warranty</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">↺</span>
              <span>30 Day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
