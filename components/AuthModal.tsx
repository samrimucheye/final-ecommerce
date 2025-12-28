
import React, { useState } from 'react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: mode === 'login' ? 'Demo User' : formData.name,
        email: formData.email,
        avatar: `https://picsum.photos/seed/${formData.email}/40/40`
      };
      onSuccess(mockUser);
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 border border-gray-100 dark:border-slate-800">
        <div className="p-10">
          <header className="text-center space-y-2 mb-10">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold mx-auto mb-4">SB</div>
            <h2 className="text-3xl font-black text-slate-800 dark:text-white">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="text-gray-400 dark:text-slate-400 text-sm">Join ShopBlue to experience premium shopping.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  placeholder="Jane Doe"
                  className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all text-slate-800 dark:text-white placeholder:text-gray-300 dark:placeholder:text-slate-600"
                />
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                placeholder="jane@example.com"
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all text-slate-800 dark:text-white placeholder:text-gray-300 dark:placeholder:text-slate-600"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Password</label>
              <input 
                required
                type="password" 
                value={formData.password}
                onChange={e => setFormData(p => ({ ...p, password: e.target.value }))}
                placeholder="••••••••"
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all text-slate-800 dark:text-white placeholder:text-gray-300 dark:placeholder:text-slate-600"
              />
            </div>

            <button 
              disabled={isLoading}
              type="submit"
              className="w-full bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white py-5 rounded-2xl font-black transition-all shadow-xl shadow-slate-900/10 dark:shadow-blue-500/20 flex items-center justify-center space-x-3 active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Please Wait...</span>
                </>
              ) : (
                <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-slate-800">
            <p className="text-center text-sm text-gray-500 dark:text-slate-400">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
              >
                {mode === 'login' ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
             <button className="flex items-center justify-center space-x-2 py-3 border border-gray-100 dark:border-slate-800 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition text-slate-800 dark:text-white">
                <span className="text-lg">G</span>
                <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase">Google</span>
             </button>
             <button className="flex items-center justify-center space-x-2 py-3 border border-gray-100 dark:border-slate-800 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition text-slate-800 dark:text-white">
                <span className="text-lg"></span>
                <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase">Apple</span>
             </button>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center justify-center text-gray-400 transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
