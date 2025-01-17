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
        className="relative bg-roofing-orange/50 hover:bg-roofing-orange-dark text-white p-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        aria-label="Call us"
      >
        <Phone className="w-6 h-6 group-hover:scale-110 transition-transform text-white relative z-10" />
        <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100">
          <defs>
            <path
              id="circle"
              d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
          </defs>
          <text className="text-xs fill-white">
            <textPath href="#circle" startOffset="0%">
              call us now click here circling around the inside edge of the orange circle
            </textPath>
          </text>
        </svg>
      </button>
    </motion.div>
  );
};

export default StickyPhone;