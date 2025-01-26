import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { NavItem } from "./types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  navItems: NavItem[];
  currentPath: string;
  onClose: () => void;
}

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

const MobileNav = ({ isOpen, navItems, currentPath, onClose }: MobileNavProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownClick = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <motion.div
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={menuVariants}
      className="md:hidden overflow-hidden bg-white"
    >
      <div className="px-4 py-2 space-y-2">
        {navItems.map((item, index) => {
          const isActive = currentPath === item.path ||
            (item.dropdown?.some(dropItem => currentPath === dropItem.path));

          if (item.dropdown) {
            return (
              <div key={item.label}>
                <button
                  onClick={() => handleDropdownClick(item.label)}
                  className={cn(
                    "flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium",
                    isActive
                      ? "bg-roofing-orange text-white"
                      : "bg-gray-200/90 text-gray-800"
                  )}
                >
                  {item.label}
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform",
                    openDropdown === item.label && "transform rotate-180"
                  )} />
                </button>
                <motion.div
                  initial="closed"
                  animate={openDropdown === item.label ? "open" : "closed"}
                  variants={menuVariants}
                  className="pl-4 space-y-1 mt-1"
                >
                  {item.dropdown.map((dropItem) => (
                    <Link
                      key={dropItem.path}
                      to={dropItem.path}
                      onClick={onClose}
                      className={cn(
                        "flex items-center px-4 py-2 rounded-lg text-sm font-medium",
                        currentPath === dropItem.path
                          ? "bg-roofing-orange text-white"
                          : "bg-gray-100 text-gray-800"
                      )}
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                      {dropItem.label}
                    </Link>
                  ))}
                </motion.div>
              </div>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={cn(
                "block px-4 py-2.5 rounded-lg text-sm font-medium",
                isActive
                  ? "bg-roofing-orange text-white"
                  : "bg-gray-200/90 text-gray-800"
              )}
            >
              {item.label}
            </Link>
          );
        })}
        <Link
          to="/estimate"
          onClick={onClose}
          className="block px-4 py-2.5 rounded-lg text-sm font-medium bg-roofing-orange text-white"
        >
          Get Free Estimate
        </Link>
        <Link
          to="/contact"
          onClick={onClose}
          className="block px-4 py-2.5 rounded-lg text-sm font-medium border border-roofing-orange text-roofing-orange"
        >
          Contact Us
        </Link>
      </div>
    </motion.div>
  );
};

export default MobileNav;