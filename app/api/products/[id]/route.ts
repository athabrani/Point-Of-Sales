import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import type { Product } from '@/lib/types';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const product = db.products.find((p) => p.id === params.id);
  if (!product) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = (await req.json()) as Partial<Product>;
  const idx = db.products.findIndex((p) => p.id === params.id);
  if (idx === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  db.products[idx] = {
    ...db.products[idx],
    ...body,
    id: params.id,
  };
  return NextResponse.json(db.products[idx]);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const idx = db.products.findIndex((p) => p.id === params.id);
  if (idx === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  db.products.splice(idx, 1);
  return NextResponse.json({ success: true });
}
