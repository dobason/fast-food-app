import { IRestaurant } from "@/lib/utils/interfaces/restaurants.interface";

/**
 * Mock data for getCuisinRestaurants
 * This data represents restaurants filtered by cuisine type
 */

export const mockCuisineRestaurants: IRestaurant[] = [
  {
    _id: "rest001",
    name: "Bella Italia",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
    logo: "https://placehold.co/200x200/e74c3c/white?text=BI",
    address: "123 Main Street, Downtown",
    deliveryTime: 30,
    minimumOrder: 15,
    rating: 4.5,
    isActive: true,
    isAvailable: true,
    commissionRate: 15,
    tax: 8.5,
    shopType: "restaurant",
    cuisines: ["italian", "pizza", "pasta"],
    reviewCount: 234,
    reviewAverage: 4.5,
    distanceWithCurrentLocation: 2.3,
    freeDelivery: false,
    acceptVouchers: true,
    location: {
      coordinates: [-73.935242, 40.730610] // NYC coordinates
    },
    orderId: "ORD",
    orderPrefix: "BI",
    slug: "bella-italia",
    reviewData: {
      total: 234,
      ratings: 4.5,
      reviews: [
        {
          _id: "rev001",
          order: {
            _id: "order001",
            orderId: "ORD001",
            restaurant: {
              _id: "rest001",
              name: "Bella Italia"
            }
          },
          rating: 5,
          description: "Amazing pizza! Best in town!",
          createdAt: "2024-01-15T10:30:00Z"
        }
      ]
    },
    categories: [
      {
        _id: "cat001",
        title: "Pizza",
        foods: [
          {
            _id: "food001",
            title: "Margherita Pizza",
            image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
            description: "Classic tomato, mozzarella, and basil",
            subCategory: "Classic Pizzas",
            restaurant: "rest001",
            variations: [
              {
                _id: "var001",
                title: "Small",
                price: 12.99,
                discounted: 10.99,
                addons: []
              },
              {
                _id: "var002",
                title: "Large",
                price: 18.99,
                discounted: 0,
                addons: []
              }
            ],
            isOutOfStock: false
          }
        ]
      }
    ],
    options: [],
    addons: [],
    zone: {
      _id: "zone001",
      title: "Downtown Zone",
      tax: 8.5
    },
    openingTimes: [
      {
        day: "Monday",
        times: [
          {
            startTime: ["11", "00"],
            endTime: ["22", "00"]
          }
        ]
      }
    ],
    deliveryInfo: {
      deliveryFee: 3.99,
      deliveryTime: 30,
      minimumOrder: 15
    }
  },
  {
    _id: "rest002",
    name: "Sushi Palace",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop",
    logo: "https://placehold.co/200x200/3498db/white?text=SP",
    address: "456 Oak Avenue, Midtown",
    deliveryTime: 25,
    minimumOrder: 20,
    rating: 4.8,
    isActive: true,
    isAvailable: true,
    commissionRate: 12,
    tax: 8.5,
    shopType: "restaurant",
    cuisines: ["japanese", "sushi", "asian"],
    reviewCount: 567,
    reviewAverage: 4.8,
    distanceWithCurrentLocation: 1.5,
    freeDelivery: true,
    acceptVouchers: true,
    location: {
      coordinates: [-73.935242, 40.730610]
    },
    orderId: "ORD",
    orderPrefix: "SP",
    slug: "sushi-palace",
    reviewData: {
      total: 567,
      ratings: 4.8,
      reviews: []
    },
    categories: [
      {
        _id: "cat002",
        title: "Sushi Rolls",
        foods: [
          {
            _id: "food002",
            title: "California Roll",
            image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
            description: "Crab, avocado, cucumber",
            subCategory: "Classic Rolls",
            restaurant: "rest002",
            variations: [
              {
                _id: "var003",
                title: "6 Pieces",
                price: 8.99,
                discounted: 0,
                addons: []
              },
              {
                _id: "var004",
                title: "12 Pieces",
                price: 15.99,
                discounted: 13.99,
                addons: []
              }
            ],
            isOutOfStock: false
          }
        ]
      }
    ],
    options: [],
    addons: [],
    zone: {
      _id: "zone001",
      title: "Downtown Zone",
      tax: 8.5
    },
    openingTimes: [
      {
        day: "Monday",
        times: [
          {
            startTime: ["12", "00"],
            endTime: ["23", "00"]
          }
        ]
      }
    ],
    deliveryInfo: {
      deliveryFee: 0,
      deliveryTime: 25,
      minimumOrder: 20
    }
  },
  {
    _id: "rest003",
    name: "Taco Fiesta",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop",
    logo: "https://placehold.co/200x200/f39c12/white?text=TF",
    address: "789 Elm Street, West Side",
    deliveryTime: 20,
    minimumOrder: 10,
    rating: 4.3,
    isActive: true,
    isAvailable: true,
    commissionRate: 18,
    tax: 8.5,
    shopType: "restaurant",
    cuisines: ["mexican", "tacos", "latin"],
    reviewCount: 189,
    reviewAverage: 4.3,
    distanceWithCurrentLocation: 3.1,
    freeDelivery: false,
    acceptVouchers: false,
    location: {
      coordinates: [-73.935242, 40.730610]
    },
    orderId: "ORD",
    orderPrefix: "TF",
    slug: "taco-fiesta",
    reviewData: {
      total: 189,
      ratings: 4.3,
      reviews: []
    },
    categories: [
      {
        _id: "cat003",
        title: "Tacos",
        foods: [
          {
            _id: "food003",
            title: "Chicken Tacos",
            image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400",
            description: "Grilled chicken with fresh salsa",
            subCategory: "Classic Tacos",
            restaurant: "rest003",
            variations: [
              {
                _id: "var005",
                title: "2 Tacos",
                price: 6.99,
                discounted: 0,
                addons: []
              },
              {
                _id: "var006",
                title: "4 Tacos",
                price: 11.99,
                discounted: 9.99,
                addons: []
              }
            ],
            isOutOfStock: false
          }
        ]
      }
    ],
    options: [],
    addons: [],
    zone: {
      _id: "zone001",
      title: "Downtown Zone",
      tax: 8.5
    },
    openingTimes: [
      {
        day: "Monday",
        times: [
          {
            startTime: ["10", "00"],
            endTime: ["21", "00"]
          }
        ]
      }
    ],
    deliveryInfo: {
      deliveryFee: 2.99,
      deliveryTime: 20,
      minimumOrder: 10
    }
  },
  {
    _id: "rest004",
    name: "Bangkok Street Food",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop",
    logo: "https://placehold.co/200x200/e67e22/white?text=BSF",
    address: "321 Pine Road, East District",
    deliveryTime: 35,
    minimumOrder: 18,
    rating: 4.7,
    isActive: true,
    isAvailable: true,
    commissionRate: 14,
    tax: 8.5,
    shopType: "restaurant",
    cuisines: ["thai", "asian", "spicy"],
    reviewCount: 342,
    reviewAverage: 4.7,
    distanceWithCurrentLocation: 2.8,
    freeDelivery: false,
    acceptVouchers: true,
    location: {
      coordinates: [-73.935242, 40.730610]
    },
    orderId: "ORD",
    orderPrefix: "BSF",
    slug: "bangkok-street-food",
    reviewData: {
      total: 342,
      ratings: 4.7,
      reviews: []
    },
    categories: [
      {
        _id: "cat004",
        title: "Noodles",
        foods: [
          {
            _id: "food004",
            title: "Pad Thai",
            image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400",
            description: "Traditional Thai stir-fried noodles",
            subCategory: "Noodle Dishes",
            restaurant: "rest004",
            variations: [
              {
                _id: "var007",
                title: "Regular",
                price: 13.99,
                discounted: 0,
                addons: []
              },
              {
                _id: "var008",
                title: "Large",
                price: 17.99,
                discounted: 15.99,
                addons: []
              }
            ],
            isOutOfStock: false
          }
        ]
      }
    ],
    options: [],
    addons: [],
    zone: {
      _id: "zone001",
      title: "Downtown Zone",
      tax: 8.5
    },
    openingTimes: [
      {
        day: "Monday",
        times: [
          {
            startTime: ["11", "30"],
            endTime: ["22", "30"]
          }
        ]
      }
    ],
    deliveryInfo: {
      deliveryFee: 4.99,
      deliveryTime: 35,
      minimumOrder: 18
    }
  },
  {
    _id: "rest005",
    name: "The Burger Joint",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop",
    logo: "https://placehold.co/200x200/27ae60/white?text=BJ",
    address: "555 Maple Drive, North Quarter",
    deliveryTime: 15,
    minimumOrder: 12,
    rating: 4.6,
    isActive: true,
    isAvailable: true,
    commissionRate: 16,
    tax: 8.5,
    shopType: "restaurant",
    cuisines: ["american", "burgers", "fast food"],
    reviewCount: 456,
    reviewAverage: 4.6,
    distanceWithCurrentLocation: 1.2,
    freeDelivery: true,
    acceptVouchers: true,
    location: {
      coordinates: [-73.935242, 40.730610]
    },
    orderId: "ORD",
    orderPrefix: "BJ",
    slug: "the-burger-joint",
    reviewData: {
      total: 456,
      ratings: 4.6,
      reviews: []
    },
    categories: [
      {
        _id: "cat005",
        title: "Burgers",
        foods: [
          {
            _id: "food005",
            title: "Classic Cheeseburger",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
            description: "Angus beef with cheddar, lettuce, tomato",
            subCategory: "Classic Burgers",
            restaurant: "rest005",
            variations: [
              {
                _id: "var009",
                title: "Single",
                price: 9.99,
                discounted: 0,
                addons: []
              },
              {
                _id: "var010",
                title: "Double",
                price: 13.99,
                discounted: 11.99,
                addons: []
              }
            ],
            isOutOfStock: false
          }
        ]
      }
    ],
    options: [],
    addons: [],
    zone: {
      _id: "zone001",
      title: "Downtown Zone",
      tax: 8.5
    },
    openingTimes: [
      {
        day: "Monday",
        times: [
          {
            startTime: ["10", "00"],
            endTime: ["23", "00"]
          }
        ]
      }
    ],
    deliveryInfo: {
      deliveryFee: 0,
      deliveryTime: 15,
      minimumOrder: 12
    }
  },
  {
    _id: "rest006",
    name: "Delhi Spice House",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop",
    logo: "https://placehold.co/200x200/8e44ad/white?text=DSH",
    address: "888 Curry Lane, South End",
    deliveryTime: 40,
    minimumOrder: 22,
    rating: 4.9,
    isActive: true,
    isAvailable: true,
    commissionRate: 13,
    tax: 8.5,
    shopType: "restaurant",
    cuisines: ["indian", "curry", "asian"],
    reviewCount: 678,
    reviewAverage: 4.9,
    distanceWithCurrentLocation: 4.2,
    freeDelivery: false,
    acceptVouchers: true,
    location: {
      coordinates: [-73.935242, 40.730610]
    },
    orderId: "ORD",
    orderPrefix: "DSH",
    slug: "delhi-spice-house",
    reviewData: {
      total: 678,
      ratings: 4.9,
      reviews: []
    },
    categories: [
      {
        _id: "cat006",
        title: "Curries",
        foods: [
          {
            _id: "food006",
            title: "Chicken Tikka Masala",
            image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
            description: "Tender chicken in creamy tomato sauce",
            subCategory: "Chicken Curries",
            restaurant: "rest006",
            variations: [
              {
                _id: "var011",
                title: "Regular",
                price: 14.99,
                discounted: 0,
                addons: []
              },
              {
                _id: "var012",
                title: "Family Size",
                price: 24.99,
                discounted: 21.99,
                addons: []
              }
            ],
            isOutOfStock: false
          }
        ]
      }
    ],
    options: [],
    addons: [],
    zone: {
      _id: "zone001",
      title: "Downtown Zone",
      tax: 8.5
    },
    openingTimes: [
      {
        day: "Monday",
        times: [
          {
            startTime: ["11", "00"],
            endTime: ["23", "00"]
          }
        ]
      }
    ],
    deliveryInfo: {
      deliveryFee: 5.99,
      deliveryTime: 40,
      minimumOrder: 22
    }
  }
];

