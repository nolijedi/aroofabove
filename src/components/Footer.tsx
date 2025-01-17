import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useState } from "react";
import { PrivacyPolicy } from "./legal/PrivacyPolicy";
import { TermsOfService } from "./legal/TermsOfService";

export const Footer = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const socialLinks = [
    { Icon: Facebook, href: "https://facebook.com", label: "Facebook", delay: 0.1 },
    { Icon: Twitter, href: "https://twitter.com", label: "Twitter", delay: 0.2 },
    { Icon: Instagram, href: "https://instagram.com", label: "Instagram", delay: 0.3 },
    { Icon: Youtube, href: "https://youtube.com", label: "YouTube", delay: 0.4 }
  ];

  return (
    <>
      <footer className="bg-gradient-to-r from-roofing-orange/90 to-roofing-cream/90 backdrop-blur-sm mt-20 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo and Social Links Section */}
            <div className="flex items-center gap-8 w-full md:w-auto justify-center md:justify-start">
              <Link to="/" className="shrink-0">
                <img 
                  src="/lovable-uploads/c03dc4bd-7520-4829-aa3d-9b436d3d547c.png" 
                  alt="RoofVision Logo" 
                  className="h-12 w-auto"
                />
              </Link>
              <div className="flex gap-4">
                {socialLinks.map(({ Icon, href, label, delay }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay }}
                    whileHover={{ scale: 1.1 }}
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4 text-roofing-charcoal" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links and Contact */}
            <div className="flex flex-wrap justify-center md:justify-end gap-8 text-sm text-roofing-charcoal/80">
              <div className="flex gap-4">
                <Link to="/" className="hover:text-roofing-orange transition-colors">Home</Link>
                <Link to="/services" className="hover:text-roofing-orange transition-colors">Services</Link>
                <Link to="/contact" className="hover:text-roofing-orange transition-colors">Contact</Link>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setPrivacyOpen(true)}
                  className="hover:text-roofing-orange transition-colors"
                >
                  Privacy Policy
                </button>
                <button 
                  onClick={() => setTermsOpen(true)}
                  className="hover:text-roofing-orange transition-colors"
                >
                  Terms of Service
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:(123) 456-7890" className="hover:text-roofing-orange transition-colors">
                  (123) 456-7890
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <PrivacyPolicy open={privacyOpen} onOpenChange={setPrivacyOpen} />
      <TermsOfService open={termsOpen} onOpenChange={setTermsOpen} />
    </>
  );
};