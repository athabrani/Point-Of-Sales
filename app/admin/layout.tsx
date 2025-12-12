import { ReactNode } from 'react';
import { getCurrentUser } from '@/lib/get-current-user';
import { AdminShell } from '@/components/layout/AdminShell';

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();
  return <AdminShell user={user}>{children}</AdminShell>;
}
