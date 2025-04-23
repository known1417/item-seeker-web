
import { User, Item } from "@/types";

// Mock users data
export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
  }
];

// Mock items data
export const items: Item[] = [
  {
    id: "1",
    title: "Lost Black Wallet",
    description: "I lost my black leather wallet near Central Park. It contains my ID and credit cards.",
    type: "lost",
    date: "2025-04-15",
    location: "Central Park, New York",
    imageUrl: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=400",
    createdAt: "2025-04-16T10:30:00Z",
    userId: "1",
    userName: "John Doe",
    contactInfo: "john@example.com or 555-123-4567"
  },
  {
    id: "2",
    title: "Found Golden Retriever",
    description: "Found a friendly golden retriever without a collar near Downtown Library. Very well-behaved, seems to be someone's pet.",
    type: "found",
    date: "2025-04-18",
    location: "Downtown Library, Main St",
    imageUrl: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=400",
    createdAt: "2025-04-18T16:45:00Z",
    userId: "2",
    userName: "Jane Smith",
    contactInfo: "jane@example.com or 555-987-6543"
  },
  {
    id: "3",
    title: "Lost Prescription Glasses",
    description: "Lost my prescription glasses with black frames at Memorial Park during the morning jog.",
    type: "lost",
    date: "2025-04-17",
    location: "Memorial Park, West Side",
    imageUrl: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=400",
    createdAt: "2025-04-17T09:15:00Z",
    userId: "1",
    userName: "John Doe",
    contactInfo: "john@example.com"
  },
  {
    id: "4",
    title: "Found Car Keys",
    description: "Found a set of car keys with a Honda remote in the parking lot of the Shopping Mall.",
    type: "found",
    date: "2025-04-19",
    location: "City Shopping Mall, 5th Avenue",
    imageUrl: "https://images.unsplash.com/photo-1592635196078-adb20e9f03a9?q=80&w=400",
    createdAt: "2025-04-19T14:20:00Z",
    userId: "2",
    userName: "Jane Smith",
    contactInfo: "Please call 555-987-6543"
  },
  {
    id: "5",
    title: "Lost Blue Backpack",
    description: "Lost my blue Northface backpack on the 42 bus route this morning. It contains my laptop and important documents.",
    type: "lost",
    date: "2025-04-20",
    location: "Bus Route 42, between Downtown and University",
    imageUrl: "https://images.unsplash.com/photo-1577401239170-897942555fb3?q=80&w=400",
    createdAt: "2025-04-20T08:30:00Z",
    userId: "1",
    userName: "John Doe",
    contactInfo: "Call or text 555-123-4567 anytime"
  },
  {
    id: "6",
    title: "Found Umbrella",
    description: "Found a black automatic umbrella at Coffee Beans cafe yesterday evening.",
    type: "found",
    date: "2025-04-21",
    location: "Coffee Beans Cafe, River Street",
    createdAt: "2025-04-22T10:00:00Z",
    userId: "2",
    userName: "Jane Smith",
    contactInfo: "Ask for Jane at the cafe or email jane@example.com"
  }
];

// Mock authentication service
let currentUser: User | null = null;

export const login = (email: string, password: string): User | null => {
  // In a real app, you would validate the password too
  const user = users.find(user => user.email === email);
  if (user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
  return null;
};

export const register = (name: string, email: string, password: string): User | null => {
  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return null;
  }
  
  // Create new user
  const newUser: User = {
    id: `${users.length + 1}`,
    name,
    email,
  };
  
  users.push(newUser);
  currentUser = newUser;
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  return newUser;
};

export const logout = (): void => {
  currentUser = null;
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = (): User | null => {
  if (currentUser) return currentUser;
  
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
    return currentUser;
  }
  
  return null;
};

// Item service
export const getItems = (): Item[] => {
  return [...items].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const getItemById = (id: string): Item | undefined => {
  return items.find(item => item.id === id);
};

export const addItem = (newItem: Omit<Item, 'id' | 'createdAt' | 'userId' | 'userName'>): Item => {
  const user = getCurrentUser();
  if (!user) throw new Error('User not authenticated');
  
  const item: Item = {
    ...newItem,
    id: `${items.length + 1}`,
    createdAt: new Date().toISOString(),
    userId: user.id,
    userName: user.name
  };
  
  items.unshift(item);
  return item;
};

export const searchItems = (query: string): Item[] => {
  const lowerQuery = query.toLowerCase();
  return items.filter(item => 
    item.title.toLowerCase().includes(lowerQuery) || 
    item.description.toLowerCase().includes(lowerQuery) || 
    item.location.toLowerCase().includes(lowerQuery)
  );
};
