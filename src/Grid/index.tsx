import * as React from 'react';
import styled, { css } from 'styled-components';
import { breakpoint } from '@core-ds/primitives';

type Breakpoint = typeof breakpoint;

type ResponsiveStyle<Value> = {
   [B in keyof Breakpoint]: Value;
} & { base?: Value };

type Style<Value> = ResponsiveStyle<Value> | Value;

export interface GridProps {
   className?: string;
   templateRows?: Style<React.CSSProperties['gridTemplateRows']>;
   templateColumns?: Style<React.CSSProperties['gridTemplateColumns']>;
   gap?: Style<string | number>;
}

export const Grid = styled.div.withConfig({
   shouldForwardProp: (prop, defaultValidator) => ![''].includes(prop) && defaultValidator(prop),
})<GridProps>`
   display: grid;
   ${(props) =>
      typeof props.templateRows === 'string' &&
      css`
         grid-template-rows: ${props.templateRows};
      `};
   ${(props) =>
      typeof props.templateColumns === 'string' &&
      css`
         grid-template-columns: ${props.templateColumns};
      `};
   ${(props) =>
      props.gap != null &&
      css`
         row-gap: ${props.gap};
         column-gap: ${props.gap};
      `};
   ${(props) =>
      isResponsiveStyle(props.templateRows) &&
      props.templateRows.base &&
      css`
         grid-template-rows: ${props.templateRows.base};
      `}
   ${(props) =>
      isResponsiveStyle(props.templateColumns) &&
      props.templateColumns.base &&
      css`
         grid-template-rows: ${props.templateColumns.base};
      `};
   ${(props) =>
      isResponsiveStyle(props.gap) &&
      props.gap.base &&
      css`
         grid-template-rows: ${props.gap.base};
      `};

   @media screen and (min-width: ${breakpoint.sm}) {
      ${(props) =>
         isResponsiveStyle(props.templateRows) &&
         props.templateRows.sm &&
         css`
            grid-template-rows: ${props.templateRows.sm};
         `}
      ${(props) =>
         isResponsiveStyle(props.templateColumns) &&
         props.templateColumns.sm &&
         css`
            grid-template-rows: ${props.templateColumns.sm};
         `}
      ${(props) =>
         isResponsiveStyle(props.gap) &&
         props.gap.sm &&
         css`
            grid-template-rows: ${props.gap.sm};
         `}
   }
   @media screen and (min-width: ${breakpoint.md}) {
      ${(props) =>
         isResponsiveStyle(props.templateRows) &&
         props.templateRows.md &&
         css`
            grid-template-rows: ${props.templateRows.md};
         `}
      ${(props) =>
         isResponsiveStyle(props.templateColumns) &&
         props.templateColumns.md &&
         css`
            grid-template-rows: ${props.templateColumns.md};
         `}
      ${(props) =>
         isResponsiveStyle(props.gap) &&
         props.gap.md &&
         css`
            grid-template-rows: ${props.gap.md};
         `}
   }
   @media screen and (min-width: ${breakpoint.lg}) {
      ${(props) =>
         isResponsiveStyle(props.templateRows) &&
         props.templateRows.lg &&
         css`
            grid-template-rows: ${props.templateRows.lg};
         `}
      ${(props) =>
         isResponsiveStyle(props.templateColumns) &&
         props.templateColumns.lg &&
         css`
            grid-template-rows: ${props.templateColumns.lg};
         `}
      ${(props) =>
         isResponsiveStyle(props.gap) &&
         props.gap.lg &&
         css`
            grid-template-rows: ${props.gap.lg};
         `}
   }
   @media screen and (min-width: ${breakpoint.xl}) {
      ${(props) =>
         isResponsiveStyle(props.templateRows) &&
         props.templateRows.xl &&
         css`
            grid-template-rows: ${props.templateRows.xl};
         `}
      ${(props) =>
         isResponsiveStyle(props.templateColumns) &&
         props.templateColumns.xl &&
         css`
            grid-template-rows: ${props.templateColumns.xl};
         `}
      ${(props) =>
         isResponsiveStyle(props.gap) &&
         props.gap.xl &&
         css`
            grid-template-rows: ${props.gap.xl};
         `}
   }
`;

function isResponsiveStyle<Value>(x?: Style<Value>): x is ResponsiveStyle<Value> {
   return x != null && typeof x !== 'string';
}
