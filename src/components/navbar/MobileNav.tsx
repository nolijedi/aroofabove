import Link from "next/link";
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

  const handleDropdownClick = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <motion.div
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={menuVariants}
      className="md:hidden overflow-hidden bg-white fixed inset-x-0 top-[72px] z-50"
    >
      <div className="px-4 py-2 space-y-2 max-h-[calc(100vh-72px)] overflow-y-auto">
        {navItems.map((item) => {
          const isActive = currentPath === item.path ||
            (item.dropdown?.some(dropItem => currentPath === dropItem.path));

          if (item.dropdown) {
            const isDropdownOpen = openDropdown === item.label;
            return (
              <div 
                key={item.label}
                className="relative"
              >
                <button
                  onClick={() => handleDropdownClick(item.label)}
                  className={cn(
                    "flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "bg-roofing-orange text-white hover:bg-roofing-orange/90"
                      : "bg-gray-200/90 text-gray-800 hover:bg-roofing-orange hover:text-white"
                  )}
                  aria-expanded={isDropdownOpen}
                >
                  {item.label}
                  <ChevronDown 
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      isDropdownOpen && "transform rotate-180"
                    )} 
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: isDropdownOpen ? "auto" : 0,
                    opacity: isDropdownOpen ? 1 : 0
                  }}
                  transition={{ duration: 0.2 }}
                  className="pl-4 space-y-1 mt-1 overflow-hidden"
                >
                  {item.dropdown.map((dropItem) => (
                    <Link
                      key={dropItem.path}
                      href={dropItem.path}
                      onClick={() => {
                        setOpenDropdown(null);
                        onClose();
                      }}
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
                </motion.div>
              </div>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.path}
              onClick={onClose}
              className={cn(
                "block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200",
                isActive
                  ? "bg-roofing-orange text-white hover:bg-roofing-orange/90"
                  : "bg-gray-200/90 text-gray-800 hover:bg-roofing-orange hover:text-white"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};

export default MobileNav;
