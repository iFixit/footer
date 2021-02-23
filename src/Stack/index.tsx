import * as React from 'react';
import styled, { css } from 'styled-components';
import { LayoutProps, Style } from '../types';
import {
   baseProperty,
   baseStyle,
   createResponsiveStyles,
   isResponsiveStyle,
   layout,
   responsiveProperty,
} from '../utils';

export type StackProps = React.PropsWithChildren<
   {
      direction?: Style<React.CSSProperties['flexDirection']>;
      spacing?: Style<string>;
      justify?: Style<React.CSSProperties['justifyContent']>;
      align?: Style<React.CSSProperties['alignItems']>;
   } & LayoutProps
>;

const stackStyles = css<StackProps>`
   ${baseProperty('direction', 'flex-direction')};
   ${baseProperty('justify', 'justify-content')};
   ${baseProperty('align', 'align-items')};
   ${baseProperty('wrap', 'flex-wrap')};
   ${(props) => {
      const baseSpacing = baseStyle(props.spacing);
      return baseSpacing != null
         ? css`
              & > :not(:first-child) {
                 ${baseStyle(props.direction) === 'column'
                    ? css`
                         margin-top: ${baseSpacing};
                         margin-left: unset;
                      `
                    : css`
                         margin-left: ${baseSpacing};
                         margin-top: unset;
                      `}
              }
           `
         : null;
   }};
   ${createResponsiveStyles(
      (key) => css<StackProps>`
         ${responsiveProperty(key, 'direction', 'flex-direction')};
         ${responsiveProperty(key, 'justify', 'justify-content')};
         ${responsiveProperty(key, 'align', 'align-items')};
         ${responsiveProperty(key, 'wrap', 'flex-wrap')};
         ${(props) =>
            isResponsiveStyle(props.spacing) &&
            props.spacing[key] != null &&
            css`
               & > :not(:first-child) {
                  margin-left: ${props.spacing[key]};
                  ${props.direction === 'column' ||
                  (isResponsiveStyle(props.direction) && props.direction?.[key] === 'column')
                     ? css`
                          margin-top: ${props.spacing[key]};
                          margin-left: unset;
                       `
                     : css`
                          margin-left: ${props.spacing[key]};
                          margin-top: unset;
                       `}
               }
            `};
      `
   )};
`;

export const Stack = styled.div.withConfig({
   shouldForwardProp: (prop, defaultValidator) =>
      !['spacing', 'direction', 'justify', 'align'].includes(prop) && defaultValidator(prop),
})<StackProps>`
   display: flex;
   ${layout}
   ${stackStyles}
`;
