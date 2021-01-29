import * as React from 'react';
import styled from 'styled-components';
import { LayoutProps } from '../types';
import { useOnClickOutside } from '../useOutsideClick';

interface PopoverContext {
   isOpen: boolean;
   onClose: () => void;
   onOpen: () => void;
}

const PopoverContext = React.createContext<PopoverContext | null>(null);

function usePopover() {
   const context = React.useContext(PopoverContext);
   if (context == null) {
      throw new Error(`A Popover parent coomponent is missing`);
   }
   return context;
}

export type PopoverProps = {
   className?: string;
   defaultIsOpen?: boolean;
   stores?: any;
} & LayoutProps;

export function Popover({
   children,
   className,
   stores,
   defaultIsOpen = false,
}: React.PropsWithChildren<PopoverProps>) {
   const [isOpen, setIsOpen] = React.useState<boolean>(defaultIsOpen);

   console.log(stores);
   const value = React.useMemo<PopoverContext>(() => {
      return {
         isOpen,
         onOpen() {
            setIsOpen(true);
         },
         onClose() {
            setIsOpen(false);
         },
      };
   }, [isOpen]);

   return (
      <PopoverContext.Provider value={value}>
         <PopoverContainer className={className}>{children}</PopoverContainer>
      </PopoverContext.Provider>
   );
}

const PopoverContainer = styled.div`
   position: relative;
`;

export function PopoverTrigger({ children }: React.PropsWithChildren<{}>) {
   const popover = usePopover();
   const triggerEl: any = React.Children.only(children);

   const triggerProps = React.useMemo<React.HTMLAttributes<HTMLElement>>(() => {
      return {
         onMouseDown(event: React.MouseEvent<HTMLElement>) {
            event.stopPropagation();
            event.preventDefault();
            if (popover.isOpen) {
               popover.onClose();
            } else {
               popover.onOpen();
            }
         },
         onTouchStart(event: React.TouchEvent<HTMLElement>) {
            event.stopPropagation();
            event.preventDefault();
            if (popover.isOpen) {
               popover.onClose();
            } else {
               popover.onOpen();
            }
         },
      };
   }, [popover]);

   return React.cloneElement(triggerEl, triggerProps);
}

export type PopoverContentProps = {
   className?: string;
};

export function PopoverContent({
   children,
   className,
}: React.PropsWithChildren<PopoverContentProps>) {
   const contentRef = React.useRef<HTMLDivElement>(null);
   const popover = usePopover();

   const onOutsideClick = React.useCallback(() => {
      console.log('clicked outside');
      if (popover.isOpen) {
         popover.onClose();
      }
   }, [popover]);

   useOnClickOutside(contentRef, onOutsideClick);

   return (
      <Content ref={contentRef} className={className} data-open={popover.isOpen}>
         {children}
      </Content>
   );
}

const Content = styled.div`
   display: none;
   position: absolute;
   transform: translateY(-100%);
   top: 0;
   left: 0;
   &[data-open='true'] {
      display: block;
   }
`;
