
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Product, Order, AdminView } from '../../types';
import CJImport from './CJImport';
import Inventory from './Inventory';
import Orders from './Orders';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  addProduct: (p: Product) => void;
  removeProduct: (id: string) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, orders, addProduct, removeProduct, updateOrderStatus }) => {
  const location = useLocation();

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  
  const stats = [
    { label: 'Total Sales', value: `$${totalRevenue.toLocaleString()}`, icon: '💰', color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' },
    { label: 'Active Orders', value: orders.filter(o => o.status !== 'Delivered').length.toString(), icon: '📦', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' },
    { label: 'Inventory Items', value: products.length.toString(), icon: '🏷️', color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600' },
    { label: 'Customers', value: '48', icon: '👤', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600' }
  ];

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-slate-950 transition-colors">
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 p-6 space-y-8 hidden md:block transition-colors">
        <div>
          <h3 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-6">Menu</h3>
          <nav className="space-y-2">
            {[
              { label: 'Overview', path: '/admin', icon: '📊' },
              { label: 'Inventory', path: '/admin/inventory', icon: '🏢' },
              { label: 'Orders', path: '/admin/orders', icon: '🧾' },
              { label: 'CJ Sourcing', path: '/admin/import', icon: '🚢' },
            ].map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${location.pathname === link.path ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/20' : 'text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800'}`}
              >
                <span className="text-lg">{link.icon}</span>
                <span className="text-sm">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 bg-slate-900 dark:bg-slate-800 rounded-2xl text-white space-y-4 shadow-xl">
          <p className="text-xs text-gray-400">Dropshipping Status</p>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-bold">CJ API Active</span>
          </div>
          <button onClick={() => alert('Syncing inventory with CJ Dropshipping centers...')} className="w-full py-2 bg-white/10 rounded-lg text-xs font-bold hover:bg-white/20 transition active:scale-95">Sync Products</button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route path="/" element={
            <div className="space-y-8">
              <header className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-black text-slate-800 dark:text-white">Admin Overview</h1>
                  <p className="text-gray-500 dark:text-slate-400">Real-time performance metrics.</p>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center space-x-4 hover:shadow-md transition cursor-default">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${s.color}`}>{s.icon}</div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-slate-500 font-medium">{s.label}</p>
                      <h4 className="text-2xl font-black text-slate-800 dark:text-white">{s.value}</h4>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Weekly Revenue Chart */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-gray-100 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 dark:text-white text-lg">Weekly Revenue</h3>
                    <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-400">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      <span>Gross Sales</span>
                    </div>
                  </div>
                  <div className="flex items-end justify-between h-48 pt-4">
                    {[30, 45, 25, 60, 85, 40, 55].map((h, i) => (
                      <div key={i} className="flex flex-col items-center space-y-2 group flex-1">
                        <div className="w-full px-2">
                           <div className="w-full bg-blue-50 dark:bg-slate-800 group-hover:bg-blue-100 dark:group-hover:bg-slate-700 rounded-lg flex items-end justify-center transition-all h-full relative" style={{ height: '140px' }}>
                             <div className="w-full bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20" style={{ height: `${h}%` }}></div>
                           </div>
                        </div>
                        <span className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-slate-800 dark:text-white text-lg">Recent Orders</h3>
                    <Link to="/admin/orders" className="text-blue-600 dark:text-blue-400 text-sm hover:underline font-bold">View all</Link>
                  </div>
                  <div className="space-y-4">
                    {orders.length > 0 ? (
                      orders.slice(0, 5).map(o => (
                        <div key={o.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center font-bold text-[10px] text-slate-400 dark:text-slate-300">#{o.id.slice(0, 4)}</div>
                            <div>
                              <p className="text-sm font-bold text-slate-800 dark:text-white">{o.customer.name}</p>
                              <p className="text-[10px] text-gray-400 dark:text-slate-500">{o.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-blue-600 dark:text-blue-400">${o.total.toFixed(2)}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400 dark:text-slate-500 text-center py-8 italic">No orders recorded yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/inventory" element={<Inventory products={products} removeProduct={removeProduct} addProduct={addProduct} />} />
          <Route path="/import" element={<CJImport addProduct={addProduct} />} />
          <Route path="/orders" element={<Orders orders={orders} updateOrderStatus={updateOrderStatus} />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
