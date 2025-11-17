# Owner Login Mock Data Guide

## Overview

Mock data has been set up for the owner login functionality to enable testing without a backend connection.

## Files Created/Updated

### 1. **Mock Data File**
[lib/utils/mock-data/owner-login.mock.ts](./owner-login.mock.ts)

**Includes:**
- Mock login responses for different user types
- Helper function to get mock data by email
- Complete user profiles with permissions

### 2. **Updated Login Component**
[lib/ui/screen-components/unprotected/authentication/sign-in-email-password/index.tsx](../../ui/screen-components/unprotected/authentication/sign-in-email-password/index.tsx)

**Changes:**
- Line 52: Import mock data helper
- Line 111: Toggle variable `USE_MOCK_DATA = true`
- Lines 113-130: Mock login logic with simulated delay
- Lines 132-146: Real API login (when toggle is false)

## How to Use

### Toggle Mock Data

**Use Mock Data (Current State):**
```typescript
const USE_MOCK_DATA = true; // Line 111
```

**Use Real API:**
```typescript
const USE_MOCK_DATA = false; // Line 111
```

## Mock User Accounts

The mock system automatically selects the appropriate user type based on the email entered:

### 1. **Admin Login**
- **Email**: Any email containing "admin" (e.g., `admin@enatega.com`)
- **User Type**: ADMIN
- **Permissions**: Full access (dashboard, users, restaurants, orders, analytics, settings)
- **Restaurants**: None
- **Redirect**: Admin dashboard

### 2. **Vendor Login** (Multiple Restaurants)
- **Email**: Any email containing "vendor" (e.g., `vendor@enatega.com`)
- **User Type**: VENDOR
- **Permissions**: Manage restaurant, view orders, manage menu
- **Restaurants**: 2 restaurants (Bella Italia, Sushi Palace)
- **Redirect**: Vendor dashboard

### 3. **Restaurant Login** (Default)
- **Email**: Any email containing "restaurant" OR default (e.g., `restaurant@enatega.com`, `test@example.com`)
- **User Type**: RESTAURANT
- **Shop Type**: restaurant
- **Permissions**: View orders, manage menu, view analytics
- **Restaurants**: 1 restaurant (Bella Italia)
- **Redirect**: Restaurant dashboard

### 4. **Grocery Store Login**
- **Email**: Any email containing "grocery" or "store" (e.g., `grocery@enatega.com`, `store@example.com`)
- **User Type**: RESTAURANT
- **Shop Type**: grocery
- **Permissions**: View orders, manage inventory, view analytics
- **Restaurants**: 1 store (Fresh Market)
- **Redirect**: Restaurant dashboard (grocery mode)

### 5. **Staff Login**
- **Email**: Any email containing "staff" (e.g., `staff@enatega.com`)
- **User Type**: STAFF
- **Permissions**: Limited (view dashboard, view orders)
- **Restaurants**: None
- **Redirect**: Staff dashboard

## Testing Examples

### Test Admin Access
```
Email: admin@enatega.com
Password: any password (not validated in mock mode)
```

### Test Vendor with Multiple Restaurants
```
Email: vendor@enatega.com
Password: any password
```

### Test Single Restaurant
```
Email: restaurant@enatega.com
Password: any password
```

### Test Grocery Store
```
Email: grocery@enatega.com
Password: any password
```

### Test Staff Access
```
Email: staff@enatega.com
Password: any password
```

## Mock Data Structure

Each mock login response includes:

```typescript
{
  shopType: string,              // "restaurant", "grocery", or ""
  userId: string,                // Unique user ID
  token: string,                 // Mock JWT token
  email: string,                 // User email
  name?: string,                 // User display name
  image?: string,                // User avatar URL
  userType: string,              // "ADMIN" | "STAFF" | "VENDOR" | "RESTAURANT"
  userTypeId?: string,           // Restaurant/Store ID (for RESTAURANT type)
  restaurants: Array,            // List of owned restaurants
  permissions?: Array,           // User permissions
  __typename: string             // GraphQL typename
}
```

## Features

### ✅ What Works with Mock Data

1. **Email-based User Type Selection** - Different user types based on email
2. **Simulated API Delay** - 1 second delay to mimic real API
3. **Complete User Profiles** - Full user data with permissions
4. **Multiple Restaurants** - Vendor can have multiple restaurants
5. **Shop Type Support** - Both restaurant and grocery types
6. **Automatic Redirect** - Routes to correct dashboard based on user type
7. **Local Storage** - Saves user data and restaurant selection
8. **Toast Notifications** - Success message on login

### ⚠️ Limitations

1. **No Password Validation** - Any password will work in mock mode
2. **No Real Authentication** - Token is just a mock string
3. **No Backend Validation** - All data is client-side

## Login Flow

1. User enters email and password
2. Form validates using SignInSchema
3. If `USE_MOCK_DATA = true`:
   - System waits 1 second (simulated delay)
   - `getMockLoginByEmail()` returns appropriate mock data
   - `onCompleted()` processes the mock response
   - User data saved to localStorage
   - Redirect to appropriate dashboard
   - Success toast shown
4. If `USE_MOCK_DATA = false`:
   - Real GraphQL mutation called
   - Backend processes login
   - Standard flow continues

## Customization

### Add Custom User Type

Edit [owner-login.mock.ts](./owner-login.mock.ts):

```typescript
export const mockCustomUserLogin: ILoginResponse = {
  shopType: "custom",
  userId: "custom001",
  token: "mock-custom-token-123456789",
  email: "custom@enatega.com",
  name: "Custom User",
  image: "https://placehold.co/200x200/color/white?text=CU",
  userType: "RESTAURANT",
  userTypeId: "custom001",
  restaurants: [...],
  permissions: [...],
  __typename: "OwnerLoginResponse"
};
```

Update `getMockLoginByEmail()`:

```typescript
if (normalizedEmail.includes('custom')) {
  return { ownerLogin: mockCustomUserLogin };
}
```

### Modify Permissions

Edit the `permissions` array in the mock data:

```typescript
permissions: [
  "VIEW_DASHBOARD",
  "YOUR_CUSTOM_PERMISSION",
  "ANOTHER_PERMISSION"
]
```

### Change Redirect Routes

Modify `DEFAULT_ROUTES` in constants to change where users are redirected after login.

## Production Ready

When ready for production:

1. **Set toggle to false:**
   ```typescript
   const USE_MOCK_DATA = false;
   ```

2. **Remove mock import (optional):**
   ```typescript
   // import { getMockLoginByEmail } from '@/lib/utils/mock-data/owner-login.mock';
   ```

3. **Test with real API:**
   - Verify all user types login correctly
   - Check permission handling
   - Verify redirect routes
   - Test error handling

## Summary

| User Type | Email Keyword | Restaurants | Permissions | Shop Type |
|-----------|---------------|-------------|-------------|-----------|
| Admin | "admin" | 0 | Full access | - |
| Vendor | "vendor" | 2 | Manage restaurants | - |
| Restaurant | "restaurant" or default | 1 | Manage menu | restaurant |
| Grocery | "grocery" or "store" | 1 | Manage inventory | grocery |
| Staff | "staff" | 0 | Limited | - |

---

**The owner login now has fully functional mock data!**

Set `USE_MOCK_DATA = false` when you're ready to test with the real API.
