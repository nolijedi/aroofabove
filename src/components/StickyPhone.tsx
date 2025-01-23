import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

const StickyPhone = () => {
  return (
    <Link
      to="/contact"
      className="fixed bottom-24 right-6 z-40 bg-roofing-orange hover:bg-roofing-orange-dark text-white p-4 rounded-full shadow-lg transition-all duration-300 group"
      aria-label="Call us"
    >
      <div className="absolute inset-0 bg-roofing-orange rounded-full animate-phone-pulse opacity-30"></div>
      <Phone className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
    </Link>
  );
};

export default StickyPhone;