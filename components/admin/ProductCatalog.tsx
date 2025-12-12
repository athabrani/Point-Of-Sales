'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, Plus, Minus } from 'lucide-react';

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

const products: Product[] = [
  {
    id: 1,
    name: 'Almond Brown Croissant',
    description: 'Croissant',
    price: 34000,
    image: 'https://images.unsplash.com/photo-1649542181703-33cc4f373b28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbG1vbmQlMjBjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzY1MTk2MTk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'croissant',
  },
  {
    id: 2,
    name: 'Basic Croissant A La Pierre',
    description: 'Croissant',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1608100742430-b8c4b9bf1276?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNpYyUyMGNyb2lzc2FudCUyMGJ1dHRlcnxlbnwxfHx8fDE3NjUxOTYyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'croissant',
    soldOut: true,
  },
  {
    id: 3,
    name: 'Sweet Granulated Sugar Croissant',
    description: 'Croissant',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1579721333025-36db734131d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VldCUyMGdyYW51bGF0ZWQlMjBkb251dHxlbnwxfHx8fDE3NjUxOTYyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'signature',
  },
  {
    id: 4,
    name: 'Smoky Tenderloin Stick Croissant',
    description: 'Croissant',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1718897266472-5b7229ebdd3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjcm9pc3NhbnR8ZW58MXx8fHwxNzY1MTExODk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'signature',
    soldOut: true,
  },
  {
    id: 5,
    name: 'Sweet Chocolate Croissant',
    description: 'Croissant',
    price: 34000,
    image: 'https://images.unsplash.com/photo-1718897266472-5b7229ebdd3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjcm9pc1NhbnR8ZW58MXx8fHwxNzY1MTExODk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'croissant',
  },
  {
    id: 6,
    name: 'Basic Croissant & Strawberry Jam',
    description: 'Croissant',
    price: 43000,
    image: 'https://images.unsplash.com/photo-1599034594900-f54069f84a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhd2JlcnJ5JTIwamFtJTIwY3JvaXNzYW50fGVufDF8fHx8MTc2NTE5NjIwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'croissant',
  },
  {
    id: 7,
    name: 'Blueberry Jam Croissant',
    description: 'Croissant',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1692432248702-bca6b27065a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlYmVycnklMjBqYW0lMjBjcm9pc3NhbnR8ZW58MXx8fHwxNzY1MTk2MjAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'croissant',
  },
  {
    id: 8,
    name: 'Strawberry Jam Croissant',
    description: 'Croissant',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1599034594900-f54069f84a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhd2JlcnJ5JTIwamFtJTIwY3JvaXNzYW50fGVufDF8fHx8MTc2NTE5NjIwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'croissant',
  },
];

export function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [cart, setCart] = useState<Array<{ product: Product; quantity: number }>>([]);


  const formatCurrency = (value: number) => value.toLocaleString('id-ID');


  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const updateQuantity = (productId: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + delta),
    }));
  };

  const addToCart = (product: Product) => {
    const quantity = quantities[product.id] || 0;
    if (quantity > 0) {
      setCart((prev) => [...prev, { product, quantity }]);
      setQuantities((prev) => ({ ...prev, [product.id]: 0 }));
    }
  };

  const totalProducts = products.length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-1">Welcome, Gerv</h1>
        <p className="text-gray-500">You have {totalProducts} product in inventory</p>
      </div>

      {/* Search and New Order Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <button className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <button className="px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
          New Order
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('signature')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            selectedCategory === 'signature'
              ? 'bg-orange-500 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          🎯 Signature
        </button>
        <button
          onClick={() => setSelectedCategory('croissant')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            selectedCategory === 'croissant'
              ? 'bg-orange-500 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          🥐 Croissant
        </button>
        <button
          onClick={() => setSelectedCategory('waffle')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            selectedCategory === 'waffle'
              ? 'bg-orange-500 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          🧇 Waffle
        </button>
        <button
          onClick={() => setSelectedCategory('coffee')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            selectedCategory === 'coffee'
              ? 'bg-orange-500 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          ☕ Coffee
        </button>
        <button
          onClick={() => setSelectedCategory('ice-cream')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            selectedCategory === 'ice-cream'
              ? 'bg-orange-500 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          🍦 Ice Cream
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl overflow-hidden border border-gray-200">
            {/* Product Image */}
            <div className="relative h-40 bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
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

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden flex-1">
                  <button
                    onClick={() => updateQuantity(product.id, -1)}
                    disabled={product.soldOut}
                    className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="flex-1 text-center">{quantities[product.id] || 0}</span>
                  <button
                    onClick={() => updateQuantity(product.id, 1)}
                    disabled={product.soldOut}
                    className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.soldOut || !quantities[product.id]}
                  className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
