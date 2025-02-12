import { Link } from "react-router-dom";
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

const SimpleMobileNav = ({ isOpen, navItems, currentPath, onClose }: MobileNavProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-x-0 top-[72px] bg-white shadow-lg z-50">
      <div className="px-4 py-2 space-y-2">
        {navItems.map((item) => {
          if (item.dropdown) {
            const isOpen = openDropdown === item.label;
            return (
              <div key={item.label}>
                <button
                  onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                  className="w-full text-left px-4 py-2 flex items-center justify-between bg-gray-100 rounded"
                >
                  <span>{item.label}</span>
                  <ChevronDown className={isOpen ? "rotate-180 transform" : ""} />
                </button>
                {isOpen && (
                  <div className="pl-8 mt-2 space-y-2">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        onClick={onClose}
                        className="block py-2"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className="block px-4 py-2 bg-gray-100 rounded"
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SimpleMobileNav;
