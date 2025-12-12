// app/cashier/stats/page.tsx
import { db } from '@/lib/db';

export default function CashierStatsPage() {
  const today = new Date().toISOString().slice(0, 10);
  const todayTx = db.transactions.filter((tx) =>
    tx.createdAt.startsWith(today)
  );
  const totalToday = todayTx.reduce(
    (sum, tx) => sum + tx.totalAmount,
    0
  );

  return (
    <div className="space-y-4">
      <h1 className="text-sm font-semibold text-gray-900">
        Sales Statistics (Today)
      </h1>

      <div className="grid md:grid-cols-3 gap-3 text-xs">
        <div className="bg-white rounded-xl border border-gray-200 p-3">
          <div className="text-gray-500">Transactions</div>
          <div className="text-xl font-semibold text-gray-900">
            {todayTx.length}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-3">
          <div className="text-gray-500">Revenue</div>
          <div className="text-xl font-semibold text-gray-900">
            Rp {totalToday.toLocaleString('id-ID')}
          </div>
        </div>
      </div>
    </div>
  );
}
