import * as React from 'react';

export function useOutsideClick(
   ref: React.RefObject<HTMLElement>,
   handler: (event: Event) => void
) {
   React.useEffect(() => {
      const listener = (event: Event) => {
         const target = event.target as HTMLElement;
         if (ref.current?.contains(target) === false) {
            handler(event);
         }
      };

      document.addEventListener('click', listener);

      return () => {
         document.removeEventListener('click', listener);
      };
   }, [ref, handler]);
}
