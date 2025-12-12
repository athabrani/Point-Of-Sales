import { AppUser, UserRole } from './types';

const mockUsers: { email: string; password: string; user: AppUser }[] = [
  {
    email: 'admin@example.com',
    password: 'admin123',
    user: {
      id: 'u-1',
      name: 'Admin POS',
      email: 'admin@example.com',
      role: 'ADMIN',
    },
  },
  {
    email: 'cashier@example.com',
    password: 'cashier123',
    user: {
      id: 'u-2',
      name: 'Kasir 1',
      email: 'cashier@example.com',
      role: 'CASHIER',
    },
  },
];

export interface SessionPayload {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export async function authenticate(
  email: string,
  password: string
): Promise<AppUser | null> {
  const found = mockUsers.find(
    (u) => u.email === email && u.password === password
  );
  return found ? found.user : null;
}

export function createSessionValue(user: AppUser): string {
  const payload: SessionPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  return encodeURIComponent(JSON.stringify(payload));
}

export function parseSessionValue(value?: string): SessionPayload | null {
  if (!value) return null;
  try {
    return JSON.parse(decodeURIComponent(value)) as SessionPayload;
  } catch {
    return null;
  }
}
