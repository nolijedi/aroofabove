import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const StickyPhone = () => {
  const isMobile = useIsMobile();
  
  const handlePhoneClick = () => {
    window.location.href = "tel:509-400-5911";
  };

  return (
    <motion.div
      initial={{ x: isMobile ? 100 : -100 }}
      animate={{ x: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      className={`fixed ${isMobile ? 'bottom-20 right-4' : 'bottom-64 left-4'} z-40 pointer-events-none`}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePhoneClick}
        className={`relative bg-roofing-orange/90 hover:bg-roofing-orange-dark text-white ${isMobile ? 'p-6' : 'p-16'} rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group pointer-events-auto`}
        animate={{
          scale: [1, 0.95, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="absolute inset-0 w-full h-full">
          <div className="flex items-center justify-center w-full h-full">
            <Phone className={`${isMobile ? 'w-6 h-6' : 'w-12 h-12'} text-white relative z-10`} />
          </div>
          {!isMobile && (
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
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StickyPhone;