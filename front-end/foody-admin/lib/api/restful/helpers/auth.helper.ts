/**
 * Authentication helper functions for API requests
 */

/**
 * Get authentication token from localStorage
 * @returns {string | null} The stored token or null if not found
 */
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

/**
 * Create authorization headers with Bearer token
 * @returns {object} Headers object with Authorization field or empty object
 */
export const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Store authentication token in localStorage
 * @param {string} token - The JWT token to store
 */
export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

/**
 * Remove authentication token from localStorage
 */
export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if token exists, false otherwise
 */
export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};
