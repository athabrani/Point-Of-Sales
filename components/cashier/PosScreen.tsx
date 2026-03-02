/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import type { Product } from '@/lib/types';
import { useRouter } from 'next/navigation';

const CURRENT_ORDER_KEY = 'pos.currentOrder';

type CartItem = {
  product: Product;
  quantity: number;
};

export function PosScreen() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const formatCurrency = (value: number) => value.toLocaleString('id-ID');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/products');
        const data = (await res.json()) as Product[];
        setProducts(data.filter((p) => p.isActive));
      } catch (err) {
        console.error(err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categoryOptions = useMemo(() => {
    const categories = Array.from(
      new Set(
        products
          .map((product) => product.category?.trim().toLowerCase())
          .filter((category): category is string => Boolean(category))
      )
    );

    return ['all', ...categories];
  }, [products]);

  const formatCategoryLabel = (category: string) => {
    if (category === 'all') return 'All';
    return category
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const filteredProducts = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesSearch = !term || product.name.toLowerCase().includes(term);
      const productCategory = product.category?.trim().toLowerCase();
      const matchesCategory = selectedCategory === 'all' || productCategory === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [query, products, selectedCategory]);

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

  const handleDecrease = (productId: string) => {
    setCart((prev) => {
      const next = prev
        .map((item) => (item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0);
      return next;
    });
  };

  const handleRemove = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleProcessPayment = () => {
    const orderItems = cart.map((item) => ({
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    }));

    const payload = {
      items: orderItems,
      subtotal,
      tax,
      total,
    };

    try {
      sessionStorage.setItem(CURRENT_ORDER_KEY, JSON.stringify(payload));
    } catch (err) {
      console.error('Failed to store order in session storage', err);
    }

    router.push('/payment');
  };

  return (
    <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search menu"
              className="w-full pl-10 pr-4 py-3 text-gray-900 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categoryOptions.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap border transition-colors ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {formatCategoryLabel(category)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => handleAdd(product)}
              className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-orange-400 transition-colors"
            >
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-24 object-cover rounded-lg mb-3 bg-gray-100"
                />
              )}
              <p className="text-sm text-gray-500">Menu item</p>
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
          <p className="text-gray-500 text-sm">
            {error ?? (loading ? 'Loading products...' : 'Add products to start an order.')}
          </p>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                {item.product.imageUrl && (
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-md object-cover bg-gray-100"
                  />
                )}
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">Rp. {formatCurrency(item.product.price)}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
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
            <span>Rp. {formatCurrency(tax)}</span>
          </div>
          <div className="flex items-center justify-between text-gray-900 font-semibold text-lg">
            <span>Total</span>
            <span>Rp. {formatCurrency(total)}</span>
          </div>
          <button
            onClick={handleProcessPayment}
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
