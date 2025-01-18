import { motion } from "framer-motion";
import { PersonalInfoFields } from "./PersonalInfoFields";
import { AddressFields } from "./AddressFields";
import { ProjectFields } from "./ProjectFields";

export const FormFields = () => {
  return (
    <div className="space-y-8">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <PersonalInfoFields />
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <AddressFields />
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <ProjectFields />
      </motion.div>
    </div>
  );
};