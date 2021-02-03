import { borderRadius, color, fontWeight } from '@core-ds/primitives';
import styled from 'styled-components';
import { LayoutProps } from '../types';
import { layout } from '../utils';

export type DropdownTriggerProps = {
   className?: string;
} & LayoutProps;

export const DropdownTrigger = styled.button<DropdownTriggerProps>`
   ${layout}
   display: flex;
   align-items: center;
   background-color: transparent;
   border: none;
   color: ${color.white};
   font-size: 14px;
   cursor: pointer;
   outline: none;
`;

export type DropdownTriggerTagProps = {
   className?: string;
} & LayoutProps;

export const DropdownTriggerTag = styled.div<DropdownTriggerTagProps>`
   padding: 2px 6px;
   margin-left: 8px;
   font-weight: ${fontWeight.bold};
   background-color: ${color.gray8};
   border-radius: ${borderRadius.md};
   height: 24px;
   display: flex;
   align-items: center;
   box-sizing: border-box;
`;
