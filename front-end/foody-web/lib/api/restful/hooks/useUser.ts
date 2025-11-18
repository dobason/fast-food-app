import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { registerUser, loginUser } from '../mutations/user';
import { getUserProfile, getAllUsers, getMerchantStore, checkEmailExists, userKeys } from '../queries/user';
import { setAuthToken, removeAuthToken } from '../helpers';
import type { AuthResponse } from '../interfaces/user.interface';

/**
 * Hook for user registration
 * Usage:
 * const { mutate, isPending, error } = useRegister();
 * mutate({ name, email, password, role });
 */
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data: AuthResponse) => {
      // Store token in localStorage
      if (data.token) {
        setAuthToken(data.token);
      }
      // Invalidate user queries
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};

/**
 * Hook for user login
 * Usage:
 * const { mutate, isPending, error } = useLogin();
 * mutate({ email, password });
 */
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data: AuthResponse) => {
      // Store token in localStorage
      if (data.token) {
        setAuthToken(data.token);
      }
      // Invalidate user queries
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};

/**
 * Hook to get user profile
 * Usage:
 * const { data, isLoading, error } = useUserProfile();
 */
export const useUserProfile = () => {
  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: getUserProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

/**
 * Hook to get all users (admin only)
 * Usage:
 * const { data, isLoading, error } = useAllUsers();
 */
export const useAllUsers = () => {
  return useQuery({
    queryKey: userKeys.allUsers(),
    queryFn: getAllUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

/**
 * Hook to get merchant store info (merchant only)
 * Usage:
 * const { data, isLoading, error } = useMerchantStore();
 */
export const useMerchantStore = () => {
  return useQuery({
    queryKey: userKeys.merchantStore(),
    queryFn: getMerchantStore,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

/**
 * Hook for logout
 * Usage:
 * const { mutate } = useLogout();
 * mutate();
 */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Clear token from localStorage
      removeAuthToken();
      return Promise.resolve();
    },
    onSuccess: () => {
      // Clear all queries
      queryClient.clear();
    },
  });
};


/**
 * Hook to check if email exists (as a mutation for manual triggering)
 * Usage:
 * const { mutate, isPending, data } = useCheckEmail();
 * mutate(email, {
 *   onSuccess: (data) => {
 *     if (data.exists) {
 *       // Handle existing email
 *     } else {
 *       // Handle new email
 *     }
 *   }
 * });
 */
export const useCheckEmail = () => {
  return useMutation({
    mutationFn: (email: string) => checkEmailExists(email),
  });
};
