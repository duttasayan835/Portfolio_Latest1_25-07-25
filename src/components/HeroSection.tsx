import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Play, Star, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Cloudinary Video Player script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/cloudinary-video-player@1.10.6/dist/cld-video-player.min.js';
    script.async = true;
    
    const link = document.createElement('link');
    link.href = 'https://unpkg.com/cloudinary-video-player@1.10.6/dist/cld-video-player.min.css';
    link.rel = 'stylesheet';
    
    document.head.appendChild(link);
    document.body.appendChild(script);

    script.onload = () => {
      if ((window as any).cloudinary && videoRef.current) {
        const player = (window as any).cloudinary.videoPlayer(videoRef.current, {
          cloudName: 'dyo65gtea',
          publicId: 'istockphoto-1438827703-640_adpp_is_ghgkar',
          profile: 'cld-default',
          fluid: true,
          controls: false,
          autoplay: true,
          muted: true,
          loop: true,
          poster: 'auto'
        });
      }
    };

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  const typewriterVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 2,
        delay: 0.5
      }
    }
  };

  const stats = [
    { icon: Users, value: "10+", label: "AI Projects" },
    { icon: Zap, value: "3+", label: "Years Experience" },
    { icon: Star, value: "50K+", label: "Lines of Code" }
  ];

  return (
    <section id="home" className="min-h-screen flex items-start justify-center relative overflow-hidden pt-32">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <div 
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover scale-110"
          style={{ 
            filter: 'brightness(0.3) blur(1px)'
          }}
        />
        {/* Fallback gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-primary/20" />
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        {/* Main Headline with typewriter effect */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            <motion.span className="block">Hi, I'm Sayan Dutta</motion.span>
            <motion.div className="block text-gradient overflow-hidden whitespace-nowrap">
              <motion.span
                variants={typewriterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
                style={{ borderRight: "2px solid currentColor" }}
              >
                AI/LLM Builder
              </motion.span>
            </motion.div>
            <motion.span 
              className="block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
            >
              & CSE Student
            </motion.span>
          </h1>
        </motion.div>

        {/* Subheadline with stagger animation */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed"
        >
          Passionate about automating workflows and deploying real-world AI systems. 
          Currently developing Savitr-AI — an intelligent delivery system.
        </motion.p>

        {/* CTA Buttons with hover animations */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="text-lg px-8 py-4 h-auto group bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
              View My Projects
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto group border-border hover:bg-accent/50">
              <Play className="mr-2 h-5 w-5" />
              Download Resume
            </Button>
          </motion.div>
        </motion.div>

        {/* Current Focus with fade-in animation */}
        <motion.div
          variants={itemVariants}
          className="mb-12"
        >
          <motion.p 
            className="text-sm text-muted-foreground mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Currently Working On
          </motion.p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-80">
            {["Savitr-AI", "LangChain", "OpenAI API", "RAG Systems", "AI Agents"].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-muted-foreground font-medium px-3 py-1 rounded-full bg-primary/5 border border-primary/10 cursor-pointer"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats with 3D hover effects */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 10,
                z: 50,
                transition: { duration: 0.3 }
              }}
              className="flex flex-col items-center p-6 rounded-xl glass-effect border border-primary/10 hover:border-primary/20 transition-colors cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              >
                <stat.icon className="h-8 w-8 text-primary mb-2" />
              </motion.div>
              <motion.div 
                className="text-2xl font-bold text-foreground mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + index * 0.1, type: "spring", stiffness: 200 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Links with stagger and hover animations */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center space-x-6 mt-12"
        >
          {[
            { icon: Github, href: "https://github.com/duttasayan835", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/dutta-sayan835/", label: "LinkedIn" },
            { icon: Mail, href: "mailto:duttasayan835@gmail.com", label: "Email" }
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.label !== "Email" ? "_blank" : undefined}
              rel={social.label !== "Email" ? "noopener noreferrer" : undefined}
              className="text-muted-foreground hover:text-primary transition-colors duration-200 p-3 rounded-lg hover:bg-primary/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 + index * 0.1 }}
              whileHover={{ 
                scale: 1.2, 
                rotate: 360,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.9 }}
            >
              <social.icon className="h-6 w-6" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced floating elements with 3D transforms */}
      {[
        { size: "w-2 h-2", color: "bg-primary", position: "top-1/4 left-1/4", delay: 0 },
        { size: "w-3 h-3", color: "bg-accent", position: "top-1/3 right-1/4", delay: 1 },
        { size: "w-1 h-1", color: "bg-primary", position: "bottom-1/4 left-1/3", delay: 2 },
        { size: "w-2 h-2", color: "bg-accent", position: "bottom-1/3 right-1/3", delay: 3 }
      ].map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.position} ${element.size} ${element.color} rounded-full opacity-60`}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            delay: element.delay
          }}
        />
      ))}
    </section>
  );
};

export default HeroSection;
