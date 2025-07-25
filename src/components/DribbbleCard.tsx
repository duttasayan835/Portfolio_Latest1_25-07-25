
import React from 'react';
import { motion } from 'framer-motion';

interface DribbbleCardProps {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  className?: string;
  delay?: number;
}

const DribbbleCard: React.FC<DribbbleCardProps> = ({ 
  title, 
  description, 
  image, 
  tags, 
  className = '',
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -10,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className={`group relative overflow-hidden rounded-2xl bg-card border border-border/50 backdrop-blur-lg ${className}`}
    >
      {/* Hover gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      />
      
      {/* Content */}
      <div className="relative p-6 z-10">
        {image && (
          <motion.div 
            className="mb-4 h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full h-full bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center">
              <span className="text-4xl opacity-40">🚀</span>
            </div>
          </motion.div>
        )}
        
        <motion.h3 
          className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300"
          layoutId={`title-${title}`}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="text-muted-foreground mb-4 leading-relaxed"
          layoutId={`description-${title}`}
        >
          {description}
        </motion.p>
        
        <motion.div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
      
      {/* Animated border */}
      <motion.div 
        className="absolute inset-0 rounded-2xl"
        initial={false}
        whileHover={{
          background: "linear-gradient(45deg, transparent, rgba(0, 217, 255, 0.1), transparent, rgba(139, 92, 246, 0.1), transparent)",
          backgroundSize: "400% 400%",
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default DribbbleCard;
