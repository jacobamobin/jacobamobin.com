// Technology type used across all data
export interface Technology {
  name: string;
  color: string;
}

// Profile / Personal Info
export interface Skill {
  category: string;
  items: string[];
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  bio: string;
  images: {
    avatar: string;
    logo: string;
    banner: string;
  };
  resume: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
  };
  skills: Skill[];
}

// Work Experience
export interface Experience {
  id: string;
  company: string;
  companyUrl: string;
  position: string;
  type: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  showDescription: boolean;
  description: string[];
  technologies: Technology[];
}

// Projects
export interface ProjectLinks {
  github?: string;
  devpost?: string;
  web?: string;
  appStore?: string;
  playStore?: string;
}

export interface Project {
  id: string;
  title: string;
  type: string;
  description: string;
  image: string;
  userCount?: string;
  isHackathon: boolean;
  placement: string | null;
  featured: boolean;
  links: ProjectLinks;
  technologies: Technology[];
}

// Hackathons
export interface HackathonLinks {
  github?: string;
  devpost?: string;
}

export interface Hackathon {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  achievement: string | null;
  image: string;
  technologies: Technology[];
  links: HackathonLinks | null;
}
