import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Droplet {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface WaterDropletsProps {
  count?: number;
  className?: string;
}

const WaterDroplets: React.FC<WaterDropletsProps> = ({ 
  count = 15, 
  className = '' 
}) => {
  const [droplets, setDroplets] = useState<Droplet[]>([]);

  useEffect(() => {
    const generateDroplets = () => {
      const newDroplets: Droplet[] = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 4,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2
      }));
      setDroplets(newDroplets);
    };

    generateDroplets();
    const interval = setInterval(generateDroplets, 8000);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <AnimatePresence>
        {droplets.map((droplet) => (
          <motion.div
            key={droplet.id}
            className="absolute"
            style={{
              left: `${droplet.x}%`,
              top: `${droplet.y}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1, 1.2, 0],
              opacity: [0, 0.8, 0.6, 0],
              y: [0, -20, -40],
            }}
            transition={{
              duration: droplet.duration,
              delay: droplet.delay,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
          >
            {/* Main droplet */}
            <div
              className="rounded-full bg-gradient-to-br from-blue-400/60 to-cyan-300/80 backdrop-blur-sm border border-white/30"
              style={{
                width: `${droplet.size}px`,
                height: `${droplet.size}px`,
                boxShadow: `
                  inset 0 2px 4px rgba(255,255,255,0.3),
                  0 2px 8px rgba(0,200,255,0.3),
                  0 4px 16px rgba(0,200,255,0.1)
                `
              }}
            />
            
            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-400/30"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ 
                scale: [1, 2, 3],
                opacity: [0.6, 0.3, 0]
              }}
              transition={{
                duration: 1.5,
                delay: droplet.delay + 0.5,
                repeat: Infinity,
                repeatDelay: droplet.duration + 1.5
              }}
            />
            
            {/* Highlight */}
            <div
              className="absolute top-1 left-1 w-1 h-1 bg-white/80 rounded-full"
              style={{
                width: `${droplet.size * 0.2}px`,
                height: `${droplet.size * 0.2}px`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Additional water effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 via-transparent to-cyan-400/5 animate-pulse" />
      
      {/* Flowing water streams */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute w-px bg-gradient-to-b from-transparent via-blue-400/40 to-transparent"
          style={{
            left: `${20 + i * 30}%`,
            height: '100%'
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scaleY: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 4,
            delay: i * 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default WaterDroplets;