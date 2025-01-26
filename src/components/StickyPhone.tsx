import { Phone } from "lucide-react";
import { motion } from "framer-motion";

export const StickyPhone = () => {
  return (
    <motion.a
      href="tel:+15094005911"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.4, 1, 0.4],
        scale: [0.85, 1.1, 0.85],
      }}
      whileHover={{ 
        scale: 1.2,
        opacity: 1,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.9 }}
      transition={{
        opacity: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        },
        scale: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      className={`
        fixed bottom-[120px] left-6
        z-[100]
        flex flex-col items-center justify-center
        w-[72px] h-[72px] rounded-full
        bg-gradient-to-br from-roofing-orange/90 to-roofing-orange-dark/90
        shadow-lg hover:shadow-xl
        transition-all duration-300
        group
      `}
    >
      <Phone className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
      <span className="text-xs font-medium text-white whitespace-nowrap mt-1">Call Now</span>
    </motion.a>
  );
};

export default StickyPhone;
