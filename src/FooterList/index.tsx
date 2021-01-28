import { space } from '@core-ds/primitives';
import * as React from 'react';
import styled, { css } from 'styled-components';
import { LayoutProps } from '../types';
import { layout } from '../utils';

export interface FooterListIconProps {
   className?: string;
   alt: string;
   source: string;
}

export function FooterListIcon({ className, source, alt }: FooterListIconProps) {
   return (
      <IconContainer className={className}>
         <img src={source} alt={alt} />
      </IconContainer>
   );
}

const IconContainer = styled.div`
   display: inline-block;
   width: 18px;
   height: 16px;
   & img {
      max-width: 100%;
   }
`;

export interface FooterListItemProps {
   className?: string;
}

export const FooterListItem = styled.li<FooterListItemProps>`
   display: flex;
   align-items: center;
   padding-top: ${space[1]};
   padding-bottom: ${space[1]};
   & > :not(:first-child) {
      margin-left: ${space[2]};
   }
`;

export type FooterListProps = {
   className?: string;
} & LayoutProps;

export const FooterList = styled.ul
   .withConfig({
      shouldForwardProp: (prop, defaultValidator) =>
         !['spacing'].includes(prop) && defaultValidator(prop),
   })
   .attrs<FooterListProps>({
      role: 'list',
   })<FooterListProps>`
   margin: 0;
   padding: 0;
   list-style: none;
   ${layout};
   ${(props) =>
      props.spacing != null &&
      css`
         & ${FooterListItem}:not(:first-child) {
            margin-top: ${props.spacing};
         }
      `};
`;
