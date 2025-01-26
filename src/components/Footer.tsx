import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const siteMapLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/why-choose-us", label: "Why Choose Us" },
    { to: "/insurance-claims", label: "Insurance Claims" },
    { to: "/financing", label: "Financing" },
    { to: "/faq", label: "FAQ" },
    { to: "/product", label: "Products" },
    { to: "/careers", label: "Careers" },
    { to: "/estimate", label: "Get Estimate" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-black">
      {/* Sitemap Links */}
      <div className="max-w-7xl mx-auto px-4 py-4 border-b border-white/10">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {siteMapLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-gray-300 hover:text-roofing-orange transition-colors text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 relative">
          {/* Social Media Links */}
          <div className="flex items-center justify-center w-full md:w-auto space-x-6 md:space-x-4">
            {[
              { Icon: Facebook, href: "https://www.facebook.com/aroofabovellc/", color: "#1877F2" },
              { Icon: Instagram, href: "https://instagram.com/a_roof_above_llc", color: "#E4405F" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/aroofabove/", color: "#0A66C2" }
            ].map(({ Icon, href, color }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
              >
                <Icon className="w-6 h-6 md:w-8 md:h-8" style={{ color }} />
              </a>
            ))}
          </div>

          {/* White Separator - Hidden on mobile */}
          <div className="hidden md:block w-px h-20 bg-white/20 absolute left-1/3 top-1/2 -translate-y-1/2" />

          {/* Contact Information */}
          <div className="text-white text-center w-full md:pl-40">
              <p className="text-sm mb-1 md:mb-2">
                <span className="font-medium">Phone : </span>
                <a href="tel:509-400-5911" className="hover:text-roofing-orange">509-400-5911</a>
              </p>
              <p className="text-sm">
                <span className="font-medium">Email : </span>
                <a href="mailto:jc@aroofabove.com" className="hover:text-roofing-orange">jc@aroofabove.com</a>
              </p>
          </div>

          {/* White Separator - Hidden on mobile */}
          <div className="hidden md:block w-px h-20 bg-white/20 absolute right-1/3 top-1/2 -translate-y-1/2" />

          {/* Logo and Copyright */}
          <div className="flex flex-col items-center space-y-2 md:space-y-4">
            <div className="flex items-center gap-2 md:gap-4">
              <p className="text-white text-xs md:text-sm">
                Copyright {new Date().getFullYear()}
              </p>
              <img
                src="/lovable-uploads/2d080e69-c586-4861-8316-7ec496261217.png"
                alt="A Roof Above Logo"
                className="h-12 md:h-16 w-auto"
              />
              <p className="text-white text-xs md:text-sm whitespace-nowrap">
                All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;