
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartItem, Order } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  addOrder: (order: Order) => void;
  clearCart: () => void;
  removeFromCart: (id: string) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, addOrder, clearCart, removeFromCart }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      const newOrder: Order = {
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        items: [...cart],
        total: total,
        status: 'Processing',
        customer: {
          name: (e.target as any).fullName.value,
          email: (e.target as any).email.value,
        },
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      
      addOrder(newOrder);
      clearCart();
      setLoading(false);
      alert('Order Placed Successfully! Redirecting to confirmation...');
      navigate('/');
    }, 2000);
  };

  if (cart.length === 0 && !loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-black text-slate-800 mb-4">Your cart is empty</h2>
        <Link to="/shop" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold inline-block">Go to Shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <h1 className="text-3xl font-black text-slate-800 mb-8">Checkout</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <section className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                <span className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-sm">1</span>
                <span>Shipping Information</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Full Name</label>
                  <input name="fullName" required className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
                  <input name="email" type="email" required className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="john@example.com" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Address</label>
                  <input required className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="123 Luxury Lane" />
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                <span className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-sm">2</span>
                <span>Payment Method</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-blue-600 bg-blue-50 p-4 rounded-2xl cursor-pointer">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-800 text-sm">Credit Card</span>
                    <span className="text-xl">💳</span>
                  </div>
                  <p className="text-[10px] text-gray-500">Fast and Secure</p>
                </div>
                <div className="border-2 border-gray-100 p-4 rounded-2xl cursor-not-allowed opacity-50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-800 text-sm">PayPal</span>
                    <span className="text-xl">🅿️</span>
                  </div>
                  <p className="text-[10px] text-gray-500">Coming soon</p>
                </div>
              </div>
              <div className="space-y-4 pt-2">
                <input required className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Card Number" />
                <div className="grid grid-cols-2 gap-4">
                  <input required className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="MM/YY" />
                  <input required className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="CVC" />
                </div>
              </div>
            </section>

            <button 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-5 rounded-[20px] font-black text-lg shadow-2xl shadow-blue-600/30 transition-all flex items-center justify-center space-x-4"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing Payment...</span>
                </>
              ) : (
                <span>Complete Order • ${total.toFixed(2)}</span>
              )}
            </button>
          </form>
        </div>

        <div className="lg:w-96">
          <div className="sticky top-24 bg-slate-900 rounded-[32px] p-8 text-white space-y-6">
            <h3 className="font-bold text-lg">Order Summary</h3>
            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="relative group flex items-start space-x-4 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-white/10">
                  <div className="relative w-16 h-16 shrink-0 bg-white/10 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-bl-xl shadow-md">
                      {item.quantity}
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-white line-clamp-1 pr-4">{item.name}</h4>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove item"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Unit: ${item.price.toFixed(2)}</span>
                      </div>
                      <span className="text-sm font-black text-blue-400">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      <span className="text-[10px] text-gray-500 font-bold uppercase">Ready to Ship</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6 space-y-4">
              <div className="flex justify-between text-sm text-gray-400 font-medium">
                <span>Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
                <span className="text-white">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400 font-medium">
                <span>Shipping Fee</span>
                <span className="text-green-400 font-bold uppercase text-xs tracking-widest">Calculated at next step</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400 font-medium">
                <span>Est. Tax</span>
                <span className="text-white">$0.00</span>
              </div>
              <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                <div>
                  <span className="text-xl font-black text-white">Total Amount</span>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">VAT Included where applicable</p>
                </div>
                <span className="text-2xl font-black text-blue-400">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center text-lg">🛡️</div>
              <div>
                <h5 className="text-[10px] font-black text-white uppercase tracking-widest">ShopBlue Shield</h5>
                <p className="text-[9px] text-gray-400">Secure payment & Buyer protection enabled</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
