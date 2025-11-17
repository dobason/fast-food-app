# Mock Data Implementation Guide

This guide shows how mock data has been integrated across the application for development and testing.

## 📁 Files Updated

### 1. **Restaurants Page**
File: [lib/ui/screens/protected/home/restaurants/index.tsx](../../screens/protected/home/restaurants/index.tsx)

**Changes:**
- Added mock data import
- Toggle variable `USE_MOCK_DATA = true`
- Conditional API fetching (skipped when using mock data)
- Dynamic data selection based on toggle

**Implementation:**
```typescript
import { mockCuisineRestaurants } from '@/lib/utils/mock-data/cuisine-restaurants.mock';

const USE_MOCK_DATA = true; // Toggle this for testing

const { loading, error, queryData, fetchMore } = useNearByRestaurantsPreview(
  !USE_MOCK_DATA, // Only fetch if not using mock data
  page,
  limit,
  'restaurant'
);

const effectiveQueryData = USE_MOCK_DATA ? mockCuisineRestaurants : queryData;
```

### 2. **Cuisine Selection Section**
File: [lib/ui/screen-components/protected/home/cuisine-selection/main/index.tsx](../../ui/screen-components/protected/home/cuisine-selection/main/index.tsx)

**Changes:**
- Direct use of mock data with cuisine filtering
- Translation integration for dynamic titles
- Removed loading/error states when using mock

**Implementation:**
```typescript
import { mockCuisineRestaurants } from '@/lib/utils/mock-data/cuisine-restaurants.mock';

const getCuisinRestaurants = mockCuisineRestaurants.filter((item) =>
  item?.cuisines?.some(
    (c) => c?.toString().normalize('NFKC').toLocaleLowerCase() === normalizedSlug
  )
);
```

## 🎯 How to Use

### Quick Toggle

To switch between mock and real data:

**Option 1: Direct Toggle**
```typescript
// In the component file
const USE_MOCK_DATA = true;  // Use mock data
const USE_MOCK_DATA = false; // Use real API
```

**Option 2: Environment Variable**
```bash
# Add to .env.local
NEXT_PUBLIC_USE_MOCK_DATA=true
```

```typescript
// In component
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
```

### Benefits of Using Mock Data

1. **Development Speed**
   - No need for backend connection
   - Instant data availability
   - No API rate limits

2. **Testing**
   - Consistent, predictable data
   - Test edge cases easily
   - No external dependencies

3. **UI/UX Work**
   - Work on frontend while backend is being developed
   - Design with realistic data
   - Test different data scenarios

4. **Offline Development**
   - Continue coding without internet
   - No backend server required
   - Portable development environment

## 📊 Mock Data Structure

The mock data includes **6 restaurants** across different cuisines:

| Restaurant | Cuisines | Rating | Delivery |
|------------|----------|--------|----------|
| Bella Italia | Italian, Pizza, Pasta | 4.5 | $3.99 |
| Sushi Palace | Japanese, Sushi, Asian | 4.8 | Free |
| Taco Fiesta | Mexican, Tacos, Latin | 4.3 | $2.99 |
| Bangkok Street Food | Thai, Asian, Spicy | 4.7 | $4.99 |
| The Burger Joint | American, Burgers | 4.6 | Free |
| Delhi Spice House | Indian, Curry, Asian | 4.9 | $5.99 |

### Data Includes:
- ✅ Complete restaurant information
- ✅ Images (Unsplash URLs)
- ✅ Categories with food items
- ✅ Pricing and variations
- ✅ Ratings and reviews
- ✅ Delivery information
- ✅ Opening times
- ✅ Location coordinates

## 🔧 Advanced Customization

### Filter by Rating
```typescript
const topRatedRestaurants = mockCuisineRestaurants.filter(
  (r) => r.rating >= 4.5
);
```

### Filter by Free Delivery
```typescript
const freeDeliveryRestaurants = mockCuisineRestaurants.filter(
  (r) => r.freeDelivery === true
);
```

### Filter by Distance
```typescript
const nearbyRestaurants = mockCuisineRestaurants.filter(
  (r) => (r.distanceWithCurrentLocation || 999) <= 2
);
```

### Add Custom Restaurant
```typescript
import { IRestaurant } from '@/lib/utils/interfaces/restaurants.interface';
import { mockCuisineRestaurants } from './cuisine-restaurants.mock';

const myCustomRestaurant: IRestaurant = {
  _id: "rest007",
  name: "My Custom Restaurant",
  // ... all required fields
  cuisines: ["custom", "fusion"],
  // ...
};

const allRestaurants = [...mockCuisineRestaurants, myCustomRestaurant];
```

## 🎨 Visual Debug Mode

Add a visual indicator when using mock data:

```typescript
{USE_MOCK_DATA && (
  <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
    <strong>🧪 Development Mode:</strong> Using mock data
  </div>
)}
```

## 📝 Current Implementation Status

| Component | Mock Data | Toggle | Status |
|-----------|-----------|--------|--------|
| Restaurants Page | ✅ | ✅ | Complete |
| Cuisine Selection | ✅ | ✅ | Complete |
| Stores Page | ❌ | ❌ | Pending |
| Discovery Page | ❌ | ❌ | Pending |

## 🚀 Best Practices

1. **Always comment when using mock data**
   ```typescript
   // TODO: Remove mock data before production
   const USE_MOCK_DATA = true;
   ```

2. **Use environment variables for team-wide control**
   ```typescript
   const USE_MOCK_DATA = process.env.NODE_ENV === 'development';
   ```

3. **Keep mock data updated with API changes**
   - Update mock data when API schema changes
   - Match field names and types
   - Include all required fields

4. **Test with both mock and real data**
   - Ensure component works with both
   - Verify data transformations
   - Check error handling

## 📚 Related Files

- **Mock Data Source:** [cuisine-restaurants.mock.ts](./cuisine-restaurants.mock.ts)
- **Interface Definition:** [restaurants.interface.ts](../interfaces/restaurants.interface.ts)
- **Usage Examples:** [example-usage.tsx](./example-usage.tsx)
- **README:** [README-MOCK-DATA.md](./README-MOCK-DATA.md)

## 🔄 Migration Path to Production

When ready for production:

1. **Set toggle to false**
   ```typescript
   const USE_MOCK_DATA = false;
   ```

2. **Or remove mock code entirely**
   ```diff
   - import { mockCuisineRestaurants } from '@/lib/utils/mock-data/cuisine-restaurants.mock';
   - const USE_MOCK_DATA = true;
   - const effectiveQueryData = USE_MOCK_DATA ? mockCuisineRestaurants : queryData;
   + // Mock data removed for production
   ```

3. **Test with real API**
   - Verify all data flows correctly
   - Check error handling
   - Test edge cases

4. **Remove dev indicators**
   - Remove debug messages
   - Remove visual indicators
   - Clean up comments

## 💡 Tips

- Use mock data for **UI development**
- Use real API for **integration testing**
- Toggle easily during **code reviews**
- Keep mock data **version controlled**
- Document **custom scenarios** you create

---

**Need more mock data?**
- Copy the pattern in `cuisine-restaurants.mock.ts`
- Create new mock files for other data types
- Follow the same structure and naming conventions
