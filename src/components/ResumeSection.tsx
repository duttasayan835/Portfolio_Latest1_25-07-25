
import React from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, FileText, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { downloadCV } from '@/utils/portfolio';

const ResumeSection: React.FC = () => {
  return (
    <section id="resume" className="py-20 relative z-10 bg-background/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            My <span className="text-gradient">Resume</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Download my latest resume to learn more about my experience, skills, and achievements 
            in AI development and software engineering.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300">
            <CardHeader className="text-center pb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 mx-auto">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Sayan Dutta - Resume</CardTitle>
              <div className="flex items-center justify-center text-sm text-muted-foreground mt-2">
                <Calendar className="h-4 w-4 mr-2" />
                Last updated: December 2024
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-primary/5 rounded-lg p-6 border border-primary/10">
                <h3 className="font-semibold mb-3">What's included:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Professional experience and internships
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    AI/LLM projects and technical achievements
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Technical skills and certifications
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Education and academic achievements
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* <Button 
                  size="lg" 
                  className="flex-1 glow-effect group"
                  onClick={downloadCV}
                >
                  <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  Download PDF
                </Button> */}
                <Button
                size="lg" 
                className="flex-1 glow-effect group">
                 <motion.a
                href="https://drive.google.com/uc?export=download&id=1OowilWEGQrAwYwNCTb9BvVEYWekmzFzr"
                target="_self"
                rel="noopener noreferrer"
                 className="flex items-center justify-center"
                // className="flex-1 glow-effect group mr-2 h-5 w-5 group-hover:animate-bounce px-8 py-4 text-lg font-medium text-foreground glass-effect hover:bg-card/70 transition-all duration-300 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" /> 
                  Download CV
            </motion.a> 
            </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="flex-1 glass-effect hover:bg-primary/10"
                  onClick={() => window.open('https://drive.google.com/file/d/1OowilWEGQrAwYwNCTb9BvVEYWekmzFzr/view?usp=drive_link', '_blank')}
                >
                  <Eye className="mr-2 h-5 w-5" />
                  Preview Online
                </Button>
              </div>
              
              <div className="text-center text-sm text-muted-foreground pt-4 border-t border-primary/10">
                <p>
                  Available in PDF format • Optimized for ATS systems • 
                  <span className="text-primary cursor-pointer hover:underline ml-1">
                    Request custom format
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { label: "Years of Study", value: "3+" },
            { label: "Projects Built", value: "10+" },
            { label: "Technologies", value: "15+" },
            { label: "Lines of Code", value: "50K+" }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;
