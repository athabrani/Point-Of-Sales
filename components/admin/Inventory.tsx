'use client';

import { useState } from 'react';
import { Search, Plus, Pencil, Trash2, AlertCircle } from 'lucide-react';

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  stock: number;
  unit: string;
  reorderLevel: number;
  price: number;
  lastUpdated: string;
}

const mockInventory: InventoryItem[] = [
  {
    id: 1,
    name: 'Almond Brown Croissant',
    category: 'Croissant',
    stock: 45,
    unit: 'pcs',
    reorderLevel: 20,
    price: 34000,
    lastUpdated: 'Dec 8, 2024',
  },
  {
    id: 2,
    name: 'Basic Croissant A La Pierre',
    category: 'Croissant',
    stock: 0,
    unit: 'pcs',
    reorderLevel: 20,
    price: 32000,
    lastUpdated: 'Dec 8, 2024',
  },
  {
    id: 3,
    name: 'Sweet Granulated Sugar Croissant',
    category: 'Croissant',
    stock: 38,
    unit: 'pcs',
    reorderLevel: 15,
    price: 38000,
    lastUpdated: 'Dec 8, 2024',
  },
  {
    id: 4,
    name: 'Smoky Tenderloin Stick Croissant',
    category: 'Signature',
    stock: 0,
    unit: 'pcs',
    reorderLevel: 10,
    price: 45000,
    lastUpdated: 'Dec 8, 2024',
  },
  {
    id: 5,
    name: 'Sweet Chocolate Croissant',
    category: 'Croissant',
    stock: 52,
    unit: 'pcs',
    reorderLevel: 20,
    price: 34000,
    lastUpdated: 'Dec 8, 2024',
  },
  {
    id: 6,
    name: 'Blueberry Jam Croissant',
    category: 'Croissant',
    stock: 15,
    unit: 'pcs',
    reorderLevel: 20,
    price: 32000,
    lastUpdated: 'Dec 8, 2024',
  },
  {
    id: 7,
    name: 'Strawberry Jam Croissant',
    category: 'Croissant',
    stock: 28,
    unit: 'pcs',
    reorderLevel: 20,
    price: 32000,
    lastUpdated: 'Dec 8, 2024',
  },
  {
    id: 8,
    name: 'Belgian Waffle',
    category: 'Waffle',
    stock: 34,
    unit: 'pcs',
    reorderLevel: 15,
    price: 28000,
    lastUpdated: 'Dec 8, 2024',
  },
  {
    id: 9,
    name: 'Coffee Latte',
    category: 'Coffee',
    stock: 120,
    unit: 'cups',
    reorderLevel: 50,
    price: 25000,
    lastUpdated: 'Dec 8, 2024',
  },
];

export function Inventory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredInventory = mockInventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockItems = filteredInventory.filter((item) => item.stock <= item.reorderLevel);
  const outOfStockItems = filteredInventory.filter((item) => item.stock === 0);

  const getStockStatus = (item: InventoryItem) => {
    if (item.stock === 0) {
      return { label: 'Out of Stock', color: 'bg-red-100 text-red-700' };
    } else if (item.stock <= item.reorderLevel) {
      return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-700' };
    } else {
      return { label: 'In Stock', color: 'bg-green-100 text-green-700' };
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-1">Inventory Management</h1>
        <p className="text-gray-500">Track and manage your product stock levels</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Total Items</span>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="text-gray-900">{mockInventory.length}</div>
          <p className="text-sm text-gray-500 mt-1">Product types</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Low Stock Alerts</span>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <div className="text-gray-900">{lowStockItems.length}</div>
          <p className="text-sm text-gray-500 mt-1">Items need reorder</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Out of Stock</span>
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <div className="text-gray-900">{outOfStockItems.length}</div>
          <p className="text-sm text-gray-500 mt-1">Unavailable items</p>
        </div>
      </div>

      {/* Search and Add Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Item
        </button>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700">Product Name</th>
                <th className="px-6 py-3 text-left text-gray-700">Category</th>
                <th className="px-6 py-3 text-left text-gray-700">Stock</th>
                <th className="px-6 py-3 text-left text-gray-700">Reorder Level</th>
                <th className="px-6 py-3 text-left text-gray-700">Price</th>
                <th className="px-6 py-3 text-left text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-gray-700">Last Updated</th>
                <th className="px-6 py-3 text-left text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInventory.map((item) => {
                const status = getStockStatus(item);
                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 text-gray-600">{item.category}</td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900">
                        {item.stock} {item.unit}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {item.reorderLevel} {item.unit}
                    </td>
                    <td className="px-6 py-4 text-gray-900">Rp. {item.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${status.color}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.lastUpdated}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-gray-900 mb-6">Add New Item</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Category</label>
                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option>Croissant</option>
                  <option>Waffle</option>
                  <option>Coffee</option>
                  <option>Ice Cream</option>
                  <option>Signature</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Stock</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Unit</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="pcs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Reorder Level</label>
                <input
                  type="number"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="20"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="34000"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Package({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  );
}
