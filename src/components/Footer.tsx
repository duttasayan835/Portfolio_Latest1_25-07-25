
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:sayan.dutta@example.com', label: 'Email' }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="relative py-16 bg-background border-t border-primary/10 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-1 md:col-span-2"
          >
            <h3 className="text-2xl font-bold text-gradient mb-4">Sayan Dutta</h3>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              AI/LLM Builder and Developer passionate about creating intelligent solutions 
              that make a difference. Always exploring the cutting edge of technology.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass-effect border border-primary/20 hover:border-primary/40 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300 hover:glow-effect"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h4 className="font-semibold mb-4">Technologies</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>LangChain & OpenAI</li>
              <li>React & Node.js</li>
              <li>MongoDB & Express</li>
              <li>Three.js & Framer</li>
              <li>Python & AI/ML</li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-8 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-between"
        >
          <div className="flex items-center text-sm text-muted-foreground mb-4 sm:mb-0">
            <span>© {currentYear} Sayan Dutta. Made with</span>
            <Heart className="h-4 w-4 mx-1 text-red-500 fill-current" />
            <span>and lots of ☕</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="hover:bg-primary/10 group"
          >
            Back to top
            <ArrowUp className="ml-2 h-4 w-4 group-hover:-translate-y-1 transition-transform duration-200" />
          </Button>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-neon-cyan rounded-full animate-float opacity-60" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-neon-purple rounded-full animate-float opacity-40" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-neon-blue rounded-full animate-float opacity-80" style={{ animationDelay: '4s' }} />
    </footer>
  );
};

export default Footer;
