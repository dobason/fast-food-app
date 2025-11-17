// Queries
import { MOST_ORDER_RESTAURANTS } from "@/lib/api/graphql/queries";
// UseQuery
import { useQuery } from "@apollo/client";
// interfaces
import {
  IMostOrderedRestaurantsData,
  IRestaurant,
} from "../utils/interfaces/restaurants.interface";
// context
import { useUserAddress } from "../context/address/address.context";
// mock data
import { mockAllVendors } from "@/lib/utils/mock-data/cuisine-restaurants.mock";

const useMostOrderedRestaurants = (enabled = true, page = 1, limit=10, shopType?: "restaurant" | "grocery" | null ) => {
  // Toggle between mock and real data
  const USE_MOCK_DATA = true;

  const { userAddress } = useUserAddress();
  const userLongitude = userAddress?.location?.coordinates[0] || 0;
  const userLatitude = userAddress?.location?.coordinates[1] || 0;

  const { data, loading, error, networkStatus, fetchMore } =
    useQuery<IMostOrderedRestaurantsData>(MOST_ORDER_RESTAURANTS, {
      variables: {
        latitude: userLatitude,
        longitude: userLongitude,
        page,
        limit,
        shopType: shopType ?? null,
      },
      fetchPolicy: "cache-and-network",
      skip: !enabled || USE_MOCK_DATA, // Skip query if using mock data
      notifyOnNetworkStatusChange: true, // 🔑 helps track loading state when fetching more
    });

  let queryData = USE_MOCK_DATA
    ? mockAllVendors.slice(0, limit)
    : data?.mostOrderedRestaurantsPreview || [];

  let restaurantsData: IRestaurant[] = USE_MOCK_DATA
    ? mockAllVendors.filter((item) => item?.shopType?.toLowerCase() === "restaurant").slice(0, limit)
    : queryData?.filter((item) => item?.shopType.toLowerCase() === "restaurant") || [];

  let groceriesData: IRestaurant[] = USE_MOCK_DATA
    ? mockAllVendors.filter((item) => item?.shopType?.toLowerCase() === "grocery").slice(0, limit)
    : queryData?.filter((item) => item?.shopType.toLowerCase() === "grocery") || [];

  console.log("groceriesData in hook", groceriesData);

  return {
    queryData,
    loading: USE_MOCK_DATA ? false : loading,
    error: USE_MOCK_DATA ? undefined : error,
    networkStatus,
    restaurantsData,
    groceriesData,
    fetchMore, // 🔑 expose fetchMore for infinite scroll
  };
};

export default useMostOrderedRestaurants;
