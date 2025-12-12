// app/page.tsx
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/get-current-user';

export default async function HomePage() {
  const user = await getCurrentUser();

  // Belum login → ke halaman login
  if (!user) {
    redirect('/login');
  }

  // Sudah login → arahkan sesuai role
  if (user.role === 'ADMIN') {
    redirect('/admin');
  }

  // Default: kasir
  redirect('/cashier');
}
