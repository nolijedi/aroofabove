import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="sticky top-0 z-50 bg-roofing-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center gap-6 h-8">
          <a 
            href="mailto:jc@aroofabove.co"
            className="flex items-center gap-1.5 text-xs hover:text-roofing-orange transition-colors"
          >
            <Mail size={12} className="text-roofing-orange" />
            jc@aroofabove.co
          </a>
          <a 
            href="tel:+1234567890" 
            className="flex items-center gap-1.5 text-xs hover:text-roofing-orange transition-colors"
          >
            <Phone size={12} className="text-roofing-orange" />
            (123) 456-7890
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
