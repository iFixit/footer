import * as React from 'react';
import { color } from '@core-ds/primitives';
import styled, { css } from 'styled-components';
import { Style } from '../types';
import { baseProperty, createResponsiveStyles, responsiveProperty } from '../utils';

export enum DividerOrientation {
   Horizontal = 'horizontal',
   Vertical = 'vertical',
}

export interface DividerProps {
   orientation?: DividerOrientation;
   display?: Style<React.CSSProperties['display']>;
}

export const Divider = styled.hr.attrs<DividerProps>((props) => ({
   role: 'separator',
   'aria-orientation': props.orientation,
}))<DividerProps>`
   border: 0;
   margin: 0;
   ${(props) =>
      props.orientation === DividerOrientation.Vertical ? verticalStyles : horizontalStyles};
   background-color: ${color.gray8};
   ${baseProperty('display', 'display')};
   ${createResponsiveStyles(
      (key) => css`
         ${responsiveProperty(key, 'display', 'display')};
      `
   )}
`;

const verticalStyles = css`
   width: 1px;
   align-self: stretch;
`;

const horizontalStyles = css`
   height: 1px;
   width: 100%;
`;
