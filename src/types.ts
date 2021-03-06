import type { CSSProperties } from 'react';
import { breakpoint } from '@core-ds/primitives';

export type Breakpoint = typeof breakpoint;

export type ResponsiveStyle<Property extends keyof CSSProperties> = {
   [B in keyof Breakpoint]: CSSProperties[Property];
} & { base?: Property };

// export type Style<Value> = ResponsiveStyle<Value> | Value;
export type Style<Property extends keyof CSSProperties> =
   | ResponsiveStyle<Property>
   | CSSProperties[Property];

export interface LayoutProps {
   margin?: Style<'margin'>;
   marginX?: Style<'marginLeft'>;
   marginY?: Style<'marginTop'>;
   marginTop?: Style<'marginTop'>;
   marginBottom?: Style<'marginBottom'>;
   marginLeft?: Style<'marginLeft'>;
   marginRight?: Style<'marginRight'>;
   padding?: Style<'padding'>;
   paddingX?: Style<'paddingLeft'>;
   paddingY?: Style<'paddingTop'>;
   paddingTop?: Style<'paddingTop'>;
   paddingBottom?: Style<'paddingBottom'>;
   paddingLeft?: Style<'paddingLeft'>;
   paddingRight?: Style<'paddingRight'>;
   border?: Style<'border'>;
   borderX?: Style<'borderLeft'>;
   borderY?: Style<'borderTop'>;
   borderTop?: Style<'borderTop'>;
   borderBottom?: Style<'borderBottom'>;
   borderLeft?: Style<'borderLeft'>;
   borderRight?: Style<'borderRight'>;
}

export type EventKeys =
   | 'ArrowDown'
   | 'ArrowUp'
   | 'ArrowLeft'
   | 'ArrowRight'
   | 'Enter'
   | 'Space'
   | 'Tab'
   | 'Backspace'
   | 'Control'
   | 'Meta'
   | 'Home'
   | 'End'
   | 'PageDown'
   | 'PageUp'
   | 'Delete'
   | 'Escape'
   | ' '
   | 'Shift';
