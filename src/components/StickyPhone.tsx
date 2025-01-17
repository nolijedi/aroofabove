import { Phone } from "lucide-react";
import { motion } from "framer-motion";

const StickyPhone = () => {
  const handlePhoneClick = () => {
    window.location.href = "tel:509-400-5911";
  };

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="fixed bottom-4 left-4 z-50"
    >
      <button
        onClick={handlePhoneClick}
        className="relative bg-roofing-orange/50 hover:bg-roofing-orange-dark text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group animate-phone-pulse"
        aria-label="Call us"
      >
        <Phone className="w-6 h-6 group-hover:scale-110 transition-transform text-white" />
      </button>
    </motion.div>
  );
};

export default StickyPhone;