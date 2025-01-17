import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

export const PersonalInfoFields = () => {
  const hoverAnimation = {
    scale: 1.02,
    transition: { type: "spring", stiffness: 300 }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-roofing-charcoal mb-4">Personal Information</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <motion.div 
          className="space-y-2 animate-resize"
          whileHover={hoverAnimation}
        >
          <label className="text-sm font-medium text-gray-700">
            First Name
          </label>
          <Input
            type="text"
            placeholder="John"
            className="w-full bg-white/70 border-roofing-orange/20 focus:border-roofing-orange"
          />
        </motion.div>
        <motion.div 
          className="space-y-2 animate-resize"
          whileHover={hoverAnimation}
        >
          <label className="text-sm font-medium text-gray-700">
            Last Name
          </label>
          <Input
            type="text"
            placeholder="Doe"
            className="w-full bg-white/70 border-roofing-orange/20 focus:border-roofing-orange"
          />
        </motion.div>
        <motion.div 
          className="space-y-2 animate-resize"
          whileHover={hoverAnimation}
        >
          <label className="text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            type="email"
            placeholder="john@example.com"
            className="w-full bg-white/70 border-roofing-orange/20 focus:border-roofing-orange"
          />
        </motion.div>
        <motion.div 
          className="space-y-2 animate-resize"
          whileHover={hoverAnimation}
        >
          <label className="text-sm font-medium text-gray-700">
            Phone
          </label>
          <Input
            type="tel"
            placeholder="(555) 123-4567"
            className="w-full bg-white/70 border-roofing-orange/20 focus:border-roofing-orange"
          />
        </motion.div>
      </div>
    </div>
  );
};