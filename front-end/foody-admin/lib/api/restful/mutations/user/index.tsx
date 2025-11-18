import axios from 'axios';

import type { RegisterInput, LoginInput, AuthResponse } from '../../interfaces/user.interface';

const API_BASE_URL = process.env.NEXT_PUBLIC_USER_API || 'http://localhost:5001/api/';
const USER_API_URL = `${API_BASE_URL}users`;

/**
 * Register a new user
 * POST /api/users/register
 */
export const registerUser = async (data: RegisterInput): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${USER_API_URL}/register`, data);
  return response.data;
};

/**
 * Login user
 * POST /api/users/login
 */
export const loginUser = async (data: LoginInput): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${USER_API_URL}/login`, data);
  return response.data;
};
