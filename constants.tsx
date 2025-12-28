
import React from 'react';
import { Product, Category } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Pro Audio Wireless',
    description: 'Premium noise cancelling headphones with spatial audio.',
    price: 199.00,
    originalPrice: 249.00,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    stock: 25,
    isTrending: true,
    importedFrom: 'Local'
  },
  {
    id: '2',
    name: 'Analog Classic Watch',
    description: 'Minimalist design for men, water resistant and sleek.',
    price: 129.00,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    stock: 12,
    isTrending: true,
    importedFrom: 'Local'
  },
  {
    id: '3',
    name: 'Urban Sneakers',
    description: 'Comfortable everyday wear with breathable mesh.',
    price: 89.00,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    stock: 40,
    isTrending: true,
    importedFrom: 'Local'
  },
  {
    id: '4',
    name: 'Instant Camera Mini',
    description: 'Capture moments instantly with built-in flash.',
    price: 159.00,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1526170315870-ef6d82f5822c?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    stock: 15,
    isTrending: true,
    importedFrom: 'Local'
  }
];

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Electronics', icon: '📱', color: 'bg-blue-100' },
  { id: '2', name: 'Fashion', icon: '👕', color: 'bg-purple-100' },
  { id: '3', name: 'Home & Living', icon: '🛋️', color: 'bg-green-100' },
  { id: '4', name: 'Sports', icon: '⚽', color: 'bg-orange-100' }
];

export const THEME = {
  primary: '#3b82f6', // blue-500
  secondary: '#1e293b', // slate-800
};
