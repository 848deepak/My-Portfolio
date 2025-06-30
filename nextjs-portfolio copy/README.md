# Deepak Pandey's Portfolio - Next.js Version

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features smooth animations, dark mode support, and a clean, professional design.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **Responsive Design**: Fully responsive across all devices
- **Smooth Animations**: Powered by Framer Motion for engaging interactions
- **Dark Mode Support**: Automatic dark/light mode detection
- **SEO Optimized**: Built-in SEO features with Next.js
- **Performance**: Optimized for fast loading and smooth performance
- **Accessibility**: WCAG compliant with proper semantic HTML

## 📋 Sections

- **Hero Section**: Eye-catching introduction with call-to-action buttons
- **About**: Personal information and education details
- **Skills**: Technical skills organized by category with proficiency bars
- **Projects**: Showcase of featured projects with links to code and live demos
- **Experience**: Work experience timeline with detailed descriptions
- **Contact**: Contact form and contact information with social links
- **Footer**: Quick links and additional information

## 🛠️ Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Beautiful icons

### Development
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **PostCSS**: CSS processing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd nextjs-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
nextjs-portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Home page
│   ├── components/
│   │   ├── Header.tsx           # Navigation header
│   │   ├── Hero.tsx             # Hero section
│   │   ├── About.tsx            # About section
│   │   ├── Skills.tsx           # Skills section
│   │   ├── Projects.tsx         # Projects section
│   │   ├── Experience.tsx       # Experience section
│   │   ├── Contact.tsx          # Contact section
│   │   └── Footer.tsx           # Footer component
│   ├── lib/
│   │   └── data.ts              # Portfolio data
│   └── types/
│       └── index.ts             # TypeScript type definitions
├── public/                      # Static assets
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎨 Customization

### Personal Information
Update your personal information in `src/lib/data.ts`:

```typescript
export const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  subtitle: "Your Subtitle",
  institution: "Your Institution",
  about: "Your description...",
  location: "Your Location",
};
```

### Projects
Add or modify projects in the same file:

```typescript
export const projects: Project[] = [
  {
    id: "1",
    title: "Project Title",
    description: "Project description...",
    image: "/path/to/image.jpg",
    technologies: ["React", "TypeScript"],
    githubUrl: "https://github.com/...",
    liveUrl: "https://demo.com",
    featured: true,
  },
];
```

### Skills
Update your skills and proficiency levels:

```typescript
export const skills: Skill[] = [
  { name: "React.js", category: "frontend", proficiency: 90 },
  { name: "Node.js", category: "backend", proficiency: 80 },
];
```

### Contact Information
Update your contact details:

```typescript
export const contactInfo: ContactInfo = {
  email: "your.email@example.com",
  phone: "+1234567890",
  location: "Your Location",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
};
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
- **Netlify**: Use `npm run build` and deploy the `out` directory
- **AWS Amplify**: Connect your repository and deploy
- **Digital Ocean App Platform**: Deploy directly from GitHub

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for best user experience
- **Image Optimization**: Next.js Image component for optimal loading
- **Code Splitting**: Automatic code splitting for faster initial load

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Adding New Sections

1. Create a new component in `src/components/`
2. Add it to the main page in `src/app/page.tsx`
3. Update the navigation in `Header.tsx`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Deepak Pandey**
- Computer Science Engineering Student at Chandigarh University (2023-2027)
- Full-stack developer passionate about creating innovative solutions

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for beautiful icons

---

⭐ If you find this portfolio template helpful, please give it a star!
