"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { IconHome, IconUser, IconBriefcase, IconBook, IconMail } from "@tabler/icons-react";
import { SimpleSearch } from "@/components/ui/simple-search";
import SearchResults from "@/components/SearchResults";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

const navItems = [
  { title: "Home", icon: <IconHome size={20} />, href: "#hero", section: "hero" },
  { title: "About", icon: <IconUser size={20} />, href: "#about", section: "about" },
  { title: "Projects", icon: <IconBriefcase size={20} />, href: "#projects", section: "projects" },
  { title: "Experience", icon: <IconBook size={20} />, href: "#experience", section: "experience" },
  { title: "Contact", icon: <IconMail size={20} />, href: "#contact", section: "contact" },
];

const sectionToHref: Record<string, string> = {
  hero: '/',
  about: '/about',
  projects: '/projects',
  experience: '/experience',
  contact: '/contact',
};

export default function Header({ currentSection }: { currentSection?: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchPlaceholders = [
    "Search for projects...",
    "Find skills...",
    "Look for experience...",
    "Search portfolio...",
    "Find contact info...",
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      setShowSearchResults(true);
      setLoading(true);
      setTimeout(() => setLoading(false), 800);
    } else {
      setShowSearchResults(false);
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchResults(true);
      setLoading(true);
      setTimeout(() => setLoading(false), 800);
    }
  };

  const closeSearchResults = () => {
    setShowSearchResults(false);
    setSearchQuery("");
  };

  // Floating Dock logic for desktop
  let mouseX = useMotionValue(Infinity);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    e.preventDefault();
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 flex items-center h-14 sm:h-16 lg:h-20">
          {/* Logo - Smaller on mobile */}
          <Link href="/" className="flex items-center space-x-2 cursor-pointer mr-2 sm:mr-4 flex-shrink-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-extrabold text-sm sm:text-base lg:text-lg">D</span>
            </div>
            <span className="font-bold text-base sm:text-lg lg:text-xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent hidden sm:block">
              Deepak Pandey
            </span>
            <span className="font-bold text-sm bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent sm:hidden">
              DP
            </span>
          </Link>

          {/* Search Input - Desktop only */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <SimpleSearch
              placeholders={searchPlaceholders}
              onChange={handleSearchChange}
              onSubmit={handleSearchSubmit}
              value={searchQuery}
              loading={loading}
            />
          </div>

          {/* Floating Dock Navigation - Desktop only */}
          <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={cn(
              "mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-zinc-900 border border-zinc-700 px-4 pb-3 lg:flex"
            )}
          >
            {navItems.map((item) => (
              <span key={item.title} onClick={(e) => handleNavClick(e as any, item.section)} style={{ cursor: 'pointer' }}>
                <IconContainer
                  mouseX={mouseX}
                  {...item}
                  active={currentSection === item.section}
                />
              </span>
            ))}
          </motion.div>

          {/* Mobile Menu Button - Larger touch target */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200 ml-auto touch-manipulation"
            aria-label="Toggle mobile menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
              <line x1="4" y1="12" x2="20" y2="12"/>
              <line x1="4" y1="6" x2="20" y2="6"/>
              <line x1="4" y1="18" x2="20" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Mobile Navigation - Improved layout */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-700 bg-black overflow-hidden"
            >
              <div className="px-3 sm:px-4 py-4 space-y-4">
                {/* Mobile Search Input - Full width */}
                <div className="w-full">
                  <SimpleSearch
                    placeholders={searchPlaceholders}
                    onChange={handleSearchChange}
                    onSubmit={handleSearchSubmit}
                    value={searchQuery}
                    loading={loading}
                  />
                </div>
                
                {/* Mobile Navigation Grid - Better spacing */}
                <div className="grid grid-cols-5 gap-2 sm:gap-3">
                  {navItems.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className={cn(
                        "flex flex-col items-center justify-center py-3 px-2 rounded-xl bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 transition-colors touch-manipulation min-h-[60px]",
                        currentSection === item.section && "ring-2 ring-blue-500 bg-blue-500/10"
                      )}
                      onClick={e => {
                        const el = document.getElementById(item.section);
                        if (el) {
                          e.preventDefault();
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          setMobileOpen(false);
                        } // else, let the browser handle the anchor navigation
                      }}
                    >
                      <div className="h-5 w-5 text-zinc-300 mb-1">{item.icon}</div>
                      <span className="text-xs text-zinc-300 text-center leading-tight">{item.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Search Results Modal */}
      <SearchResults
        query={searchQuery}
        isOpen={showSearchResults}
        onClose={closeSearchResults}
      />
    </>
  );
}

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  active,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "relative flex aspect-square items-center justify-center rounded-full bg-zinc-800 border border-zinc-600 hover:bg-zinc-700 transition-colors",
          active && "ring-2 ring-blue-500"
        )}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit rounded-md border border-zinc-600 bg-zinc-800 px-2 py-0.5 text-xs whitespace-pre text-zinc-200"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
} 