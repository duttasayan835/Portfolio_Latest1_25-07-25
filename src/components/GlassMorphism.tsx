import React from 'react';
import { motion } from 'framer-motion';

interface GlassMorphismProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
  blur?: number;
  opacity?: number;
}

const GlassMorphism: React.FC<GlassMorphismProps> = ({
  children,
  className = '',
  intensity = 'medium',
  blur = 20,
  opacity = 0.1
}) => {
  const intensityClasses = {
    light: 'backdrop-blur-md bg-white/5 border border-white/10',
    medium: 'backdrop-blur-xl bg-white/10 border border-white/20',
    heavy: 'backdrop-blur-2xl bg-white/15 border border-white/30'
  };

  return (
    <motion.div
      className={`
        ${intensityClasses[intensity]}
        rounded-2xl shadow-2xl
        before:absolute before:inset-0 before:rounded-2xl
        before:bg-gradient-to-br before:from-white/20 before:to-transparent
        before:opacity-50 before:pointer-events-none
        relative overflow-hidden
        ${className}
      `}
      style={{
        backdropFilter: `blur(${blur}px)`,
        background: `rgba(255, 255, 255, ${opacity})`
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
    >
      {/* Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-60 pointer-events-none" />
      
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-75"
        style={{
          background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassMorphism;