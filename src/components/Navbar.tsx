import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/21ad76c3-8063-4f80-8f8c-f62f64b10dad.png"
                alt="A Roof Above Logo"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/services" className="text-roofing-charcoal hover:text-roofing-orange transition-colors">
              Services
            </Link>
            <Link to="/why-choose-us" className="text-roofing-charcoal hover:text-roofing-orange transition-colors">
              Why Choose Us
            </Link>
            <Button
              asChild
              variant="outline"
              className="bg-roofing-beige text-roofing-charcoal hover:bg-roofing-orange hover:text-white transition-colors"
            >
              <Link to="/contact">Call Now</Link>
            </Button>
            <Button
              asChild
              className="bg-roofing-orange text-white hover:bg-roofing-orange-dark transition-colors"
            >
              <Link to="/estimate">Schedule Estimate</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-roofing-charcoal hover:text-roofing-orange"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/services"
              className="block px-3 py-2 text-roofing-charcoal hover:text-roofing-orange"
            >
              Services
            </Link>
            <Link
              to="/why-choose-us"
              className="block px-3 py-2 text-roofing-charcoal hover:text-roofing-orange"
            >
              Why Choose Us
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-roofing-charcoal hover:text-roofing-orange"
            >
              Call Now
            </Link>
            <Link
              to="/estimate"
              className="block px-3 py-2 text-roofing-charcoal hover:text-roofing-orange"
            >
              Schedule Estimate
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;