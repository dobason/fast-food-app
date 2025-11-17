/**
 * Example: How to use mock data in CuisineSelectionSection component
 *
 * This file shows different ways to integrate the mock data
 */

import React, { useCallback, useState } from "react";
import { useParams } from "next/navigation";
import Card from "@/lib/ui/useable-components/card";
import SliderSkeleton from "@/lib/ui/useable-components/custom-skeletons/slider.loading.skeleton";
import HomeHeadingSection from "@/lib/ui/useable-components/home-heading-section";
import { IRestaurant } from "@/lib/utils/interfaces/restaurants.interface";
import useNearByRestaurantsPreview from "@/lib/hooks/useNearByRestaurantsPreview";

// Import mock data
import {
  mockCuisineRestaurants,
  getRestaurantsByCuisine
} from "@/lib/utils/mock-data/cuisine-restaurants.mock";

// ============================================
// OPTION 1: Simple Mock Data Replacement
// ============================================
function CuisineSelectionWithMock() {
  const params = useParams() as Record<string, string | string[]>;

  const pickParam = (key: string) =>
    Array.isArray(params[key]) ? (params[key] as string[])[0] : (params[key] as string | undefined);

  const rawParam = pickParam("category") ?? pickParam("slug") ?? pickParam("id") ?? "";
  const decoded = decodeURIComponent(rawParam);
  const slugWithSpaces = decoded.replace(/-/g, " ").trim();
  const normalizedSlug = slugWithSpaces.normalize("NFKC").toLocaleLowerCase();
  const title = `${slugWithSpaces} near you`;

  const [isModalOpen, setIsModalOpen] = useState({ value: false, id: "" });

  // Use mock data directly
  const getCuisinRestaurants = getRestaurantsByCuisine(normalizedSlug);

  const handleUpdateIsModalOpen = useCallback(
    (value: boolean, id: string) => {
      if (isModalOpen.value !== value || isModalOpen.id !== id) {
        setIsModalOpen({ value, id });
      }
    },
    [isModalOpen]
  );

  // Simulate loading state (optional)
  const [loading] = useState(false);

  if (loading) return <SliderSkeleton />;
  if (!getCuisinRestaurants?.length) return <div>No items found</div>;

  return (
    <>
      <HomeHeadingSection title={title} />
      <div className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-4 items-center">
          {getCuisinRestaurants.map((item) => (
            <Card
              key={item._id}
              item={item}
              isModalOpen={isModalOpen}
              handleUpdateIsModalOpen={handleUpdateIsModalOpen}
            />
          ))}
        </div>
      </div>
    </>
  );
}

