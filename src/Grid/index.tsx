import * as React from 'react';
import styled, { css } from 'styled-components';
import { LayoutProps, Style } from '../types';
import { createResponsiveStyles, baseProperty, layout, responsiveProperty } from '../utils';

export type GridProps = {
   className?: string;
   templateRows?: Style<React.CSSProperties['gridTemplateRows']>;
   templateColumns?: Style<React.CSSProperties['gridTemplateColumns']>;
   gap?: Style<string | number>;
} & LayoutProps;

const gridStyles = css`
   ${baseProperty('templateRows', 'grid-template-rows')};
   ${baseProperty('templateColumns', 'grid-template-columns')};
   ${baseProperty('gap', 'gap')};
   ${createResponsiveStyles(
      (key) => css`
         ${responsiveProperty(key, 'templateRows', 'grid-template-rows')};
         ${responsiveProperty(key, 'templateColumns', 'grid-template-columns')};
         ${responsiveProperty(key, 'gap', 'row-gap')};
         ${responsiveProperty(key, 'gap', 'column-gap')};
      `
   )}
`;

export const Grid = styled.div.withConfig({
   shouldForwardProp: (prop, defaultValidator) => ![''].includes(prop) && defaultValidator(prop),
})<GridProps>`
   display: grid;
   ${layout};
   ${gridStyles};
`;

export type GridItemProps = {
   className?: string;
   rowStart?: Style<React.CSSProperties['gridRowStart']>;
   rowEnd?: Style<React.CSSProperties['gridRowEnd']>;
   columnStart?: Style<React.CSSProperties['gridColumnStart']>;
   columnEnd?: Style<React.CSSProperties['gridColumnEnd']>;
   justify?: Style<React.CSSProperties['justifySelf']>;
} & LayoutProps;

const gridItemStyles = css`
   ${baseProperty('rowStart', 'grid-row-start')};
   ${baseProperty('rowEnd', 'grid-row-end')};
   ${baseProperty('columnStart', 'grid-column-start')};
   ${baseProperty('columnEnd', 'grid-column-end')};
   ${baseProperty('justify', 'justify-self')};
   ${baseProperty('align', 'align-self')};
   ${createResponsiveStyles(
      (key) => css`
         ${responsiveProperty(key, 'rowStart', 'grid-row-start')};
         ${responsiveProperty(key, 'rowEnd', 'grid-row-end')};
         ${responsiveProperty(key, 'columnStart', 'grid-column-start')};
         ${responsiveProperty(key, 'columnEnd', 'grid-column-end')};
         ${responsiveProperty(key, 'justify', 'justify-self')};
         ${responsiveProperty(key, 'align', 'align-self')};
      `
   )}
`;

export const GridItem = styled.div<GridItemProps>`
   ${layout};
   ${gridItemStyles};
`;