/**
 * Helper function to filter restaurants by cuisine
 * @param cuisine - The cuisine type to filter by
 * @returns Array of restaurants matching the cuisine
 */
export const getRestaurantsByCuisine = (cuisine: string): IRestaurant[] => {
  const normalizedCuisine = cuisine.normalize("NFKC").toLocaleLowerCase();

  return mockCuisineRestaurants.filter((restaurant) =>
    restaurant.cuisines.some(
      (c) => c.toString().normalize("NFKC").toLocaleLowerCase() === normalizedCuisine
    )
  );
};

/**
 * Available cuisines in mock data
 */
export const availableCuisines = [
  "italian",
  "pizza",
  "pasta",
  "japanese",
  "sushi",
  "asian",
  "mexican",
  "tacos",
  "latin",
  "thai",
  "spicy",
  "american",
  "burgers",
  "fast food",
  "indian",
  "curry"
];

// Grocery Stores Mock Data
export const mockGroceryStores: IRestaurant[] = [
  {
    _id: "store001",
    name: "Fresh Market",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=600&fit=crop",
    logo: "https://placehold.co/200x200/27ae60/white?text=FM",
    address: "456 Market Avenue, Uptown",
    deliveryTime: 25,
    minimumOrder: 20,
    rating: 4.7,
    isActive: true,
    isAvailable: true,
    commissionRate: 12,
    tax: 7.5,
    shopType: "grocery",
    cuisines: ["fresh produce", "organic", "dairy"],
    reviewCount: 189,
    reviewAverage: 4.7,
    distanceWithCurrentLocation: 1.5,
    freeDelivery: true,
    acceptVouchers: true,
    location: {
      coordinates: [-73.936242, 40.731610]
    },
    orderId: "ORD",
    orderPrefix: "FM",
    slug: "fresh-market",
    reviewData: {
      total: 189,
      ratings: 4.7,
      reviews: []
    },
    deliveryCharges: 0,
    categories: []
  },
  {
    _id: "store002",
    name: "City Grocery",
    image: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=800&h=600&fit=crop",
    logo: "https://placehold.co/200x200/3498db/white?text=CG",
    address: "789 Urban Street, Downtown",
    deliveryTime: 30,
    minimumOrder: 25,
    rating: 4.4,
    isActive: true,
    isAvailable: true,
    commissionRate: 10,
    tax: 7.0,
    shopType: "grocery",
    cuisines: ["pantry", "snacks", "beverages"],
    reviewCount: 156,
    reviewAverage: 4.4,
    distanceWithCurrentLocation: 2.8,
    freeDelivery: false,
    acceptVouchers: true,
    location: {
      coordinates: [-73.937242, 40.732610]
    },
    orderId: "ORD",
    orderPrefix: "CG",
    slug: "city-grocery",
    reviewData: {
      total: 156,
      ratings: 4.4,
      reviews: []
    },
    deliveryCharges: 3.99,
    categories: []
  },
  {
    _id: "store003",
    name: "Organic Haven",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop",
    logo: "https://placehold.co/200x200/2ecc71/white?text=OH",
    address: "321 Green Lane, Suburb",
    deliveryTime: 35,
    minimumOrder: 30,
    rating: 4.8,
    isActive: true,
    isAvailable: true,
    commissionRate: 15,
    tax: 8.0,
    shopType: "grocery",
    cuisines: ["organic", "health", "vegan"],
    reviewCount: 203,
    reviewAverage: 4.8,
    distanceWithCurrentLocation: 3.2,
    freeDelivery: false,
    acceptVouchers: true,
    location: {
      coordinates: [-73.938242, 40.733610]
    },
    orderId: "ORD",
    orderPrefix: "OH",
    slug: "organic-haven",
    reviewData: {
      total: 203,
      ratings: 4.8,
      reviews: []
    },
    deliveryCharges: 4.99,
    categories: []
  },
  {
    _id: "store004",
    name: "Quick Stop Mart",
    image: "https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=800&h=600&fit=crop",
    logo: "https://placehold.co/200x200/e67e22/white?text=QS",
    address: "654 Express Road, Midtown",
    deliveryTime: 20,
    minimumOrder: 15,
    rating: 4.3,
    isActive: true,
    isAvailable: true,
    commissionRate: 12,
    tax: 7.5,
    shopType: "grocery",
    cuisines: ["convenience", "snacks", "frozen"],
    reviewCount: 142,
    reviewAverage: 4.3,
    distanceWithCurrentLocation: 1.8,
    freeDelivery: true,
    acceptVouchers: false,
    location: {
      coordinates: [-73.939242, 40.734610]
    },
    orderId: "ORD",
    orderPrefix: "QS",
    slug: "quick-stop-mart",
    reviewData: {
      total: 142,
      ratings: 4.3,
      reviews: []
    },
    deliveryCharges: 0,
    categories: []
  },
  {
    _id: "store005",
    name: "Whole Foods Plus",
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&h=600&fit=crop",
    logo: "https://placehold.co/200x200/16a085/white?text=WF",
    address: "987 Wellness Boulevard, Uptown",
    deliveryTime: 40,
    minimumOrder: 35,
    rating: 4.9,
    isActive: true,
    isAvailable: true,
    commissionRate: 18,
    tax: 9.0,
    shopType: "grocery",
    cuisines: ["organic", "international", "specialty"],
    reviewCount: 278,
    reviewAverage: 4.9,
    distanceWithCurrentLocation: 4.1,
    freeDelivery: false,
    acceptVouchers: true,
    location: {
      coordinates: [-73.940242, 40.735610]
    },
    orderId: "ORD",
    orderPrefix: "WF",
    slug: "whole-foods-plus",
    reviewData: {
      total: 278,
      ratings: 4.9,
      reviews: []
    },
    deliveryCharges: 5.99,
    categories: []
  },
  {
    _id: "store006",
    name: "Local Farmers Market",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop",
    logo: "https://placehold.co/200x200/f39c12/white?text=LF",
    address: "159 Farm Street, Countryside",
    deliveryTime: 45,
    minimumOrder: 25,
    rating: 4.6,
    isActive: true,
    isAvailable: true,
    commissionRate: 10,
    tax: 6.5,
    shopType: "grocery",
    cuisines: ["fresh produce", "local", "seasonal"],
    reviewCount: 167,
    reviewAverage: 4.6,
    distanceWithCurrentLocation: 5.2,
    freeDelivery: false,
    acceptVouchers: true,
    location: {
      coordinates: [-73.941242, 40.736610]
    },
    orderId: "ORD",
    orderPrefix: "LF",
    slug: "local-farmers-market",
    reviewData: {
      total: 167,
      ratings: 4.6,
      reviews: []
    },
    deliveryCharges: 4.49,
    categories: []
  }
];

// Combined restaurants and grocery stores
export const mockAllVendors: IRestaurant[] = [
  ...mockCuisineRestaurants,
  ...mockGroceryStores
];

export default mockCuisineRestaurants;
