'use client';
import dynamic from 'next/dynamic';

import HomeLayout from '@/lib/ui/layouts/protected/home';

const Discovery = dynamic(() => import('@/lib/ui/screens/protected/home/discovery'), {
  ssr: false,
});

export default function RootPage() {
  return (
    <HomeLayout>
      <Discovery />
    </HomeLayout>
  );
}
