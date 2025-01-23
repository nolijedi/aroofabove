import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

const StickyPhone = () => {
  return (
    <Link
      to="/contact"
      className="fixed bottom-28 right-6 z-40 bg-roofing-orange/80 hover:bg-roofing-orange-dark text-white p-4 rounded-full shadow-lg transition-all duration-300 group"
      aria-label="Call us"
    >
      <div className="absolute inset-0 bg-roofing-orange rounded-full animate-phone-pulse opacity-40"></div>
      <Phone className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
    </Link>
  );
};

export default StickyPhone;