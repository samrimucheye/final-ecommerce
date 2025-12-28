
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

  // Scroll to top when product ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setQty(1);
    setIsZoomed(false);
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const shareProduct = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this ${product.name} on ShopBlue!`);
    const media = encodeURIComponent(product.image);

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'pinterest':
        shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${text}`;
        break;
      default:
        return;
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-20">
      <div className="flex flex-col lg:flex-row gap-12 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
        {/* Gallery */}
        <div className="flex-1 space-y-4">
          <div 
            className="aspect-square bg-gray-50 rounded-2xl overflow-hidden relative cursor-zoom-in"
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
              style={{
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
              }}
            />
            
            {/* UI Overlay on Image */}
            <div className="absolute inset-0 pointer-events-none">
              <div className={`absolute inset-0 bg-black/5 transition-opacity duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}></div>
            </div>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product.id);
              }}
              className={`absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 pointer-events-auto z-10 ${
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

          <div className="flex flex-col space-y-6 pt-4">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center">✓</span>
                <span>1 Year Warranty</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">↺</span>
                <span>30 Day Returns</span>
              </div>
            </div>

            {/* Social Sharing */}
            <div className="space-y-3">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Share this product</p>
              <div className="flex space-x-3">
                <button 
                  onClick={() => shareProduct('facebook')}
                  className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all border border-gray-100 hover:border-[#1877F2]"
                  aria-label="Share on Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </button>
                <button 
                  onClick={() => shareProduct('twitter')}
                  className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-all border border-gray-100 hover:border-[#1DA1F2]"
                  aria-label="Share on Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </button>
                <button 
                  onClick={() => shareProduct('pinterest')}
                  className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#BD081C] hover:bg-[#BD081C] hover:text-white transition-all border border-gray-100 hover:border-[#BD081C]"
                  aria-label="Share on Pinterest"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.967 7.398 6.93 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.621 0 11.983-5.362 11.983-11.987C24 5.367 18.638 0 12.017 0z"/></svg>
                </button>
              </div>
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
