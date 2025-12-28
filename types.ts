
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  rating: number;
  stock: number;
  isTrending?: boolean;
  importedFrom?: 'CJ' | 'Local';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  customer: {
    name: string;
    email: string;
  };
  date: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export enum AdminView {
  DASHBOARD = 'DASHBOARD',
  INVENTORY = 'INVENTORY',
  ORDERS = 'ORDERS',
  CJ_IMPORT = 'CJ_IMPORT'
}
