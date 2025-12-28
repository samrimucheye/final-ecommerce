
import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../../types';
import { CATEGORIES } from '../../constants';

interface InventoryProps {
  products: Product[];
  removeProduct: (id: string) => void;
  addProduct: (p: Product) => void;
}

const Inventory: React.FC<InventoryProps> = ({ products, removeProduct, addProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageMethod, setImageMethod] = useState<'file' | 'url'>('file');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: CATEGORIES[0].name,
    stock: '10',
    image: '',
    imageUrl: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalImage = imageMethod === 'file' ? formData.image : formData.imageUrl;
    
    if (!finalImage) {
      alert("Please provide a product image.");
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      stock: parseInt(formData.stock),
      image: finalImage,
      rating: 5.0,
      importedFrom: 'Local'
    };

    addProduct(newProduct);
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: CATEGORIES[0].name,
      stock: '10',
      image: '',
      imageUrl: ''
    });
    setImageMethod('file');
  };

  const displayedPreview = imageMethod === 'file' ? formData.image : formData.imageUrl;

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Inventory Management</h1>
          <p className="text-gray-500">Manage your local and dropshipped product catalog.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
        >
          <span>+ Add Product</span>
        </button>
      </header>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-2xl font-black text-slate-800">Add New Product</h2>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Product Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="e.g. Premium Wireless Mouse"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Category</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Description</label>
                <textarea 
                  required
                  value={formData.description}
                  onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]" 
                  placeholder="Describe your product features..."
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Price ($)</label>
                  <input 
                    required
                    type="number" 
                    step="0.01"
                    value={formData.price}
                    onChange={e => setFormData(p => ({ ...p, price: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Stock Quantity</label>
                  <input 
                    required
                    type="number" 
                    value={formData.stock}
                    onChange={e => setFormData(p => ({ ...p, stock: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="10"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Product Image</label>
                  <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button 
                      type="button"
                      onClick={() => setImageMethod('file')}
                      className={`px-3 py-1 text-[10px] font-bold rounded-lg transition ${imageMethod === 'file' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      Upload File
                    </button>
                    <button 
                      type="button"
                      onClick={() => setImageMethod('url')}
                      className={`px-3 py-1 text-[10px] font-bold rounded-lg transition ${imageMethod === 'url' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      Image URL
                    </button>
                  </div>
                </div>

                {imageMethod === 'file' ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="group relative border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all overflow-hidden min-h-[200px] flex flex-col items-center justify-center"
                  >
                    {formData.image ? (
                      <div className="absolute inset-0">
                        <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-bold transition-opacity">
                          Change Image
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="text-4xl mb-4">📸</div>
                        <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                        <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold">PNG, JPG up to 5MB</p>
                      </>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      value={formData.imageUrl}
                      onChange={e => setFormData(p => ({ ...p, imageUrl: e.target.value }))}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" 
                      placeholder="https://images.unsplash.com/photo-..."
                    />
                    <div className="aspect-video bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden flex items-center justify-center">
                      {formData.imageUrl ? (
                        <img src={formData.imageUrl} className="w-full h-full object-cover" alt="URL Preview" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400x225?text=Invalid+Image+URL')} />
                      ) : (
                        <div className="text-center p-4">
                          <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Image Preview will appear here</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold shadow-xl shadow-blue-600/20 transition-all active:scale-95">
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Product</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Price</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Stock</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Source</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <img src={p.image} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">{p.name}</p>
                      <p className="text-[10px] text-gray-400 line-clamp-1">{p.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium text-slate-600 bg-gray-100 px-2.5 py-1 rounded-lg">{p.category}</span>
                </td>
                <td className="px-6 py-4 font-bold text-slate-800">${p.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${p.stock > 10 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="text-sm text-slate-700">{p.stock}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                   <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${p.importedFrom === 'CJ' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-white'}`}>
                    {p.importedFrom || 'Local'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="p-2 hover:bg-white hover:shadow-md rounded-lg text-gray-400 hover:text-blue-600 transition">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                    <button 
                      onClick={() => removeProduct(p.id)}
                      className="p-2 hover:bg-white hover:shadow-md rounded-lg text-gray-400 hover:text-red-500 transition"
                    >
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
