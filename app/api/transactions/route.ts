// app/api/transactions/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Transaction } from '@/lib/types';
import { randomUUID } from 'crypto';

export async function GET() {
  return NextResponse.json(db.transactions);
}

export async function POST(req: Request) {
  const body = (await req.json()) as Omit<Transaction, 'id' | 'createdAt'>;

  const newTx: Transaction = {
    ...body,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };

  db.transactions.push(newTx);
  return NextResponse.json(newTx, { status: 201 });
}
