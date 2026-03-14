'use client';

import { useState } from "react";
import {
  Pencil,
  Trash2,
  Save,
  X,
  Plus,
  User,
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";

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
  const [isCreating, setIsCreating] = useState(false);

  const [newCashier, setNewCashier] = useState<Cashier>({
    id: 0,
    fullName: "",
    username: "",
    email: "",
    phone: "",
  });

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: keyof Cashier, value: string) => {
    if (!editingCashier) return;

    setEditingCashier({
      ...editingCashier,
      [field]: value,
    });
  };

  const handleNewChange = (field: keyof Cashier, value: string) => {
    setNewCashier({
      ...newCashier,
      [field]: value,
    });
  };

  const handleCreate = () => {
    if (!newCashier.fullName || !newCashier.username) {
      alert("Please complete required fields");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    const newEntry = {
      ...newCashier,
      id: Date.now(),
    };

    setCashiers((prev) => [...prev, newEntry]);

    setNewCashier({
      id: 0,
      fullName: "",
      username: "",
      email: "",
      phone: "",
    });

    setPassword("");
    setIsCreating(false);
  };

  const handleSave = () => {
    if (!editingCashier) return;

    if (password && password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    setCashiers((prev) =>
      prev.map((cashier) =>
        cashier.id === editingCashier.id ? editingCashier : cashier
      )
    );

    setEditingCashier(null);
    setPassword("");
  };

  const handleDelete = (id: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this cashier?"
    );

    if (!confirmDelete) return;

    setCashiers((prev) => prev.filter((cashier) => cashier.id !== id));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Cashier Accounts
        </h2>

        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          <Plus className="w-4 h-4" />
          Add Cashier
        </button>
      </div>

      {/* EMPTY STATE */}

      {cashiers.length === 0 && (
        <div className="flex flex-col items-center py-12 text-gray-400">
          <User className="w-10 h-10 mb-2" />
          No cashier accounts yet
        </div>
      )}

      {/* TABLE */}

      {cashiers.length > 0 && (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-gray-600 text-sm">
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
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 font-medium text-gray-800">
                  {cashier.fullName}
                </td>

                <td className="py-3 px-4 text-gray-600">
                  @{cashier.username}
                </td>

                <td className="py-3 px-4 text-gray-500">
                  {cashier.email}
                </td>

                <td className="py-3 px-4 text-gray-500">
                  {cashier.phone}
                </td>

                <td className="py-3 px-4 flex gap-3">
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
      )}

      {/* CREATE MODAL */}

      {isCreating && (
        <Modal title="Add Cashier" onClose={() => setIsCreating(false)}>
          <CashierForm
            data={newCashier}
            password={password}
            showPassword={showPassword}
            setPassword={setPassword}
            setShowPassword={setShowPassword}
            onChange={handleNewChange}
            onSubmit={handleCreate}
            isEdit={false}
          />
        </Modal>
      )}

      {/* EDIT MODAL */}

      {editingCashier && (
        <Modal title="Edit Cashier" onClose={() => setEditingCashier(null)}>
          <CashierForm
            data={editingCashier}
            password={password}
            showPassword={showPassword}
            setPassword={setPassword}
            setShowPassword={setShowPassword}
            onChange={handleChange}
            onSubmit={handleSave}
            isEdit={true}
          />
        </Modal>
      )}
    </div>
  );
}

/* ---------- MODAL ---------- */

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-[420px] shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900">{title}</h3>

          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

/* ---------- FORM ---------- */

function CashierForm({
  data,
  password,
  showPassword,
  setPassword,
  setShowPassword,
  onChange,
  onSubmit,
  isEdit,
}: {
  data: Cashier;
  password: string;
  showPassword: boolean;
  setPassword: (v: string) => void;
  setShowPassword: (v: boolean) => void;
  onChange: (field: keyof Cashier, value: string) => void;
  onSubmit: () => void;
  isEdit: boolean;
}) {
  return (
    <>
      <div className="space-y-4">
        <input
          value={data.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
          placeholder="Full Name"
          className="w-full border border-gray-200 rounded-lg px-3 py-2"
        />

        <input
          value={data.username}
          onChange={(e) => onChange("username", e.target.value)}
          placeholder="Username"
          className="w-full border border-gray-200 rounded-lg px-3 py-2"
        />

        <input
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="Email"
          className="w-full border border-gray-200 rounded-lg px-3 py-2"
        />

        <input
          value={data.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="Phone"
          className="w-full border border-gray-200 rounded-lg px-3 py-2"
        />

        {/* PASSWORD */}

        <div>
          <label className="text-sm text-gray-600 flex items-center gap-1 mb-1">
            <Lock className="w-4 h-4" />
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {isEdit && (
            <p className="text-xs text-gray-400 mt-1">
              Leave blank if you don't want to change password
            </p>
          )}

          {password && password.length < 8 && (
            <p className="text-xs text-red-500 mt-1">
              Password must be at least 8 characters
            </p>
          )}
        </div>
      </div>

      <button
        onClick={onSubmit}
        className="mt-6 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 flex items-center justify-center gap-2"
      >
        <Save className="w-4 h-4" />
        Save
      </button>
    </>
  );
}