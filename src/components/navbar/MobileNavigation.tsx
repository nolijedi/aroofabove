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

const MobileNavigation = ({ isOpen, navItems, currentPath, onClose }: MobileNavProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownClick = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <div className={cn(
      "md:hidden fixed inset-x-0 top-[72px] bg-white/95 backdrop-blur-sm transition-all duration-300 ease-in-out z-50",
      isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
    )}>
      <div className="px-4 py-2 space-y-2 max-h-[calc(100vh-72px)] overflow-y-auto">
        {navItems.map((item) => {
          const isActive = currentPath === item.path ||
            (item.dropdown?.some(dropItem => currentPath === dropItem.path));

          if (item.dropdown) {
            const isDropdownOpen = openDropdown === item.label;
            return (
              <div key={item.label} className="relative">
                <button
                  onClick={() => handleDropdownClick(item.label)}
                  className={cn(
                    "flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "bg-roofing-orange text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-roofing-orange hover:text-white"
                  )}
                  aria-expanded={isDropdownOpen}
                >
                  {item.label}
                  <ChevronDown 
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      isDropdownOpen && "rotate-180"
                    )} 
                  />
                </button>
                <div
                  className={cn(
                    "pl-4 mt-1 overflow-hidden transition-all duration-200 ease-in-out",
                    isDropdownOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  )}
                  style={{
                    visibility: isDropdownOpen ? 'visible' : 'hidden'
                  }}
                >
                  {item.dropdown.map((dropItem) => (
                    <Link
                      key={dropItem.path}
                      to={dropItem.path}
                      onClick={() => {
                        onClose();
                        setOpenDropdown(null);
                      }}
                      className={cn(
                        "flex items-center px-4 py-2 my-1 rounded-lg text-sm font-medium transition-colors duration-200",
                        currentPath === dropItem.path
                          ? "bg-roofing-orange text-white"
                          : "bg-gray-50 text-gray-800 hover:bg-roofing-orange hover:text-white"
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
                isActive
                  ? "bg-roofing-orange text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-roofing-orange hover:text-white"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavigation;
