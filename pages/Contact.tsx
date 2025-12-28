
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl font-black text-slate-800">Get in Touch</h1>
        <p className="text-gray-500 max-w-xl mx-auto text-lg">
          Have questions about an order or want to learn more about our dropshipping partnership? We're here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form */}
        <div className="lg:col-span-3">
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-xl shadow-slate-200/20">
            {isSubmitted ? (
              <div className="py-20 text-center space-y-6 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-4xl mx-auto">✓</div>
                <h3 className="text-2xl font-black text-slate-800">Message Sent!</h3>
                <p className="text-gray-500">We'll get back to you within 24 business hours.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Jane Doe"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-100 transition-all text-slate-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="jane@example.com"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-100 transition-all text-slate-800"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Subject</label>
                  <input 
                    required
                    type="text" 
                    placeholder="How can we help?"
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-100 transition-all text-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Message</label>
                  <textarea 
                    required
                    rows={6}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-100 transition-all text-slate-800 resize-none"
                  />
                </div>
                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-5 rounded-[20px] font-black text-lg transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center space-x-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-900 rounded-[40px] p-10 text-white space-y-12 h-full">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">📍</div>
                  <div>
                    <h5 className="font-bold text-blue-400">Headquarters</h5>
                    <p className="text-gray-400 text-sm leading-relaxed">123 Commerce Way, Suite 500<br />San Francisco, CA 94105</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">✉️</div>
                  <div>
                    <h5 className="font-bold text-blue-400">Email Us</h5>
                    <p className="text-gray-400 text-sm">support@shopblue.com<br />partners@shopblue.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">📞</div>
                  <div>
                    <h5 className="font-bold text-blue-400">Phone</h5>
                    <p className="text-gray-400 text-sm">+1 (555) 000-SHOP</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-white/10">
              <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-500">Connect with us</h5>
              <div className="flex space-x-4">
                {['Instagram', 'LinkedIn', 'Twitter', 'Facebook'].map(s => (
                  <button key={s} className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors text-xs font-bold">
                    {s[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Mockup */}
      <div className="mt-20 h-96 rounded-[40px] overflow-hidden bg-gray-100 border border-gray-100 relative shadow-inner">
         <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover opacity-50 grayscale" alt="Map" />
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 flex items-center space-x-4">
               <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">SB</div>
               <div>
                  <h4 className="font-bold text-slate-800">ShopBlue HQ</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Main Logistics Center</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Contact;
