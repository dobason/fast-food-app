# Restaurant Detail Page - Mock Data Guide

## ✅ Successfully Integrated

Mock data has been set up for the restaurant detail page with complete restaurant information including categories, food items, addons, and options.

## 📁 Files Created/Updated

### 1. **Mock Data File**
[lib/utils/mock-data/restaurant-detail.mock.ts](./restaurant-detail.mock.ts)

**Includes:**
- Complete restaurant information
- 5 food categories (Pizzas, Pasta, Appetizers, Desserts, Beverages)
- 13 food items with variations
- 3 addon groups (Extra Cheese, Meat Toppings, Veggie Toppings)
- 3 options (Extra Sauce, Garlic Crust, Gluten-Free Crust)
- Opening times for all 7 days
- Review data with 3 sample reviews
- Location and delivery information

### 2. **Updated Restaurant Detail Screen**
[lib/ui/screens/protected/resturant-store/restaurant/index.tsx](../../screens/protected/resturant-store/restaurant/index.tsx)

**Changes:**
- Line 15: Import mock data
- Line 86: Toggle variable `USE_MOCK_DATA = true`
- Lines 89-92: Conditional API fetching
- Lines 95-103: Skip GraphQL query when using mock
- Lines 106-107: Use mock or real data

## 🎯 How to Use

### Toggle Mock Data

**Use Mock Data (Current State):**
```typescript
const USE_MOCK_DATA = true; // Line 86
```

**Use Real API:**
```typescript
const USE_MOCK_DATA = false; // Line 86
```

## 📊 Mock Restaurant Data

### Restaurant: Bella Italia Restaurant

**Basic Info:**
- Name: Bella Italia Restaurant
- Address: 123 Main Street, Downtown, New York, NY 10001
- Phone: +1 (555) 123-4567
- Delivery Time: 30 minutes
- Delivery Fee: $3.99
- Minimum Order: $15
- Rating: 4.5 (234 reviews)

**Operating Hours:**
- Mon-Thu: 11:00 AM - 10:00 PM
- Fri: 11:00 AM - 11:00 PM
- Sat: 10:00 AM - 11:00 PM
- Sun: 10:00 AM - 9:00 PM

### Categories & Items

#### 🍕 Pizzas (3 items)
1. **Margherita Pizza** - $10.99 - $18.99
   - Classic tomato, mozzarella, basil
   - 3 sizes available

2. **Pepperoni Pizza** - $14.99 - $20.99
   - Premium pepperoni and mozzarella
   - Special on Medium: $15.99

3. **Quattro Formaggi** - $18.99 - $22.99
   - Four cheese blend
   - Special on Large: $19.99

#### 🍝 Pasta (3 items)
1. **Spaghetti Carbonara** - $14.99 - $18.99
   - Creamy egg sauce with pancetta
   - Special on Large: $16.99

2. **Fettuccine Alfredo** - $13.99 - $19.99
   - Rich parmesan sauce
   - Options: Plain, With Chicken, With Shrimp
   - Special on Shrimp: $17.99

3. **Lasagna Bolognese** - $15.99 - $29.99
   - Layers of pasta with meat sauce
   - Special on Individual: $13.99

#### 🥗 Appetizers (3 items)
1. **Bruschetta** - $7.99 - $10.99
   - Toasted bread with tomatoes
   - Special on 6pc: $9.99

2. **Mozzarella Sticks** - $8.99 - $12.99
   - Crispy breaded cheese
   - Special on 10pc: $11.99

3. **Garlic Bread** - $5.99 - $7.99
   - Fresh baked with herbs
   - Special Cheesy version: $6.99

#### 🍰 Desserts (2 items)
1. **Tiramisu** - $6.99
   - Classic Italian dessert
   - **Special: $5.99**

2. **Panna Cotta** - $5.99
   - Vanilla cream with berries

#### 🥤 Beverages (2 items)
1. **Italian Soda** - $3.99
   - Flavors: Strawberry, Lemon, Raspberry

2. **Espresso** - $2.99 - $4.49
   - **OUT OF STOCK** (for testing)

### Addons Available

**Extra Cheese** - $2.50
- Premium mozzarella

