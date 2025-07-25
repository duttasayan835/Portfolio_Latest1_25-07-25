
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

const CursorFollowEffect: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary/30 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isVisible ? 1 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28
        }}
      />
      
      {/* Trailing cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-primary/20 rounded-full pointer-events-none z-40"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isVisible ? 1 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          delay: 0.1
        }}
      />

      {/* Floating emoji trail */}
      {['✨', '🚀', '💫', '⚡'].map((emoji, index) => (
        <motion.div
          key={emoji}
          className="fixed top-0 left-0 text-lg pointer-events-none z-30 select-none"
          animate={{
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
            scale: isVisible ? [0, 1, 0] : 0,
            opacity: isVisible ? [0, 1, 0] : 0
          }}
          transition={{
            duration: 2,
            delay: index * 0.1,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </>
  );
};

export default CursorFollowEffect;
