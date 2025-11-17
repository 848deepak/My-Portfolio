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
  { title: "Home", icon: <IconHome size={20} />, href: "/", section: "hero" },
  { title: "About", icon: <IconUser size={20} />, href: "/about", section: "about" },
  { title: "Projects", icon: <IconBriefcase size={20} />, href: "/projects", section: "projects" },
  { title: "Experience", icon: <IconBook size={20} />, href: "/experience", section: "experience" },
  { title: "Contact", icon: <IconMail size={20} />, href: "/contact", section: "contact" },
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

  // Determine current section based on pathname
  const getCurrentSection = () => {
    if (pathname === '/') return 'hero';
    if (pathname === '/about') return 'about';
    if (pathname === '/projects') return 'projects';
    if (pathname === '/experience') return 'experience';
    if (pathname === '/contact') return 'contact';
    return currentSection || 'hero';
  };

  const activeSection = getCurrentSection();

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

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16 sm:h-18 lg:h-20">
          {/* Logo - Better mobile sizing */}
          <Link href="/" className="flex items-center space-x-2 cursor-pointer mr-4 flex-shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-extrabold text-base sm:text-lg lg:text-xl">D</span>
            </div>
            <span className="font-bold text-lg sm:text-xl lg:text-2xl text-white hidden sm:block">
              Deepak Pandey
            </span>
            <span className="font-bold text-base text-white sm:hidden">
              Deepak
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
              <Link key={item.title} href={item.href}>
                <IconContainer
                  mouseX={mouseX}
                  {...item}
                  active={activeSection === item.section}
                />
              </Link>
            ))}
          </motion.div>

          {/* Mobile Menu Button - Better touch target */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-3 text-gray-300 hover:text-white transition-colors duration-200 ml-auto touch-manipulation relative"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            <motion.div
              animate={mobileOpen ? "open" : "closed"}
              className="w-6 h-6 flex flex-col justify-center items-center"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 6 }
                }}
                className="w-6 h-0.5 bg-current block absolute transition-all duration-300"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                className="w-6 h-0.5 bg-current block absolute transition-all duration-300"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6 }
                }}
                className="w-6 h-0.5 bg-current block absolute transition-all duration-300"
              />
            </motion.div>
          </button>
        </div>

        {/* Mobile Navigation - Enhanced layout */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden border-t border-gray-700 bg-black/95 backdrop-blur-sm overflow-hidden"
            >
              <div className="px-4 py-6 space-y-6">
                {/* Mobile Search Input - Improved styling */}
                <div className="w-full">
                  <SimpleSearch
                    placeholders={searchPlaceholders}
                    onChange={handleSearchChange}
                    onSubmit={handleSearchSubmit}
                    value={searchQuery}
                    loading={loading}
                  />
                </div>
                
                {/* Mobile Navigation - Improved grid layout */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "flex flex-col items-center justify-center py-4 px-3 rounded-xl bg-zinc-800/50 border border-zinc-700 hover:bg-zinc-700/50 active:bg-zinc-600/50 transition-all duration-200 touch-manipulation min-h-[70px] group w-full",
                          activeSection === item.section && "ring-2 ring-blue-500 bg-blue-500/10 border-blue-500/30"
                        )}
                        onClick={() => setMobileOpen(false)}
                      >
                        <div className="h-6 w-6 text-zinc-300 group-hover:text-white mb-2 transition-colors">
                          {item.icon}
                        </div>
                        <span className="text-xs text-zinc-300 group-hover:text-white text-center leading-tight transition-colors font-medium">
                          {item.title}
                        </span>
                      </Link>
                    </motion.div>
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
  active,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
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
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex aspect-square items-center justify-center rounded-full bg-zinc-800 border border-zinc-600 hover:bg-zinc-700 transition-colors cursor-pointer",
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
  );
} 