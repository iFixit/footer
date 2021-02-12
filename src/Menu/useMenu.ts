import React from 'react';
import { FocusContext, useFocusContext, useFocusItem } from '../useFocusContext';
import { useIds } from '../useId';
import { useOutsideClick } from '../useOutsideClick';
import { useUpdateEffect } from '../useUpdateEffect';
import { normalizeEventKey } from '../utils';

export type ElementProps<Element> = React.DetailedHTMLProps<React.HTMLAttributes<Element>, Element>;

interface MenuContext {
   isOpen: boolean;
   focusContext: FocusContext;
   menuId: string;
   menuButtonId: string;
   menuButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
   menuRef: React.MutableRefObject<HTMLUListElement | null>;
   openAndFocusFirstItem: () => void;
   openAndFocusLastItem: () => void;
   close: () => void;
}

export const MenuContext = React.createContext<MenuContext | null>(null);

export function useMenuContext(): MenuContext {
   const context = React.useContext(MenuContext);
   if (context == null) {
      throw new Error('Cannot use useMenuContext without Menu provider');
   }
   return context;
}

export type MenuProps = React.PropsWithChildren<{
   id?: string;
   className?: string;
   defaultIsOpen?: boolean;
}>;

export function useMenu({ id, defaultIsOpen = false }: MenuProps): MenuContext {
   const [isOpen, setIsOpen] = React.useState(defaultIsOpen);
   const menuButtonRef = React.useRef<HTMLButtonElement>(null);
   const menuRef = React.useRef<HTMLUListElement>(null);
   const [menuButtonId, menuId] = useIds(id, `menu-button`, `menu-list`);
   const focusContext = useFocusContext();

   const close = React.useCallback(() => {
      setIsOpen(false);
   }, []);

   const openAndFocusFirstItem = React.useCallback(() => {
      setIsOpen(true);
      focusContext.focusFirst();
   }, [focusContext]);

   const openAndFocusLastItem = React.useCallback(() => {
      setIsOpen(true);
      focusContext.focusLast();
   }, [focusContext]);

   useOutsideClick(menuRef, (event) => {
      if (isOpen && !menuButtonRef.current?.contains(event.target as HTMLElement)) {
         close();
      }
   });

   const context = React.useMemo((): MenuContext => {
      return {
         isOpen,
         focusContext,
         menuButtonId,
         menuId,
         menuButtonRef,
         menuRef,
         openAndFocusFirstItem,
         openAndFocusLastItem,
         close,
      };
   }, [
      menuButtonId,
      menuId,
      menuButtonRef,
      menuRef,
      openAndFocusFirstItem,
      openAndFocusFirstItem,
      isOpen,
      focusContext,
      close,
   ]);

   return context;
}

export type MenuListProps = React.HTMLAttributes<HTMLUListElement>;

export type MenuListInternalProps = ElementProps<HTMLUListElement> & {
   'data-active': boolean;
};

export function useMenuList(props: MenuListProps): MenuListInternalProps {
   const { menuRef, isOpen, menuId, close, focusContext } = useMenuContext();

   const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
         const eventKey = normalizeEventKey(event);

         const keyMap: { [key: string]: (event: React.KeyboardEvent) => void } = {
            Tab: (event) => {
               event.preventDefault();
            },
            Escape: close,
            ArrowDown: () => {
               focusContext.focusNext();
            },
            ArrowUp: () => {
               focusContext.focusPrevious();
            },
         };

         const action = keyMap[eventKey];

         if (action) {
            event.preventDefault();
            action(event);
            return;
         }
      },
      [focusContext, close]
   );

   const menuListProps = React.useMemo((): MenuListInternalProps => {
      return {
         ...props,
         id: menuId,
         role: 'menu',
         'aria-orientation': 'vertical',
         'data-active': isOpen,
         tabIndex: -1,
         ref: menuRef,
         onKeyDown,
      };
   }, [props, menuRef, isOpen, onKeyDown]);
   return menuListProps;
}

export type MenuItemProps = React.PropsWithChildren<{
   className?: string;
}>;

export function useMenuItem(props: MenuItemProps) {
   const menu = useMenuContext();
   const itemRef = React.useRef<any>(null);

   const isFocused = useFocusItem({
      isMenuOpen: menu.isOpen,
      context: menu.focusContext,
      ref: itemRef,
   });

   const menuItemProps = React.useMemo((): ElementProps<any> => {
      return {
         ...props,
         role: 'menuitem',
         ref: itemRef,
         tabIndex: isFocused ? 0 : -1,
      };
   }, [props]);

   return menuItemProps;
}

export type MenuButtonProps = React.HTMLAttributes<HTMLButtonElement>;

export function useMenuButton(
   props: MenuButtonProps
): React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
   const {
      isOpen,
      close,
      openAndFocusFirstItem,
      openAndFocusLastItem,
      menuButtonRef,
      menuId,
      menuButtonId,
   } = useMenuContext();

   useUpdateEffect(() => {
      if (!isOpen && menuButtonRef.current) {
         menuButtonRef.current.focus();
      }
   }, [isOpen, menuButtonRef]);

   const onClick = React.useCallback(() => {
      if (isOpen) {
         close();
      } else {
         openAndFocusFirstItem();
      }
   }, [isOpen, close, openAndFocusFirstItem]);

   const onKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
         const eventKey = normalizeEventKey(event);
         const keyMap: { [key: string]: () => void } = {
            Enter: openAndFocusFirstItem,
            ArrowDown: openAndFocusFirstItem,
            ArrowUp: openAndFocusLastItem,
         };

         const action = keyMap[eventKey];

         if (action) {
            event.preventDefault();
            event.stopPropagation();
            action();
         }
      },
      [openAndFocusFirstItem, openAndFocusLastItem]
   );

   const buttonProps = React.useMemo((): React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
   > => {
      return {
         ...props,
         id: menuButtonId,
         'aria-haspopup': 'menu',
         'aria-expanded': isOpen,
         'aria-controls': menuId,
         onClick,
         onKeyDown,
         ref: menuButtonRef,
      };
   }, [isOpen, onClick, onKeyDown, props]);

   return buttonProps;
}
