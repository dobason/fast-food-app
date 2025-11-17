// core
import React, { useCallback, useState } from 'react';
// card component
import Card from '@/lib/ui/useable-components/card';
// loading skeleton
// useParams
import { useParams } from 'next/navigation';
// heading component
import HomeHeadingSection from '@/lib/ui/useable-components/home-heading-section';
// interface
import { IRestaurant } from '@/lib/utils/interfaces/restaurants.interface';
// hooks
// translations
import { useTranslations } from 'next-intl';

import { mockCuisineRestaurants } from '@/lib/utils/mock-data/cuisine-restaurants.mock';

function CuisineSelectionSection() {
  const params = useParams() as Record<string, string | string[]>;
  const t = useTranslations();

  // Safely pick the dynamic segment (supports /category/[id], /[slug], etc.)
  const pickParam = (key: string) =>
    Array.isArray(params[key]) ? (params[key] as string[])[0] : (params[key] as string | undefined);

  const rawParam =
    pickParam('category') ?? // e.g., /category/[id]
    pickParam('slug') ?? // e.g., /cuisine/[slug]
    pickParam('id') ?? // fallback if route uses [id]
    '';

  // Decode `%D7%...` etc. and prepare human-readable slug
  const decoded = decodeURIComponent(rawParam);
  const slugWithSpaces = decoded.replace(/-/g, ' ').trim();

  // Normalize for reliable matching across scripts (Hebrew, etc.)
  const normalizedSlug = slugWithSpaces.normalize('NFKC').toLocaleLowerCase();

  // Title (avoid forcing Latin-style capitalization)
  // Compose title with translation key instead of hardcoded "near you"
  const title = `${slugWithSpaces} ${t('near_you')}`;

  const [isModalOpen, setIsModalOpen] = useState({ value: false, id: '' });

  // Toggle between mock and real data
  // const USE_MOCK_DATA = true;

  // const { queryData, loading, error } = useNearByRestaurantsPreview(!USE_MOCK_DATA, 1, 109, null);

  const getCuisinRestaurants = mockCuisineRestaurants.filter((item) =>
    item?.cuisines?.some(
      (c) => c?.toString().normalize('NFKC').toLocaleLowerCase() === normalizedSlug
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

  // if (loading) return <SliderSkeleton />;
  // if (error) return null;

  // if (!queryData?.length) return <div>No items found</div>;

  return (
    <>
      {/* Pass the already composed title - don't translate it again in HomeHeadingSection */}
      <HomeHeadingSection title={title} skipTranslation />
      <div className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-4 items-center">
          {(getCuisinRestaurants as IRestaurant[] | undefined)?.map((item) => (
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

export default CuisineSelectionSection;
