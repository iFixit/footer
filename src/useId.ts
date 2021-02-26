import * as React from 'react';

let isFirstAppRender = true;
let id = 0;
const generateId = () => ++id;

/**
 * Reack hook to generate unique id
 *
 * @param providedId the external id passed from the user
 * @param prefix prefix to append before the id
 */
export function useId(providedId?: string, prefix?: string): string | undefined {
   const [id, setId] = React.useState(providedId || (isFirstAppRender ? null : generateId()));

   React.useEffect(() => {
      if (id == null) {
         setId(generateId());
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   React.useEffect(() => {
      if (isFirstAppRender) {
         isFirstAppRender = false;
      }
   }, []);

   const uid = id != null ? id.toString() : undefined;
   return prefix ? `${prefix}-${uid}` : uid;
}

/**
 * Reack hook to generate ids for use in compound components
 *
 * @param idProp the external id passed from the user
 * @param prefixes array of prefixes to use
 *
 * @example
 *
 * ```js
 * const [buttonId, menuId] = useIds("52", "button", "menu")
 *
 * // buttonId will be `button-52`
 * // menuId will be `menu-52`
 * ```
 */
export function useIds(idProp: string | undefined, ...prefixes: string[]) {
   const id = useId(idProp);
   return prefixes.map((prefix) => `${prefix}-${id}`);
}
