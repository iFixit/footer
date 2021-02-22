import { breakpoint, color, fontWeight, space } from '@core-ds/primitives';
import styled from 'styled-components';
import { Link } from '../Link';

export const FooterListItem = styled.li`
   display: flex;
   align-items: center;
   padding-top: ${space[1]};
   padding-bottom: ${space[1]};
`;

export const FooterList = styled.ul`
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
