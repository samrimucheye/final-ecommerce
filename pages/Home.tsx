
import React, { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';

interface HomeProps {
  products: Product[];
  addToCart: (p: Product) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
}

const HERO_SLIDES = [
  {
    id: 1,
    badge: "Summer Sale is Live",
    title: "Summer Collection 2024",
    desc: "Discover the hottest trends and upgrade your style today with our exclusive new arrivals. Free shipping on orders over $50.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80",
    buttonPrimary: "Shop Now",
    buttonSecondary: "Learn More"
  },
  {
    id: 2,
    badge: "Tech Innovation",
    title: "Next-Gen Electronics",
    desc: "Experience the future of smart home technology and audio excellence with our curated high-performance gadgets.",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1920&q=80",
    buttonPrimary: "Explore Tech",
    buttonSecondary: "View Deals"
  },
  {
    id: 3,
    badge: "Urban Lifestyle",
    title: "Modern Minimalist Style",
    desc: "Redefine your wardrobe with essentials that combine comfort, durability, and timeless aesthetic design.",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?auto=format&fit=crop&w=1920&q=80",
    buttonPrimary: "Shop Fashion",
    buttonSecondary: "See Lookbook"
  }
];

const Home: React.FC<HomeProps> = ({ products, addToCart, wishlist, onToggleWishlist }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const trendingProducts = products.filter(p => p.isTrending);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section - Auto Sliding Carousel */}
      <section className="relative h-[600px] bg-gray-100 overflow-hidden">
        {/* Slides Container */}
        <div 
          className="flex h-full transition-transform duration-700 ease-in-out" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {HERO_SLIDES.map((slide) => (
            <div key={slide.id} className="relative min-w-full h-full flex-shrink-0">
              <div className="absolute inset-0">
                <img 
                  src={slide.image} 
                  className="w-full h-full object-cover"
                  alt={slide.title}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
              </div>
              
              <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center text-white">
                <div className="max-w-xl space-y-6">
                  <span className="inline-block bg-blue-600 text-xs font-bold px-3 py-1 rounded-full tracking-wider uppercase animate-in fade-in slide-in-from-left-4 duration-700">
                    {slide.badge}
                  </span>
                  <h1 className="text-6xl font-extrabold leading-tight animate-in fade-in slide-in-from-left-6 duration-700 delay-100">
                    {slide.title}
                  </h1>
                  <p className="text-lg text-gray-100/90 leading-relaxed animate-in fade-in slide-in-from-left-8 duration-700 delay-200">
                    {slide.desc}
                  </p>
                  <div className="flex space-x-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                      {slide.buttonPrimary}
                    </button>
                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold border border-white/30 transition-all active:scale-95">
                      {slide.buttonSecondary}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all z-20 group"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all z-20 group"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
        </button>

        {/* Navigation Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-300 rounded-full h-1.5 ${
                currentSlide === index ? 'w-10 bg-blue-500' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Feature Badges */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: '🚚', title: 'Free Shipping', desc: 'On all orders over $50' },
          { icon: '🎧', title: '24/7 Support', desc: 'Get help when you need it' },
          { icon: '🔒', title: '100% Secure', desc: 'We ensure secure payment' }
        ].map((f, i) => (
          <div key={i} className="flex items-center space-x-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-default">
            <div className="w-12 h-12 bg-blue-50 flex items-center justify-center text-2xl rounded-full">{f.icon}</div>
            <div>
              <h4 className="font-bold text-slate-800">{f.title}</h4>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold text-slate-800">Shop by Category</h2>
          <button className="text-blue-600 font-medium hover:underline text-sm">View All</button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map(cat => (
            <div key={cat.id} className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer text-center space-y-4">
              <div className={`w-16 h-16 ${cat.color} mx-auto rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <h4 className="font-bold text-slate-800">{cat.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold text-slate-800">Trending Now</h2>
          <div className="flex space-x-2">
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-md transition">←</button>
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-md transition">→</button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map(p => (
            <ProductCard 
              key={p.id} 
              product={p} 
              onAddToCart={() => addToCart(p)} 
              isWishlisted={wishlist.includes(p.id)}
              onToggleWishlist={() => onToggleWishlist(p.id)}
            />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-slate-900 rounded-[32px] p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl text-white space-y-6">
            <span className="bg-white/10 px-4 py-1 rounded-full text-xs font-medium border border-white/20">LIMITED TIME OFFER</span>
            <h2 className="text-4xl font-extrabold">Get 50% Off Your First Order</h2>
            <p className="text-gray-400">
              Sign up for our newsletter and unlock exclusive savings on the entire summer collection.
            </p>
            <div className="flex max-w-md bg-white/10 p-1.5 rounded-2xl backdrop-blur-sm border border-white/10">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-transparent px-4 outline-none text-white placeholder:text-gray-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold transition shadow-lg shadow-blue-600/20">Subscribe</button>
            </div>
            <p className="text-[10px] text-gray-500 italic">By subscribing you agree to our Terms & Conditions.</p>
          </div>
          {/* Abstract blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full -mr-48 -mt-24 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
