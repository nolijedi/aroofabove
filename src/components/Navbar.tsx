import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

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

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/why-choose-us", label: "Why Choose Us" },
    { path: "/insurance-claims", label: "Insurance Claims" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/af60ca2a-df55-411d-a43a-1513bf62deb9.png" 
              alt="A Roof Above Logo" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "default" : "ghost"}
                className={`${
                  location.pathname === item.path
                    ? "bg-roofing-orange hover:bg-roofing-orange-dark text-white"
                    : "text-gray-600 hover:text-roofing-orange hover:bg-transparent"
                }`}
                asChild
              >
                <Link to={item.path}>{item.label}</Link>
              </Button>
            ))}
            <Button
              asChild
              className="bg-roofing-orange hover:bg-roofing-orange-dark text-white"
            >
              <Link to="/estimate">Get Estimate</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-roofing-orange text-roofing-orange hover:bg-roofing-orange hover:text-white"
            >
              <a href="tel:509-400-5911" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-6">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "default" : "ghost"}
                className={`w-full mt-2 justify-start ${
                  location.pathname === item.path
                    ? "bg-roofing-orange hover:bg-roofing-orange-dark text-white"
                    : "text-gray-600 hover:text-roofing-orange hover:bg-transparent"
                }`}
                asChild
              >
                <Link to={item.path} onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              </Button>
            ))}
            <Button
              asChild
              className="w-full mt-4 bg-roofing-orange hover:bg-roofing-orange-dark text-white"
            >
              <Link to="/estimate" onClick={() => setIsOpen(false)}>
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
        )}
      </div>
    </nav>
  );
};

export default Navbar;