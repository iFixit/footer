import * as React from 'react';

function SvgTwitterLogo(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
         <path
            d="M14.355 4.741c.01.142.01.284.01.427 0 4.335-3.299 9.33-9.33 9.33A9.266 9.266 0 010 13.024c.264.03.518.041.792.041a6.567 6.567 0 004.07-1.401 3.285 3.285 0 01-3.065-2.274c.203.03.406.05.62.05.294 0 .588-.04.862-.111A3.28 3.28 0 01.65 6.112v-.04c.437.243.945.395 1.483.415A3.277 3.277 0 01.67 3.757c0-.61.162-1.168.447-1.655a9.32 9.32 0 006.761 3.431 3.702 3.702 0 01-.081-.751 3.278 3.278 0 013.28-3.28c.943 0 1.796.397 2.395 1.036a6.457 6.457 0 002.081-.792 3.27 3.27 0 01-1.441 1.807c.66-.07 1.3-.253 1.888-.507a7.048 7.048 0 01-1.645 1.695z"
            fill="#39444D"
         />
      </svg>
   );
}

export default SvgTwitterLogo;