// ============================================
// OPTION 2: Toggle Between Mock and Real Data
// ============================================
function CuisineSelectionWithToggle() {
  const params = useParams() as Record<string, string | string[]>;

  const pickParam = (key: string) =>
    Array.isArray(params[key]) ? (params[key] as string[])[0] : (params[key] as string | undefined);

  const rawParam = pickParam("category") ?? pickParam("slug") ?? pickParam("id") ?? "";
  const decoded = decodeURIComponent(rawParam);
  const slugWithSpaces = decoded.replace(/-/g, " ").trim();
  const normalizedSlug = slugWithSpaces.normalize("NFKC").toLocaleLowerCase();
  const title = `${slugWithSpaces} near you`;

  const [isModalOpen, setIsModalOpen] = useState({ value: false, id: "" });

  // Toggle for testing
  const USE_MOCK_DATA = true; // Change to false to use real API

  // Only call API if not using mock data
  const { queryData, loading, error } = useNearByRestaurantsPreview(
    !USE_MOCK_DATA,
    1,
    109,
    null
  );

  // Use mock or real data based on toggle
  const getCuisinRestaurants = USE_MOCK_DATA
    ? getRestaurantsByCuisine(normalizedSlug)
    : queryData?.filter((item) =>
        item?.cuisines?.some(
          (c) => c?.toString().normalize("NFKC").toLocaleLowerCase() === normalizedSlug
        )
      );

  const handleUpdateIsModalOpen = useCallback(
    (value: boolean, id: string) => {
      if (isModalOpen.value !== value || isModalOpen.id !== id) {
        setIsModalOpen({ value, id });
      }
    },
    [isModalOpen]
  );

  if (loading) return <SliderSkeleton />;
  if (error && !USE_MOCK_DATA) return null;
  if (!getCuisinRestaurants?.length) return <div>No items found</div>;

  return (
    <>
      <HomeHeadingSection title={title} />
      <div className="mb-20">
        {USE_MOCK_DATA && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            <strong>Dev Mode:</strong> Using mock data
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-4 items-center">
          {(getCuisinRestaurants as IRestaurant[]).map((item) => (
            <Card
              key={item._id}
              item={item}
              isModalOpen={isModalOpen}
              handleUpdateIsModalOpen={handleUpdateIsModalOpen}
            />
          ))}
        </div>
      </div>
    </>
  );
}

// ============================================
// OPTION 3: Environment Variable Based Toggle
// ============================================
function CuisineSelectionWithEnv() {
  const params = useParams() as Record<string, string | string[]>;

  const pickParam = (key: string) =>
    Array.isArray(params[key]) ? (params[key] as string[])[0] : (params[key] as string | undefined);

  const rawParam = pickParam("category") ?? pickParam("slug") ?? pickParam("id") ?? "";
  const decoded = decodeURIComponent(rawParam);
  const slugWithSpaces = decoded.replace(/-/g, " ").trim();
  const normalizedSlug = slugWithSpaces.normalize("NFKC").toLocaleLowerCase();
  const title = `${slugWithSpaces} near you`;

  const [isModalOpen, setIsModalOpen] = useState({ value: false, id: "" });

  // Use environment variable
  const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

  const { queryData, loading, error } = useNearByRestaurantsPreview(
    !USE_MOCK_DATA,
    1,
    109,
    null
  );

  const getCuisinRestaurants = USE_MOCK_DATA
    ? getRestaurantsByCuisine(normalizedSlug)
    : queryData?.filter((item) =>
        item?.cuisines?.some(
          (c) => c?.toString().normalize("NFKC").toLocaleLowerCase() === normalizedSlug
        )
      );

  const handleUpdateIsModalOpen = useCallback(
    (value: boolean, id: string) => {
      if (isModalOpen.value !== value || isModalOpen.id !== id) {
        setIsModalOpen({ value, id });
      }
    },
    [isModalOpen]
  );

  if (loading && !USE_MOCK_DATA) return <SliderSkeleton />;
  if (error && !USE_MOCK_DATA) return null;
  if (!getCuisinRestaurants?.length) return <div>No items found</div>;

  return (
    <>
      <HomeHeadingSection title={title} />
      <div className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-4 items-center">
          {(getCuisinRestaurants as IRestaurant[]).map((item) => (
            <Card
              key={item._id}
              item={item}
              isModalOpen={isModalOpen}
              handleUpdateIsModalOpen={handleUpdateIsModalOpen}
            />
          ))}
        </div>
      </div>
    </>
  );
}

// ============================================
// OPTION 4: Custom Hook for Mock Data
// ============================================
function useMockOrRealData(slug: string) {
  const USE_MOCK_DATA = process.env.NODE_ENV === "development";

  const { queryData, loading, error } = useNearByRestaurantsPreview(
    !USE_MOCK_DATA,
    1,
    109,
    null
  );

  const data = USE_MOCK_DATA
    ? getRestaurantsByCuisine(slug)
    : queryData?.filter((item) =>
        item?.cuisines?.some(
          (c) => c?.toString().normalize("NFKC").toLocaleLowerCase() === slug
        )
      );

  return {
    data,
    loading: USE_MOCK_DATA ? false : loading,
    error: USE_MOCK_DATA ? false : error,
    isMockData: USE_MOCK_DATA
  };
}

function CuisineSelectionWithCustomHook() {
  const params = useParams() as Record<string, string | string[]>;

  const pickParam = (key: string) =>
    Array.isArray(params[key]) ? (params[key] as string[])[0] : (params[key] as string | undefined);

  const rawParam = pickParam("category") ?? pickParam("slug") ?? pickParam("id") ?? "";
  const decoded = decodeURIComponent(rawParam);
  const slugWithSpaces = decoded.replace(/-/g, " ").trim();
  const normalizedSlug = slugWithSpaces.normalize("NFKC").toLocaleLowerCase();
  const title = `${slugWithSpaces} near you`;

  const [isModalOpen, setIsModalOpen] = useState({ value: false, id: "" });

  // Use custom hook
  const { data: getCuisinRestaurants, loading, error, isMockData } = useMockOrRealData(normalizedSlug);

  const handleUpdateIsModalOpen = useCallback(
    (value: boolean, id: string) => {
      if (isModalOpen.value !== value || isModalOpen.id !== id) {
        setIsModalOpen({ value, id });
      }
    },
    [isModalOpen]
  );

  if (loading) return <SliderSkeleton />;
  if (error) return null;
  if (!getCuisinRestaurants?.length) return <div>No items found</div>;

  return (
    <>
      <HomeHeadingSection title={title} />
      <div className="mb-20">
        {isMockData && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4 text-sm">
            ℹ️ Development mode: Displaying mock data
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-4 items-center">
          {getCuisinRestaurants.map((item) => (
            <Card
              key={item._id}
              item={item}
              isModalOpen={isModalOpen}
              handleUpdateIsModalOpen={handleUpdateIsModalOpen}
            />
          ))}
        </div>
      </div>
    </>
  );
}

// Export all examples
export {
  CuisineSelectionWithMock,
  CuisineSelectionWithToggle,
  CuisineSelectionWithEnv,
  CuisineSelectionWithCustomHook,
  useMockOrRealData
};
