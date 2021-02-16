import { fontWeight, space } from '@core-ds/primitives';
import * as React from 'react';
import styled from 'styled-components';
import { Link } from '../Link';
import { LayoutProps } from '../types';
import { layout } from '../utils';

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

export type FooterListProps = React.PropsWithChildren<
   {
      className?: string;
   } & LayoutProps
>;

export const FooterList = styled.ul.attrs<FooterListProps>({
   role: 'list',
})<FooterListProps>`
   margin: 0;
   padding: 0;
   list-style: none;
   ${layout};
   ${Link} {
      font-weight: ${fontWeight.bold};
   }
`;
