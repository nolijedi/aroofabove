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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden pb-2 bg-roofing-charcoal/50 backdrop-blur-sm shadow-2xl rounded-b-xl"
        >
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-center"
              >
                <Button
                  variant={currentPath === item.path ? "default" : "ghost"}
                  className={`w-[90%] justify-center text-sm font-medium ${
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.1 }}
              className="flex justify-center pt-2"
            >
              <Button
                asChild
                className="w-[90%] bg-roofing-orange hover:bg-roofing-orange-dark text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-bold rounded-lg"
              >
                <Link to="/estimate" onClick={onClose}>
                  Get Estimate Now
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;