'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import type { SessionPayload } from '@/lib/auth';

interface Props {
  user: SessionPayload | null;
  children: ReactNode;
}

export function CashierShell({ user, children }: Props) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
            POS
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Cashier Mode</span>
            <span className="text-sm font-semibold text-gray-900">
              Front Desk
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <nav className="flex gap-3">
            <Link
              href="/cashier"
              className={`px-3 py-1.5 rounded-lg ${
                pathname === '/cashier'
                  ? 'bg-orange-100 text-orange-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              POS
            </Link>
            <Link
              href="/cashier/stats"
              className={`px-3 py-1.5 rounded-lg ${
                pathname.startsWith('/cashier/stats')
                  ? 'bg-orange-100 text-orange-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Sales Stats
            </Link>
          </nav>

          <div className="border-l border-gray-200 pl-3">
            <div className="font-medium text-gray-900">
              {user?.name ?? 'Cashier'}
            </div>
            <div className="text-gray-500">{user?.email}</div>
          </div>

          <form action="/api/auth/logout" method="POST">
            <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
              Logout
            </button>
          </form>
        </div>
      </header>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
