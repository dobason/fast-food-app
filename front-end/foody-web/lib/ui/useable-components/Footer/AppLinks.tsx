import React from 'react';

const PlayStoreLink =
  'https://play.google.com/store/apps/details?id=com.enatega.multivendor&hl=en_IE';
const AppleStoreLink = 'https://apps.apple.com/pk/app/enatega-multivendor/id1526488093';
import Logo from '@/lib/utils/assets/svg/Logo';
import { useTranslations } from 'next-intl';

const AppLinks = () => {
  const t = useTranslations();
  const handleButtonClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <div className="text-[20px] mb-4 font-extrabold text-white">
        <Logo className="w-32 h-auto" fillColor="#94e469" />
      </div>
    </div>
  );
};

export default AppLinks;
