
import React, { useEffect, useRef } from 'react';
import { DotType } from '../types';

// Augment the global scope to include QRCodeStyling
declare global {
  interface Window {
    QRCodeStyling: any;
  }
}

interface QRCodeDisplayProps {
  text: string;
  color: string;
  dotStyle: DotType;
  qrInstanceRef: React.MutableRefObject<any | null>;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ text, color, dotStyle, qrInstanceRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (ref.current) {
      if (!qrInstanceRef.current) {
        qrInstanceRef.current = new window.QRCodeStyling({
          width: 300,
          height: 300,
          type: 'svg',
          data: text || "Devid's QR Maker",
          dotsOptions: {
            color: color,
            type: dotStyle
          },
          cornersSquareOptions: {
            type: 'extra-rounded',
            color: color,
          },
          cornersDotOptions: {
            type: 'dot',
            color: color
          },
          backgroundOptions: {
            color: 'transparent',
          },
          imageOptions: {
            crossOrigin: 'anonymous',
            margin: 10
          }
        });
        qrInstanceRef.current.append(ref.current);
      } else {
        qrInstanceRef.current.update({
          data: text || "Devid's QR Maker",
          dotsOptions: {
            color: color,
            type: dotStyle
          },
          cornersSquareOptions: {
            color: color,
          },
          cornersDotOptions: {
            color: color
          }
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, color, dotStyle]);

  return <div ref={ref} className="w-[300px] h-[300px] mx-auto" />;
};

export default QRCodeDisplay;