**Meat Toppings** - $1.75 - $2.50 each
- Pepperoni ($2.00)
- Italian Sausage ($2.50)
- Bacon ($2.00)
- Ham ($1.75)

**Veggie Toppings** - $1.00 - $1.50 each
- Mushrooms ($1.50)
- Bell Peppers ($1.25)
- Olives ($1.25)
- Onions ($1.00)
- Basil ($1.00)

### Options Available

- Extra Sauce - $0.50
- Garlic Crust - $1.50
- Gluten-Free Crust - $3.00

## 🎨 Features Included

### ✅ What Works with Mock Data

1. **Restaurant Banner** - Shows restaurant image
2. **Basic Info** - Name, address, rating, delivery time
3. **Category Navigation** - All 5 categories with scrolling
4. **Food Items Grid** - All 13 items with images
5. **Search Filter** - Search works on mock data
6. **Food Details Modal** - Click any item to see details
7. **Addons/Options** - Full addon and option selection
8. **Out of Stock** - Espresso marked as out of stock
9. **Reviews** - 3 sample reviews available
10. **Restaurant Info** - Full contact and location info
11. **Opening Hours** - Complete weekly schedule
12. **Price Variations** - Multiple sizes/options per item
13. **Special Pricing** - Discounted prices on select items

### ⚠️ Limitations

1. **Popular Deals** - Won't load (GraphQL query skipped)
2. **Favorites** - API call still happens (requires backend)
3. **Cart Operations** - May need real restaurant ID
4. **Add to Cart** - Local cart should still work

## 🔄 Testing Scenarios

### Test Different States

**Test Out of Stock:**
```typescript
// Espresso is marked as out of stock
isOutOfStock: true
```

**Test Search:**
```typescript
// Search for "pizza", "pasta", "tiramisu", etc.
// Filter works on title and description
```

**Test Categories:**
```typescript
// All 5 categories scroll smoothly
// Click category pills to navigate
```

**Test Price Variations:**
```typescript
// Each food has multiple size/variant options
// Some have discounted prices
```

## 💡 Customization

### Add More Food Items

```typescript
{
  _id: "food014",
  title: "Your New Item",
  image: "https://your-image-url.jpg",
  description: "Description here",
  subCategory: "Category Name",
  restaurant: "rest001",
  isOutOfStock: false,
  variations: [
    {
      _id: "var029",
      title: "Size/Variant Name",
      price: 14.99,
      discounted: 12.99, // 0 for no discount
      addons: []
    }
  ]
}
```

### Modify Restaurant Info

```typescript
// In restaurant-detail.mock.ts
name: "Your Restaurant Name",
address: "Your Address",
deliveryTime: 45, // minutes
deliveryCharges: 4.99,
// ... etc
```

### Change Opening Hours

```typescript
{
  day: "MON",
  times: [
    {
      startTime: ["09", "00"], // 9:00 AM
      endTime: ["17", "00"]    // 5:00 PM
    }
  ]
}
```

## 🚀 Production Ready

When ready for production:

1. **Set toggle to false:**
   ```typescript
   const USE_MOCK_DATA = false;
   ```

2. **Remove mock import (optional):**
   ```typescript
   // import { mockRestaurantDetail } from "@/lib/utils/mock-data/restaurant-detail.mock";
   ```

3. **Test with real API:**
   - Verify all categories load
   - Check food items display correctly
   - Test addon/option selection
   - Verify cart operations

## 📝 Summary

| Feature | Status | Notes |
|---------|--------|-------|
| Restaurant Info | ✅ | Complete with all details |
| Food Categories | ✅ | 5 categories, 13 items |
| Food Images | ✅ | Unsplash images |
| Price Variations | ✅ | Multiple sizes per item |
| Discounts | ✅ | Special pricing on select items |
| Addons | ✅ | 3 addon groups with options |
| Options | ✅ | 3 crust/sauce options |
| Reviews | ✅ | 3 sample reviews |
| Opening Hours | ✅ | Full weekly schedule |
| Out of Stock | ✅ | Espresso marked unavailable |
| Search | ✅ | Works on mock data |
| Popular Deals | ⚠️ | Requires backend |

---

**The restaurant detail page now has fully functional mock data!**

Set `USE_MOCK_DATA = false` when you're ready to test with the real API.
