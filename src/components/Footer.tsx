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
    <footer className="bg-roofing-charcoal py-3">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
          {/* Logo and Social Section */}
          <div className="flex items-center w-full md:w-auto relative min-h-[80px] justify-center md:justify-start order-1 md:order-none">
            <Link to="/" className="block">
              <img
                src="/lovable-uploads/2d080e69-c586-4861-8316-7ec496261217.png"
                alt="A Roof Above Logo"
                className="h-12 md:h-16 w-auto brightness-100"
              />
            </Link>
          </div>

          {/* Social Icons - Centered on mobile, right-aligned on desktop */}
          <div className="flex justify-center md:justify-end space-x-2 order-2 md:order-none">
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

          {/* Sitemap Links */}
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs order-3 md:order-none">
            {siteMapLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-300 hover:text-roofing-orange transition-colors px-1 py-0.5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex items-center space-x-2 text-xs order-4 md:order-none">
            <Dialog open={isPrivacyOpen} onOpenChange={setIsPrivacyOpen}>
              <DialogTrigger asChild>
                <button className="text-gray-300 hover:text-roofing-orange transition-colors px-1 py-0.5">
                  Privacy Policy
                </button>
              </DialogTrigger>
              <PrivacyPolicyContent />
            </Dialog>
            <span className="text-gray-500">|</span>
            <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
              <DialogTrigger asChild>
                <button className="text-gray-300 hover:text-roofing-orange transition-colors px-1 py-0.5">
                  Terms of Service
                </button>
              </DialogTrigger>
              <TermsContent />
            </Dialog>
            <span className="text-gray-500">|</span>
            <span className="text-gray-400 px-1 py-0.5">
              © {new Date().getFullYear()} A Roof Above
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;