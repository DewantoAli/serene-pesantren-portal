
import React from 'react';
import { cn } from '@/lib/utils';

interface PatternBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  patternType?: 'geometric' | 'dots' | 'waves';
  patternColor?: string;
  patternOpacity?: number;
}

const PatternBackground: React.FC<PatternBackgroundProps> = ({
  className,
  children,
  patternType = 'geometric',
  patternColor = '#1D7874',
  patternOpacity = 0.03,
}) => {
  const getPatternStyle = () => {
    switch (patternType) {
      case 'geometric':
        return {
          backgroundImage: `
            linear-gradient(135deg, ${patternColor}${Math.round(patternOpacity * 255).toString(16)} 25%, transparent 25%),
            linear-gradient(225deg, ${patternColor}${Math.round(patternOpacity * 255).toString(16)} 25%, transparent 25%),
            linear-gradient(45deg, ${patternColor}${Math.round(patternOpacity * 255).toString(16)} 25%, transparent 25%),
            linear-gradient(315deg, ${patternColor}${Math.round(patternOpacity * 255).toString(16)} 25%, transparent 25%)
          `,
          backgroundPosition: '10px 0, 10px 0, 0 0, 0 0',
          backgroundSize: '20px 20px',
          backgroundRepeat: 'repeat',
        };
      case 'dots':
        return {
          backgroundImage: `radial-gradient(${patternColor}${Math.round(patternOpacity * 255).toString(16)} 2px, transparent 2px)`,
          backgroundSize: '24px 24px',
        };
      case 'waves':
        return {
          backgroundImage: `
            linear-gradient(to right, ${patternColor}${Math.round(patternOpacity * 255).toString(16)}, ${patternColor}${Math.round(patternOpacity * 255).toString(16)} 5px, transparent 5px, transparent),
            linear-gradient(to bottom, ${patternColor}${Math.round(patternOpacity * 255).toString(16)}, ${patternColor}${Math.round(patternOpacity * 255).toString(16)} 5px, transparent 5px, transparent)
          `,
          backgroundSize: '20px 20px',
        };
      default:
        return {};
    }
  };

  return (
    <div className={cn('relative w-full', className)} style={getPatternStyle()}>
      {children}
    </div>
  );
};

export default PatternBackground;
