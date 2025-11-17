import { IRestaurant } from "@/lib/utils/interfaces/restaurants.interface";

/**
 * Mock data for Restaurant Detail Page
 * Includes complete restaurant with categories, foods, addons, options
 */

export const mockRestaurantDetail = {
  restaurant: {
    _id: "rest001",
    name: "Bella Italia Restaurant",
    slug: "bella-italia",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=400&fit=crop",
    logo: "https://placehold.co/200x200/e74c3c/white?text=BI",
    address: "123 Main Street, Downtown, New York, NY 10001",
    username: "bella_italia_nyc",
    phone: "+1 (555) 123-4567",
    description: "Experience authentic Italian cuisine with fresh ingredients and traditional recipes passed down through generations. Our family-owned restaurant brings the taste of Italy to your table.",
    deliveryTime: 30,
    deliveryCharges: 3.99,
    deliveryTax: 2.5,
    MinimumOrder: 15,
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
      coordinates: [-73.935242, 40.730610]
    },
    orderId: "ORD",
    orderPrefix: "BI",

    // Review Data
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
          description: "Amazing pizza! Best in town! The crust was perfectly crispy and the toppings were fresh.",
          createdAt: "2024-01-15T10:30:00Z"
        },
        {
          _id: "rev002",
          order: {
            _id: "order002",
            orderId: "ORD002",
            restaurant: {
              _id: "rest001",
              name: "Bella Italia"
            }
          },
          rating: 4,
          description: "Great pasta dishes. Very authentic taste. Delivery was on time.",
          createdAt: "2024-01-14T18:45:00Z"
        },
        {
          _id: "rev003",
          order: {
            _id: "order003",
            orderId: "ORD003",
            restaurant: {
              _id: "rest001",
              name: "Bella Italia"
            }
          },
          rating: 5,
          description: "The tiramisu was incredible! Will definitely order again.",
          createdAt: "2024-01-13T20:15:00Z"
        }
      ]
    },

    // Opening Times
    openingTimes: [
      {
        day: "MON",
        times: [
          {
            startTime: ["11", "00"],
            endTime: ["22", "00"]
          }
        ]
      },
      {
        day: "TUE",
        times: [
          {
            startTime: ["11", "00"],
            endTime: ["22", "00"]
          }
        ]
      },
      {
        day: "WED",
        times: [
          {
            startTime: ["11", "00"],
            endTime: ["22", "00"]
          }
        ]
      },
      {
        day: "THU",
        times: [
          {
            startTime: ["11", "00"],
            endTime: ["22", "00"]
          }
        ]
      },
      {
        day: "FRI",
        times: [
          {
            startTime: ["11", "00"],
            endTime: ["23", "00"]
          }
        ]
      },
      {
        day: "SAT",
        times: [
          {
            startTime: ["10", "00"],
            endTime: ["23", "00"]
          }
        ]
      },
      {
        day: "SUN",
        times: [
          {
            startTime: ["10", "00"],
            endTime: ["21", "00"]
          }
        ]
      }
    ],

    // Categories with Foods
    categories: [
      {
        _id: "cat001",
        title: "Pizzas",
        foods: [
          {
            _id: "food001",
            title: "Margherita Pizza",
            image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop",
            description: "Classic tomato sauce, fresh mozzarella, basil, and extra virgin olive oil on our signature thin crust",
            subCategory: "Classic Pizzas",
            restaurant: "rest001",
            isOutOfStock: false,
            variations: [
              {
                _id: "var001",
                title: "Small (10 inch)",
                price: 12.99,
                discounted: 10.99,
                addons: []
              },
              {
                _id: "var002",
                title: "Medium (12 inch)",
                price: 15.99,
                discounted: 0,
                addons: []
              },
              {
                _id: "var003",
                title: "Large (14 inch)",
                price: 18.99,
                discounted: 0,
                addons: []
              }
            ]
          },
          {
            _id: "food002",
            title: "Pepperoni Pizza",
            image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=400&fit=crop",
            description: "Loaded with premium pepperoni, mozzarella cheese, and our homemade tomato sauce",
            subCategory: "Classic Pizzas",
            restaurant: "rest001",
            isOutOfStock: false,
            variations: [
              {
                _id: "var004",
                title: "Small (10 inch)",
                price: 14.99,
                discounted: 0,
                addons: []
              },
              {
                _id: "var005",
                title: "Medium (12 inch)",
                price: 17.99,
                discounted: 15.99,
                addons: []
              },
              {
                _id: "var006",
                title: "Large (14 inch)",
                price: 20.99,
                discounted: 0,
                addons: []
              }
            ]
          },
          {
            _id: "food003",
            title: "Quattro Formaggi",
            image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96c47?w=400&h=400&fit=crop",
            description: "Four cheese blend: mozzarella, gorgonzola, parmesan, and ricotta with white sauce",
            subCategory: "Gourmet Pizzas",
            restaurant: "rest001",
            isOutOfStock: false,
            variations: [
              {
                _id: "var007",
                title: "Medium (12 inch)",
                price: 18.99,
                discounted: 0,
                addons: []
              },
              {
                _id: "var008",
                title: "Large (14 inch)",
                price: 22.99,
                discounted: 19.99,
                addons: []
              }
            ]
          }
        ]
      },
      {
        _id: "cat002",
        title: "Pasta",
        foods: [
          {
            _id: "food004",
            title: "Spaghetti Carbonara",
            image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=400&fit=crop",
            description: "Creamy egg sauce with crispy pancetta, parmesan cheese, and black pepper on fresh spaghetti",
            subCategory: "Pasta Classics",
            restaurant: "rest001",
            isOutOfStock: false,
            variations: [
              {
                _id: "var009",
                title: "Regular",
                price: 14.99,
                discounted: 0,
                addons: []
              },
              {
                _id: "var010",
                title: "Large Portion",
                price: 18.99,
                discounted: 16.99,
                addons: []
              }
            ]
          },
          {
            _id: "food005",
            title: "Fettuccine Alfredo",
            image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&h=400&fit=crop",
            description: "Rich and creamy parmesan sauce with butter tossed with fresh fettuccine pasta",
            subCategory: "Pasta Classics",
            restaurant: "rest001",
            isOutOfStock: false,
            variations: [
              {
                _id: "var011",
                title: "Regular",
                price: 13.99,
                discounted: 0,
                addons: []
              },
              {
                _id: "var012",
                title: "With Chicken",
                price: 17.99,
                discounted: 0,
                addons: []
              },
              {
                _id: "var013",
                title: "With Shrimp",
                price: 19.99,
                discounted: 17.99,
                addons: []
              }
            ]
          },
          {
            _id: "food006",
            title: "Lasagna Bolognese",
            image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=400&fit=crop",
            description: "Layers of pasta with rich meat sauce, béchamel, and melted cheese baked to perfection",
            subCategory: "Baked Pasta",
            restaurant: "rest001",
            isOutOfStock: false,
            variations: [
              {
                _id: "var014",
                title: "Individual Portion",
                price: 15.99,
                discounted: 13.99,
                addons: []
              },
              {
                _id: "var015",
                title: "Family Size",
                price: 29.99,
                discounted: 0,
                addons: []
              }
            ]
          }
        ]
      },
      {
        _id: "cat003",
        title: "Appetizers",
        foods: [
          {
            _id: "food007",
            title: "Bruschetta",
            image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=400&fit=crop",
            description: "Toasted bread topped with fresh tomatoes, garlic, basil, and extra virgin olive oil",
            subCategory: "Starters",
            restaurant: "rest001",
            isOutOfStock: false,
            variations: [
              {
                _id: "var016",
                title: "4 Pieces",
                price: 7.99,
                discounted: 0,
                addons: []
              },
              {
                _id: "var017",
                title: "6 Pieces",
                price: 10.99,
                discounted: 9.99,
                addons: []
              }
            ]
          },
          {
            _id: "food008",
            title: "Mozzarella Sticks",
            image: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=400&h=400&fit=crop",
            description: "Crispy breaded mozzarella cheese sticks served with marinara sauce",
            subCategory: "Starters",
            restaurant: "rest001",
            isOutOfStock: false,
            variations: [
              {
                _id: "var018",
                title: "6 Pieces",
                price: 8.99,
                discounted: 0,
                addons: []
              },
              {
                _id: "var019",
                title: "10 Pieces",
                price: 12.99,
                discounted: 11.99,
                addons: []
              }
            ]
          },
          {
            _id: "food009",
            title: "Garlic Bread",
            image: "https://images.unsplash.com/photo-1573140401552-388e1c180a61?w=400&h=400&fit=crop",
            description: "Fresh baked bread with garlic butter and herbs, optionally topped with melted cheese",
            subCategory: "Sides",
            restaurant: "rest001",
            isOutOfStock: false,
            variations: [
              {
                _id: "var020",
                title: "Regular",
                price: 5.99,
                discounted: 0,
                addons: []
              },
              {
                _id: "var021",
                title: "Cheesy",
                price: 7.99,
                discounted: 6.99,
                addons: []
              }
            ]
          }
        ]
      },
      {
        _id: "cat004",
        title: "Desserts",
        foods: [
          {
            _id: "food010",
            title: "Tiramisu",
            image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=400&fit=crop",
            description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
            subCategory: "Sweet Treats",
            restaurant: "rest001",
            isOutOfStock: false,
            variations: [
              {
                _id: "var022",
                title: "Single Serving",
                price: 6.99,
                discounted: 5.99,
                addons: []
              }
            ]
          },
          {
            _id: "food011",
            title: "Panna Cotta",
            image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop",
            description: "Silky smooth vanilla cream dessert topped with berry compote",
            subCategory: "Sweet Treats",
            restaurant: "rest001",
            isOutOfStock: false,
            variations: [
              {
                _id: "var023",
                title: "Single Serving",
                price: 5.99,
                discounted: 0,
                addons: []
              }
            ]
          }
        ]
      },
      {
        _id: "cat005",
        title: "Beverages",
        foods: [
          {
            _id: "food012",
            title: "Italian Soda",
            image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=400&h=400&fit=crop",
            description: "Refreshing sparkling water with flavored syrup and cream",
            subCategory: "Drinks",
            restaurant: "rest001",
            isOutOfStock: false,
            variations: [
              {
                _id: "var024",
                title: "Strawberry",
                price: 3.99,
                discounted: 0,
                addons: []
              },
              {
                _id: "var025",
                title: "Lemon",
                price: 3.99,
                discounted: 0,
                addons: []
              },
              {
                _id: "var026",
                title: "Raspberry",
                price: 3.99,
                discounted: 0,
                addons: []
              }
            ]
          },
          {
            _id: "food013",
            title: "Espresso",
            image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=400&h=400&fit=crop",
            description: "Rich and bold Italian espresso coffee",
            subCategory: "Coffee",
            restaurant: "rest001",
            isOutOfStock: true,
            variations: [
              {
                _id: "var027",
                title: "Single Shot",
                price: 2.99,
                discounted: 0,
                addons: []
              },
              {
                _id: "var028",
                title: "Double Shot",
                price: 4.49,
                discounted: 0,
                addons: []
              }
            ]
          }
        ]
      }
    ],

    // Addons
    addons: [
      {
        _id: "addon001",
        title: "Extra Cheese",
        description: "Add extra mozzarella cheese",
        quantityMinimum: 0,
        quantityMaximum: 3,
        options: [
          {
            _id: "opt001",
            title: "Extra Cheese",
            description: "Premium mozzarella",
            price: 2.50
          }
        ]
      },
      {
        _id: "addon002",
        title: "Meat Toppings",
        description: "Add your favorite meat toppings",
        quantityMinimum: 0,
        quantityMaximum: 5,
        options: [
          {
            _id: "opt002",
            title: "Pepperoni",
            description: "Premium pepperoni slices",
            price: 2.00
          },
          {
            _id: "opt003",
            title: "Italian Sausage",
            description: "Homemade Italian sausage",
            price: 2.50
          },
          {
            _id: "opt004",
            title: "Bacon",
            description: "Crispy bacon bits",
            price: 2.00
          },
          {
            _id: "opt005",
            title: "Ham",
            description: "Thinly sliced ham",
            price: 1.75
          }
        ]
      },
      {
        _id: "addon003",
        title: "Veggie Toppings",
        description: "Fresh vegetable toppings",
        quantityMinimum: 0,
        quantityMaximum: 5,
        options: [
          {
            _id: "opt006",
            title: "Mushrooms",
            description: "Fresh sliced mushrooms",
            price: 1.50
          },
          {
            _id: "opt007",
            title: "Bell Peppers",
            description: "Colorful bell peppers",
            price: 1.25
          },
          {
            _id: "opt008",
            title: "Olives",
            description: "Black olives",
            price: 1.25
          },
          {
            _id: "opt009",
            title: "Onions",
            description: "Fresh red onions",
            price: 1.00
          },
          {
            _id: "opt010",
            title: "Basil",
            description: "Fresh basil leaves",
            price: 1.00
          }
        ]
      }
    ],

    // Options
    options: [
      {
        _id: "opt011",
        title: "Extra Sauce",
        description: "Extra marinara sauce",
        price: 0.50
      },
      {
        _id: "opt012",
        title: "Garlic Crust",
        description: "Brushed with garlic butter",
        price: 1.50
      },
      {
        _id: "opt013",
        title: "Gluten-Free Crust",
        description: "Replace with gluten-free crust",
        price: 3.00
      }
    ],

    // Zone
    zone: {
      _id: "zone001",
      title: "Downtown Zone",
      tax: 8.5
    },

    // Delivery Info
    deliveryInfo: {
      deliveryFee: 3.99,
      deliveryTime: 30,
      minimumOrder: 15
    }
  } as IRestaurant
};

export default mockRestaurantDetail;
