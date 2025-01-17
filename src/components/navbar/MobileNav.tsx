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
    <div className="md:hidden pb-6">
      {navItems.map((item) => (
        <Button
          key={item.path}
          variant={currentPath === item.path ? "default" : "ghost"}
          className={`w-full mt-2 justify-start text-lg ${
            currentPath === item.path
              ? "bg-roofing-orange hover:bg-roofing-orange-dark text-white"
              : "bg-roofing-cream/80 text-roofing-charcoal hover:bg-roofing-cream hover:text-roofing-orange"
          } [text-shadow:_0_1px_1px_rgb(0_0_0_/_40%)]`}
          asChild
        >
          <Link to={item.path} onClick={onClose}>
            {item.label}
          </Link>
        </Button>
      ))}
      <Button
        asChild
        className="w-full mt-4 bg-roofing-beige hover:bg-roofing-beige/90 text-roofing-charcoal hover:text-roofing-charcoal/90 animate-bounce-pause shadow-lg hover:shadow-xl transition-all duration-300 text-lg [text-shadow:_0_1px_1px_rgb(255_255_255_/_40%)]"
      >
        <Link to="/estimate" onClick={onClose}>
          Get Estimate
        </Link>
      </Button>
    </div>
  );
};

export default MobileNav;