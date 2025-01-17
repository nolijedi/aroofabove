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
          // Handle resize if needed
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
    <main className="min-h-screen pt-32 pb-20">
      {/* Background Image and Overlay - matching Services page */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1632823471406-4c5c7e4c6f24?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-roofing-orange/60 to-roofing-cream/40" />
      </div>

      <div className="max-w-7xl mx-auto space-y-12"> {/* Added space-y-12 for vertical spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-gradient-separator backdrop-blur-sm bg-white/30 rounded-xl shadow-xl p-8 mx-4"
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-roofing-charcoal mb-2 relative">
              <span className="relative inline-block pb-2">
                Get Your Free Estimate
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-l from-roofing-orange via-roofing-orange-dark to-roofing-cream"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </h1>

            <p className="text-sm text-roofing-charcoal/80 max-w-2xl mx-auto mb-8 font-medium">
              Fill out the form below and we'll provide you with a detailed estimate for your roofing project.
            </p>
          </div>
        </motion.div>

        <div className="section-gradient-separator mx-4">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              <EstimateForm />
              <EstimateSidebar />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Estimate;