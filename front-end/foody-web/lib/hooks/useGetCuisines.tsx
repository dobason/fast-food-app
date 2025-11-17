// Queries
import {
  // GET_CUISINES,
  NEAR_BY_RESTAURANTS_CUISINES,
} from "../api/graphql/queries";
// useQuery
import { useQuery } from "@apollo/client";
// interfaces
import { ICuisinesResponse, ICuisinesData } from "@/lib/utils/interfaces";
// context
import { useUserAddress } from "../context/address/address.context";
// mock data
import { mockRestaurantCuisines, mockGroceryCuisines, mockAllCuisines } from "@/lib/utils/mock-data/cuisines.mock";

const useGetCuisines = (enabled = true) => {
  // Toggle between mock and real data
  const USE_MOCK_DATA = true;

  const { userAddress } = useUserAddress();
  const userLongitude = userAddress?.location?.coordinates[0] || 0
  const userLatitude = userAddress?.location?.coordinates[1] || 0

  const { data, loading, error, networkStatus } = useQuery<ICuisinesResponse>(
    NEAR_BY_RESTAURANTS_CUISINES,
    {
      variables: {
        latitude: userLatitude,
        longitude: userLongitude,
        shopType: null,
      },
      fetchPolicy: "cache-and-network",
      skip: !enabled || USE_MOCK_DATA, // Skip query if using mock data
    }
  );

  let queryData = USE_MOCK_DATA ? mockAllCuisines : data?.nearByRestaurantsCuisines;

  let restaurantCuisinesData: ICuisinesData[] = USE_MOCK_DATA
    ? mockRestaurantCuisines
    : Array.isArray(data?.nearByRestaurantsCuisines)
    ? data.nearByRestaurantsCuisines.filter(
        (item) => item.shopType.toLowerCase() === "restaurant"
      )
    : [];

  let groceryCuisinesData: ICuisinesData[] = USE_MOCK_DATA
    ? mockGroceryCuisines
    : Array.isArray(data?.nearByRestaurantsCuisines)
    ? data.nearByRestaurantsCuisines.filter(
        (item) => item.shopType.toLowerCase() === "grocery"
      )
    : [];

  return {
    queryData,
    loading: USE_MOCK_DATA ? false : loading,
    error: USE_MOCK_DATA ? undefined : error,
    networkStatus,
    restaurantCuisinesData,
    groceryCuisinesData,
  };
};

export default useGetCuisines;
