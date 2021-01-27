import { color } from '@core-ds/primitives';
import styled, { css } from 'styled-components';

export enum DividerOrientation {
   Horizontal = 'horizontal',
   Vertical = 'vertical',
}

export interface DividerProps {
   className?: string;
   color?: string;
   orientation?: DividerOrientation;
}

export const Divider = styled.hr.attrs<DividerProps>((props) => ({
   role: 'separator',
   'aria-orientation': props.orientation,
}))<DividerProps>`
   border: 0;
   ${(props) =>
      props.orientation === DividerOrientation.Vertical ? verticalStyles : horizontalStyles};
   background-color: ${color.gray8};
   margin: 0;
`;

const verticalStyles = css`
   width: 1px;
   align-self: stretch;
`;

const horizontalStyles = css`
   height: 1px;
   width: 100%;
`;
