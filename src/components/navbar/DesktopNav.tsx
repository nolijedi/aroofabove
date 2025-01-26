import { Link } from "react-router-dom";
import { NavItem } from "./types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface DesktopNavProps {
  navItems: NavItem[];
  currentPath: string;
}

const buttonBaseStyles = "px-3 py-2 rounded-lg text-sm font-medium text-center whitespace-nowrap";
const dropdownStyles = "absolute top-[calc(100%-4px)] left-0 w-[200px] bg-white rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200";
const dropdownItemStyles = "px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-roofing-orange hover:text-white transition-colors duration-200 block w-full text-left";

const DesktopNav = ({ navItems, currentPath }: DesktopNavProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="hidden md:flex items-center justify-end flex-1 gap-1.5 lg:gap-2 pr-4">
      {navItems.map((item) => {
        const isActive = currentPath === item.path || 
          (item.dropdown?.some(dropItem => currentPath === dropItem.path));

        if (item.dropdown) {
          return (
            <div 
              key={item.label} 
              className="relative group" 
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className={cn(
                  buttonBaseStyles,
                  "flex items-center justify-center gap-1 min-w-[120px] group-hover:bg-gray-300/90 transition-colors duration-200",
                  isActive
                    ? "bg-roofing-orange text-white"
                    : "bg-gray-200/90 text-gray-800"
                )}
              >
                {item.label}
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  openDropdown === item.label && "transform rotate-180"
                )} />
              </button>
              <div className="absolute top-full left-0 h-2 w-full" />
              <div 
                className={cn(
                  dropdownStyles,
                  "transition-opacity duration-200",
                  openDropdown === item.label ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
              >
                {item.dropdown.map((dropItem) => (
                  <Link
                    key={dropItem.path}
                    to={dropItem.path}
                    className={cn(
                      dropdownItemStyles,
                      currentPath === dropItem.path && "bg-gray-100"
                    )}
                  >
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
            className={cn(
              buttonBaseStyles,
              "min-w-[120px]",
              isActive
                ? "bg-roofing-orange text-white"
                : "bg-gray-200/90 text-gray-800 hover:bg-gray-300/90"
            )}
          >
            {item.label}
          </Link>
        );
      })}
      <Link
        to="/estimate"
        className={cn(
          buttonBaseStyles,
          "bg-roofing-orange text-white",
          "hover:bg-roofing-orange-dark",
          "min-w-[120px]"
        )}
      >
        Get Free Estimate
      </Link>
      <Link
        to="/contact"
        className={cn(
          buttonBaseStyles,
          "border border-roofing-orange text-roofing-orange",
          "hover:bg-roofing-orange hover:text-white",
          "min-w-[120px]"
        )}
      >
        Contact Us
      </Link>
    </div>
  );
};

export default DesktopNav;