import * as React from 'react';
import styled, { css } from 'styled-components';

export interface StackProps {
   className?: string;
   direction?: React.CSSProperties['flexDirection'];
   spacing?: string;
   justify?: React.CSSProperties['justifyContent'];
   align?: React.CSSProperties['alignItems'];
}

export const Stack = styled.div.withConfig({
   shouldForwardProp: (prop, defaultValidator) =>
      !['spacing'].includes(prop) && defaultValidator(prop),
})<StackProps>`
   display: flex;
   flex-wrap: wrap;
   flex-direction: ${(props) => props.direction || 'row'};
   justify-content: ${(props) => props.justify || 'flex-start'};
   align-items: ${(props) => props.align || 'flex-start'};
   ${(props) =>
      props.spacing != null &&
      css`
         & > :not(:first-child) {
            margin-left: ${props.spacing};
         }
      `}
`;
