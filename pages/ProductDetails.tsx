
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

  // Scroll to top when product ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setQty(1);
  }, [id]);

  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-bold">Product not found</h2>
      <Link to="/shop" className="text-blue-600 hover:underline mt-4 inline-block">Back to Shop</Link>
    </div>
  );

  const isWishlisted = wishlist.includes(product.id);
  
  // Filter related products by category, excluding the current product
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-20">
      <div className="flex flex-col lg:flex-row gap-12 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
        {/* Gallery */}
        <div className="flex-1 space-y-4">
          <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden relative">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <button 
              onClick={() => onToggleWishlist(product.id)}
              className={`absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
                isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'
              }`}
            >
              <svg className="w-6 h-6" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.318L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </button>
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

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-8 pb-12">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-2xl font-black text-slate-800">Related Products</h3>
              <p className="text-gray-500 text-sm mt-1">More from the {product.category} collection.</p>
            </div>
            <Link to="/shop" className="text-sm font-bold text-blue-600 hover:underline">View All Collection</Link>
          </div>
          
          <div className="relative group">
            <div className="flex overflow-x-auto space-x-6 pb-8 snap-x snap-mandatory hide-scrollbar scroll-smooth -mx-4 px-4 md:mx-0 md:px-0">
              {relatedProducts.map(rp => (
                <div key={rp.id} className="min-w-[280px] sm:min-w-[300px] snap-start">
                  <ProductCard 
                    product={rp} 
                    onAddToCart={() => addToCart(rp)}
                    isWishlisted={wishlist.includes(rp.id)}
                    onToggleWishlist={() => onToggleWishlist(rp.id)}
                  />
                </div>
              ))}
            </div>
            
            {/* Visual indicators for scroll (hidden on mobile) */}
            <div className="absolute top-1/2 -left-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
              <div className="w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 pointer-events-none">←</div>
            </div>
            <div className="absolute top-1/2 -right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
              <div className="w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 pointer-events-none">→</div>
            </div>
          </div>
        </section>
      )}
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;
