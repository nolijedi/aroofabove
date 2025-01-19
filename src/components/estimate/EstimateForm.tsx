import { motion } from "framer-motion";
import { FormHeader } from "./FormHeader";
import { CalculatorSection } from "./CalculatorSection";
import { useIframeMessage } from "@/hooks/useIframeMessage";
import { useScriptLoader } from "@/hooks/useScriptLoader";

export const EstimateForm = () => {
  useIframeMessage();
  useScriptLoader();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="lg:col-span-2 relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 w-full max-w-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-roofing-cream via-roofing-beige to-roofing-orange/20 opacity-90" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-roofing-orange/10 rounded-full -translate-y-32 translate-x-32 blur-3xl animate-spin-slow" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-roofing-orange/10 rounded-full translate-y-32 -translate-x-32 blur-3xl animate-spin-slow" />
      
      <div className="relative p-4 sm:p-6 md:p-8 backdrop-blur-sm w-full">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-roofing-orange/20 to-roofing-orange-dark/20 rounded-bl-full" />
        
        <form className="space-y-6 w-full">
          <FormHeader />
          <CalculatorSection showCalculator={true} />
        </form>
      </div>
    </motion.div>
  );
};