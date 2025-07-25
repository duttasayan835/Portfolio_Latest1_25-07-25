import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Zap, Globe, Smartphone, Monitor } from 'lucide-react';

interface FloatingIconProps {
  icon: React.ComponentType<any>;
  position: { top?: string; left?: string; right?: string; bottom?: string };
  delay: number;
  size?: number;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ 
  icon: Icon, 
  position, 
  delay, 
  size = 24 
}) => {
  return (
    <motion.div
      className="absolute z-10 opacity-20 text-primary"
      style={position}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.1, 0.3, 0.1],
        scale: [0.8, 1, 0.8],
        rotate: [0, 360]
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Icon size={size} />
    </motion.div>
  );
};

const PortfolioFloatingElements: React.FC = () => {
  const elements = [
    { icon: Code, position: { top: '10%', left: '10%' }, delay: 0, size: 32 },
    { icon: Palette, position: { top: '20%', right: '15%' }, delay: 1, size: 28 },
    { icon: Zap, position: { bottom: '30%', left: '8%' }, delay: 2, size: 24 },
    { icon: Globe, position: { top: '60%', right: '10%' }, delay: 1.5, size: 30 },
    { icon: Smartphone, position: { bottom: '20%', right: '20%' }, delay: 0.5, size: 26 },
    { icon: Monitor, position: { top: '40%', left: '5%' }, delay: 2.5, size: 28 }
  ];

  return (
    <>
      {elements.map((element, index) => (
        <FloatingIcon
          key={index}
          icon={element.icon}
          position={element.position}
          delay={element.delay}
          size={element.size}
        />
      ))}
    </>
  );
};

export default PortfolioFloatingElements;