//

"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Printer,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

/* ================= TYPES ================= */

type OrderStatus = "completed" | "pending" | "cancelled";

interface ProductAPI {
  ID: number;
  name: string;
  price: number;
}

interface OrderItemAPI {
  ID: number;
  quantity: number;
  price: number;
  product: ProductAPI;
}

interface OrderAPI {
  ID: number;
  CreatedAt: string;
  order_number: string;
  customer_name: string;
  total_amount: number;
  payment_method: string;
  status: string;
  items: OrderItemAPI[];
}

interface OrdersResponse {
  data: OrderAPI[];
  totalPages?: number;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  time: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: string;
}

/* ================= COMPONENT ================= */

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "all">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [loading, setLoading] = useState(false);

  // pagination
  const [page, setPage] = useState(1);
  const limit = 5; // 🔥 constant biar gak kena warning
  const [totalPages, setTotalPages] = useState(1);

  const formatCurrency = (value: number) => value.toLocaleString("id-ID");

  const normalizeStatus = (status: string): OrderStatus => {
    if (status === "completed") return "completed";
    if (status === "cancelled") return "cancelled";
    return "pending";
  };

  /* ================= DEBOUNCE ================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  /* ================= FETCH ================= */

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        if (selectedStatus !== "all") {
          params.append("status", selectedStatus);
        }

        if (debouncedSearch) {
          params.append("search", debouncedSearch);
        }

        params.append("page", page.toString());
        params.append("limit", limit.toString());

        const res = await fetch(`/api/orders?${params.toString()}`);

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data: OrdersResponse = await res.json();

        const mappedOrders: Order[] = (data.data || []).map(
          (order: OrderAPI) => ({
            id: order.ID.toString(),

            orderNumber: order.order_number || `#ORD-${order.ID}`,

            date: new Date(order.CreatedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),

            time: new Date(order.CreatedAt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),

            customerName: order.customer_name || "Guest",

            items: (order.items || []).map((item: OrderItemAPI) => ({
              name: item.product?.name || "Unknown Product",
              quantity: item.quantity,
              price: item.price,
            })),

            total:
              order.total_amount ||
              (order.items || []).reduce(
                (sum: number, item: OrderItemAPI) =>
                  sum + item.price * item.quantity,
                0,
              ),

            status: normalizeStatus(order.status),

            paymentMethod: order.payment_method || "-",
          }),
        );

        setOrders(mappedOrders);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [selectedStatus, debouncedSearch, page, limit]);

  /* ================= UI HELPERS ================= */

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
    }
  };

  /* ================= UI ================= */

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-gray-900 mb-1">Orders</h1>
        <p className="text-gray-500">Manage and track all customer orders</p>
      </div>

      {/* SEARCH */}
      <div className="flex gap-4 mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <button className="p-2 border rounded-lg">
          <Filter />
        </button>
      </div>

      {/* FILTER */}
      <div className="flex gap-3 mb-6">
        {["all", "completed", "pending", "cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => {
              setSelectedStatus(status as OrderStatus | "all");
              setPage(1);
            }}
            className={`px-4 py-2 rounded-lg ${
              selectedStatus === status ? "bg-orange-500 text-white" : "border"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Order</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Items</th>
                <th className="px-6 py-3 text-left">Total</th>
                <th className="px-6 py-3 text-left">Payment</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4">{order.orderNumber}</td>
                  <td className="px-6 py-4">{order.customerName}</td>
                  <td className="px-6 py-4">
                    {order.date}
                    <br />
                    <span className="text-sm text-gray-500">{order.time}</span>
                  </td>
                  <td className="px-6 py-4">{order.items.length} items</td>
                  <td className="px-6 py-4">
                    Rp. {formatCurrency(order.total)}
                  </td>
                  <td className="px-6 py-4">{order.paymentMethod}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm flex gap-1 items-center ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <Eye onClick={() => setSelectedOrder(order)} />
                    <Printer />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* MODAL */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white p-6 rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 text-lg font-semibold">Order Detail</h2>
            <p>{selectedOrder.orderNumber}</p>
          </div>
        </div>
      )}
    </div>
  );
}
