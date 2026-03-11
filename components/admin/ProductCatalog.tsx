'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CURRENT_ORDER_KEY = 'pos.currentOrder';

type Category = 'all' | 'signature' | 'croissant' | 'waffle' | 'coffee' | 'ice-cream';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  soldOut?: boolean;
}

type CartItem = {
  product: Product;
  quantity: number;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Almond Brown Croissant',
    description: 'Croissant',
    price: 34000,
    image:
      'https://images.unsplash.com/photo-1649542181703-33cc4f373b28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbG1vbmQlMjBjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzY1MTk2MTk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'croissant',
  },
  {
    id: 2,
    name: 'Basic Croissant A La Pierre',
    description: 'Croissant',
    price: 32000,
    image:
      'https://images.unsplash.com/photo-1608100742430-b8c4b9bf1276?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNpYyUyMGNyb2lzc2FudCUyMGJ1dHRlcnxlbnwxfHx8fDE3NjUxOTYyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'croissant',
    soldOut: true,
  },
  {
    id: 3,
    name: 'Sweet Granulated Sugar Croissant',
    description: 'Croissant',
    price: 38000,
    image:
      'https://images.unsplash.com/photo-1579721333025-36db734131d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VldCUyMGdyYW51bGF0ZWQlMjBkb251dHxlbnwxfHx8fDE3NjUxOTYyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'signature',
  },
  {
    id: 4,
    name: 'Smoky Tenderloin Stick Croissant',
    description: 'Croissant',
    price: 45000,
    image:
      'https://images.unsplash.com/photo-1718897266472-5b7229ebdd3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjcm9pc3NhbnR8ZW58MXx8fHwxNzY1MTExODk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'signature',
    soldOut: true,
  },
  {
    id: 5,
    name: 'Sweet Chocolate Croissant',
    description: 'Croissant',
    price: 34000,
    image:
      'https://images.unsplash.com/photo-1718897266472-5b7229ebdd3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjcm9pc1NhbnR8ZW58MXx8fHwxNzY1MTExODk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'croissant',
  },
  {
    id: 6,
    name: 'Basic Croissant & Strawberry Jam',
    description: 'Croissant',
    price: 43000,
    image:
      'https://images.unsplash.com/photo-1599034594900-f54069f84a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhd2JlcnJ5JTIwamFtJTIwY3JvaXNzYW50fGVufDF8fHx8MTc2NTE5NjIwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'croissant',
  },
  {
    id: 7,
    name: 'Blueberry Jam Croissant',
    description: 'Croissant',
    price: 32000,
    image:
      'https://images.unsplash.com/photo-1692432248702-bca6b27065a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlYmVycnklMjBqYW0lMjBjcm9pc3NhbnR8ZW58MXx8fHwxNzY1MTk2MjAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'croissant',
  },
  {
    id: 8,
    name: 'Strawberry Jam Croissant',
    description: 'Croissant',
    price: 32000,
    image:
      'https://images.unsplash.com/photo-1599034594900-f54069f84a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhd2JlcnJ5JTIwamFtJTIwY3JvaXNzYW50fGVufDF8fHx8MTc2NTE5NjIwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'croissant',
  },
];

export default function ProductCatalog() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showOrder, setShowOrder] = useState(false);

  const formatCurrency = (value: number) => value.toLocaleString('id-ID');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAdd = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleDecrease = (productId: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const totalProducts = products.length;
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleProcessPayment = () => {
    if (cart.length === 0) return;

    const payload = {
      items: cart.map((item) => ({
        id: String(item.product.id),
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
      subtotal,
      tax,
      total,
    };

    try {
      sessionStorage.setItem(CURRENT_ORDER_KEY, JSON.stringify(payload));
      router.push('/payment');
    } catch (err) {
      console.error('Failed to store order in session storage', err);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-1 text-2xl font-semibold">Welcome, Admin</h1>
        <p className="text-gray-500">You have {totalProducts} product in inventory</p>
      </div>

      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search product"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white text-gray-500 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <button className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <button
          onClick={() => setShowOrder((prev) => !prev)}
          className="px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors whitespace-nowrap"
        >
          {showOrder ? 'Hide Order' : 'New Order'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div
          className={`space-y-6 transition-all duration-300 ease-in-out ${
            showOrder ? 'lg:col-span-8 lg:-translate-x-1' : 'lg:col-span-12'
          }`}
        >
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
             <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCategory('signature')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === 'signature'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Signature
            </button>
            <button
              onClick={() => setSelectedCategory('croissant')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === 'croissant'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Croissant
            </button>
            <button
              onClick={() => setSelectedCategory('waffle')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === 'waffle'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Waffle
            </button>
            <button
              onClick={() => setSelectedCategory('coffee')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === 'coffee'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Coffee
            </button>
            <button
              onClick={() => setSelectedCategory('ice-cream')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === 'ice-cream'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Ice Cream
            </button>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 ${
              showOrder ? 'xl:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-4'
            } gap-6 transition-all duration-300`}
          >
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => {
                  if (showOrder && !product.soldOut) handleAdd(product);
                }}
                className={`bg-white rounded-xl overflow-hidden border border-gray-200 w-full text-left transition-colors ${
                  showOrder && !product.soldOut
                    ? 'hover:border-orange-400 cursor-pointer'
                    : 'cursor-default'
                }`}
              >
                <div className="relative h-40 bg-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  {product.soldOut && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-red-500 text-white text-sm rounded">
                      SOLD OUT
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{product.description}</p>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-900">Rp. {formatCurrency(product.price)}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {showOrder
                      ? product.soldOut
                        ? 'Sold out'
                        : 'Klik kartu untuk tambah ke order'
                      : 'Aktifkan New Order untuk mulai tambah produk'}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div
          className={`bg-white border border-gray-200 rounded-xl p-4 space-y-4 h-fit transition-all duration-300 ease-in-out ${
            showOrder
              ? 'lg:col-span-4 lg:translate-x-0 lg:opacity-100'
              : 'hidden lg:block lg:col-span-4 lg:translate-x-6 lg:opacity-0 lg:pointer-events-none'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-orange-500" />
              <h2 className="text-gray-900 font-semibold">Current Order</h2>
            </div>
            <button
              onClick={() => setCart([])}
              className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 disabled:opacity-50"
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
                  <div className="flex items-center gap-1 text-gray-600">
                    <button
                      onClick={() => handleDecrease(item.product.id)}
                      className="p-1.5 rounded-md border border-gray-200 hover:bg-gray-50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-6 text-center text-gray-900">{item.quantity}</span>
                    <button
                      onClick={() => handleAdd(item.product)}
                      className="p-1.5 rounded-md border border-gray-200 hover:bg-gray-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.product.id)}
                    className="p-1.5 rounded-md border border-gray-200 hover:bg-red-50 hover:border-red-200 text-red-500"
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

      {showOrder && (
        <div className="lg:hidden mt-6 bg-white border border-gray-200 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-orange-500" />
              <h2 className="text-gray-900 font-semibold">Current Order</h2>
            </div>
            <button
              onClick={() => setCart([])}
              className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 disabled:opacity-50"
              disabled={cart.length === 0}
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </button>
          </div>
          <p className="text-sm text-gray-600">Total: Rp. {formatCurrency(total)}</p>
        </div>
      )}
    </div>
  );
}
