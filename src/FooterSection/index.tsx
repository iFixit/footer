import styled from 'styled-components';
import { LayoutProps } from '../types';
import { layout } from '../utils';

export type FooterSectionProps = {
   className?: string;
} & LayoutProps;

export const FooterSection = styled.div<FooterSectionProps>`
   ${layout};
`;
