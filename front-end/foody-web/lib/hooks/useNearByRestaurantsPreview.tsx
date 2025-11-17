// Queries
import { NEAR_BY_RESTAURANTS_PREVIEW } from "@/lib/api/graphql/queries";
// UseQuery
import { useQuery } from "@apollo/client";
// interface
import {
  INearByRestaurantsPreviewData,
  IRestaurant,
} from "../utils/interfaces/restaurants.interface";
// context
import { useUserAddress } from "../context/address/address.context";
// mock data
import { mockAllVendors } from "@/lib/utils/mock-data/cuisine-restaurants.mock";

const useNearByRestaurantsPreview = (
  enabled = true,
  page = 1,
  limit = 10,
  shopType?: "restaurant" | "grocery" | null // <-- 🔑 allow passing
) => {
  // Toggle between mock and real data
  const USE_MOCK_DATA = true;

  const { userAddress } = useUserAddress();
  const userLongitude = Number(userAddress?.location?.coordinates[0]) || 0;
  const userLatitude = Number(userAddress?.location?.coordinates[1]) || 0;

  const { data, loading, error, networkStatus, fetchMore } =
    useQuery<INearByRestaurantsPreviewData>(NEAR_BY_RESTAURANTS_PREVIEW, {
      variables: {
        latitude: userLatitude,
        longitude: userLongitude,
        shopType: shopType ?? null, // 🔑 pass down if provided
        page,
        limit,
      },
      fetchPolicy: "cache-and-network",
      skip: !enabled || USE_MOCK_DATA, // Skip query if using mock data
      notifyOnNetworkStatusChange: true,
    });

  const queryData: IRestaurant[] = USE_MOCK_DATA
    ? mockAllVendors.slice(0, limit)
    : data?.nearByRestaurantsPreview?.restaurants ?? [];

  const groceriesData: IRestaurant[] = USE_MOCK_DATA
    ? mockAllVendors.filter((item) => item?.shopType?.toLowerCase() === "grocery").slice(0, limit)
    : queryData?.filter((item) => item?.shopType?.toLowerCase() === "grocery") ?? [];

  const restaurantsData: IRestaurant[] = USE_MOCK_DATA
    ? mockAllVendors.filter((item) => item?.shopType?.toLowerCase() === "restaurant").slice(0, limit)
    : queryData?.filter((item) => item?.shopType?.toLowerCase() === "restaurant") ?? [];

  return {
    queryData,
    loading: USE_MOCK_DATA ? false : loading,
    error: USE_MOCK_DATA ? undefined : error,
    networkStatus,
    groceriesData,
    restaurantsData,
    fetchMore, // expose for infinite scroll
  };
};

export default useNearByRestaurantsPreview;
