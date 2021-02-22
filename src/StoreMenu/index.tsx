import { color, space, borderRadius } from '@core-ds/primitives';
import * as React from 'react';
import styled from 'styled-components';
import { Menu, MenuButton, MenuList, MenuItem } from '../Menu';
import { StoreFlag } from './StoreFlag';

export interface StoreMenuProps {
   className?: string;
   label: string;
   initialStoreCode?: string;
   stores: Store[];
   selectedStoreCode?: string;
   onChange?: (store: Store) => void;
}

interface Store {
   name: string;
   storeCode: string;
   currency: string;
   url?: string;
}

function UnstyledStoreMenu({
   className,
   label,
   initialStoreCode,
   stores,
   selectedStoreCode,
   onChange,
}: StoreMenuProps) {
   const [internalStoreCode, setInternalStoreCode] = React.useState(initialStoreCode);

   const storeCode = selectedStoreCode || internalStoreCode;

   const handleClick = React.useCallback(
      (store: Store) => {
         if (storeCode !== store.storeCode) {
            setInternalStoreCode(store.storeCode);
            onChange?.(store);
         }
      },
      [onChange, storeCode]
   );

   return (
      <Menu className={className}>
         <MenuButton>
            <Label>{label}</Label>
            <Tag>
               <StoreFlag storeCode={storeCode} />
            </Tag>
         </MenuButton>
         <MenuList>
            {stores.map((store) => (
               <StoreMenuItem
                  key={store.storeCode}
                  url={store.url}
                  onSelect={() => handleClick(store)}
               >
                  <span>
                     <StoreFlag storeCode={store.storeCode} />
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
