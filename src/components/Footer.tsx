import { Link } from "react-router-dom";
import { Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-roofing-orange to-roofing-cream/60 py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between">
        {/* Logo and Contact Section */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center">
            <img
              src="/lovable-uploads/fd5a3cc1-2b16-447c-af38-861d41a95aba.png"
              alt="A Roof Above Logo"
              className="h-16 w-auto"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-roofing-charcoal hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/services" className="text-roofing-charcoal hover:text-white transition-colors">
            Services
          </Link>
          <Link to="/contact" className="text-roofing-charcoal hover:text-white transition-colors">
            Contact
          </Link>
          <Link to="/privacy-policy" className="text-roofing-charcoal hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="text-roofing-charcoal hover:text-white transition-colors">
            Terms of Service
          </Link>
        </nav>

        {/* Contact and Social Links */}
        <div className="flex items-center space-x-6">
          <a 
            href="tel:509-400-5911"
            className="text-roofing-charcoal hover:text-white transition-colors flex items-center gap-2"
          >
            <Phone className="h-5 w-5" />
            <span>(509) 400-5911</span>
          </a>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-4">
            {[
              { Icon: Facebook, href: "https://facebook.com/aroofabove", label: "Facebook" },
              { Icon: Instagram, href: "https://instagram.com/aroofabove", label: "Instagram" },
              { Icon: Twitter, href: "https://twitter.com/aroofabove", label: "Twitter" },
              { Icon: Youtube, href: "https://youtube.com/@aroofabove", label: "YouTube" }
            ].map(({ Icon, href, label }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-roofing-charcoal hover:text-white transition-colors"
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;