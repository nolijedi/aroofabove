import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    { Icon: Facebook, href: "https://facebook.com", label: "Facebook", delay: 0 },
    { Icon: Twitter, href: "https://twitter.com", label: "Twitter", delay: 0.1 },
    { Icon: Instagram, href: "https://instagram.com", label: "Instagram", delay: 0.2 },
    { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", delay: 0.3 },
    { Icon: Youtube, href: "https://youtube.com", label: "YouTube", delay: 0.4 }
  ];

  const siteMap = [
    {
      title: "Main Pages",
      links: [
        { to: "/", label: "Home" },
        { to: "/services", label: "Services" },
        { to: "/why-choose-us", label: "Why Choose Us" },
        { to: "/contact", label: "Contact" },
      ]
    },
    {
      title: "Services",
      links: [
        { to: "/estimate", label: "Get Estimate" },
        { to: "/insurance-claims", label: "Insurance Claims" },
      ]
    },
    {
      title: "Legal",
      links: [
        { to: "/privacy", label: "Privacy Policy" },
        { to: "/terms", label: "Terms of Service" },
      ]
    }
  ];

  return (
    <footer className="bg-gradient-to-r from-roofing-orange/90 to-roofing-cream/90 backdrop-blur-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Company Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img 
                src="/lovable-uploads/c03dc4bd-7520-4829-aa3d-9b436d3d547c.png" 
                alt="RoofVision Logo" 
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-roofing-charcoal/80">
              Your trusted partner in roofing excellence. Providing quality roofing solutions since 2010.
            </p>
          </div>

          {/* Site Map */}
          {siteMap.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl font-semibold text-roofing-charcoal">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.to}
                      className="text-roofing-charcoal/80 hover:text-roofing-orange transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact and Social */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-roofing-charcoal">Connect With Us</h3>
            <div className="space-y-2 text-roofing-charcoal/80">
              <p>📞 (123) 456-7890</p>
              <p>✉️ info@roofabove.com</p>
              <p>📍 123 Roofing St, Dallas, TX</p>
            </div>
            <div className="flex gap-4 pt-4">
              {socialLinks.map(({ Icon, href, label, delay }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360,
                    transition: { duration: 0.5 }
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: delay
                  }}
                  className="p-2 bg-gradient-to-br from-roofing-beige to-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Icon className="w-6 h-6 text-roofing-orange group-hover:text-roofing-orange-dark transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-roofing-orange/20 text-center text-roofing-charcoal/60">
          <p>&copy; {new Date().getFullYear()} RoofVision. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;