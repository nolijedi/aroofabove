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
    }
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.4,
      ease: [0.04, 0.62, 0.23, 0.98],
    }
  }
};

const MobileNav = ({ isOpen, navItems, currentPath, onClose }: MobileNavProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoverDropdown, setHoverDropdown] = useState<string | null>(null);

  const handleDropdownClick = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleDropdownHover = (label: string | null) => {
    setHoverDropdown(label);
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
            const isDropdownOpen = openDropdown === item.label || hoverDropdown === item.label;
            return (
              <div 
                key={item.label}
                className="relative"
                onMouseEnter={() => handleDropdownHover(item.label)}
                onMouseLeave={() => handleDropdownHover(null)}
              >
                <button
                  onClick={() => handleDropdownClick(item.label)}
                  className={cn(
                    "flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "bg-roofing-orange text-white hover:bg-roofing-orange/90"
                      : "bg-gray-200/90 text-gray-800 hover:bg-roofing-orange hover:text-white"
                  )}
                >
                  {item.label}
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform",
                    isDropdownOpen && "transform rotate-180"
                  )} />
                </button>
                <div
                  className={cn(
                    "pl-4 space-y-1 mt-1 overflow-hidden transition-all duration-200",
                    isDropdownOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  {item.dropdown.map((dropItem) => (
                    <Link
                      key={dropItem.path}
                      to={dropItem.path}
                      onClick={onClose}
                      className={cn(
                        "flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                        currentPath === dropItem.path
                          ? "bg-roofing-orange text-white hover:bg-roofing-orange/90"
                          : "bg-gray-100 text-gray-800 hover:bg-roofing-orange hover:text-white"
                      )}
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                      {dropItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={cn(
                "block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200",
                currentPath === item.path
                  ? "bg-roofing-orange text-white hover:bg-roofing-orange/90"
                  : "bg-gray-200/90 text-gray-800 hover:bg-roofing-orange hover:text-white"
              )}
            >
              {item.label}
            </Link>
          );
        })}
        <Link
          to="/estimate"
          onClick={onClose}
          className="block px-4 py-2.5 rounded-lg text-sm font-medium bg-roofing-orange text-white hover:bg-roofing-orange/90 transition-colors duration-200"
        >
          Get Free Estimate
        </Link>
        <Link
          to="/contact"
          onClick={onClose}
          className="block px-4 py-2.5 rounded-lg text-sm font-medium border border-roofing-orange text-roofing-orange hover:bg-roofing-orange hover:text-white transition-colors duration-200"
        >
          Contact Us
        </Link>
      </div>
    </motion.div>
  );
};

export default MobileNav;