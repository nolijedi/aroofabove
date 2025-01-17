import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import DesktopNav from "./navbar/DesktopNav";
import MobileNav from "./navbar/MobileNav";
import { NavItem } from "./navbar/types";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { path: "/services", label: "Services" },
    { path: "/why-choose-us", label: "Why Choose Us" },
    { path: "/insurance-claims", label: "Insurance Claims" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/10 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center min-h-[80px]">
          <Link 
            to="/" 
            className="flex items-center justify-center flex-1 transition-transform duration-300 hover:scale-105 hover:rotate-2"
          >
            <img 
              src="/lovable-uploads/c03dc4bd-7520-4829-aa3d-9b436d3d547c.png" 
              alt="A Roof Above Logo" 
              className="h-24 md:h-28 w-auto"
            />
          </Link>

          <DesktopNav navItems={navItems} currentPath={location.pathname} />

          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <MobileNav 
          isOpen={isOpen}
          navItems={navItems}
          currentPath={location.pathname}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </nav>
  );
};

export default Navbar;