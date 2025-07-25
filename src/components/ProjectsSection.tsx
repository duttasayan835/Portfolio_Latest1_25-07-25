
import React,{useState,useEffect} from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Bot, BarChart3, Car, MessageSquare, Monitor, Code2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ProjectsSection: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: "Savitr-AI",
      description: "An intelligent delivery system leveraging AI for dynamic delivery optimization. Features advanced RAG capabilities, multi-modal interactions, and real-time logistics management.",
      icon: Bot,
      image: "/placeholder.svg",
      images: ["/Logo.png", "/placeholder.svg"],
      tags: ["Python", "LangChain", "OpenAI API", "MongoDB", "RAG", "AI Agents"],
      github: "https://github.com/duttasayan835",
      live: "#",
      featured: true,
      status: "Ongoing",
      mockup: "savitr"
    },
    {
      id: 2,
      title: "Cyberpunk Chatbot",
      description: "Interactive AI chatbot with a futuristic cyberpunk theme. Features dynamic personality-driven conversations, real-time responses, and immersive UI design.",
      icon: MessageSquare,
      image: "/Logo.png",
      images: ["/Logo.png", "/placeholder.svg"],
      tags: ["React", "Node.js", "WebSocket", "Gemini API", "CSS3"],
      github: "https://github.com/duttasayan835/advanced-chatbot.git",
      live: "https://advanced-chatbot-2-0a4d.onrender.com/",
      featured: true,
      status: "Completed",
      mockup: "chatbot"
    },
    {
      id: 3,
      title: "Road Safety Dashboard",
      description: "Comprehensive analytics platform for traffic safety monitoring in India. Features real-time data visualization, accident pattern analysis, and predictive insights for urban planning.",
      icon: BarChart3,
      image: "/placeholder.svg",
      images: ["/Logo.png", "/placeholder.svg"],
      tags: ["React", "D3.js", "Python", "Data Analysis", "Qlik Sense"],
      github: "https://github.com/duttasayan835/Qlik-Analysis-Of-Road-Safety-And-Accident-Patterns-In-India.git",
      live: "https://github.com/duttasayan835/Qlik-Analysis-Of-Road-Safety-And-Accident-Patterns-In-India.git",
      featured: false,
      status: "Completed",
      mockup: "dashboard"
    }
  ];

  const LiveDemoFrame: React.FC<{ project: typeof projects[0] }> = ({ project }) => {
    const [current, setCurrent] = useState(0);
    const [hovered, setHovered] = useState(false);
    useEffect(() => {
      let interval;
      if (hovered && project.images && project.images.length > 1) {
        interval = setInterval(() => {
          setCurrent((prev) => (prev + 1) % project.images.length);
        }, 1200);
      } else {
        setCurrent(0);
      }
      return () => interval && clearInterval(interval);
    }, [hovered, project.images]);
    return (
    <motion.div
      className="relative w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg overflow-hidden"
      whileHover="hover"
      initial="initial"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center"
        variants={{
          initial: { opacity: 1, scale: 1 },
          hover: { opacity: 0, scale: 1.1 }
        }}
        transition={{ duration: 0.3 }}
      >
                <img
          src={project.images ? project.images[current] : project.image}
          alt={project.title}
          className="h-32 w-32 object-contain"
        />
      </motion.div>
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"
        variants={{
          initial: { opacity: 0, y: 20 },
          hover: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="flex-1 bg-muted/30 rounded px-2 py-1 text-xs text-muted-foreground">
              {project.mockup}.demo.app
            </div>
          </div>
          <div className="flex-1 rounded border border-primary/20 overflow-hidden">
      <iframe
        src={project.live}
        title={project.title}
        className="w-full h-40"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        sandbox="allow-scripts allow-same-origin allow-popups"
      />
    </div>
        </div>
      </motion.div>
    </motion.div>
);};

  return (
    <section id="projects" className="py-20 relative z-10 bg-black/60 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore my latest work in AI development, automation tools, and data analytics. 
            Each project represents innovation in solving real-world problems with technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {projects.filter(p => p.featured).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ 
                y: -10,
                rotateX: 5,
                rotateY: 5,
                scale: 1.02
              }}
              className="group perspective-1000"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Card className="h-full glass-effect border-primary/20 hover:border-primary/40 transition-all duration-500 overflow-hidden transform-gpu hover:shadow-2xl hover:shadow-primary/20">
                <LiveDemoFrame project={project} />
                
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
                    
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <project.icon className="h-5 w-5" />
                        
                      </motion.div>
                      {project.title}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                        Featured
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={project.status === 'Ongoing' ? 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30' : 'bg-green-500/20 text-green-600 border-green-500/30'}
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: tagIndex * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        <Badge variant="outline" className="text-xs hover:bg-primary/10">
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3 pt-4">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="sm" className="flex-1" asChild>
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Project
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold mb-8 text-center">Other Notable Projects</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter(p => !p.featured).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  rotateX: 5,
                  rotateY: 5,
                  scale: 1.02
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card className="h-full glass-effect border-primary/10 hover:border-primary/30 transition-all duration-300 group transform-gpu hover:shadow-xl">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <project.icon className="h-6 w-6 text-primary" />
                        </motion.div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </CardTitle>
                      </div>
                      <Badge 
                        variant="outline" 
                        className="text-xs bg-green-500/20 text-green-600 border-green-500/30"
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="ghost" size="sm" className="p-2 h-8 w-8" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="ghost" size="sm" className="p-2 h-8 w-8" asChild>
                          <a href={project.live} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="lg" className="glass-effect" asChild>
              <a href="https://github.com/duttasayan835" target="_blank" rel="noopener noreferrer">
                View All Projects on GitHub
                <Github className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
