import React from 'react';
import { UsFlag, AuFlag, CaFlag, DeFlag, FrFlag, GbFlag, EuFlag } from '../svg';

export interface StoreFlagProps {
   className?: string;
   countryCode?: string;
}

export function StoreFlag({ className, countryCode }: StoreFlagProps) {
   switch (countryCode?.toUpperCase()) {
      case 'AU':
         return <AuFlag data-country-code={countryCode} className={className} />;
      case 'CA':
         return <CaFlag data-country-code={countryCode} className={className} />;
      case 'DE':
         return <DeFlag data-country-code={countryCode} className={className} />;
      case 'FR':
         return <FrFlag data-country-code={countryCode} className={className} />;
      case 'GB':
         return <GbFlag data-country-code={countryCode} className={className} />;
      case 'EU':
         return <EuFlag data-country-code={countryCode} className={className} />;
      case 'US':
      default:
         return <UsFlag data-country-code={countryCode} className={className} />;
   }
}
