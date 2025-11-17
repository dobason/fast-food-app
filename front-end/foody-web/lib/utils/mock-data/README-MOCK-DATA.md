# Mock Data Usage Guide

## Cuisine Restaurants Mock Data

### Quick Start

```typescript
import {
  mockCuisineRestaurants,
  getRestaurantsByCuisine,
  availableCuisines
} from "@/lib/utils/mock-data/cuisine-restaurants.mock";
```

### Usage in Component

#### Example 1: Replace API call with mock data

```typescript
// Before (using real API)
const { queryData, loading, error } = useNearByRestaurantsPreview(true,1,109,null);

const getCuisinRestaurants = queryData?.filter((item) =>
  item?.cuisines?.some(
    (c) => c?.toString().normalize("NFKC").toLocaleLowerCase() === normalizedSlug
  )
);

// After (using mock data for testing)
import { getRestaurantsByCuisine } from "@/lib/utils/mock-data/cuisine-restaurants.mock";

const getCuisinRestaurants = getRestaurantsByCuisine(normalizedSlug);
```

#### Example 2: Using mock data during development

```typescript
import { mockCuisineRestaurants } from "@/lib/utils/mock-data/cuisine-restaurants.mock";

function CuisineSelectionSection() {
  const params = useParams() as Record<string, string | string[]>;

  // ... param parsing logic ...

  // Toggle between mock and real data
  const USE_MOCK_DATA = process.env.NODE_ENV === 'development';

  const { queryData, loading, error } = useNearByRestaurantsPreview(
    !USE_MOCK_DATA, 1, 109, null
  );

  const getCuisinRestaurants = USE_MOCK_DATA
    ? mockCuisineRestaurants.filter((item) =>
        item?.cuisines?.some(
          (c) => c?.toString().normalize("NFKC").toLocaleLowerCase() === normalizedSlug
        )
      )
    : queryData?.filter((item) =>
        item?.cuisines?.some(
          (c) => c?.toString().normalize("NFKC").toLocaleLowerCase() === normalizedSlug
        )
      );

  // Rest of component...
}
```

### Available Mock Restaurants

The mock data includes 6 restaurants with various cuisines:

1. **Bella Italia** - Italian, Pizza, Pasta
2. **Sushi Palace** - Japanese, Sushi, Asian
3. **Taco Fiesta** - Mexican, Tacos, Latin
4. **Bangkok Street Food** - Thai, Asian, Spicy
5. **The Burger Joint** - American, Burgers, Fast Food
6. **Delhi Spice House** - Indian, Curry, Asian

### Available Cuisines

```typescript
const cuisines = [
  "italian", "pizza", "pasta",
  "japanese", "sushi", "asian",
  "mexican", "tacos", "latin",
  "thai", "spicy",
  "american", "burgers", "fast food",
  "indian", "curry"
];
```

### Filter Examples

```typescript
// Get all Italian restaurants
const italianRestaurants = getRestaurantsByCuisine("italian");

// Get all Asian cuisine restaurants
const asianRestaurants = getRestaurantsByCuisine("asian");

// Get all restaurants with free delivery
const freeDeliveryRestaurants = mockCuisineRestaurants.filter(
  (r) => r.freeDelivery === true
);

// Get restaurants within 2km
const nearbyRestaurants = mockCuisineRestaurants.filter(
  (r) => (r.distanceWithCurrentLocation || 999) <= 2
);

// Get highly rated restaurants (4.5+)
const topRatedRestaurants = mockCuisineRestaurants.filter(
  (r) => r.rating >= 4.5
);
```

### Data Structure

Each restaurant object includes:

- **Basic Info**: `_id`, `name`, `image`, `logo`, `address`
- **Delivery**: `deliveryTime`, `deliveryFee`, `minimumOrder`, `freeDelivery`
- **Ratings**: `rating`, `reviewCount`, `reviewAverage`
- **Status**: `isActive`, `isAvailable`
- **Business**: `commissionRate`, `tax`, `acceptVouchers`
- **Categories**: Array of food categories with items
- **Cuisines**: Array of cuisine types
- **Location**: Coordinates for mapping
- **Opening Times**: Schedule information

### Customizing Mock Data

To add more restaurants:

```typescript
const newRestaurant: IRestaurant = {
  _id: "rest007",
  name: "Your Restaurant",
  // ... all required fields
  cuisines: ["french", "fine dining"],
  // ...
};

mockCuisineRestaurants.push(newRestaurant);
```

### Testing Different Scenarios

```typescript
// Test empty results
const getCuisinRestaurants = getRestaurantsByCuisine("nonexistent-cuisine"); // []

// Test with special characters
const hebrewRestaurants = getRestaurantsByCuisine("עברית"); // normalized search

// Test loading state
const loading = false; // manually control
const error = false;
```

## Environment Variable Toggle

Add to your `.env.local`:

```bash
# Set to 'true' to use mock data, 'false' to use real API
NEXT_PUBLIC_USE_MOCK_DATA=true
```

Then in your component:

```typescript
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
```
