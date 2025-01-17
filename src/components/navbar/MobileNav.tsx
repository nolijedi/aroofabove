import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
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
          className={`w-full mt-2 justify-start ${
            currentPath === item.path
              ? "bg-roofing-orange hover:bg-roofing-orange-dark text-white"
              : "text-gray-600 hover:text-roofing-orange hover:bg-transparent"
          }`}
          asChild
        >
          <Link to={item.path} onClick={onClose}>
            {item.label}
          </Link>
        </Button>
      ))}
      <Button
        asChild
        className="w-full mt-4 bg-roofing-beige hover:bg-roofing-beige/90 text-roofing-charcoal hover:text-roofing-charcoal/90 animate-bounce-pause shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Link to="/estimate" onClick={onClose}>
          Get Estimate
        </Link>
      </Button>
      <Button
        asChild
        variant="outline"
        className="w-full mt-2 border-roofing-orange text-roofing-orange hover:bg-roofing-orange hover:text-white"
      >
        <a href="tel:509-400-5911" className="flex items-center justify-center gap-2">
          <Phone className="h-4 w-4" />
          Call Now
        </a>
      </Button>
    </div>
  );
};

export default MobileNav;