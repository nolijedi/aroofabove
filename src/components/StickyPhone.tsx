import { Phone } from "lucide-react";
import { motion } from "framer-motion";

const StickyPhone = () => {
  return (
    <motion.a
      href="tel:509-400-5911"
      className="fixed bottom-6 right-6 z-40 bg-roofing-orange/80 hover:bg-roofing-orange-dark text-white p-4 rounded-full shadow-lg transition-all duration-300 group"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Call us"
    >
      <div className="absolute inset-0 bg-roofing-orange rounded-full animate-phone-pulse opacity-40"></div>
      <div className="relative flex flex-col items-center gap-1">
        <Phone className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
        <span className="text-xs font-medium whitespace-nowrap">Call Now</span>
      </div>
    </motion.a>
  );
};

export default StickyPhone;