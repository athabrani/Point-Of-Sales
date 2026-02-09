import { Product, Transaction } from './types';

export const db = {
  products: [] as Product[],
  transactions: [] as Transaction[],
};

// contoh seed produk (optional)
db.products.push(
  {
    id: '1',
    name: 'Almond Brown Croissant',
    price: 32000,
    isActive: true,
    imageUrl:
      'https://images.unsplash.com/photo-1649542181703-33cc4f373b28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbG1vbmQlMjBjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzY1MTk2MTk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Croissant',
  },
  {
    id: '2',
    name: 'Coffee Latte',
    price: 28000,
    isActive: true,
    imageUrl:
      'https://images.unsplash.com/photo-1608100742430-b8c4b9bf1276?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNpYyUyMGNyb2lzc2FudCUyMGJ1dHRlcnxlbnwxfHx8fDE3NjUxOTYyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Croissant',
  },
  {
    id: 3,
    name: 'Sweet Granulated Sugar Croissant',
    description: 'Croissant',
    price: 38000,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1579721333025-36db734131d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VldCUyMGdyYW51bGF0ZWQlMjBkb251dHxlbnwxfHx8fDE3NjUxOTYyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'signature',
  },
  {
    id: 4,
    name: 'Smoky Tenderloin Stick Croissant',
    description: 'Croissant',
    price: 45000,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1718897266472-5b7229ebdd3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjcm9pc3NhbnR8ZW58MXx8fHwxNzY1MTExODk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'signature',
  },
  {
    id: 5,
    name: 'Sweet Chocolate Croissant',
    description: 'Croissant',
    price: 34000,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1718897266472-5b7229ebdd3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjcm9pc1NhbnR8ZW58MXx8fHwxNzY1MTExODk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'croissant',
  },
  {
    id: 6,
    name: 'Basic Croissant & Strawberry Jam',
    description: 'Croissant',
    price: 43000,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1599034594900-f54069f84a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhd2JlcnJ5JTIwamFtJTIwY3JvaXNzYW50fGVufDF8fHx8MTc2NTE5NjIwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'croissant',
  },
  {
    id: 7,
    name: 'Blueberry Jam Croissant',
    description: 'Croissant',
    price: 32000,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1692432248702-bca6b27065a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlYmVycnklMjBqYW0lMjBjcm9pc3NhbnR8ZW58MXx8fHwxNzY1MTk2MjAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'croissant',
  },
  {
    id: 8,
    name: 'Strawberry Jam Croissant',
    description: 'Croissant',
    price: 32000,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1599034594900-f54069f84a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhd2JlcnJ5JTIwamFtJTIwY3JvaXNzYW50fGVufDF8fHx8MTc2NTE5NjIwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'croissant',
  },



);
