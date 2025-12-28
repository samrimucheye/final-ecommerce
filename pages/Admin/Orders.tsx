
import React from 'react';
import { Order } from '../../types';

interface OrdersProps {
  orders: Order[];
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

const Orders: React.FC<OrdersProps> = ({ orders, updateOrderStatus }) => {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Processing': return 'bg-blue-100 text-blue-600';
      case 'Shipped': return 'bg-purple-100 text-purple-600';
      case 'Delivered': return 'bg-emerald-100 text-emerald-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const handleNextStatus = (order: Order) => {
    if (order.status === 'Processing') updateOrderStatus(order.id, 'Shipped');
    else if (order.status === 'Shipped') updateOrderStatus(order.id, 'Delivered');
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Order Management</h1>
          <p className="text-gray-500">Monitor and fulfill customer requirements.</p>
        </div>
        <div className="flex bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
          <button className="px-4 py-2 text-xs font-bold text-blue-600 bg-blue-50 border-r border-gray-100">All</button>
          <button className="px-4 py-2 text-xs font-bold text-gray-400 hover:bg-gray-50 transition">Pending</button>
          <button className="px-4 py-2 text-xs font-bold text-gray-400 hover:bg-gray-50 transition">Completed</button>
        </div>
      </header>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        {orders.length > 0 ? (
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Order ID</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Items</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Total</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-xs font-black text-slate-800">#{o.id}</span>
                    <p className="text-[10px] text-gray-400 mt-0.5">{o.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800">{o.customer.name}</p>
                    <p className="text-[10px] text-gray-400 lowercase">{o.customer.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg ${getStatusColor(o.status)}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                      {o.items.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-100 shadow-sm">
                           <img src={item.image} className="w-full h-full object-cover" title={item.name} />
                        </div>
                      ))}
                      {o.items.length > 3 && (
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                          +{o.items.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-black text-slate-800">${o.total.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    {o.status !== 'Delivered' ? (
                      <button 
                        onClick={() => handleNextStatus(o)}
                        className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-sm"
                      >
                        {o.status === 'Processing' ? 'Mark as Shipped' : 'Mark as Delivered'}
                      </button>
                    ) : (
                      <span className="text-[10px] font-black uppercase text-gray-300">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-24 bg-white">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">🧾</div>
             <h3 className="text-xl font-bold text-slate-800">No orders found</h3>
             <p className="text-gray-400 text-sm">Customer orders will appear here as soon as they are placed.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
