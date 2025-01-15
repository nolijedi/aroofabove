import { useState, useEffect } from "react";
import { Menu, X, Phone, CalendarCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const linkVariants = {
    hover: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 300 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-sm shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0 flex items-center"
          >
            <Link to="/" className="flex items-center group">
              <motion.img
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                src="/lovable-uploads/c14c4941-34e9-4747-840a-167e0fe92c76.png"
                alt="A Roof Above Logo"
                className="h-20 w-auto transition-transform duration-200"
              />
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {[
              { path: "/services", label: "Services" },
              { path: "/why-choose-us", label: "Why Choose Us" },
            ].map((item) => (
              <motion.div
                key={item.path}
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  asChild
                  className="bg-roofing-orange text-white hover:bg-roofing-orange-dark transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Link to={item.path}>
                    {item.label}
                  </Link>
                </Button>
              </motion.div>
            ))}
            <motion.div 
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                asChild
                variant="outline"
                className="bg-roofing-beige text-roofing-charcoal hover:bg-roofing-orange hover:text-white transition-all duration-300 group"
              >
                <Link to="/contact" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Call Now
                </Link>
              </Button>
            </motion.div>
            <motion.div 
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                asChild
                className="bg-roofing-orange text-white hover:bg-roofing-orange-dark transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <Link to="/estimate" className="flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Schedule Estimate
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.div 
            className="md:hidden flex items-center"
            variants={linkVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-roofing-charcoal hover:text-roofing-orange transition-colors p-2 rounded-lg"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {[
                { path: "/services", label: "Services" },
                { path: "/why-choose-us", label: "Why Choose Us" },
                { path: "/contact", label: "Call Now", icon: Phone },
                { path: "/estimate", label: "Schedule Estimate", icon: CalendarCheck },
              ].map((item) => (
                <motion.div
                  key={item.path}
                  variants={linkVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full"
                >
                  <Link
                    to={item.path}
                    className="flex items-center gap-2 px-4 py-3 text-roofing-charcoal hover:text-roofing-orange hover:bg-roofing-beige/50 rounded-lg transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;