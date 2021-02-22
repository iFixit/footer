import React from 'react';
import { UsFlag, AuFlag, CaFlag, DeFlag, FrFlag, GbFlag, EuFlag } from '../svg';

export interface StoreFlagProps {
   className?: string;
   storeCode?: string;
}

export function StoreFlag({ className, storeCode }: StoreFlagProps) {
   switch (storeCode?.toUpperCase()) {
      case 'AU':
         return <AuFlag data-country-code={storeCode} className={className} />;
      case 'CA':
         return <CaFlag data-country-code={storeCode} className={className} />;
      case 'DE':
         return <DeFlag data-country-code={storeCode} className={className} />;
      case 'FR':
         return <FrFlag data-country-code={storeCode} className={className} />;
      case 'GB':
         return <GbFlag data-country-code={storeCode} className={className} />;
      case 'EU':
         return <EuFlag data-country-code={storeCode} className={className} />;
      case 'US':
      default:
         return <UsFlag data-country-code={storeCode} className={className} />;
   }
}
