import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

export const AddressFields = () => {
  const hoverAnimation = {
    scale: 1.02,
    transition: { type: "spring", stiffness: 300 }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-roofing-charcoal mb-4">Address Details</h3>
      <motion.div 
        className="space-y-2 animate-resize"
        whileHover={hoverAnimation}
      >
        <label className="text-sm font-medium text-gray-700">
          Address
        </label>
        <Input
          type="text"
          placeholder="123 Main St"
          className="w-full bg-white/70 border-roofing-orange/20 focus:border-roofing-orange"
        />
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        <motion.div 
          className="space-y-2 animate-resize"
          whileHover={hoverAnimation}
        >
          <label className="text-sm font-medium text-gray-700">
            City
          </label>
          <Input
            type="text"
            placeholder="Spokane"
            className="w-full bg-white/70 border-roofing-orange/20 focus:border-roofing-orange"
          />
        </motion.div>
        <motion.div 
          className="space-y-2 animate-resize"
          whileHover={hoverAnimation}
        >
          <label className="text-sm font-medium text-gray-700">
            ZIP Code
          </label>
          <Input
            type="text"
            placeholder="99201"
            className="w-full bg-white/70 border-roofing-orange/20 focus:border-roofing-orange"
          />
        </motion.div>
      </div>
    </div>
  );
};