import { color, space, borderRadius } from '@core-ds/primitives';
import * as React from 'react';
import styled from 'styled-components';
import { Menu, MenuButton, MenuList, MenuItem } from '../Menu';
import { StoreFlag } from './StoreFlag';

export interface StoreMenuProps {
   className?: string;
   label: string;
   initialCountryCode?: string;
   stores: Store[];
   selectedCountryCode?: string;
   onChange?: (store: Store) => void;
}

interface Store {
   name: string;
   countryCode: string;
   currency: string;
   url?: string;
}

function UnstyledStoreMenu({
   className,
   label,
   initialCountryCode,
   stores,
   selectedCountryCode,
   onChange,
}: StoreMenuProps) {
   const [internalCountryCode, setInternalCountryCode] = React.useState(initialCountryCode);

   const countryCode = React.useMemo(() => {
      return selectedCountryCode || internalCountryCode;
   }, [selectedCountryCode, internalCountryCode]);

   const handleClick = React.useCallback(
      (store: Store) => {
         if (countryCode !== store.countryCode) {
            setInternalCountryCode(store.countryCode);
            onChange?.(store);
         }
      },
      [onChange]
   );

   return (
      <Menu className={className}>
         <MenuButton>
            <Label>{label}</Label>
            <Tag>
               <StoreFlag countryCode={countryCode} />
            </Tag>
         </MenuButton>
         <MenuList>
            {stores.map((store) => (
               <StoreMenuItem
                  key={store.countryCode}
                  url={store.url}
                  onSelect={() => handleClick(store)}
               >
                  <span>
                     <StoreFlag countryCode={store.countryCode} />
                     <StoreName>{store.name}</StoreName>
                  </span>
                  <Currency>{store.currency}</Currency>
               </StoreMenuItem>
            ))}
         </MenuList>
      </Menu>
   );
}

const Tag = styled.div`
   padding: 6px;
   margin-left: ${space[2]};
   background-color: ${color.gray8};
   border-radius: ${borderRadius.md};
   display: flex;
   align-items: center;
`;

const Label = styled.span`
   color: ${color.gray3};
`;

const StoreName = styled.span`
   margin-left: ${space[3]};
`;

const Currency = styled.span`
   color: ${color.gray5};
`;

const StoreMenuItem = styled(MenuItem)`
   display: flex;
   justify-content: space-between;
   align-items: center;
   & > a {
      display: flex;
      justify-content: space-between;
      align-items: center;
   }
`;

export const StoreMenu = styled(UnstyledStoreMenu)``;
