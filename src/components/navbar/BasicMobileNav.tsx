import { Link } from "react-router-dom";
import { NavItem } from "./types";
import { useState } from "react";

interface MobileNavProps {
  isOpen: boolean;
  navItems: NavItem[];
  currentPath: string;
  onClose: () => void;
}

export default function BasicMobileNav({ isOpen, navItems, currentPath, onClose }: MobileNavProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 top-[72px] bg-white shadow-lg z-50 md:hidden">
      <nav className="flex flex-col p-4 space-y-4">
        {navItems.map((item) => (
          <div key={item.path}>
            {item.dropdown ? (
              <>
                <button
                  className="w-full text-left p-3 bg-gray-100 rounded-lg flex justify-between items-center"
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                >
                  <span>{item.label}</span>
                  <span>{openDropdown === item.label ? '▼' : '▶'}</span>
                </button>
                {openDropdown === item.label && (
                  <div className="ml-4 mt-2 space-y-2 border-l-2 border-gray-200 pl-4">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className="block p-2 hover:bg-gray-100 rounded"
                        onClick={onClose}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className="block p-3 bg-gray-100 rounded-lg"
                onClick={onClose}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
