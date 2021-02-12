import type { CSSProperties } from 'react';
import { breakpoint } from '@core-ds/primitives';

export type Breakpoint = typeof breakpoint;

export type ResponsiveStyle<Value> = {
   [B in keyof Breakpoint]: Value;
} & { base?: Value };

export type Style<Value> = ResponsiveStyle<Value> | Value;

export interface LayoutProps {
   margin?: Style<CSSProperties['margin']>;
   marginX?: Style<CSSProperties['margin']>;
   marginY?: Style<CSSProperties['margin']>;
   marginTop?: Style<CSSProperties['marginTop']>;
   marginBottom?: Style<CSSProperties['marginBottom']>;
   marginLeft?: Style<CSSProperties['marginLeft']>;
   marginRight?: Style<CSSProperties['marginRight']>;
   padding?: Style<CSSProperties['padding']>;
   paddingX?: Style<CSSProperties['padding']>;
   paddingY?: Style<CSSProperties['padding']>;
   paddingTop?: Style<CSSProperties['paddingTop']>;
   paddingBottom?: Style<CSSProperties['paddingBottom']>;
   paddingLeft?: Style<CSSProperties['paddingLeft']>;
   paddingRight?: Style<CSSProperties['paddingRight']>;
   border?: Style<CSSProperties['border']>;
   borderX?: Style<CSSProperties['border']>;
   borderY?: Style<CSSProperties['border']>;
   borderTop?: Style<CSSProperties['borderTop']>;
   borderBottom?: Style<CSSProperties['borderBottom']>;
   borderLeft?: Style<CSSProperties['borderLeft']>;
   borderRight?: Style<CSSProperties['borderRight']>;
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
