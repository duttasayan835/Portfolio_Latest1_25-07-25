
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Brain, Zap, Trophy, BookOpen, Users, Briefcase, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal, FloatingElement, ScaleOnHover } from '@/components/ScrollAnimations';

const AboutSection: React.FC = () => {
  const skills = [
    { name: "Python", level: 90, icon: Code },
    { name: "LLMs & AI", level: 85, icon: Brain },
    { name: "LangChain", level: 80, icon: Zap },
    { name: "React/JS", level: 75, icon: Code }
  ];

  const experiences = [
    {
      title: "AI/LLM Developer",
      company: "Savitr-AI Project",
      period: "2024 - Present",
      description: "Developing intelligent delivery system with advanced RAG capabilities and multi-modal AI interactions.",
      skills: ["Python", "LangChain", "OpenAI API", "MongoDB"]
    },
    {
      title: "Data Analyst Intern",
      company: "Road Safety Project",
      period: "2023 - 2024",
      description: "Built comprehensive analytics dashboard for traffic safety monitoring with predictive insights.",
      skills: ["React", "D3.js", "Python", "Qlik Sense"]
    },
    {
      title: "Frontend Developer",
      company: "Cyberpunk Chatbot",
      period: "2023",
      description: "Created futuristic AI chatbot with real-time conversation capabilities and immersive UI design.",
      skills: ["React", "Node.js", "WebSocket", "Gemini API"]
    }
  ];

  const education = {
    degree: "B.Tech in Computer Science",
    institution: "University Institute of Technology, Burdwan",
    period: "2022 - 2026",
    cgpa: "8.79",
    achievements: [
      "AI/ML Specialization",
      "Full Stack Development",
      "Data Structures & Algorithms"
    ]
  };

  const Avatar3D: React.FC = () => (
    <motion.div
      className="relative w-64 h-64 mx-auto mb-8"
      whileHover="hover"
      initial="initial"
    >
      <motion.div
        className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center overflow-hidden"
        variants={{
          initial: { scale: 1, rotateY: 0 },
          hover: { scale: 1.05, rotateY: 10 }
        }}
        transition={{ duration: 0.3 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="text-8xl"
          variants={{
            initial: { rotate: 0 },
            hover: { rotate: 5 }
          }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          👨‍💻
        </motion.div>
        
        {/* Floating particles around avatar */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/60 rounded-full"
            style={{
              top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 40}%`,
              left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 40}%`,
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
      </motion.div>
      
      {/* Orbiting icons */}
      {[Brain, Code, Zap, Trophy].map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center text-primary"
          style={{
            top: `${50 + Math.sin(index * 90 * Math.PI / 180) * 45}%`,
            left: `${50 + Math.cos(index * 90 * Math.PI / 180) * 45}%`,
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          whileHover={{ scale: 1.2, y: -5 }}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <section id="about" className="py-20 relative z-10 bg-black/70 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              About <span className="text-gradient">Me</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate AI/LLM builder focused on creating intelligent automation tools 
              and real-world AI applications that solve complex problems.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Avatar & Introduction */}
          <ScrollReveal direction="left">
            <div className="text-center lg:text-left">
              <Avatar3D />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-4">Sayan Dutta</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  3rd-year Computer Science Engineering student at UIT Burdwan with a passion 
                  for AI/LLM development and automation. Currently working on Savitr-AI, 
                  an intelligent delivery optimization system.
                </p>
                
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {["AI Enthusiast", "LLM Builder", "Full Stack Dev", "Problem Solver"].map((tag, index) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      <Badge variant="outline" className="bg-primary/5 border-primary/20">
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Right Column - Skills */}
          <ScrollReveal direction="right">
            <div>
              <h3 className="text-2xl font-bold mb-6">Technical Skills</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <skill.icon className="h-5 w-5 text-primary" />
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Education Section */}
        <ScrollReveal>
          <Card className="mb-12 glass-effect border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-lg">{education.degree}</h4>
                  <p className="text-primary">{education.institution}</p>
                  <p className="text-muted-foreground">{education.period}</p>
                  <p className="text-lg font-bold mt-2">CGPA: {education.cgpa}</p>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Key Areas:</h5>
                  <div className="flex flex-wrap gap-2">
                    {education.achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Badge variant="outline">{achievement}</Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Experience Timeline */}
        <ScrollReveal>
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-8 text-center">Experience & Projects</h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <ScaleOnHover>
                    <Card className="glass-effect border-primary/10 hover:border-primary/30 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-bold text-lg">{exp.title}</h4>
                            <p className="text-primary font-medium">{exp.company}</p>
                            <p className="text-sm text-muted-foreground">{exp.period}</p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-muted-foreground mb-3">{exp.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {exp.skills.map((skill, skillIndex) => (
                                <motion.div
                                  key={skill}
                                  initial={{ opacity: 0, scale: 0 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.3 + skillIndex * 0.05 }}
                                  whileHover={{ scale: 1.1, y: -2 }}
                                >
                                  <Badge variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </ScaleOnHover>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AboutSection;
