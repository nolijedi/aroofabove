import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

const StickyPhone = () => {
  return (
    <Link
      to="/contact"
      className="fixed bottom-4 right-4 z-50 bg-roofing-orange hover:bg-roofing-orange-dark text-white p-4 rounded-full shadow-lg transition-colors duration-300"
    >
      <div className="relative">
        <Phone className="w-6 h-6 animate-phone-pulse" />
      </div>
    </Link>
  );
};

export default StickyPhone;