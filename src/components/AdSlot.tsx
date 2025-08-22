import { memo } from 'react';

interface AdSlotProps {
  type: 'inline' | 'sidebar' | 'footer' | 'banner';
  className?: string;
}

const AdSlot = memo(({ type, className = '' }: AdSlotProps) => {
  const getAdContent = () => {
    switch (type) {
      case 'inline':
        return { 
          width: 'w-full max-w-2xl', 
          height: 'h-24', 
          text: 'Advertisement - 728x90' 
        };
      case 'sidebar':
        return { 
          width: 'w-full', 
          height: 'h-64', 
          text: 'Advertisement - 300x250' 
        };
      case 'footer':
        return { 
          width: 'w-full', 
          height: 'h-20', 
          text: 'Advertisement - Footer Banner' 
        };
      case 'banner':
        return { 
          width: 'w-full', 
          height: 'h-32', 
          text: 'Advertisement - Top Banner' 
        };
      default:
        return { 
          width: 'w-full', 
          height: 'h-24', 
          text: 'Advertisement' 
        };
    }
  };

  const { width, height, text } = getAdContent();

  return (
    <div className={`${width} ${height} ${className}`}>
      <div className="w-full h-full bg-muted border border-dashed border-border rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground text-sm font-medium">
          {text}
        </span>
      </div>
    </div>
  );
});

AdSlot.displayName = 'AdSlot';

export default AdSlot;