import * as React from 'react';

export interface FocusContext<Element extends HTMLElement = HTMLElement> {
   elements: Element[];
   focusedIndex: number;
   register: (element: Element) => void;
   unregister: (element: Element) => void;
   focusFirst: () => void;
   focusLast: () => void;
   focusNext: () => void;
   focusPrevious: () => void;
}

export function useFocusContext<
   Element extends HTMLElement = HTMLElement
>(): FocusContext<Element> {
   const [focusedIndex, setFocusedIndex] = React.useState(-1);
   const [elements, setElements] = React.useState<Element[]>([]);

   const register = React.useCallback((element: Element) => {
      setElements((currentElements) => {
         const isAlreadyInserted = currentElements.some((el) => el === element);
         if (!isAlreadyInserted) {
            const index = currentElements.findIndex((el) => {
               return Boolean(
                  el.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_PRECEDING
               );
            });
            if (index >= 0) {
               return [
                  ...currentElements.slice(0, index),
                  element,
                  ...currentElements.slice(index),
               ];
            } else {
               return [...currentElements, element];
            }
         }
         return currentElements;
      });
   }, []);

   const unregister = React.useCallback((element: Element) => {
      setElements((currentElements) => currentElements.filter((el) => el !== element));
   }, []);

   const focusFirst = React.useCallback(() => {
      setFocusedIndex(0);
   }, []);

   const focusLast = React.useCallback(() => {
      setFocusedIndex(elements.length - 1);
   }, [elements]);

   const focusNext = React.useCallback(() => {
      setFocusedIndex((currentIndex) => (currentIndex + 1) % elements.length);
   }, [elements]);

   const focusPrevious = React.useCallback(() => {
      setFocusedIndex((currentIndex) => (currentIndex - 1 + elements.length) % elements.length);
   }, [elements]);

   return {
      elements,
      focusedIndex,
      register,
      unregister,
      focusFirst,
      focusLast,
      focusNext,
      focusPrevious,
   };
}

export interface UseFocusItemProps<Element extends HTMLElement> {
   isMenuOpen: boolean;
   context: FocusContext<Element>;
   ref: React.MutableRefObject<Element | null>;
}

export function useFocusItem<Element extends HTMLElement>({
   isMenuOpen,
   context,
   ref,
}: UseFocusItemProps<Element>) {
   const { elements, register, unregister, focusedIndex } = context;

   const isFocused = React.useMemo(() => {
      const itemIndex = elements.findIndex((el) => el === ref.current);
      return itemIndex >= 0 && itemIndex === focusedIndex;
   }, [elements, focusedIndex]);

   React.useEffect(() => {
      if (ref.current) {
         register(ref.current);
         return () => {
            if (ref.current) {
               unregister(ref.current);
            }
         };
      }
      return;
   }, [register, unregister, ref.current]);

   React.useEffect(() => {
      if (isMenuOpen && isFocused && document.activeElement !== ref.current) {
         ref.current?.focus();
      }
   }, [isFocused, ref, isMenuOpen]);

   return isFocused;
}
