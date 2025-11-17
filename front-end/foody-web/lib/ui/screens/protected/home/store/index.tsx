'use client';

import useNearByRestaurantsPreview from '@/lib/hooks/useNearByRestaurantsPreview';
import useGetCuisines from '@/lib/hooks/useGetCuisines';
import GenericListingComponent from '@/lib/ui/screen-components/protected/home/GenericListingComponent';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { mockGroceryStores } from '@/lib/utils/mock-data/cuisine-restaurants.mock';

export default function StoreScreen() {
  const t = useTranslations();
  const limit = 10;

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // Toggle between mock and real data
  const USE_MOCK_DATA = true;

  const { loading, error, queryData, fetchMore } = useNearByRestaurantsPreview(
    !USE_MOCK_DATA, // Only fetch if not using mock data
    page,
    limit,
    'grocery'
  );

  // Use mock data or real data
  const effectiveQueryData = USE_MOCK_DATA ? mockGroceryStores : queryData;

  const { loading: cuisinesloading, groceryCuisinesData } = useGetCuisines();

  // ✅ Initial load
  useEffect(() => {
    if (page === 1 && effectiveQueryData?.length) {
      setItems(effectiveQueryData);
    }
  }, [effectiveQueryData, page]);

  // ✅ Load more
  const loadMore = useCallback(async () => {
    if (!hasMore || loading || USE_MOCK_DATA) return; // Don't paginate with mock data

    try {
      const res = await fetchMore({
        variables: { page: page + 1, limit, shopType: 'grocery' },
      });

      const newItems = res.data?.nearByRestaurantsPreview?.restaurants ?? [];

      if (newItems.length > 0) {
        setItems((prev) => [...prev, ...newItems]);
        setPage((p) => p + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('❌ Error fetching more:', err);
    }
  }, [page, hasMore, fetchMore, loading, USE_MOCK_DATA]);

  // ✅ Scroll listener (your tested one)
  useEffect(() => {
    if (!fetchMore || !hasMore) return;

    const handleScroll = () => {
      const scrollTop = document.body.scrollTop;
      const clientHeight = document.body.clientHeight;
      const scrollHeight = document.body.scrollHeight;
      console.log('scrollTop, clientHeight, scrollHeight', scrollTop, clientHeight, scrollHeight);
      const bottom = scrollTop + clientHeight >= scrollHeight - 300;

      if (bottom && !loading) {
        console.log('near bottom reached');
        loadMore();
      }
    };

    document.body.addEventListener('scroll', handleScroll);
    return () => document.body.removeEventListener('scroll', handleScroll);
  }, [fetchMore, hasMore, loading, loadMore]);

  return (
    <GenericListingComponent
      queryData={effectiveQueryData} // Use mock or real data
      headingTitle={t('StoresPage.headingTitle')}
      cuisineSectionTitle={t('StoresPage.cuisineSectionTitle')}
      mainSectionTitle={t('StoresPage.mainSectionTitle')}
      mainData={items} // ✅ pass paginated items
      cuisineDataFromHook={groceryCuisinesData}
      loading={USE_MOCK_DATA ? false : loading} // No loading state for mock data
      cuisinesloading={cuisinesloading}
      error={USE_MOCK_DATA ? false : !!error} // No errors with mock data
      hasMore={USE_MOCK_DATA ? false : hasMore} // ✅ pass down so MainSection can show "No more"
    />
  );
}
