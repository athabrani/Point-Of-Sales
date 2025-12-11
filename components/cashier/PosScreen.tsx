/* eslint-disable @next/next/no-img-element */
'use client';

import { useMemo, useState } from 'react';
import { Search, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

const products: Product[] = [
  { id: 1, name: 'Almond Brown Croissant', price: 34000, category: 'Bakery', image: '/images/croissant-1.jpg' },
  { id: 2, name: 'Sweet Chocolate Croissant', price: 32000, category: 'Bakery', image: '/images/croissant-2.jpg' },
  { id: 3, name: 'Coffee Latte', price: 25000, category: 'Coffee', image: '/images/coffee-1.jpg' },
  { id: 4, name: 'Vanilla Ice Cream', price: 22000, category: 'Dessert', image: '/images/icecream-1.jpg' },
  { id: 5, name: 'Strawberry Jam Croissant', price: 33000, category: 'Bakery', image: '/images/croissant-3.jpg' },
  { id: 6, name: 'Matcha Latte', price: 28000, category: 'Coffee', image: '/images/coffee-2.jpg' },
];

export function PosScreen() {
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);

  const formatCurrency = (value: number) => value.toLocaleString('id-ID');

  const filteredProducts = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return products;
    return products.filter((product) => product.name.toLowerCase().includes(term));
  }, [query]);

  const handleAdd = (product: Product) => {
    setCart((prev) => {
      const next = [...prev];
      const existing = next.find((item) => item.product.id === product.id);
      if (existing) {
        existing.quantity += 1;
        return [...next];
      }
      return [...next, { product, quantity: 1 }];
    });
  };

  const handleDecrease = (productId: number) => {
    setCart((prev) => {
      const next = prev
        .map((item) => (item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0);
      return next;
    });
  };

  const handleRemove = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search menu or scan barcode..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button className="px-4 py-3 rounded-lg bg-gray-100 text-gray-700 border border-gray-200">New Order</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => handleAdd(product)}
              className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-orange-400 transition-colors"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-24 object-cover rounded-lg mb-3 bg-gray-100"
              />
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-gray-900 font-medium truncate">{product.name}</p>
              <p className="text-orange-600 font-semibold">Rp. {formatCurrency(product.price)}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4 h-fit">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-orange-500" />
            <h2 className="text-gray-900 font-semibold">Current Order</h2>
          </div>
          <button
            onClick={() => setCart([])}
            className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
            disabled={cart.length === 0}
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-sm">Add products to start an order.</p>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-12 h-12 rounded-md object-cover bg-gray-100"
                />
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">Rp. {formatCurrency(item.product.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDecrease(item.product.id)}
                    className="p-2 rounded-md border border-gray-200 hover:bg-gray-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-gray-900">{item.quantity}</span>
                  <button
                    onClick={() => handleAdd(item.product)}
                    className="p-2 rounded-md border border-gray-200 hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="w-24 text-right text-gray-900 font-semibold">
                  Rp. {formatCurrency(item.product.price * item.quantity)}
                </div>
                <button
                  onClick={() => handleRemove(item.product.id)}
                  className="p-2 rounded-md border border-gray-200 hover:bg-red-50 hover:border-red-200 text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-gray-200 pt-4 space-y-3">
          <div className="flex items-center justify-between text-gray-600">
            <span>Subtotal</span>
            <span>Rp. {formatCurrency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-gray-600">
            <span>Tax (10%)</span>
            <span>Rp. {formatCurrency(subtotal * 0.1)}</span>
          </div>
          <div className="flex items-center justify-between text-gray-900 font-semibold text-lg">
            <span>Total</span>
            <span>Rp. {formatCurrency(subtotal * 1.1)}</span>
          </div>
          <button
            className="w-full py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50"
            disabled={cart.length === 0}
          >
            Process Payment
          </button>
        </div>
      </div>
    </div>
  );
}
