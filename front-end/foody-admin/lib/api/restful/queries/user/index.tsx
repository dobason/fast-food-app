import axios from 'axios';
import type {
  ProfileResponse,
  AllUsersResponse,
  MerchantStoreResponse,
  CheckEmailResponse,
} from '../../interfaces/user.interface';
import { getAuthHeaders } from '../../helpers';

const API_BASE_URL = process.env.NEXT_PUBLIC_USER_API || 'http://localhost:5001/api/';
const USER_API_URL = `${API_BASE_URL}users`;

/**
 * Get user profile (authenticated)
 * GET /api/users/profile
 */
export const getUserProfile = async (): Promise<ProfileResponse> => {
  const response = await axios.get<ProfileResponse>(`${USER_API_URL}/profile`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

/**
 * Get all users (admin only)
 * GET /api/users/all-users
 */
export const getAllUsers = async (): Promise<AllUsersResponse> => {
  const response = await axios.get<AllUsersResponse>(`${USER_API_URL}/all-users`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

/**
 * Get merchant store info (merchant only)
 * GET /api/users/my-store
 */
export const getMerchantStore = async (): Promise<MerchantStoreResponse> => {
  const response = await axios.get<MerchantStoreResponse>(`${USER_API_URL}/my-store`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

/**
 * Check if email exists
 * GET /api/users/check-email
 */
export const checkEmailExists = async (email: string): Promise<CheckEmailResponse> => {
  const response = await axios.get<CheckEmailResponse>(`${USER_API_URL}/check-email`, {
    params: { email },
  });
  return response.data;
};

// TanStack Query keys for cache management
export const userKeys = {
  all: ['users'] as const,
  profile: () => [...userKeys.all, 'profile'] as const,
  allUsers: () => [...userKeys.all, 'all-users'] as const,
  merchantStore: () => [...userKeys.all, 'my-store'] as const,
  checkEmail: (email: string) => [...userKeys.all, 'check-email', email] as const,
};
