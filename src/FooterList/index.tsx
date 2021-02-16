import { breakpoint, color, fontWeight, space } from '@core-ds/primitives';
import * as React from 'react';
import styled from 'styled-components';
import { Link } from '../Link';

export type FooterListItemProps = React.PropsWithChildren<{
   className?: string;
}>;

export const FooterListItem = styled.li<FooterListItemProps>`
   display: flex;
   align-items: center;
   padding-top: ${space[1]};
   padding-bottom: ${space[1]};
   & > :not(:first-child) {
      margin-left: ${space[2]};
   }
`;

export type FooterListProps = React.PropsWithChildren<{
   className?: string;
}>;

export const FooterList = styled.ul.attrs<FooterListProps>({
   role: 'list',
})<FooterListProps>`
   margin: 0;
   padding: 0;
   list-style: none;
   border-bottom: 1px solid ${color.gray8};
   padding-bottom: ${space[4]};
   ${Link} {
      font-weight: ${fontWeight.bold};
   }
   @media screen and (min-width: ${breakpoint.sm}) {
      border-bottom: none;
      padding-bottom: 0;
   }
`;
