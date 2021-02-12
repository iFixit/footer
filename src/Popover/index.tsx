import { space } from '@core-ds/primitives';
import * as React from 'react';
import styled from 'styled-components';
import { LayoutProps } from '../types';
import { useOutsideClick } from '../useOutsideClick';

interface PopoverContext {
   isOpen: boolean;
   onTrigger: () => void;
   onClickOutside: () => void;
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
} & LayoutProps;

enum TriggerState {
   Idle = 'idle',
   Activated = 'activated',
}

export function Popover({
   children,
   className,
   defaultIsOpen = false,
}: React.PropsWithChildren<PopoverProps>) {
   const [isOpen, setIsOpen] = React.useState<boolean>(defaultIsOpen);
   const triggerStateRef = React.useRef<TriggerState>(TriggerState.Idle);

   const value = React.useMemo<PopoverContext>(() => {
      return {
         isOpen,
         onTrigger() {
            triggerStateRef.current = TriggerState.Activated;
         },
         onClickOutside() {
            if (triggerStateRef.current === TriggerState.Activated) {
               triggerStateRef.current = TriggerState.Idle;
               setIsOpen((current) => !current);
            } else if (isOpen) {
               setIsOpen(false);
            }
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
         onMouseDown() {
            popover.onTrigger();
         },
         onTouchStart() {
            popover.onTrigger();
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

   useOutsideClick(contentRef, popover.onClickOutside);

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
   padding-bottom: ${space[1]};
   top: 0;
   left: 0;
   &[data-open='true'] {
      display: block;
   }
`;
