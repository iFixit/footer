import { space } from '@core-ds/primitives';
import * as React from 'react';
import styled, { css } from 'styled-components';

export interface IconProps {
   className?: string;
   alt: string;
   source: string;
}

export function Icon({ className, source, alt }: IconProps) {
   return (
      <IconContainer className={className}>
         <img src={source} alt={alt} />
      </IconContainer>
   );
}

const IconContainer = styled.div`
   display: inline-block;
   width: 24px;
   height: 24px;
   & img {
      max-width: 100%;
   }
`;
