import styled, { css } from 'styled-components';

export interface FooterSectionProps {
   className?: string;
   padding?: string;
   paddingX?: string;
   paddingY?: string;
}

export const FooterSection = styled.div<FooterSectionProps>`
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
