import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { NavItem } from "./types";

interface MobileNavProps {
  isOpen: boolean;
  navItems: NavItem[];
  currentPath: string;
  onClose: () => void;
}

const MobileNav = ({ isOpen, navItems, currentPath, onClose }: MobileNavProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden pb-2 px-2">
      {navItems.map((item) => (
        <Button
          key={item.path}
          variant={currentPath === item.path ? "default" : "ghost"}
          className={`w-full mt-1.5 justify-start text-sm ${
            currentPath === item.path
              ? "bg-roofing-orange hover:bg-roofing-orange-dark text-white"
              : "bg-roofing-cream/80 text-roofing-charcoal hover:bg-roofing-cream hover:text-roofing-orange"
          } min-h-[2.5rem] touch-manipulation`}
          asChild
        >
          <Link to={item.path} onClick={onClose}>
            {item.label}
          </Link>
        </Button>
      ))}
      <Button
        asChild
        className="w-full mt-3 bg-roofing-beige hover:bg-roofing-beige/90 text-roofing-charcoal hover:text-roofing-charcoal/90 animate-bounce-pause shadow-lg hover:shadow-xl transition-all duration-300 text-sm min-h-[2.75rem] touch-manipulation"
      >
        <Link to="/estimate" onClick={onClose}>
          Get Estimate Now
        </Link>
      </Button>
    </div>
  );
};

export default MobileNav;