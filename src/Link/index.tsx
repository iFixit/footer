import { borderRadius, color, lineHeight, space, fontSize } from '@core-ds/primitives';
import * as React from 'react';
import styled from 'styled-components';
import { LayoutProps } from '../types';
import { layout } from '../utils';

export type LinkProps = React.PropsWithChildren<
   {
      url: string;
      prefix?: React.ReactNode;
      suffix?: React.ReactNode;
   } & LayoutProps
>;

function UnstyledLink({ url, children, prefix, suffix, ...otherProps }: LinkProps) {
   return (
      <a href={url} {...otherProps}>
         {prefix && <Prefix>{prefix}</Prefix>}
         {children}
         {suffix && <Suffix>{suffix}</Suffix>}
      </a>
   );
}

const Prefix = styled.div`
   margin-right: ${space[2]};
   & svg {
      display: block;
   }
`;

const Suffix = styled.div`
   margin-left: ${space[2]};
   & svg {
      display: block;
   }
`;

export const Link = styled(UnstyledLink)`
   ${layout};
   display: flex;
   align-items: center;
   text-decoration: none;
   color: ${color.gray3};
   font-size: ${fontSize[1]};
   line-height: ${lineHeight.normal};
   outline: none;
   border-radius: ${borderRadius.md};
   &:focus {
      box-shadow: 0 0 0 0.2rem rgb(25 117 241 / 25%);
   }
   &:hover {
      color: ${color.gray1};
   }
`;
