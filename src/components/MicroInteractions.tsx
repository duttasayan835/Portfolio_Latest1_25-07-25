import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Heart, Star, Bookmark, Share, ArrowUp } from 'lucide-react';

// Magnetic Button Component
export const MagneticButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className = '', onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`cursor-pointer perspective-1000 ${className}`}
    >
      <motion.div
        style={{
          transform: "translateZ(50px)",
        }}
        className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-6 shadow-2xl"
      >
        {children}
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 -top-4 -left-4 bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-12"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
    </motion.div>
  );
};

// Like Button with Heart Animation
export const LikeButton: React.FC = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <motion.button
      onClick={handleLike}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{
          scale: isLiked ? [1, 1.3, 1] : 1,
          rotate: isLiked ? [0, 15, -15, 0] : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
        />
      </motion.div>
      
      <motion.span
        key={likeCount}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-sm text-white"
      >
        {likeCount}
      </motion.span>
      
      {/* Floating hearts */}
      {isLiked && (
        <div className="absolute pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: 0, 
                y: 0, 
                scale: 0,
                opacity: 1 
              }}
              animate={{
                x: (Math.random() - 0.5) * 60,
                y: -50 - Math.random() * 20,
                scale: [0, 1, 0],
                opacity: [1, 1, 0]
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            >
              <Heart className="w-3 h-3 fill-red-500 text-red-500" />
            </motion.div>
          ))}
        </div>
      )}
    </motion.button>
  );
};

// Morphing Icon Button
export const MorphingIconButton: React.FC = () => {
  const [currentIcon, setCurrentIcon] = useState(0);
  const icons = [Star, Bookmark, Share, Heart];
  const colors = ['text-yellow-400', 'text-blue-400', 'text-green-400', 'text-red-400'];

  const nextIcon = () => {
    setCurrentIcon((prev) => (prev + 1) % icons.length);
  };

  const CurrentIcon = icons[currentIcon];

  return (
    <motion.button
      onClick={nextIcon}
      className={`p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 ${colors[currentIcon]}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        key={currentIcon}
        initial={{ rotate: 180, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }}
      >
        <CurrentIcon className="w-6 h-6" />
      </motion.div>
    </motion.button>
  );
};

// Progress Ring
export const ProgressRing: React.FC<{ progress: number }> = ({ progress }) => {
  const circumference = 2 * Math.PI * 40;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-24 h-24">
      <svg
        className="transform -rotate-90 w-full h-full"
        viewBox="0 0 100 100"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
          fill="none"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          stroke="url(#gradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          style={{ strokeDasharray }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-xl font-bold text-white"
          key={progress}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {Math.round(progress)}%
        </motion.span>
      </div>
    </div>
  );
};

// Floating Action Button
export const FloatingActionButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.div
        className="relative"
        animate={{ scale: isExpanded ? 1.1 : 1 }}
      >
        {/* Secondary buttons */}
        <motion.div
          className="absolute bottom-16 right-0 flex flex-col gap-3"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: isExpanded ? 1 : 0, 
            scale: isExpanded ? 1 : 0 
          }}
          transition={{ duration: 0.2 }}
        >
          {[Star, Heart, Share].map((Icon, i) => (
            <motion.button
              key={i}
              className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20"
              initial={{ y: 20 }}
              animate={{ y: isExpanded ? 0 : 20 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon className="w-5 h-5" />
            </motion.button>
          ))}
        </motion.div>

        {/* Main button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: isExpanded ? 45 : 0 }}
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </div>
  );
};

// Ripple Effect Button
export const RippleButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ children, onClick }) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
    
    onClick?.();
  };

  return (
    <button
      className="relative overflow-hidden px-6 py-3 bg-blue-500 text-white rounded-lg font-medium"
      onClick={addRipple}
    >
      {children}
      
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: 40,
            height: 40,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </button>
  );
};

export default {
  MagneticButton,
  LikeButton,
  MorphingIconButton,
  ProgressRing,
  FloatingActionButton,
  RippleButton,
};