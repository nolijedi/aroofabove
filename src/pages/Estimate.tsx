import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { EstimateForm } from "@/components/estimate/EstimateForm";
import { EstimateSidebar } from "@/components/estimate/EstimateSidebar";

const Estimate = () => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      window.requestAnimationFrame(() => {
        for (const entry of entries) {
          if (entry.target) {
            // Handle resize if needed
          }
        }
      });
    });

    const animatedElements = document.querySelectorAll('.animate-resize');
    animatedElements.forEach(element => resizeObserver.observe(element));

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 bg-gradient-to-br from-roofing-cream to-roofing-beige">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-roofing-charcoal mb-6 relative">
            <span className="relative inline-block">
              Get Your Free Estimate
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-roofing-orange"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Fill out the form below and we'll provide you with a detailed estimate for your roofing project.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          <EstimateForm />
          <EstimateSidebar />
        </div>
      </div>
    </main>
  );
};

export default Estimate;
