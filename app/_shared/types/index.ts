// Shared Types - Easy Import
export * from './market';

// Common types used across features
export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface User {
  id: string;
  username: string;
  walletAddress?: string;
  reputation: number;
  joinedAt: string;
} 
