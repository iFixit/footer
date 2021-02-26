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
   focus: (index: number) => void;
   blur: () => void;
}

export function useFocusContext<
   Element extends HTMLElement = HTMLElement
>(): FocusContext<Element> {
   const [focusedIndex, setFocusedIndex] = React.useState(-1);
   const [elements, setElements] = React.useState<Element[]>([]);

   const register = React.useCallback((element: Element) => {
      setElements((currentElements) => {
         const isAlreadyInserted = currentElements.includes(element);
         if (!isAlreadyInserted) {
            // We make sure that elements are registered in the same order as they appear in the DOM
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

   const focus = React.useCallback((index: number) => {
      setFocusedIndex(index);
   }, []);

   const blur = React.useCallback(() => {
      setFocusedIndex(-1);
   }, []);

   return {
      elements,
      focusedIndex,
      register,
      unregister,
      focusFirst,
      focusLast,
      focusNext,
      focusPrevious,
      focus,
      blur,
   };
}

export interface UseFocusItemProps<Element extends HTMLElement> {
   isMenuOpen: boolean;
   context: FocusContext<Element>;
   ref: React.MutableRefObject<Element | null>;
}

export interface FocusItem {
   isFocused: boolean;
   index: number;
}

export function useFocusItem<Element extends HTMLElement>({
   isMenuOpen,
   context,
   ref,
}: UseFocusItemProps<Element>): FocusItem {
   const { elements, register, unregister, focusedIndex } = context;

   const index = React.useMemo(() => {
      return elements.findIndex((el) => el === ref.current);
   }, [elements, ref]);

   const isFocused = index >= 0 && index === focusedIndex;

   React.useEffect(() => {
      const item = ref.current;
      if (item) {
         register(item);
         return () => {
            if (item) {
               unregister(item);
            }
         };
      }
      return;
   }, [register, unregister, ref]);

   React.useEffect(() => {
      if (isMenuOpen && isFocused && document.activeElement !== ref.current) {
         ref.current?.focus();
      }
   }, [isFocused, ref, isMenuOpen]);

   return { isFocused, index };
}
