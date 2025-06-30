import { Project, Skill, Experience, Education, ContactInfo, SocialLink } from '@/types';

export const personalInfo = {
  name: "Deepak Pandey",
  title: "Full-Stack Developer",
  subtitle: "Computer Science Engineering Student",
  institution: "Chandigarh University (2023-2027)",
  // about: "I'm a passionate full-stack developer with expertise in modern web technologies. I love building scalable applications and solving complex problems. Currently pursuing Computer Science Engineering at Chandigarh University.",
  location: "Chandigarh, India",
};

export const skills: Skill[] = [
  // Frontend
  { name: "React.js", category: "frontend", proficiency: 90 },
  { name: "Next.js", category: "frontend", proficiency: 85 },
  { name: "TypeScript", category: "frontend", proficiency: 80 },
  { name: "Tailwind CSS", category: "frontend", proficiency: 85 },
  { name: "JavaScript", category: "frontend", proficiency: 90 },
  { name: "HTML/CSS", category: "frontend", proficiency: 95 },
  
  // Backend
  { name: "Node.js", category: "backend", proficiency: 80 },
  { name: "Express.js", category: "backend", proficiency: 75 },
  { name: "Python", category: "backend", proficiency: 70 },
  { name: "Java", category: "backend", proficiency: 65 },
  
  // Database
  { name: "MongoDB", category: "database", proficiency: 75 },
  { name: "MySQL", category: "database", proficiency: 70 },
  { name: "PostgreSQL", category: "database", proficiency: 65 },
  
  // Tools
  { name: "Git", category: "tools", proficiency: 85 },
  { name: "Docker", category: "tools", proficiency: 60 },
  { name: "AWS", category: "tools", proficiency: 55 },
  { name: "Vercel", category: "tools", proficiency: 80 },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "OTID-FAN",
    description: "One-Time Digital Identity Verification & Fraud Alert Network - A hybrid web application for digital identity verification and fraud reporting/tracking",
    image: "/images/projects/identity-verification.jpg",
    technologies: ["JavaScript", "Web Development", "Security", "Identity Verification"],
    githubUrl: "https://github.com/848deepak/OTID-FAN",
    featured: true,
  },
  {
    id: "2",
    title: "Library Management System with Gamification",
    description: "An innovative library management system incorporating gamification elements to enhance user engagement and reading habits.",
    image: "/images/projects/library-system.jpg",
    technologies: ["Java", "Gamification", "Database", "UI/UX"],
    githubUrl: "https://github.com/848deepak/Library-Management-System-with-Gamification",
    featured: true,
  },
  {
    id: "3",
    title: "AI-Driven Traffic Light System",
    description: "Smart traffic management system using artificial intelligence to optimize traffic flow and reduce congestion.",
    image: "/images/projects/traffic-system.jpg",
    technologies: ["Python", "AI/ML", "Computer Vision", "IoT"],
    githubUrl: "https://github.com/848deepak/AI-Driven-Traffic-Light-System",
    featured: true,
  },
  {
    id: "4",
    title: "University Event Management",
    description: "A comprehensive system for managing university events, schedules, and registrations.",
    image: "/images/projects/event-management.jpg",
    technologies: ["Python", "Database", "Web Development"],
    githubUrl: "https://github.com/848deepak/University-Event-Management-System",
    featured: true,
  },
  {
    id: "5",
    title: "Student Database Management",
    description: "A Student Database Management System (SDBMS) designed to efficiently manage and organize student-related information with advanced querying capabilities.",
    image: "/images/projects/student-database.jpg",
    technologies: ["C++", "Database", "Data Structures"],
    githubUrl: "https://github.com/848deepak/STUDENT-DATABASE-MANAGEMENT-SYSTEM-",
    featured: false,
  },
  {
    id: "6",
    title: "CU Coding Portfolio",
    description: "A comprehensive collection of coding projects and assignments completed during B.E. in Computer Science at Chandigarh University.",
    image: "/images/projects/coding-portfolio.jpg",
    technologies: ["C++", "C", "Python", "Data Structures"],
    githubUrl: "https://github.com/848deepak/CU-Coding-Portfolio",
    featured: false,
  }
];

