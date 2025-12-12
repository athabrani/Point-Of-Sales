import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Product } from '@/lib/types';

interface Params {
  params: { id: string };
}

export async function PUT(req: Request, { params }: Params) {
  const { id } = params;
  const body = (await req.json()) as Partial<Product>;

  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  db.products[index] = { ...db.products[index], ...body };
  return NextResponse.json(db.products[index]);
}

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = params;
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const removed = db.products.splice(index, 1)[0];
  return NextResponse.json(removed);
}
