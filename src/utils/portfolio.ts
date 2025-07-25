// Sample CV content for download
export const cvData = {
  personalInfo: {
    name: "Sayan Dutta",
    title: "AI/LLM Builder & CSE Student",
    email: "duttasayan835@gmail.com",
    phone: "+91 9475958774",
    location: "West Bengal, India",
    website: "www.sayandutta.dev"
  },
  summary: "Passionate AI/LLM builder and 3rd-year Computer Science Engineering student with expertise in developing intelligent automation tools and real-world AI applications. Currently working on Savitr-AI, an intelligent delivery optimization system with advanced RAG capabilities.",
  skills: [
    "Python",
    "React & JavaScript",
    "MongoDB",
    "OpenAI API",
    "AI/ML",
    "RAG Systems",
    "Node.js",
    "Tailwind CSS",
    "Three.js",
    "Figma",
    "Git & GitHub"
  ],
  experience: [
    {
      company: "Savitr-AI Project",
      position: "AI/LLM Developer",
      period: "2024 - Present",
      responsibilities: [
        "Developing intelligent delivery system with advanced RAG capabilities",
        "Implementing multi-modal AI interactions for logistics optimization",
        "Building scalable AI agents for real-time decision making"
      ]
    },
    {
      company: "Road Safety Project",
      position: "Data Analyst Intern",
      period: "2023 - 2024",
      responsibilities: [
        "Built comprehensive analytics dashboard for traffic safety monitoring",
        "Developed predictive insights using data analysis techniques",
        "Created interactive visualizations using React and D3.js"
      ]
    }
  ],
  education: [
    {
      degree: "B.Tech in Computer Science Engineering",
      school: "University Institute of Technology, Burdwan",
      period: "2022 - 2026",
      cgpa: "8.79"
    }
  ],
  projects: [
    {
      name: "Savitr-AI",
      description: "Intelligent delivery system with advanced RAG capabilities and multi-modal AI interactions",
      technologies: ["Python", "LangChain", "OpenAI API", "MongoDB"]
    },
    {
      name: "Cyberpunk Chatbot",
      description: "Interactive AI chatbot with futuristic cyberpunk theme and real-time responses",
      technologies: ["React", "Node.js", "WebSocket", "Gemini API"]
    },
    {
      name: "Road Safety Dashboard",
      description: "Comprehensive analytics platform for traffic safety monitoring in India",
      technologies: ["React", "D3.js", "Python", "Qlik Sense"]
    }
  ]
};

// Function to generate and download CV as PDF-like text file
export const downloadCV = () => {
  const cvContent = `
${cvData.personalInfo.name}
${cvData.personalInfo.title}

Contact Information:
Email: ${cvData.personalInfo.email}
Phone: ${cvData.personalInfo.phone}
Location: ${cvData.personalInfo.location}
Website: ${cvData.personalInfo.website}

PROFESSIONAL SUMMARY
${cvData.summary}

TECHNICAL SKILLS
${cvData.skills.join(' • ')}

PROFESSIONAL EXPERIENCE

${cvData.experience.map(exp => `
${exp.position} | ${exp.company}
${exp.period}
${exp.responsibilities.map(resp => `• ${resp}`).join('\n')}
`).join('\n')}

EDUCATION
${cvData.education.map(edu => `
${edu.degree}
${edu.school} | ${edu.period}
`).join('\n')}

FEATURED PROJECTS
${cvData.projects.map(project => `
${project.name}
${project.description}
Technologies: ${project.technologies.join(', ')}
`).join('\n')}
  `;

  const blob = new Blob([cvContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Sayan_Dutta_CV.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Smooth scroll to section function
export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offsetTop = element.offsetTop - 80; // Account for navbar height
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
};

// Social media links (replace with actual URLs)
export const socialLinks = {
  github: "https://github.com/duttasayan835",
  linkedin: "https://www.linkedin.com/in/sayan-dutta-exceptional98/",
  email: "mailto:duttasayan835@gmail.com",
  website: "https://sayandutta.dev"
};