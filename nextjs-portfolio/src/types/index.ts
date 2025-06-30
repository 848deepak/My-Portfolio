export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'other';
  proficiency: number; // 1-100
  icon?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string[];
  technologies: string[];
  logo?: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  github: string;
  linkedin: string;
  twitter?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
} 