import { breakpoint } from '@core-ds/primitives';
import { css } from 'styled-components';
import { Breakpoint, ResponsiveStyle, Style } from './types';

const breakpointKeys: Array<keyof Breakpoint> = Object.keys(breakpoint) as any;

export function isResponsiveStyle<Value>(x?: Style<Value>): x is ResponsiveStyle<Value> {
   return x != null && typeof x !== 'string';
}

export const responsiveProperty = (breakpointKey: string, name: string, propertyName: string) =>
   css<any>`
      ${(props) =>
         isResponsiveStyle(props[name]) &&
         props[name][breakpointKey] &&
         css`
            ${propertyName}: ${props[name][breakpointKey]};
         `}
   `;

export const baseProperty = (propName: string, cssPropertyName: string) =>
   css<any>`
      ${(props) =>
         isResponsiveStyle(props[propName]) && props[propName].base
            ? css`
                 ${cssPropertyName}: ${props[propName].base};
              `
            : props[propName] == null
            ? null
            : css`
                 ${cssPropertyName}: ${props[propName]};
              `}
   `;

export const createResponsiveStyles = (breakpointMapper: (key: keyof Breakpoint) => any) => {
   return breakpointKeys.map(
      (key) => css`
         @media screen and (min-width: ${breakpoint[key]}) {
            ${breakpointMapper(key)}
         }
      `
   );
};

interface Property {
   aliases: string[];
   cssName: string;
}

export const layout = css`
   ${baseProperty('margin', 'margin')};
   ${baseProperty('marginX', 'margin-left')};
   ${baseProperty('marginX', 'margin-right')};
   ${baseProperty('marginY', 'margin-top')};
   ${baseProperty('marginY', 'margin-bottom')};
   ${baseProperty('marginTop', 'margin-top')};
   ${baseProperty('marginBottom', 'margin-bottom')};
   ${baseProperty('marginLeft', 'margin-left')};
   ${baseProperty('marginRight', 'margin-right')};
   ${baseProperty('padding', 'padding')};
   ${baseProperty('paddingX', 'padding-left')};
   ${baseProperty('paddingX', 'padding-right')};
   ${baseProperty('paddingY', 'padding-top')};
   ${baseProperty('paddingY', 'padding-bottom')};
   ${baseProperty('paddingTop', 'padding-top')};
   ${baseProperty('paddingBottom', 'padding-bottom')};
   ${baseProperty('paddingLeft', 'padding-left')};
   ${baseProperty('paddingRight', 'padding-right')};
   ${baseProperty('border', 'border')};
   ${baseProperty('borderX', 'border-left')};
   ${baseProperty('borderX', 'border-right')};
   ${baseProperty('borderY', 'border-top')};
   ${baseProperty('borderY', 'border-bottom')};
   ${baseProperty('borderTop', 'border-top')};
   ${baseProperty('borderBottom', 'border-bottom')};
   ${baseProperty('borderLeft', 'border-left')};
   ${baseProperty('borderRight', 'border-right')};
   ${createResponsiveStyles(
      (key) => css`
         ${responsiveProperty(key, 'margin', 'margin')};
         ${responsiveProperty(key, 'marginX', 'margin-left')};
         ${responsiveProperty(key, 'marginX', 'margin-right')};
         ${responsiveProperty(key, 'marginY', 'margin-top')};
         ${responsiveProperty(key, 'marginY', 'margin-bottom')};
         ${responsiveProperty(key, 'marginTop', 'margin-top')};
         ${responsiveProperty(key, 'marginBottom', 'margin-bottom')};
         ${responsiveProperty(key, 'marginLeft', 'margin-left')};
         ${responsiveProperty(key, 'marginRight', 'margin-right')};
         ${responsiveProperty(key, 'padding', 'padding')};
         ${responsiveProperty(key, 'paddingX', 'padding-left')};
         ${responsiveProperty(key, 'paddingX', 'padding-right')};
         ${responsiveProperty(key, 'paddingY', 'padding-top')};
         ${responsiveProperty(key, 'paddingY', 'padding-bottom')};
         ${responsiveProperty(key, 'paddingTop', 'padding-top')};
         ${responsiveProperty(key, 'paddingBottom', 'padding-bottom')};
         ${responsiveProperty(key, 'paddingLeft', 'padding-left')};
         ${responsiveProperty(key, 'paddingRight', 'padding-right')};
         ${responsiveProperty(key, 'border', 'border')};
         ${responsiveProperty(key, 'borderX', 'border-left')};
         ${responsiveProperty(key, 'borderX', 'border-right')};
         ${responsiveProperty(key, 'borderY', 'border-top')};
         ${responsiveProperty(key, 'borderY', 'border-bottom')};
         ${responsiveProperty(key, 'borderTop', 'border-top')};
         ${responsiveProperty(key, 'borderBottom', 'border-bottom')};
         ${responsiveProperty(key, 'borderLeft', 'border-left')};
         ${responsiveProperty(key, 'borderRight', 'border-right')};
      `
   )}
`;
