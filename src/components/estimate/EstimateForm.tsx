import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PersonalInfoFields } from "./PersonalInfoFields";
import { AddressFields } from "./AddressFields";
import { ProjectFields } from "./ProjectFields";

export const EstimateForm = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }} // Explicitly set to 1 second
      className="lg:col-span-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 animate-resize"
    >
      <form className="space-y-6">
        <PersonalInfoFields />
        <AddressFields />
        <ProjectFields />
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-roofing-orange to-roofing-orange-dark text-white hover:opacity-90 group"
          >
            Get Estimate
            <Calculator className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};