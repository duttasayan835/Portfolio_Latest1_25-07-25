import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';

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
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

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
      className={`cursor-pointer ${className}`}
    >
      <motion.div
        style={{
          transform: "translateZ(20px)",
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
    </motion.button>
  );
};

// Simplified Button with Hover Effect
export const HoverButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className = '', onClick }) => {
  return (
    <motion.button
      className={`px-6 py-3 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 ${className}`}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="flex items-center justify-center gap-2">
        {children}
        <motion.div
          initial={{ x: -5, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </div>
    </motion.button>
  );
};

export default {
  MagneticButton,
  LikeButton,
  HoverButton
};