export const experience: Experience[] = [
  {
    id: "1",
    title: "Founder & Community Head",
    company: "Codeunia",
    location: "Mohali district, India · Hybrid",
    startDate: "2025-03",
    endDate: "Present",
    description: [
      "Founded Codeunia to bridge the gap between classroom learning and real-world application through a student-led ecosystem.",
      "Scaled the community from the ground up, driving initiatives in AI, IoT, and full-stack development.",
      "Promoted a culture of innovation and collaboration through leadership, mentorship, and hands-on engagement."
    ],
    technologies: ["AI", "IoT", "Full-Stack"],
    logo: "https://placehold.co/48x48/1e293b/fff?text=CU", // Replace with official logo if available
  },
  {
    id: "2",
    title: "Chapter President",
    company: "HackwithIndia",
    location: "Remote",
    startDate: "2025-01",
    endDate: "2025-06",
    description: [
      "Led the chapter to foster innovation and organize impactful hackathons and tech events.",
      "Built and nurtured a vibrant community of developers and tech enthusiasts."
    ],
    technologies: ["Community", "Hackathons", "Leadership"],
    logo: "https://placehold.co/48x48/0ea5e9/fff?text=HWI", // Replace with official logo if available
  },
  {
    id: "3",
    title: "Campus Ambassador",
    company: "GeeksforGeeks",
    location: "Mohali",
    startDate: "2024-12",
    endDate: "2025-06",
    description: [
      "Served as the primary link between GFG and the student community.",
      "Promoted GFG's resources, organized workshops and events, and encouraged students to enhance their coding and technical skills.",
      "Fostered a culture of learning and growth while developing leadership and networking abilities."
    ],
    technologies: ["Public Speaking", "Team Leadership"],
    logo: "https://placehold.co/48x48/22c55e/fff?text=GFG", // Replace with official logo if available
  },
  {
    id: "4",
    title: "Member",
    company: "IEEE",
    location: "Remote",
    startDate: "2023-11",
    endDate: "2025-06",
    description: [
      "Joined the IEEE club to connect with professionals, share knowledge, and collaborate on innovative projects.",
      "Contributed to the advancement of technology and participated in networking and learning opportunities."
    ],
    technologies: ["Communication", "Community Development"],
    logo: "https://placehold.co/48x48/6366f1/fff?text=IEEE", // Replace with official logo if available
  },
  {
    id: "5",
    title: "Member",
    company: "Computer Society Of India CUSB",
    location: "Remote",
    startDate: "2023-10",
    endDate: "2025-06",
    description: [
      "Active member of the CSI Chandigarh University Branch, promoting and advancing computer science and IT.",
      "Organized and participated in events, workshops, and seminars to facilitate learning, networking, and career development."
    ],
    technologies: ["Event Organization", "Networking"],
    logo: "https://placehold.co/48x48/f59e42/fff?text=CSI", // Replace with official logo if available
  },
];

export const education: Education = {
  degree: "Bachelor of Engineering in Computer Science",
  institution: "Chandigarh University",
  location: "Chandigarh, India",
  startDate: "2023",
  endDate: "2027",
  description: "Currently pursuing Computer Science Engineering with focus on software development, algorithms, and web technologies.",
};

export const contactInfo: ContactInfo = {
  email: "deepakpandey911494@gmail.com",
  phone: "+91 8699025107",
  location: "Chandigarh, India",
  github: "https://github.com/848deepak",
  linkedin: "https://www.linkedin.com/in/848deepak/",
  // twitter: "https://twitter.com/deepakpandey", // Ensure Twitter is removed
};

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/848deepak",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/848deepak/",
    icon: "linkedin",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/848.deepak",
    icon: "instagram",
  },
  {
    name: "Codeunia",
    url: "https://www.codeunia.com",
    icon: "code",
  },
  {
    name: "Email",
    url: "mailto:deepakpandey911494@gmail.com",
    icon: "mail",
  },
]; 