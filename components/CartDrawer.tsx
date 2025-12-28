
import React from 'react';
import { CartItem } from '../types';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQty, onRemove }) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-2xl rounded-l-[40px] overflow-hidden animate-in slide-in-from-right duration-300">
            <div className="px-8 py-8 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-2xl font-black text-slate-800">Your Cart</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-400">✕</button>
            </div>

            <div className="flex-1 py-6 overflow-y-auto px-8 space-y-6">
              {items.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <div className="text-6xl">🛍️</div>
                  <h3 className="text-lg font-bold text-slate-800">Your cart is empty</h3>
                  <p className="text-gray-400 text-sm">Looks like you haven't added anything yet.</p>
                  <button onClick={onClose} className="text-blue-600 font-bold hover:underline">Continue Shopping</button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 group">
                    <div className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-gray-400 mb-2">${item.price.toFixed(2)}</p>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border border-gray-100 rounded-lg overflow-hidden bg-gray-50 h-8">
                          <button onClick={() => onUpdateQty(item.id, -1)} className="px-2 hover:bg-gray-200 transition">-</button>
                          <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                          <button onClick={() => onUpdateQty(item.id, 1)} className="px-2 hover:bg-gray-200 transition">+</button>
                        </div>
                        <button onClick={() => onRemove(item.id)} className="text-[10px] font-bold text-red-500 hover:underline uppercase tracking-wider">Remove</button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-800">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="px-8 py-8 bg-gray-50 border-t border-gray-100 space-y-6">
                <div className="flex justify-between items-center text-gray-500 text-sm">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-500 text-sm">
                  <span>Shipping</span>
                  <span className="text-green-500 font-bold">FREE</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                  <span className="text-lg font-black text-slate-800">Total</span>
                  <span className="text-2xl font-black text-blue-600">${subtotal.toFixed(2)}</span>
                </div>
                <Link 
                  to="/checkout" 
                  onClick={onClose}
                  className="block w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl text-center font-bold shadow-xl shadow-slate-900/20 transition-all active:scale-95"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
