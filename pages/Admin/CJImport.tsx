
import React, { useState } from 'react';
import { sourceProductsFromCJ, SourcedProduct } from '../../services/geminiService';
import { Product } from '../../types';
import { CJResultSkeleton } from '../../components/SkeletonLoader';

interface CJImportProps {
  addProduct: (p: Product) => void;
}

const CJImport: React.FC<CJImportProps> = ({ addProduct }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SourcedProduct[]>([]);
  const [importing, setImporting] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    const data = await sourceProductsFromCJ(query);
    setResults(data);
    setLoading(false);
  };

  const handleImport = (p: SourcedProduct) => {
    setImporting(p.id);
    setTimeout(() => {
      // Remove sourcing-specific metadata before adding to store
      const { sources, ...productData } = p;
      addProduct(productData);
      setResults(prev => prev.filter(item => item.id !== p.id));
      setImporting(null);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center space-x-4 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">CJ</div>
          <h1 className="text-3xl font-black text-slate-800">CJ Sourcing Hub</h1>
        </div>
        <p className="text-gray-500">Source premium products from the global CJ catalog using AI-assisted search with Google Grounding.</p>
      </header>

      <form onSubmit={handleSearch} className="max-w-2xl flex space-x-4">
        <div className="flex-1 relative">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for 'smart home gadgets' or 'men luxury watches'..." 
            className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-12 focus:ring-4 focus:ring-blue-100 outline-none text-slate-800 shadow-sm"
          />
          <svg className="w-6 h-6 text-gray-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <button 
          disabled={loading}
          className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white px-8 py-4 rounded-2xl font-bold transition flex items-center space-x-2 shadow-xl shadow-slate-900/10"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Sourcing Trends...</span>
            </>
          ) : (
            <span>Search CJ</span>
          )}
        </button>
      </form>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CJResultSkeleton />
          <CJResultSkeleton />
          <CJResultSkeleton />
          <CJResultSkeleton />
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((p) => (
            <div key={p.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col space-y-4 hover:shadow-xl transition-all group">
              <div className="flex space-x-6">
                <div className="w-32 aspect-square rounded-2xl overflow-hidden bg-gray-50 shrink-0">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">{p.category}</span>
                    <span className="text-sm font-bold text-slate-800">${p.price.toFixed(2)}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 line-clamp-1">{p.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{p.description}</p>
                </div>
              </div>
              
              {p.sources && p.sources.length > 0 && (
                <div className="bg-gray-50 p-3 rounded-xl space-y-1">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Market Data Sources</p>
                  <div className="flex flex-wrap gap-2">
                    {p.sources.map((src, i) => (
                      <a key={i} href={src.uri} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 hover:underline flex items-center space-x-1 max-w-[150px] truncate">
                        <span>🔗</span>
                        <span className="truncate">{src.title || 'Market Trend'}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
                <div className="flex items-center space-x-1 text-xs text-yellow-500">
                  <span>★</span>
                  <span className="font-bold">{p.rating.toFixed(1)}</span>
                </div>
                <button 
                  onClick={() => handleImport(p)}
                  disabled={importing !== null}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2"
                >
                  {importing === p.id ? (
                    <>
                       <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                       <span>Importing...</span>
                    </>
                  ) : (
                    <span>Import to Store</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-[40px] border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl opacity-50">🚢</div>
          <h3 className="text-xl font-bold text-slate-400">Search to see CJ products</h3>
          <p className="text-gray-400 text-sm">Real-time sourcing powered by Gemini AI & Google Search</p>
        </div>
      )}
    </div>
  );
};

export default CJImport;
