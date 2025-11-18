// User API Request/Response Interfaces

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'merchant' | 'admin';
  phone?: string;
  address?: string;
  storeName?: string;
  storeDescription?: string;
  storeLocation?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'merchant' | 'admin';
  phone?: string;
  address?: string;
  storeName?: string;
  storeDescription?: string;
  storeLocation?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ProfileResponse {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'merchant' | 'admin';
  phone?: string;
  address?: string;
  storeName?: string;
  storeDescription?: string;
  storeLocation?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AllUsersResponse {
  message: string;
  users: User[];
}

export interface MerchantStoreResponse {
  message: string;
  store: {
    storeName: string;
    storeDescription?: string;
    storeLocation?: string;
    user: User;
  };
}

export interface CheckEmailResponse {
  message: string;
  exists: boolean;
  user?: {
    name: string;
    role: string;
  };
}
