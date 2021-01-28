import * as React from 'react';
import styled, { css } from 'styled-components';
import { LayoutProps } from '../types';
import {
   baseProperty,
   createResponsiveStyles,
   isResponsiveStyle,
   layout,
   responsiveProperty,
} from '../utils';

export type StackProps = {
   className?: string;
   direction?: React.CSSProperties['flexDirection'];
   spacing?: string;
   justify?: React.CSSProperties['justifyContent'];
   align?: React.CSSProperties['alignItems'];
} & LayoutProps;

const stackStyles = css<StackProps>`
   ${baseProperty('direction', 'flex-direction')};
   ${baseProperty('justify', 'justify-content')};
   ${baseProperty('align', 'align-items')};
   ${baseProperty('wrap', 'flex-wrap')};
   ${(props) =>
      isResponsiveStyle(props.spacing) && props.spacing.base
         ? css`
              & > :not(:first-child) {
                 margin-left: ${props.spacing.base};
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
               }
            `};
      `
   )};
`;

export const Stack = styled.div.withConfig({
   shouldForwardProp: (prop, defaultValidator) =>
      !['spacing'].includes(prop) && defaultValidator(prop),
})<StackProps>`
   display: flex;
   ${layout}
   ${stackStyles}
`;
