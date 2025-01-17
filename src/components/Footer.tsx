import { Link } from "react-router-dom";
import { Mail, Phone, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-roofing-charcoal py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="block mb-4">
              <img
                src="/lovable-uploads/c03dc4bd-7520-4829-aa3d-9b436d3d547c.png"
                alt="A Roof Above Logo"
                className="h-12 w-auto brightness-200"
              />
            </Link>
          </div>

          {/* Contact Information with Social Links */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-lg font-semibold text-white mb-2">Contact Us</h3>
            <div className="space-y-3">
              <a
                href="tel:509-400-5911"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group"
              >
                <Phone className="w-5 h-5 group-hover:text-roofing-orange transition-colors" />
                <span>(509) 400-5911</span>
              </a>
              <a
                href="mailto:jc@aroofabove.com"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group"
              >
                <Mail className="w-5 h-5 group-hover:text-roofing-orange transition-colors" />
                <span>jc@aroofabove.com</span>
              </a>
            </div>
            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              {[
                { Icon: Facebook, href: "https://facebook.com/aroofabove", label: "Facebook" },
                { Icon: Instagram, href: "https://instagram.com/aroofabove", label: "Instagram" },
                { Icon: Twitter, href: "https://twitter.com/aroofabove", label: "Twitter" },
                { Icon: Youtube, href: "https://youtube.com/@aroofabove", label: "YouTube" }
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors group"
                >
                  <Icon className="w-4 h-4 text-gray-300 group-hover:text-roofing-orange transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                Services
              </Link>
              <Link to="/why-choose-us" className="text-gray-300 hover:text-white transition-colors">
                Why Choose Us
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
              <Link to="/estimate" className="text-gray-300 hover:text-white transition-colors">
                Get Estimate
              </Link>
              <Link to="/insurance-claims" className="text-gray-300 hover:text-white transition-colors">
                Insurance Claims
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-white/10">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} A Roof Above. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;