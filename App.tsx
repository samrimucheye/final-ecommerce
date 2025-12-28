
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Product, CartItem, Order } from './types';
import { INITIAL_PRODUCTS } from './constants';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminDashboard from './pages/Admin/Dashboard';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import CartDrawer from './components/CartDrawer';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persistence
  useEffect(() => {
    const savedCart = localStorage.getItem('shopblue_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
    
    const savedOrders = localStorage.getItem('shopblue_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    
    const savedProducts = localStorage.getItem('shopblue_products');
    if (savedProducts) setProducts(JSON.parse(savedProducts));
  }, []);

  useEffect(() => {
    localStorage.setItem('shopblue_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('shopblue_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('shopblue_products', JSON.stringify(products));
  }, [products]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const addOrder = (order: Order) => setOrders(prev => [order, ...prev]);

  const addProduct = (p: Product) => setProducts(prev => [p, ...prev]);

  const removeProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar 
          cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} 
          onCartClick={() => setIsCartOpen(true)}
        />
        
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)}
          items={cart}
          onUpdateQty={updateQuantity}
          onRemove={removeFromCart}
        />

        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home products={products} addToCart={addToCart} />} />
            <Route path="/shop" element={<Shop products={products} addToCart={addToCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetails products={products} addToCart={addToCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} addOrder={addOrder} clearCart={clearCart} />} />
            <Route 
              path="/admin/*" 
              element={
                <AdminDashboard 
                  products={products} 
                  orders={orders} 
                  addProduct={addProduct} 
                  removeProduct={removeProduct}
                  updateOrderStatus={updateOrderStatus}
                />
              } 
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
