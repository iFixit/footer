import styled, { css } from 'styled-components';
import { LayoutProps, Style } from '../types';
import { baseProperty, createResponsiveStyles, layout, responsiveProperty } from '../utils';

export type GridProps = {
   templateRows?: Style<'gridTemplateRows'>;
   templateColumns?: Style<'gridTemplateColumns'>;
   gap?: Style<'gap'>;
} & LayoutProps;

const gridStyles = css`
   ${baseProperty('templateRows', 'grid-template-rows')};
   ${baseProperty('templateColumns', 'grid-template-columns')};
   ${baseProperty('gap', 'gap')};
   ${createResponsiveStyles(
      (key) => css`
         ${responsiveProperty(key, 'templateRows', 'grid-template-rows')};
         ${responsiveProperty(key, 'templateColumns', 'grid-template-columns')};
         ${responsiveProperty(key, 'gap', 'gap')};
      `
   )}
`;

export const Grid = styled.div<GridProps>`
   display: grid;
   ${layout};
   ${gridStyles};
`;

export type GridItemProps = {
   rowStart?: Style<'gridRowStart'>;
   rowEnd?: Style<'gridRowEnd'>;
   columnStart?: Style<'gridColumnStart'>;
   columnEnd?: Style<'gridColumnEnd'>;
   justify?: Style<'justifySelf'>;
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
