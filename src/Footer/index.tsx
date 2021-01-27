import { color } from '@core-ds/primitives';
import styled from 'styled-components';

export interface FooterProps {
   className?: string;
}

export const Footer = styled.footer<FooterProps>`
   display: flex;
   flex-direction: column;
   color: ${color.white};
   background-color: ${color.black};
`;
