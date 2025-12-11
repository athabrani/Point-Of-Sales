// app/acc/cashier/layout.tsx
import { ReactNode } from 'react';
import { getCurrentUser } from '@/lib/get-current-user';
import { CashierShell } from '@/components/layout/CashierShell';

export default async function CashierLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();
  return <CashierShell user={user}>{children}</CashierShell>;
}
