
export interface User {
  id: string;
  name: string;
  email: string;
}

export type ItemType = 'lost' | 'found';

export interface Item {
  id: string;
  title: string;
  description: string;
  type: ItemType;
  date: string;
  location: string;
  imageUrl?: string;
  createdAt: string;
  userId: string;
  userName: string;
  contactInfo?: string;
}
