import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { NavItem } from "./types";
import { motion, AnimatePresence } from "framer-motion";

interface MobileNavProps {
  isOpen: boolean;
  navItems: NavItem[];
  currentPath: string;
  onClose: () => void;
}

const MobileNav = ({ isOpen, navItems, currentPath, onClose }: MobileNavProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: 1, 
            height: "auto",
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 15
            }
          }}
          exit={{ 
            opacity: 0, 
            height: 0,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 35
            }
          }}
          className="md:hidden pb-2 bg-roofing-charcoal/50 backdrop-blur-sm shadow-2xl rounded-b-xl overflow-hidden"
        >
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: {
                transition: { staggerChildren: 0.1, delayChildren: 0.2 }
              },
              closed: {
                transition: { staggerChildren: 0.05, staggerDirection: -1 }
              }
            }}
            className="px-4 py-2 space-y-2"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                variants={{
                  open: {
                    x: 0,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }
                  },
                  closed: {
                    x: -50,
                    opacity: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 35
                    }
                  }
                }}
                className="flex justify-center"
              >
                <Button
                  variant={currentPath === item.path ? "default" : "ghost"}
                  className={`w-[90%] justify-center text-sm font-medium transform transition-all duration-300 hover:scale-105 ${
                    currentPath === item.path
                      ? "bg-roofing-orange hover:bg-roofing-orange-dark text-white"
                      : "bg-transparent text-white hover:bg-roofing-orange/20 hover:text-roofing-orange"
                  }`}
                  asChild
                >
                  <Link to={item.path} onClick={onClose}>
                    {item.label}
                  </Link>
                </Button>
              </motion.div>
            ))}
            <motion.div
              variants={{
                open: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: 0.3
                  }
                },
                closed: {
                  y: 20,
                  opacity: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 35
                  }
                }
              }}
              className="flex justify-center pt-2"
            >
              <Button
                asChild
                className="w-[90%] bg-roofing-orange hover:bg-roofing-orange-dark text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm font-bold rounded-lg"
              >
                <Link to="/estimate" onClick={onClose}>
                  Get Estimate Now
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;