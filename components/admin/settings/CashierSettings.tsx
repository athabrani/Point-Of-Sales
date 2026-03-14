'use client';

import { useState } from 'react';
import { Pencil, Trash2, Save, X } from 'lucide-react';

type Cashier = {
  id: number;
  fullName: string;
  username: string;
  email: string;
  phone: string;
};

const initialCashiers: Cashier[] = [
  {
    id: 1,
    fullName: "Michael Smith",
    username: "michael_s",
    email: "michael@store.com",
    phone: "081234567890",
  },
  {
    id: 2,
    fullName: "Sarah Johnson",
    username: "sarah_j",
    email: "sarah@store.com",
    phone: "082345678901",
  },
];

export default function CashierInfo() {
  const [cashiers, setCashiers] = useState(initialCashiers);
  const [editingCashier, setEditingCashier] = useState<Cashier | null>(null);

  const handleChange = (field: keyof Cashier, value: string) => {
    if (!editingCashier) return;

    setEditingCashier({
      ...editingCashier,
      [field]: value,
    });
  };

  const handleSave = () => {
    if (!editingCashier) return;

    setCashiers((prev) =>
      prev.map((cashier) =>
        cashier.id === editingCashier.id ? editingCashier : cashier
      )
    );

    setEditingCashier(null);
  };

  const handleDelete = (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this cashier account?");
    if (!confirmDelete) return;

    setCashiers((prev) => prev.filter((cashier) => cashier.id !== id));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-gray-900 mb-6">Cashier Accounts</h2>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-gray-600">
            <th className="py-3 px-4">Full Name</th>
            <th className="py-3 px-4">Username</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Phone</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {cashiers.map((cashier) => (
            <tr
              key={cashier.id}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="py-3 px-4 text-gray-700">{cashier.fullName}</td>
              <td className="py-3 px-4 text-gray-600">{cashier.username}</td>
              <td className="py-3 px-4 text-gray-500">{cashier.email}</td>
              <td className="py-3 px-4 text-gray-500">{cashier.phone}</td>

              <td className="py-3 px-4 flex gap-4">
                <button
                  onClick={() => setEditingCashier(cashier)}
                  className="flex items-center gap-1 text-orange-600 hover:text-orange-700"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(cashier.id)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EDIT MODAL */}
      {editingCashier && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-900">Edit Cashier</h3>
              <button onClick={() => setEditingCashier(null)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                value={editingCashier.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Full Name"
              />

              <input
                value={editingCashier.username}
                onChange={(e) => handleChange("username", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Username"
              />

              <input
                value={editingCashier.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Email"
              />

              <input
                value={editingCashier.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Phone"
              />
            </div>

            <button
              onClick={handleSave}
              className="mt-6 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}