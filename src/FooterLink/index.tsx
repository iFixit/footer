import { color, fontWeight, lineHeight } from '@core-ds/primitives';
import styled, { css } from 'styled-components';

export interface FooterLinkProps {
   className?: string;
   href: string;
   color?: string;
   hoverColor?: string;
   fontWeight?: string | number;
   padding?: string;
   paddingX?: string;
   paddingY?: string;
}

export const FooterLink = styled.a<FooterLinkProps>`
   display: flex;
   align-items: center;
   text-decoration: none;
   color: ${(props) => props.color || color.gray3};
   font-size: 14px;
   line-height: ${lineHeight.normal};
   font-weight: ${(props) => props.fontWeight || fontWeight.normal};
   &:hover {
      color: ${(props) => props.hoverColor || color.gray1};
   }
   ${(props) =>
      props.padding != null &&
      css`
         padding: ${props.padding};
      `};
   ${(props) =>
      props.paddingX != null &&
      css`
         padding-left: ${props.paddingX};
         padding-right: ${props.paddingX};
      `};
   ${(props) =>
      props.paddingY != null &&
      css`
         padding-top: ${props.paddingY};
         padding-bottom: ${props.paddingY};
      `};
`;
