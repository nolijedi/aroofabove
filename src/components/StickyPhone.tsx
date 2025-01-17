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
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      className="fixed bottom-4 left-4 z-50 ml-4 mb-4 pointer-events-none"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePhoneClick}
        className="relative bg-roofing-orange/50 hover:bg-roofing-orange-dark text-white p-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group pointer-events-auto"
        aria-label="Call us"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Phone className="w-12 h-12 group-hover:scale-110 transition-transform text-white relative z-10" />
        </motion.div>
        <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100">
          <defs>
            <path
              id="circle"
              d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
          </defs>
          <text className="text-xs fill-white">
            <textPath href="#circle" startOffset="0%">
              CLICK HERE • CALL US NOW • CLICK HERE • CALL US NOW •
            </textPath>
          </text>
        </svg>
      </motion.button>
    </motion.div>
  );
};

export default StickyPhone;