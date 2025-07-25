import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import GlassMorphism from './GlassMorphism';
import WaterDroplets from './WaterDroplets';
import CSSParticles from './CSSParticles';
import PortfolioFloatingElements from './PortfolioFloatingElements';
import { HoverButton } from './SimplifiedMicroInteractions';
import { downloadCV, scrollToSection, socialLinks } from '@/utils/portfolio';

const ImmersiveHero: React.FC = () => {
  const skills = [
    "Full-Stack Development",
    "UI/UX Design", 
    "3D Web Experiences",
    "Mobile Applications",
    "AI Integration"
  ];

  const stats = [
    { number: "5+", label: "Projects Completed" },
    { number: "0", label: "Years Experience" },
    // { number: "95%", label: "Client Satisfaction" }
  ];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Enhanced background optimized for video */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Dynamic gradient overlays for video background */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/8 z-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60 z-5" />
      
      {/* Animated background orbs with portfolio colors */}
      <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/3 right-1/6 w-96 h-96 bg-accent/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
      
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
      
      {/* CSS-based particle background */}
      <CSSParticles />
      
      {/* Floating portfolio icons */}
      <PortfolioFloatingElements />
      
      {/* Water droplet effect overlay */}
      <WaterDroplets className="z-10" count={6} />

      {/* Hero content */}
      <div className="container relative z-20 mx-auto px-6 py-16 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Column - Main Content */}
          <motion.div 
            className="text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            {/* Professional Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 glass-effect rounded-full text-sm font-medium text-foreground/90"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Available for Work
            </motion.div>

            {/* Name and Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-foreground">
                Hi, I'm
              </span>
              <br />
              <span className="text-gradient animate-gradient-x">
                Sayan Dutta
              </span>
            </h1>
            
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Creative Developer & Designer
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              I create stunning digital experiences that blend beautiful design with 
              cutting-edge technology. Specializing in modern web development, 
              3D interactions, and user-centered design.
            </motion.p>

            {/* Skills Tags */}
            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="px-4 py-2 glass-effect rounded-full text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <HoverButton 
                className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold glow-effect"
                onClick={() => scrollToSection('projects')}
              >
                View My Work
                <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </HoverButton>

              <motion.a
                href="https://drive.google.com/uc?export=download&id=1OowilWEGQrAwYwNCTb9BvVEYWekmzFzr"
                target="_self"
                rel="noopener noreferrer"
                className="group px-8 py-4 text-lg font-medium text-foreground glass-effect hover:bg-card/70 transition-all duration-300 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5 mr-2" /> 
                  Download CV
            </motion.a> 
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              {[
                { icon: Github, href: socialLinks.github, label: "GitHub" },
                { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
                { icon: Mail, href: socialLinks.email, label: "Email" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? '_self' : '_blank'}
                  rel={social.href.startsWith('mailto:') ? '' : 'noopener noreferrer'}
                  className="w-12 h-12 glass-effect rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Stats and Visual Elements */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            {/* Profile Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-8 flex justify-center"
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05, rotateY: 10 }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative w-64 h-64 rounded-full overflow-hidden glass-effect p-2">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-primary via-accent to-secondary p-1">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500">
                      {/* Replace this placeholder with your actual image */}
                      <img
                        src="https://res.cloudinary.com/dyo65gtea/image/upload/v1752926317/till_shoulder_pic_e5omtw.jpg"
                        alt="Sayan Dutta - AI/LLM Builder"
                        className="w-full h-full object-cover rounded-full"
                        style={{ filter: 'brightness(1.1) contrast(1.1)' }}
                      />
                    </div>
                  </div>
                  
                  {/* Floating particles around image */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-primary/60 rounded-full"
                      style={{
                        top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 35}%`,
                        left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 35}%`,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 1, 0.6],
                        rotate: [0, 360]
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3
                      }}
                    />
                  ))}
                </div>
                
                {/* Glow effect behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl -z-10 animate-pulse" />
              </motion.div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 + index * 0.2 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <GlassMorphism className="p-6 text-center glow-effect">
                    <div className="text-2xl md:text-3xl font-bold text-gradient mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </GlassMorphism>
                </motion.div>
              ))}
            </div>

            {/* Featured Work Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="glass-effect p-6 rounded-2xl glow-effect cursor-pointer hover:bg-card/50 transition-all duration-300"
              onClick={() => scrollToSection('projects')}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Latest Project
              </h3>
              <motion.div 
                className="w-full h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                 {/* Your image */}
  <img
    src="/Logo.png" // Replace with your image path
    alt="Project Preview"
    className="w-full h-full object-cover"
  />
  {/* Overlay text, shown on hover */}
  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    <span className="text-primary-foreground text-lg font-semibold">
      Click to View Projects
    </span>
  </div>
              </motion.div>
              <p className="text-sm text-muted-foreground">
                Savitr-AI: Intelligent delivery optimization system with advanced RAG capabilities
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => scrollToSection('about')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <p className="text-muted-foreground text-xs mb-3 group-hover:text-foreground transition-colors">
              Explore Portfolio
            </p>
            <div className="w-6 h-10 rounded-full border-2 border-border/50 group-hover:border-primary/50 flex justify-center transition-colors">
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-2 h-2 bg-primary rounded-full mt-2 animate-glow"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImmersiveHero;