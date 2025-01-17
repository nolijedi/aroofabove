import { Link } from "react-router-dom";
import { Mail, Phone, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-roofing-charcoal py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and Contact Section */}
          <div className="flex items-center gap-8">
            <Link to="/" className="block">
              <img
                src="/lovable-uploads/c03dc4bd-7520-4829-aa3d-9b436d3d547c.png"
                alt="A Roof Above Logo"
                className="h-8 w-auto brightness-200"
              />
            </Link>
            
            <div className="flex flex-col items-start space-y-1">
              <a
                href="tel:509-400-5911"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group text-sm"
              >
                <Phone className="w-4 h-4 group-hover:text-roofing-orange transition-colors" />
                <span>(509) 400-5911</span>
              </a>
              <a
                href="mailto:jc@aroofabove.com"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group text-sm"
              >
                <Mail className="w-4 h-4 group-hover:text-roofing-orange transition-colors" />
                <span>jc@aroofabove.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-6">
            <div className="flex space-x-4">
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
                  className="p-1.5 bg-white/5 rounded-full hover:bg-white/10 transition-colors group"
                >
                  <Icon className="w-4 h-4 text-gray-300 group-hover:text-roofing-orange transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex items-center space-x-4 text-sm">
            <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-500">|</span>
            <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
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