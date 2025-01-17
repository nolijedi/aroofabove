import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PrivacyPolicyContent from "./legal/PrivacyPolicyContent";
import TermsContent from "./legal/TermsContent";
import { useState } from "react";

const Footer = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const siteMapLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/why-choose-us", label: "Why Choose Us" },
    { to: "/insurance-claims", label: "Insurance Claims" },
    { to: "/estimate", label: "Get Estimate" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-roofing-charcoal py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:justify-between items-center">
          {/* Logo and Social Section */}
          <div className="flex flex-col md:flex-row items-center w-full md:w-auto space-y-6 md:space-y-0">
            <div className="order-2 md:order-1 md:mr-8">
              <div className="flex space-x-6 md:space-x-4">
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
                    className="p-3 md:p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors group"
                  >
                    <Icon className="w-6 h-6 md:w-5 md:h-5 text-gray-300 group-hover:text-roofing-orange transition-colors" />
                  </a>
                ))}
              </div>
            </div>
            <Link to="/" className="order-1 md:order-2 transform transition-transform hover:scale-105">
              <img
                src="/lovable-uploads/2d080e69-c586-4861-8316-7ec496261217.png"
                alt="A Roof Above Logo"
                className="h-14 md:h-16 w-auto brightness-100"
              />
            </Link>
          </div>

          {/* Sitemap Links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
            {siteMapLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-300 hover:text-roofing-orange transition-colors px-2 py-1"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6 text-sm">
            <Dialog open={isPrivacyOpen} onOpenChange={setIsPrivacyOpen}>
              <DialogTrigger asChild>
                <button className="text-gray-300 hover:text-roofing-orange transition-colors px-3 py-1">
                  Privacy Policy
                </button>
              </DialogTrigger>
              <PrivacyPolicyContent />
            </Dialog>
            <span className="text-gray-500 hidden md:inline">|</span>
            <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
              <DialogTrigger asChild>
                <button className="text-gray-300 hover:text-roofing-orange transition-colors px-3 py-1">
                  Terms of Service
                </button>
              </DialogTrigger>
              <TermsContent />
            </Dialog>
            <span className="text-gray-500 hidden md:inline">|</span>
            <span className="text-gray-400 px-3 py-1">
              © {new Date().getFullYear()} A Roof Above
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;