import { Product, Transaction } from './types';

export const db = {
  products: [] as Product[],
  transactions: [] as Transaction[],
};

// contoh seed produk (optional)
db.products.push(
  {
    id: 'p-1',
    name: 'Almond Brown Croissant',
    price: 32000,
    isActive: true,
    imageUrl:
      'https://images.unsplash.com/photo-1608100742430-b8c4...',
  },
  {
    id: 'p-2',
    name: 'Coffee Latte',
    price: 28000,
    isActive: true,
    imageUrl:
      'https://images.unsplash.com/photo-1512568400610-6c2ff...',
  }
);
