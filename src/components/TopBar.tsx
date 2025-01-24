import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="bg-gradient-to-r from-roofing-orange to-roofing-orange-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center gap-6 h-8">
          <a 
            href="mailto:jc@aroofabove.co"
            className="flex items-center gap-1.5 text-xs hover:text-white/90 transition-colors"
          >
            <Mail size={12} className="text-white" />
            jc@aroofabove.co
          </a>
          <a 
            href="tel:+1234567890" 
            className="flex items-center gap-1.5 text-xs hover:text-white/90 transition-colors"
          >
            <Phone size={12} className="text-white" />
            (123) 456-7890
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
