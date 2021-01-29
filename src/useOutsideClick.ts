import * as React from 'react';

export function useOnClickOutside(
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

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
         document.removeEventListener('mousedown', listener);
         document.removeEventListener('touchstart', listener);
      };
   }, [ref, handler]);
}
