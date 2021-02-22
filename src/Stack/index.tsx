import * as React from 'react';
import styled, { css } from 'styled-components';
import { LayoutProps, Style } from '../types';
import {
   baseProperty,
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
   ${(props) =>
      isResponsiveStyle(props.spacing) && props.spacing.base
         ? css`
              & > :not(:first-child) {
                 ${props.direction === 'column' ||
                 (isResponsiveStyle(props.direction) && props.direction?.base === 'column')
                    ? `margin-top: ${props.spacing.base}; margin-left: unset;`
                    : `margin-left: ${props.spacing.base}; margin-top: unset;`}
              }
           `
         : props.spacing == null
         ? null
         : css`
              & > :not(:first-child) {
                 margin-left: ${props.spacing};
              }
           `};
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
                     ? `margin-top: ${props.spacing[key]}; margin-left: unset;`
                     : `margin-left: ${props.spacing[key]}; margin-top: unset;`}
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
