import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { NavItem } from "./types";

interface DesktopNavProps {
  navItems: NavItem[];
  currentPath: string;
}

const DesktopNav = ({ navItems, currentPath }: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center justify-between flex-1 pl-28">
      <div className="flex items-center justify-center space-x-2 flex-1">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant={currentPath === item.path ? "default" : "ghost"}
            className={`${
              currentPath === item.path
                ? "bg-roofing-orange hover:bg-roofing-orange-dark text-white"
                : "bg-roofing-cream/80 text-roofing-charcoal hover:bg-roofing-cream hover:text-roofing-orange"
            } text-sm [text-shadow:_0_1px_1px_rgb(0_0_0_/_40%)] px-2 py-1`}
            asChild
          >
            <Link to={item.path}>{item.label}</Link>
          </Button>
        ))}
      </div>
      <Button
        asChild
        className="bg-roofing-beige hover:bg-roofing-beige/90 text-roofing-charcoal hover:text-roofing-charcoal/90 animate-bounce-pause shadow-lg hover:shadow-xl transition-all duration-300 text-sm [text-shadow:_0_1px_1px_rgb(255_255_255_/_40%)] px-2 py-1 border-2 border-black"
      >
        <Link to="/estimate">Get Estimate Now</Link>
      </Button>
    </div>
  );
};

export default DesktopNav;