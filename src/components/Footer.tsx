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
        { 
          to: "#",
          label: "Privacy Policy",
          onClick: (e: React.MouseEvent) => {
            e.preventDefault();
            setPrivacyOpen(true);
          }
        },
        { 
          to: "#",
          label: "Terms of Service",
          onClick: (e: React.MouseEvent) => {
            e.preventDefault();
            setTermsOpen(true);
          }
        },
      ]
    }
  ];

  return (
    <>
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
                Your trusted partner in roofing excellence. Providing quality roofing solutions since 1995.
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
                        onClick={link.onClick}
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
                    className="p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay }}
                    whileHover={{ scale: 1.1 }}
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 text-roofing-charcoal" />
                  </motion.a>
                ))}
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