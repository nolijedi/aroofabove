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
      transition={{ duration: 1 }}
      className="lg:col-span-2 relative overflow-hidden rounded-xl shadow-2xl"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-roofing-cream via-roofing-beige to-roofing-orange/20 opacity-90" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-roofing-orange/10 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-roofing-orange/10 rounded-full translate-y-32 -translate-x-32 blur-3xl" />
      
      {/* Content */}
      <div className="relative p-8 backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-32 h-32 bg-roofing-orange/5 rounded-bl-full" />
        
        <form className="space-y-6">
          <div className="space-y-2 mb-8">
            <h2 className="text-3xl font-bold text-roofing-charcoal">
              Get Your Free Estimate
            </h2>
            <p className="text-gray-600">
              Fill out the form below and we'll get back to you shortly
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <PersonalInfoFields />
            </div>

            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <AddressFields />
            </div>

            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <ProjectFields />
            </div>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="pt-4"
          >
            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-roofing-orange to-roofing-orange-dark text-white hover:opacity-90 group h-14 text-lg"
            >
              Get Estimate Now
              <Calculator className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            </Button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};