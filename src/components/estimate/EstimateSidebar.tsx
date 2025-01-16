import { motion } from "framer-motion";
import { Home } from "lucide-react";

export const EstimateSidebar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-6 animate-resize"
    >
      <motion.div 
        className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-roofing-orange to-roofing-orange-dark rounded-full text-white">
            <Home className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-roofing-charcoal">
            Why Choose Us
          </h2>
        </div>
        <ul className="space-y-4">
          {[
            "Free, no-obligation estimates",
            "Licensed and insured professionals",
            "Premium quality materials",
            "Competitive pricing",
            "Excellent warranty coverage",
            "Financing options available"
          ].map((item, index) => (
            <motion.li 
              key={index} 
              className="flex items-center gap-2 text-gray-600"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <Home className="w-4 h-4 text-roofing-orange flex-shrink-0" />
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div 
        className="bg-gradient-to-br from-roofing-orange to-roofing-orange-dark text-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-xl font-bold mb-4">
          Limited Time Offer!
        </h3>
        <p className="mb-6">
          Get 10% off your roofing project when you schedule your estimate this month.
        </p>
        <p className="text-sm opacity-90">
          *Terms and conditions apply
        </p>
      </motion.div>
    </motion.div>
  );
};