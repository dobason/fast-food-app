import { ILoginResponse, IOwnerLoginDataResponse } from "@/lib/utils/interfaces/forms";

/**
 * Mock data for Owner Login
 * Used for testing login functionality without backend
 */

// Mock Admin Login Response
export const mockAdminLogin: ILoginResponse = {
  shopType: "",
  userId: "admin001",
  token: "mock-admin-token-123456789",
  email: "admin@enatega.com",
  name: "Admin User",
  image: "https://placehold.co/200x200/3498db/white?text=AD",
  userType: "ADMIN",
  restaurants: [],
  permissions: [
    "VIEW_DASHBOARD",
    "MANAGE_USERS",
    "MANAGE_RESTAURANTS",
    "MANAGE_ORDERS",
    "VIEW_ANALYTICS",
    "MANAGE_SETTINGS"
  ],
  __typename: "OwnerLoginResponse"
};

// Mock Vendor Login Response (multiple restaurants)
export const mockVendorLogin: ILoginResponse = {
  shopType: "",
  userId: "vendor001",
  token: "mock-vendor-token-123456789",
  email: "vendor@enatega.com",
  name: "John Vendor",
  image: "https://placehold.co/200x200/27ae60/white?text=JV",
  userType: "VENDOR",
  restaurants: [
    {
      _id: "rest001",
      orderId: "ORD",
      name: "Bella Italia",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
      address: "123 Main Street, Downtown"
    },
    {
      _id: "rest002",
      orderId: "ORD",
      name: "Sushi Palace",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
      address: "456 Ocean Avenue, Waterfront"
    }
  ],
  permissions: [
    "MANAGE_RESTAURANT",
    "VIEW_ORDERS",
    "MANAGE_MENU"
  ],
  __typename: "OwnerLoginResponse"
};

// Mock Restaurant Login Response (single restaurant)
export const mockRestaurantLogin: ILoginResponse = {
  shopType: "restaurant",
  userId: "restaurant001",
  token: "mock-restaurant-token-123456789",
  email: "restaurant@enatega.com",
  name: "Bella Italia Restaurant",
  image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
  userType: "RESTAURANT",
  userTypeId: "rest001",
  restaurants: [
    {
      _id: "rest001",
      orderId: "ORD",
      name: "Bella Italia",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
      address: "123 Main Street, Downtown"
    }
  ],
  permissions: [
    "VIEW_ORDERS",
    "MANAGE_MENU",
    "VIEW_ANALYTICS"
  ],
  __typename: "OwnerLoginResponse"
};

// Mock Grocery Store Login Response
export const mockGroceryStoreLogin: ILoginResponse = {
  shopType: "grocery",
  userId: "grocery001",
  token: "mock-grocery-token-123456789",
  email: "grocery@enatega.com",
  name: "Fresh Market",
  image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=300&fit=crop",
  userType: "RESTAURANT",
  userTypeId: "store001",
  restaurants: [
    {
      _id: "store001",
      orderId: "ORD",
      name: "Fresh Market",
      image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=300&fit=crop",
      address: "456 Market Avenue, Uptown"
    }
  ],
  permissions: [
    "VIEW_ORDERS",
    "MANAGE_INVENTORY",
    "VIEW_ANALYTICS"
  ],
  __typename: "OwnerLoginResponse"
};

// Mock Staff Login Response
export const mockStaffLogin: ILoginResponse = {
  shopType: "",
  userId: "staff001",
  token: "mock-staff-token-123456789",
  email: "staff@enatega.com",
  name: "Jane Staff",
  image: "https://placehold.co/200x200/e67e22/white?text=JS",
  userType: "STAFF",
  restaurants: [],
  permissions: [
    "VIEW_DASHBOARD",
    "VIEW_ORDERS"
  ],
  __typename: "OwnerLoginResponse"
};

// Helper function to get mock login by email
export const getMockLoginByEmail = (email: string): IOwnerLoginDataResponse => {
  const normalizedEmail = email.toLowerCase().trim();

  // Admin login
  if (normalizedEmail.includes('admin')) {
    return { ownerLogin: mockAdminLogin };
  }

  // Vendor login (multiple restaurants)
  if (normalizedEmail.includes('vendor')) {
    return { ownerLogin: mockVendorLogin };
  }

  // Grocery store login
  if (normalizedEmail.includes('grocery') || normalizedEmail.includes('store')) {
    return { ownerLogin: mockGroceryStoreLogin };
  }

  // Staff login
  if (normalizedEmail.includes('staff')) {
    return { ownerLogin: mockStaffLogin };
  }

  // Default to restaurant login
  return { ownerLogin: mockRestaurantLogin };
};

// Mock response structure
export const mockOwnerLoginResponse: IOwnerLoginDataResponse = {
  ownerLogin: mockRestaurantLogin
};

// Export all mock data
export default {
  admin: mockAdminLogin,
  vendor: mockVendorLogin,
  restaurant: mockRestaurantLogin,
  grocery: mockGroceryStoreLogin,
  staff: mockStaffLogin,
  response: mockOwnerLoginResponse,
  getByEmail: getMockLoginByEmail
};
