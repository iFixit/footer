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
   border-radius: ${borderRadius.md};
   font-family: inherit;
   padding: 0;
   &:focus {
      box-shadow: 0 0 0 0.2rem rgb(25 117 241 / 25%);
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
   transform: translateY(-100%) translateY(-${space[2]});
   top: 0;
   left: 0;
   min-width: 224px;
   &[data-active='true'] {
      display: block;
   }
`;

function UnstyledMenuItem(props: MenuItemProps) {
   const itemProps = useMenuItem(props);
   if (props.url != null) {
      const { className, ...otherProps } = itemProps;
      return (
         <li className={className} role="none" data-type="link">
            <a {...otherProps} />
         </li>
      );
   }
   return <li {...itemProps} data-type="button" />;
}

export const MenuItem = styled(UnstyledMenuItem)`
   outline: none;
   transition: background-color 400ms;
   cursor: pointer;
   transition: background-color 400ms;
   &[data-type='button'] {
      padding: ${space[2]} ${space[3]};
   }
   &[data-focus='true']:focus {
      background-color: ${color.gray2};
   }
   & > a {
      width: 100%;
      display: inline-block;
      outline: none;
      text-decoration: none;
      color: ${color.black};
      padding: ${space[2]} ${space[3]};
      box-sizing: border-box;
      transition: background-color 400ms;
      &[data-focus='true']:focus {
         background-color: ${color.gray2};
      }
   }
`;
