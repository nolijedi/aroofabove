import { Link } from "react-router-dom";
import { NavItem } from "./types";

interface DesktopNavProps {
  navItems: NavItem[];
  currentPath: string;
}

const DesktopNav = ({ navItems, currentPath }: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center justify-between flex-1 pl-28">
      <div className="flex items-center justify-center space-x-4 flex-1">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path}
            className={`
              px-6 py-2.5 rounded-lg
              text-sm font-medium
              transition-all duration-300
              ${currentPath === item.path 
                ? "bg-roofing-orange text-white hover:bg-roofing-orange-dark"
                : "bg-roofing-cream/90 text-roofing-charcoal hover:bg-roofing-cream"
              }
              border border-transparent hover:border-roofing-orange/20
              shadow-sm hover:shadow-md
            `}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <Link 
          to="/estimate"
          className="
            px-6 py-2.5 rounded-lg
            bg-roofing-orange text-white
            hover:bg-roofing-orange-dark
            shadow-lg hover:shadow-xl
            transition-all duration-300
            text-sm font-medium
            animate-bounce-subtle
            border-2 border-transparent
          "
        >
          Get Free Estimate
        </Link>
        <Link 
          to="/contact"
          className="
            px-6 py-2.5 rounded-lg
            border-2 border-roofing-orange
            text-roofing-orange
            hover:bg-roofing-orange hover:text-white
            transition-all duration-300
            text-sm font-medium
          "
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default DesktopNav;