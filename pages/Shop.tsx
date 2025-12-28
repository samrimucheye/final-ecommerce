
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';
import { ProductSkeleton } from '../components/SkeletonLoader';

interface ShopProps {
  products: Product[];
  addToCart: (p: Product) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  searchQuery?: string;
}

const ITEMS_PER_PAGE = 12;

const Shop: React.FC<ShopProps> = ({ products, addToCart, wishlist, onToggleWishlist, searchQuery = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating'>('rating');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const filteredProducts = products
    .filter(p => {
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return b.rating - a.rating;
    });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [selectedCategory, sortBy, searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-8">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Categories</h3>
            <div className="space-y-2">
              <button 
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left px-4 py-2 rounded-xl text-sm transition ${!selectedCategory ? 'bg-blue-600 text-white font-bold' : 'text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800'}`}
              >
                All Products
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`w-full text-left px-4 py-2 rounded-xl text-sm transition ${selectedCategory === cat.name ? 'bg-blue-600 text-white font-bold' : 'text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Price Range</h3>
            <div className="space-y-4">
              <input type="range" className="w-full h-2 bg-gray-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              <div className="flex justify-between text-xs text-gray-500 dark:text-slate-500">
                <span>$0</span>
                <span>$500+</span>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-8 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 transition-colors">
            <div>
              <p className="text-sm text-gray-500 dark:text-slate-400"><span className="font-bold text-slate-800 dark:text-white">{filteredProducts.length}</span> products found</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-slate-400">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent border-none outline-none text-sm font-bold text-slate-800 dark:text-white cursor-pointer"
              >
                <option value="rating">Best Rating</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {paginatedProducts.map(p => (
                  <ProductCard 
                    key={p.id} 
                    product={p} 
                    onAddToCart={() => addToCart(p)} 
                    isWishlisted={wishlist.includes(p.id)}
                    onToggleWishlist={() => onToggleWishlist(p.id)}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 pt-8 border-t border-gray-100 dark:border-slate-800">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                        currentPage === page
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                          : 'bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-gray-500 dark:text-slate-400 hover:border-blue-600 hover:text-blue-600'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 transition-colors">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">No products found</h3>
              <p className="text-gray-500 dark:text-slate-400">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
