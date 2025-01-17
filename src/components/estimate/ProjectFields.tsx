import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const ProjectFields = () => {
  const hoverAnimation = {
    scale: 1.02,
    transition: { type: "spring", stiffness: 300 }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-roofing-charcoal mb-4">Project Details</h3>
      <motion.div 
        className="space-y-2 animate-resize"
        whileHover={hoverAnimation}
      >
        <label className="text-sm font-medium text-gray-700">
          Service Type
        </label>
        <Select>
          <SelectTrigger className="w-full bg-white/70 border-roofing-orange/20 focus:border-roofing-orange">
            <SelectValue placeholder="Select service type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="residential">Residential Roofing</SelectItem>
            <SelectItem value="commercial">Commercial Roofing</SelectItem>
            <SelectItem value="repair">Roof Repair</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div 
        className="space-y-2 animate-resize"
        whileHover={hoverAnimation}
      >
        <label className="text-sm font-medium text-gray-700">
          Project Details
        </label>
        <Textarea
          placeholder="Please describe your roofing needs..."
          className="w-full min-h-[120px] bg-white/70 border-roofing-orange/20 focus:border-roofing-orange"
        />
      </motion.div>
    </div>
  );
};