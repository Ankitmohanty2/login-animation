import React, { useRef, useEffect, useState } from 'react';

interface BlobCharacterProps {
  color: 'purple' | 'black' | 'orange' | 'yellow';
  isPasswordVisible: boolean;
  mousePosition: { x: number; y: number };
  isTyping?: boolean;
}

const BlobCharacter: React.FC<BlobCharacterProps> = ({ color, isPasswordVisible, mousePosition, isTyping }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  // Calculate eye movement
  useEffect(() => {
    if (isPasswordVisible) {
      // Look away/down or reset when password is visible
      setEyeOffset({ x: 0, y: 0 });
      return;
    }

    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = mousePosition.x - centerX;
    const deltaY = mousePosition.y - centerY;

    // Calculate distance and cap it
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxOffset = 18; // Increased for more movement

    if (distance > 0) {
      const offsetX = (deltaX / distance) * Math.min(maxOffset, distance / 15);
      const offsetY = (deltaY / distance) * Math.min(maxOffset, distance / 15);
      setEyeOffset({ x: offsetX, y: offsetY });
    }
  }, [mousePosition, isPasswordVisible]);

  const baseStyles: Record<string, React.CSSProperties> = {
    purple: {
      width: '160px',
      height: '320px',
      backgroundColor: '#5B24E6',
      borderRadius: '8px 8px 0 0',
      bottom: 0,
      left: '12%',
      zIndex: 1,
      animationDelay: '0s',
    },
    black: {
      width: '90px',
      height: '210px',
      backgroundColor: '#1E1E1E',
      borderRadius: '8px 8px 0 0',
      bottom: 0,
      left: '42%',
      zIndex: 2,
      animationDelay: '0.4s',
    },
    orange: {
      width: '320px',
      height: '160px',
      backgroundColor: '#FF7A33',
      borderRadius: '160px 160px 0 0',
      bottom: 0,
      left: '-2%',
      zIndex: 3,
      animationDelay: '0.2s',
    },
    yellow: {
      width: '120px',
      height: '150px',
      backgroundColor: '#F7D015',
      borderRadius: '60px 60px 0 0',
      bottom: 0,
      left: '52%',
      zIndex: 4,
      animationDelay: '0.6s',
    }
  };

  const style = baseStyles[color];
  const eyeColor = color === 'orange' || color === 'yellow' ? '#1E1E1E' : '#FFFFFF';

  return (
    <div 
      ref={containerRef}
      className={`blob-character color-${color} ${isTyping ? 'is-typing' : ''}`}
      style={{
        ...style,
        position: 'absolute',
      }}
    >
      <div 
        className="eyes-container"
        style={{
          transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
          transition: isPasswordVisible ? 'transform 0.3s ease-in-out' : 'none',
        }}
      >
        <div className={`eye ${isPasswordVisible ? 'closed' : ''}`} style={{ backgroundColor: eyeColor }} />
        <div className={`eye ${isPasswordVisible ? 'closed' : ''}`} style={{ backgroundColor: eyeColor }} />
      </div>

      {color === 'purple' && <div className="mouth purple-mouth" />}
      {color === 'orange' && <div className="mouth orange-mouth" />}
      {color === 'yellow' && <div className="mouth yellow-mouth" />}
    </div>
  );
};

export default BlobCharacter;
