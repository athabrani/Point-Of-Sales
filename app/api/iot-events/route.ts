import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { PaymentMethod } from '@/lib/types';

/**
 * Body contoh:
 * {
 *   "transactionId": "xxx",
 *   "imageUrl": "https://.../img.jpg",
 *   "paymentMethodDetected": "CASH"
 * }
 */
export async function POST(req: Request) {
  const body = (await req.json()) as {
    transactionId: string;
    imageUrl: string;
    paymentMethodDetected: PaymentMethod;
  };

  const tx = db.transactions.find((t) => t.id === body.transactionId);
  if (!tx) {
    return NextResponse.json(
      { error: 'Transaction not found' },
      { status: 404 }
    );
  }

  tx.iotImageUrl = body.imageUrl;
  tx.paymentMethodDetected = body.paymentMethodDetected;

  return NextResponse.json(tx);
}
