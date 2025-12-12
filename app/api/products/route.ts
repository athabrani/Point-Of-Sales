import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Product } from '@/lib/types';
import { randomUUID } from 'crypto';

export async function GET() {
  return NextResponse.json(db.products);
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<Product>;
  const newProduct: Product = {
    id: randomUUID(),
    name: body.name ?? 'New Product',
    price: body.price ?? 0,
    imageUrl: body.imageUrl,
    isActive: body.isActive ?? true,
  };
  db.products.push(newProduct);
  return NextResponse.json(newProduct, { status: 201 });
}
