import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import DesktopNav from "./navbar/DesktopNav";
import MobileNav from "./navbar/MobileNav";
import { NavItem } from "./navbar/types";
import { motion, AnimatePresence } from "framer-motion";

const menuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: [0.04, 0.62, 0.23, 0.98],
      when: "afterChildren",
    }
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.4,
      ease: [0.04, 0.62, 0.23, 0.98],
      when: "beforeChildren",
      staggerChildren: 0.05,
    }
  }
};

const itemVariants = {
  closed: { 
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.2
    }
  },
  open: { 
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.04, 0.62, 0.23, 0.98]
    }
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { path: "/services", label: "Services" },
    { path: "/why-choose-us", label: "Why Choose Us" },
    { path: "/insurance-claims", label: "Insurance Claims" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed left-0 right-0 z-40 transition-all duration-500 ${
        isHomePage ? 'top-8' : 'top-0'
      } ${
        isScrolled 
          ? "bg-white/10 backdrop-blur-sm shadow-lg" 
          : isHomePage 
            ? "bg-roofing-charcoal/95" 
            : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center h-20 relative">
          <div className="w-[180px] flex-shrink-0">
            <Link 
              to="/" 
              className="transition-transform duration-500 hover:scale-105 block"
            >
              <img 
                src="/images/logo-new1.png" 
                alt="A Roof Above Logo" 
                className="h-16 w-auto"
              />
            </Link>
          </div>

          <DesktopNav navItems={navItems} currentPath={location.pathname} />

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-roofing-orange text-white hover:bg-roofing-orange-dark transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={isOpen ? { rotate: 45 } : { rotate: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="absolute top-full left-0 right-0 bg-gradient-to-b from-roofing-charcoal/95 to-roofing-charcoal md:hidden backdrop-blur-lg"
              >
                <motion.div 
                  className="px-4 py-4 space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      variants={itemVariants}
                      custom={index}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`
                          block px-4 py-3 rounded-lg text-sm font-medium
                          transform transition-all duration-300
                          hover:translate-x-2
                          ${location.pathname === item.path
                            ? "bg-roofing-orange text-white shadow-lg shadow-roofing-orange/20"
                            : "text-white hover:bg-white/10"
                          }
                        `}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div variants={itemVariants}>
                    <Link
                      to="/estimate"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 rounded-lg text-sm font-medium bg-gradient-to-r from-roofing-orange to-roofing-orange-dark text-white hover:from-roofing-orange-dark hover:to-roofing-orange transform transition-all duration-300 hover:translate-x-2 shadow-lg shadow-roofing-orange/20"
                    >
                      Get Free Estimate
                    </Link>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Link
                      to="/contact"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 rounded-lg text-sm font-medium border border-roofing-orange text-roofing-orange hover:bg-roofing-orange hover:text-white transform transition-all duration-300 hover:translate-x-2"
                    >
                      Contact Us
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;