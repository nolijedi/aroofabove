import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const siteMapLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/why-choose-us", label: "Why Choose Us" },
    { to: "/insurance-claims", label: "Insurance Claims" },
    { to: "/estimate", label: "Get Estimate" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-roofing-charcoal py-3">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          {/* Logo and Social Section */}
          <div className="flex items-center w-full h-full relative min-h-[80px] justify-end">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex space-x-2">
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
                    className="p-1 bg-white/5 rounded-full hover:bg-white/10 transition-colors group"
                  >
                    <Icon className="w-4 h-4 text-gray-300 group-hover:text-roofing-orange transition-colors" />
                  </a>
                ))}
              </div>
            </div>
            <Link to="/" className="block">
              <img
                src="/lovable-uploads/c03dc4bd-7520-4829-aa3d-9b436d3d547c.png"
                alt="A Roof Above Logo"
                className="h-16 w-auto brightness-200"
              />
            </Link>
          </div>

          {/* Sitemap Links */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs">
            {siteMapLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-300 hover:text-roofing-orange transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex items-center space-x-4 text-xs">
            <Link to="/privacy-policy" className="text-gray-300 hover:text-roofing-orange transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-500">|</span>
            <Link to="/terms" className="text-gray-300 hover:text-roofing-orange transition-colors">
              Terms of Service
            </Link>
            <span className="text-gray-500">|</span>
            <span className="text-gray-400">
              © {new Date().getFullYear()} A Roof Above
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;