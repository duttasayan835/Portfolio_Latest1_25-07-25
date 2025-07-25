import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Loader2, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ContactSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFlyingAnimation, setShowFlyingAnimation] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowFlyingAnimation(true);
    
    try {
      // Send email via Supabase edge function
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) {
        throw error;
      }

      setShowFlyingAnimation(false);
      
      // Show success toast
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setShowFlyingAnimation(false);
      
      toast({
        title: "Failed to send message",
        description: "Please try again or contact me directly at duttasayan835@gmail.com",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "duttasayan835@gmail.com",
      href: "mailto:duttasayan835@gmail.com"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "West Bengal, India",
      href: "#"
    },
    {
      icon: Phone,
      label: "Available",
      value: "Mon - Fri, 9AM - 6PM IST",
      href: "#"
    }
  ];

  return (
    <section id="contact" className="py-20 relative z-10 bg-background/80 backdrop-blur-sm overflow-hidden">
      {/* Flying Animation Overlay */}
      <AnimatePresence>
        {showFlyingAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
          >
            <motion.div
              initial={{ x: 0, y: 0, scale: 1, rotate: 0 }}
              animate={{
                x: [0, 200, 400, 800],
                y: [0, -100, -200, -400],
                scale: [1, 0.8, 0.6, 0.2],
                rotate: [0, 45, 90, 180]
              }}
              transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
              className="text-primary"
            >
              <Plane className="h-8 w-8" />
            </motion.div>
            
            {/* Trailing sparkles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: [0, 150 + i * 50, 300 + i * 100],
                  y: [0, -50 - i * 20, -150 - i * 40],
                  opacity: [1, 0.5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  delay: i * 0.1,
                  ease: [0.4, 0, 0.2, 1] 
                }}
                className="absolute text-accent"
              >
                ✨
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm always interested in discussing new opportunities, collaborations, 
            or just having a conversation about AI and technology. Drop me a message!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 relative">
              <CardHeader>
                <CardTitle className="text-2xl">Send Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="glass-effect border-primary/20 focus:border-primary/40"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="glass-effect border-primary/20 focus:border-primary/40"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="glass-effect border-primary/20 focus:border-primary/40"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="glass-effect border-primary/20 focus:border-primary/40 resize-none"
                      placeholder="Tell me about your project, idea, or just say hello!"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full glow-effect relative overflow-hidden"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Whether you're interested in collaboration, have a project in mind, 
                or just want to chat about AI and technology, I'd love to hear from you. 
                I typically respond within 24 hours.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <Card className="glass-effect border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                            <info.icon className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">{info.label}</div>
                          <div className="font-medium group-hover:text-primary transition-colors duration-300">
                            {info.value}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="p-6 rounded-lg glass-effect border border-primary/20"
            >
              <h4 className="font-semibold mb-3">Collaboration Opportunities</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• AI/LLM development projects</li>
                <li>• Full-stack web applications</li>
                <li>• Automation tool development</li>
                <li>• Open source contributions</li>
                <li>• Technical consulting</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
