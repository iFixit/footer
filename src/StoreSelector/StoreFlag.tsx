import React from 'react';
import { UsFlag, AuFlag, CaFlag, DeFlag, FrFlag, GbFlag, EuFlag } from '../svg';

export interface StoreFlagProps {
   className?: string;
   code: string;
}

export function StoreFlag({ className, code }: StoreFlagProps) {
   switch (code.toUpperCase()) {
      case 'AU':
         return <AuFlag data-country={code} className={className} />;
      case 'CA':
         return <CaFlag data-country={code} className={className} />;
      case 'DE':
         return <DeFlag data-country={code} className={className} />;
      case 'FR':
         return <FrFlag data-country={code} className={className} />;
      case 'GB':
         return <GbFlag data-country={code} className={className} />;
      case 'EU':
         return <EuFlag data-country={code} className={className} />;
      case 'US':
      default:
         return <UsFlag data-country={code} className={className} />;
   }
}
