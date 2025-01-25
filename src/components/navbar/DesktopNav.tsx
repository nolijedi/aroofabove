import { Link } from "react-router-dom";
import { NavItem } from "./types";
import { cn } from "@/lib/utils";

interface DesktopNavProps {
  navItems: NavItem[];
  currentPath: string;
}

const buttonBaseStyles = "px-4 py-2.5 rounded-lg text-sm font-medium w-[130px] text-center whitespace-nowrap";

const DesktopNav = ({ navItems, currentPath }: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center justify-end flex-1 gap-2 pr-2">
      {navItems.map((item) => {
        const isActive = currentPath === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              buttonBaseStyles,
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
          "hover:bg-roofing-orange-dark"
        )}
      >
        Get Free Estimate
      </Link>
      <Link
        to="/contact"
        className={cn(
          buttonBaseStyles,
          "border border-roofing-orange text-roofing-orange",
          "hover:bg-roofing-orange hover:text-white"
        )}
      >
        Contact Us
      </Link>
    </div>
  );
};

export default DesktopNav;