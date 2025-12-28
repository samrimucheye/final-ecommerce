
import React, { useState, useEffect, useRef } from 'react';
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
  const [sdkReady, setSdkReady] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [paypalError, setPaypalError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: ''
  });

  const formDataRef = useRef(formData);
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);
  
  const paypalButtonRef = useRef<HTMLDivElement>(null);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Robust script loader with global error catching for bootstrap issues
  const loadPaypalSdk = (clientId: string) => {
    return new Promise((resolve, reject) => {
      // If already loaded, return existing instance
      if ((window as any).paypal) {
        resolve((window as any).paypal);
        return;
      }

      // Handle the "Can not read window host" error which often fires as a global error
      // from the PayPal SDK script during its internal bootstrap process.
      const errorHandler = (event: ErrorEvent) => {
        if (event.message?.includes("Can not read window host") || event.error?.message?.includes("host")) {
          window.removeEventListener('error', errorHandler);
          reject(new Error("PAYPAL_HOST_RESTRICTION"));
        }
      };
      window.addEventListener('error', errorHandler);

      const script = document.createElement('script');
      // Added data-namespace and data-sdk-integration-source to help with context identification
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&intent=capture&data-sdk-integration-source=button-factory`;
      script.id = 'paypal-sdk';
      script.async = true;
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        window.removeEventListener('error', errorHandler);
        // Check if paypal object actually initialized correctly
        if ((window as any).paypal) {
          resolve((window as any).paypal);
        } else {
          reject(new Error("PAYPAL_INIT_FAILED"));
        }
      };

      script.onerror = () => {
        window.removeEventListener('error', errorHandler);
        reject(new Error("SCRIPT_LOAD_ERROR"));
      };

      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    let paypalButtons: any = null;
    let isMounted = true;

    const renderPayPalButtons = async () => {
      if (paymentMethod !== 'paypal') return;
      
      setPaypalError(null);
      setSdkReady(false);

      try {
        const clientId = process.env.PAYPAL_CLIENT_ID || 'sb';
        const paypal: any = await loadPaypalSdk(clientId);
        
        if (!isMounted) return;
        setSdkReady(true);

        if (paypalButtonRef.current) {
          paypalButtonRef.current.innerHTML = '';
          
          paypalButtons = paypal.Buttons({
            style: {
              layout: 'vertical',
              color: 'blue',
              shape: 'rect',
              label: 'paypal'
            },
            createOrder: (data: any, actions: any) => {
              return actions.order.create({
                purchase_units: [{
                  amount: { 
                    value: total.toFixed(2), 
                    currency_code: 'USD' 
                  },
                  description: `ShopBlue Order - ${cart.length} items`
                }]
              });
            },
            onApprove: async (data: any, actions: any) => {
              setLoading(true);
              try {
                const details = await actions.order.capture();
                if (!isMounted) return;

                const newOrder: Order = {
                  id: details.id || Math.random().toString(36).substr(2, 9).toUpperCase(),
                  items: [...cart],
                  total: total,
                  status: 'Processing',
                  customer: {
                    name: formDataRef.current.fullName || (details.payer.name?.given_name + ' ' + details.payer.name?.surname),
                    email: formDataRef.current.email || details.payer.email_address,
                  },
                  date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                };
                
                addOrder(newOrder);
                clearCart();
                setLoading(false);
                alert('PayPal Payment Successful! Order Placed.');
                navigate('/');
              } catch (e) {
                console.error("Capture Error:", e);
                setPaypalError("Payment capture failed. Please contact support.");
                setLoading(false);
              }
            },
            onError: (err: any) => {
              console.error('PayPal Component Error:', err);
              if (isMounted) {
                const errMsg = err.toString();
                if (errMsg.includes("host") || errMsg.includes("origin")) {
                  setPaypalError("PayPal is unable to load in this environment due to security restrictions. This usually happens in restricted browser previews. Please use the 'Credit Card' option instead.");
                } else {
                  setPaypalError("A technical error occurred with the PayPal interface. Please try another method.");
                }
              }
            }
          });

          if (paypalButtons.isEligible()) {
            await paypalButtons.render(paypalButtonRef.current);
          } else {
            setPaypalError("This payment method is not available for your current configuration.");
          }
        }
      } catch (err: any) {
        console.error("SDK Load Error:", err);
        if (!isMounted) return;
        
        if (err.message === "PAYPAL_HOST_RESTRICTION") {
          setPaypalError("Your browser environment has restricted PayPal's access (Can not read window host). This is common in private browsing or embedded previews. Please use the 'Credit Card' payment method instead.");
        } else {
          setPaypalError("Could not initialize the PayPal checkout interface. Please check your internet connection.");
        }
      }
    };

    renderPayPalButtons();

    return () => {
      isMounted = false;
      if (paypalButtons && typeof paypalButtons.close === 'function') {
        paypalButtons.close().catch(() => {});
      }
    };
  }, [paymentMethod, total, cart.length, addOrder, clearCart, navigate]);

  useEffect(() => {
    if (user) setFormData(p => ({ ...p, fullName: p.fullName || user.name, email: p.email || user.email }));
  }, [user]);

  useEffect(() => { if (!user && cart.length > 0) navigate('/'); }, [user, navigate, cart.length]);

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const newOrder: Order = {
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        items: [...cart], total, status: 'Processing',
        customer: { name: formData.fullName, email: formData.email },
        date: new Date().toLocaleDateString()
      };
      addOrder(newOrder); clearCart(); setLoading(false);
      alert('Order Placed Successfully (Simulated)!'); navigate('/');
    }, 2000);
  };

  if (cart.length === 0 && !loading) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center dark:text-white">
      <h2 className="text-3xl font-black mb-4">Your cart is empty</h2>
      <Link to="/shop" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold inline-block">Go to Shop</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <div className="mb-8">
             <h1 className="text-4xl font-black text-slate-800 dark:text-white">Checkout</h1>
             <p className="text-gray-400 dark:text-slate-400 mt-2">Finish your order and we'll handle the rest.</p>
          </div>
          
          <div className="space-y-8">
            <section className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-gray-100 dark:border-slate-800 shadow-sm space-y-8 transition-colors">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center space-x-3">
                <span className="w-8 h-8 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center text-xs font-black">1</span>
                <span>Shipping Information</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                  <input required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 dark:text-white transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 dark:text-white transition-all" />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Delivery Address</label>
                  <input required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 dark:text-white transition-all" />
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-gray-100 dark:border-slate-800 shadow-sm space-y-8 transition-colors">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center space-x-3">
                <span className="w-8 h-8 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center text-xs font-black">2</span>
                <span>Payment Method</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div onClick={() => setPaymentMethod('card')} className={`border-2 p-6 rounded-[24px] cursor-pointer relative transition-all ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20' : 'border-gray-100 dark:border-slate-800 dark:bg-slate-800 hover:border-blue-200'}`}>
                   <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-800 dark:text-white text-sm">Credit Card</span>
                    <span className="text-xs">💳</span>
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase font-black">Fast processing</p>
                </div>
                <div onClick={() => setPaymentMethod('paypal')} className={`border-2 p-6 rounded-[24px] cursor-pointer relative transition-all ${paymentMethod === 'paypal' ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20' : 'border-gray-100 dark:border-slate-800 dark:bg-slate-800 hover:border-blue-200'}`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-800 dark:text-white text-sm">PayPal</span>
                    <span className="text-xs">🅿️</span>
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase font-black">Secure Checkout</p>
                </div>
              </div>

              {paymentMethod === 'card' ? (
                <form onSubmit={handleCardSubmit} className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required className="w-full md:col-span-2 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 dark:text-white" placeholder="Card Number (0000 0000 0000 0000)" />
                    <input required className="bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 dark:text-white" placeholder="MM/YY" />
                    <input required className="bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 dark:text-white" placeholder="CVC" />
                  </div>
                  <button className="w-full bg-slate-900 dark:bg-blue-600 text-white py-6 rounded-[28px] font-black shadow-xl hover:bg-slate-800 transition-all active:scale-95">Complete Purchase • ${total.toFixed(2)}</button>
                </form>
              ) : (
                <div className="pt-4 space-y-4 animate-in fade-in slide-in-from-top-2">
                  {paypalError ? (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40 p-8 rounded-3xl text-center space-y-3">
                       <p className="text-red-600 dark:text-red-400 text-sm font-black uppercase tracking-wider">⚠️ Connection Blocked</p>
                       <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">{paypalError}</p>
                       <div className="pt-2">
                         <button onClick={() => setPaymentMethod('card')} className="bg-white dark:bg-slate-800 px-6 py-2 rounded-xl text-xs font-black shadow-sm border border-gray-100 dark:border-slate-700 transition hover:scale-105 active:scale-95">Use Credit Card Instead</button>
                       </div>
                    </div>
                  ) : (
                    <div ref={paypalButtonRef} className="min-h-[150px]">
                      {!sdkReady && (
                        <div className="w-full h-32 bg-gray-50 dark:bg-slate-800 rounded-2xl animate-pulse flex items-center justify-center border border-dashed border-gray-200 dark:border-slate-700">
                          <span className="text-gray-300 dark:text-slate-600 text-xs font-bold uppercase tracking-widest">Verifying environment...</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>
        </div>

        <div className="lg:w-96">
          <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-[40px] border border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden transition-colors">
            <div className="bg-slate-900 dark:bg-slate-800 p-8 text-white">
               <h3 className="font-bold text-lg">Order Summary</h3>
               <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">{cart.length} items</p>
            </div>
            <div className="p-8 space-y-4 dark:text-white max-h-[400px] overflow-y-auto custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-3 truncate">
                    <img src={item.image} className="w-8 h-8 rounded-lg object-cover" alt="" />
                    <span className="truncate">{item.name} <span className="text-gray-400 font-medium">x{item.quantity}</span></span>
                  </div>
                  <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="p-8 bg-gray-50 dark:bg-slate-800/50 border-t dark:border-slate-800 space-y-4">
              <div className="flex justify-between text-xs text-gray-400 uppercase font-black"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
              <div className="flex justify-between text-xs text-gray-400 uppercase font-black"><span>Shipping</span><span className="text-green-500">Free</span></div>
              <div className="pt-4 border-t dark:border-slate-700 flex justify-between font-black text-xl dark:text-white"><span>Total</span><span className="text-blue-600 dark:text-blue-400">${total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
