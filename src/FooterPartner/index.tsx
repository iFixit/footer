import { borderRadius, space } from '@core-ds/primitives';
import * as React from 'react';
import styled from 'styled-components';

export interface FooterPartnerProps {
   className?: string;
   source: string;
}

export function FooterPartner({ className, source }: FooterPartnerProps) {
   return (
      <Container className={className}>
         <Logo src={source} />
      </Container>
   );
}

const Container = styled.div`
   background-color: rgba(36, 44, 51, 0.31);
   border-radius: ${borderRadius.md};
   height: ${space[8]};
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
`;

const Logo = styled.img`
   opacity: 0.5;
   max-height: ${space[6]};
   max-width: 70%;
`;
