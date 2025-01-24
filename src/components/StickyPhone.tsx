import { Phone } from "lucide-react";
import { motion } from "framer-motion";

export const StickyPhone = () => {
  return (
    <motion.a
      href="tel:509-400-5911"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.4, 1, 0.4],
        scale: [0.85, 1.1, 0.85],
      }}
      whileHover={{ 
        scale: 1.2,
        rotate: 360,
        opacity: 1,
        transition: { duration: 0.5 }
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
        fixed bottom-[120px] right-6
        z-50 flex flex-col items-center justify-center
        w-[68px] h-[68px] rounded-full
        bg-gradient-to-br from-roofing-orange to-roofing-orange-dark
        shadow-lg hover:shadow-xl
        transition-all duration-300
        group
      `}
    >
      <Phone className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
      <span className="text-xs font-medium text-white whitespace-nowrap mt-1">Call Us</span>
    </motion.a>
  );
};

export default StickyPhone;
