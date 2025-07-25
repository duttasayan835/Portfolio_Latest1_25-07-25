import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

interface Trail {
  x: number;
  y: number;
  id: number;
}

const EnhancedCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [trail, setTrail] = useState<Trail[]>([]);
  const trailRef = useRef<number>(0);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      // Add to trail
      setTrail(prev => [
        ...prev.slice(-15),
        { x: e.clientX, y: e.clientY, id: trailRef.current++ }
      ]);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, input, [role="button"]')) {
        setHoveredElement('interactive');
      } else if (target.matches('h1, h2, h3, h4, h5, h6')) {
        setHoveredElement('heading');
      } else if (target.matches('img, video')) {
        setHoveredElement('media');
      } else {
        setHoveredElement(null);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const getCursorVariant = () => {
    if (isClicking) return 'clicking';
    if (hoveredElement === 'interactive') return 'interactive';
    if (hoveredElement === 'heading') return 'heading';
    if (hoveredElement === 'media') return 'media';
    return 'default';
  };

  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: 'rgba(139, 92, 246, 0.3)',
      border: '2px solid rgba(139, 92, 246, 0.6)',
    },
    interactive: {
      scale: 1.5,
      backgroundColor: 'rgba(34, 197, 94, 0.3)',
      border: '2px solid rgba(34, 197, 94, 0.8)',
    },
    heading: {
      scale: 2,
      backgroundColor: 'rgba(249, 115, 22, 0.3)',
      border: '2px solid rgba(249, 115, 22, 0.8)',
    },
    media: {
      scale: 1.8,
      backgroundColor: 'rgba(236, 72, 153, 0.3)',
      border: '2px solid rgba(236, 72, 153, 0.8)',
    },
    clicking: {
      scale: 0.8,
      backgroundColor: 'rgba(239, 68, 68, 0.5)',
      border: '2px solid rgba(239, 68, 68, 1)',
    }
  };

  return (
    <>
      {/* Particle trail */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed w-1 h-1 rounded-full pointer-events-none z-40"
          style={{
            background: `hsl(${280 + index * 5}, 70%, 60%)`,
            left: point.x - 2,
            top: point.y - 2,
          }}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ 
            scale: 0,
            opacity: 0,
          }}
          transition={{ 
            duration: 0.6,
            delay: index * 0.02,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isVisible ? 1 : 0,
          ...cursorVariants[getCursorVariant()]
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          scale: { duration: 0.2 }
        }}
      />
      
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border rounded-full pointer-events-none z-40"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isVisible ? 1 : 0,
          borderColor: cursorVariants[getCursorVariant()].border?.split(' ')[2] || 'rgba(139, 92, 246, 0.6)'
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          delay: 0.1
        }}
      />

      {/* Magnetic effect for interactive elements */}
      {hoveredElement === 'interactive' && (
        <motion.div
          className="fixed top-0 left-0 w-20 h-20 border-2 border-green-400/30 rounded-full pointer-events-none z-30"
          animate={{
            x: mousePosition.x - 40,
            y: mousePosition.y - 40,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Sparkle effects */}
      {isClicking && (
        <div className="fixed pointer-events-none z-45">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              style={{
                left: mousePosition.x,
                top: mousePosition.y,
              }}
              animate={{
                x: [0, (Math.cos((i * Math.PI) / 4) * 30)],
                y: [0, (Math.sin((i * Math.PI) / 4) * 30)],
                scale: [1, 0],
                opacity: [1, 0],
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default EnhancedCursor;