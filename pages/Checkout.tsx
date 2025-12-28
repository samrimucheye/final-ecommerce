
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartItem, Order, User } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  addOrder: (order: Order) => void;
  clearCart: () => void;
  removeFromCart: (id: string) => void;
  user: User | null;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, addOrder, clearCart, removeFromCart, user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: ''
  });

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // If user state updates, update form data
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: prev.fullName || user.name,
        email: prev.email || user.email
      }));
    }
  }, [user]);

  // Protect route if no user (fallback)
  useEffect(() => {
    if (!user && cart.length > 0) {
      navigate('/');
    }
  }, [user, navigate, cart.length]);

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
          name: formData.fullName,
          email: formData.email,
        },
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      
      addOrder(newOrder);
      clearCart();
      setLoading(false);
      alert('Order Placed Successfully! Thank you for shopping with ShopBlue.');
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
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <div className="mb-8">
             <h1 className="text-4xl font-black text-slate-800">Checkout</h1>
             <p className="text-gray-400 mt-2">Finish your order and we'll handle the rest.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
              <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-3">
                <span className="w-8 h-8 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xs font-black">1</span>
                <span>Shipping Information</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    name="fullName" 
                    required 
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-100 transition-all" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    name="email" 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-100 transition-all" 
                    placeholder="john@example.com" 
                  />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Delivery Address</label>
                  <input 
                    required 
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-100 transition-all" 
                    placeholder="123 Luxury Lane, Apt 4B" 
                  />
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
              <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-3">
                <span className="w-8 h-8 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xs font-black">2</span>
                <span>Payment Method</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-blue-600 bg-blue-50/50 p-6 rounded-[24px] cursor-pointer relative overflow-hidden group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-800 text-sm">Credit Card</span>
                    <span className="text-xl">💳</span>
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Instant Approval</p>
                  <div className="absolute top-0 right-0 w-8 h-8 bg-blue-600 flex items-center justify-center text-white rounded-bl-xl">✓</div>
                </div>
                <div className="border-2 border-gray-100 p-6 rounded-[24px] cursor-not-allowed opacity-50 bg-gray-50/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-800 text-sm">PayPal</span>
                    <span className="text-xl">🅿️</span>
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Coming soon</p>
                </div>
              </div>
              <div className="space-y-4 pt-2">
                <input required className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-100 transition-all" placeholder="Card Number (0000 0000 0000 0000)" />
                <div className="grid grid-cols-2 gap-4">
                  <input required className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-100 transition-all" placeholder="Exp. (MM/YY)" />
                  <input required className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-100 transition-all" placeholder="CVC" />
                </div>
              </div>
            </section>

            <button 
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white py-6 rounded-[28px] font-black text-xl shadow-2xl shadow-slate-900/20 transition-all flex items-center justify-center space-x-4 active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Securing Order...</span>
                </>
              ) : (
                <span>Complete Purchase • ${total.toFixed(2)}</span>
              )}
            </button>
          </form>
        </div>

        <div className="lg:w-96">
          <div className="sticky top-24 bg-white rounded-[40px] border border-gray-100 shadow-xl overflow-hidden">
            <div className="bg-slate-900 p-8 text-white">
               <h3 className="font-bold text-lg">Order Summary</h3>
               <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">{cart.length} items to be delivered</p>
            </div>
            
            <div className="p-8 space-y-6 max-h-[500px] overflow-y-auto custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="relative w-16 h-16 shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                    <span className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-bl-lg shadow-md">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 truncate">{item.name}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">${item.price.toFixed(2)} each</p>
                  </div>
                  <span className="text-xs font-black text-slate-800">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="p-8 bg-gray-50 border-t border-gray-100 space-y-4">
              <div className="flex justify-between text-xs text-gray-500 font-bold uppercase tracking-widest">
                <span>Subtotal</span>
                <span className="text-slate-800">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 font-bold uppercase tracking-widest">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="text-lg font-black text-slate-800">Grand Total</span>
                <span className="text-2xl font-black text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-center space-x-4 text-gray-400 grayscale opacity-50">
             <span className="text-2xl">💳</span>
             <span className="text-2xl">🛡️</span>
             <span className="text-2xl">📦</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
