import { borderRadius, color, space } from '@core-ds/primitives';
import * as React from 'react';
import styled from 'styled-components';
import {
   MenuButtonProps,
   MenuContext,
   MenuItemProps,
   MenuListProps,
   MenuProps,
   useMenu,
   useMenuButton,
   useMenuItem,
   useMenuList,
} from './useMenu';

export function Menu(props: MenuProps) {
   const { children, className } = props;
   const menu = useMenu(props);

   return (
      <MenuContext.Provider value={menu}>
         <MenuContainer className={className}>{children}</MenuContainer>
      </MenuContext.Provider>
   );
}

const MenuContainer = styled.div`
   position: relative;
`;

function UnstyledMenuButton(props: MenuButtonProps) {
   const menuButtonProps = useMenuButton(props);
   return <button {...menuButtonProps} />;
}

export const MenuButton = styled(UnstyledMenuButton)`
   display: flex;
   align-items: center;
   background: none;
   border: none;
   color: ${color.white};
   font-size: 14px;
   cursor: pointer;
   outline: none;
   border-radius: ${borderRadius.sm};
   &:focus {
      box-shadow: rgb(66 153 225 / 60%) 0px 0px 0px 3px;
   }
`;

export function UnstyledMenuList(props: MenuListProps) {
   const menuListProps = useMenuList(props);

   return <ul {...menuListProps} />;
}

export const MenuList = styled(UnstyledMenuList)`
   margin: 0;
   margin-bottom: ${space[1]};
   padding: ${space[2]} 0;
   border-radius: ${borderRadius.lg};
   list-style: none;
   background-color: white;
   color: black;
   display: none;
   position: absolute;
   transform: translateY(-100%);
   top: 0;
   left: 0;
   min-width: 224px;
   &[data-active='true'] {
      display: block;
   }
`;

function UnstyledMenuItem(props: MenuItemProps) {
   const itemProps = useMenuItem(props);
   return <li {...itemProps} />;
}

export const MenuItem = styled(UnstyledMenuItem)`
   outline: none;
   &:focus {
      background-color: red;
   }
`;
