import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { EstimateForm } from "@/components/estimate/EstimateForm";
import { EstimateSidebar } from "@/components/estimate/EstimateSidebar";

const Estimate = () => {
  const shouldReduceMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let observer: ResizeObserver | null = null;
    let rafId: number | null = null;
    
    const setupResizeObserver = () => {
      if (!pageRef.current) return;
      
      observer = new ResizeObserver((entries) => {
        // Cancel any pending rAF to avoid queuing multiple frames
        if (rafId) {
          window.cancelAnimationFrame(rafId);
        }
        
        // Schedule a new frame
        rafId = window.requestAnimationFrame(() => {
          if (!Array.isArray(entries) || !entries.length) return;
          
          // Throttle resize handling to prevent excessive updates
          const now = Date.now();
          if (!setupResizeObserver.lastRun || now - setupResizeObserver.lastRun >= 16) {
            console.log('Page resized');
            setupResizeObserver.lastRun = now;
          }
        });
      });

      observer.observe(pageRef.current);
    };

    // Add timestamp property to the function
    setupResizeObserver.lastRun = 0;

    setupResizeObserver();

    return () => {
      // Clean up all resources
      if (observer) {
        observer.disconnect();
      }
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <main className="min-h-screen pt-32 pb-20" ref={pageRef}>
      {/* Background Image and Overlay - matching Services page */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1632823471406-4c5c7e4c6f24?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-roofing-orange/60 to-roofing-cream/40" />
      </div>

      <div className="w-full px-2 sm:px-4 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-gradient-separator backdrop-blur-sm bg-white/30 rounded-xl shadow-xl"
        >
          <div className="w-full text-center px-4">
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

        <div className="section-gradient-separator w-full">
          <div className="w-full">
            <div className="grid lg:grid-cols-3 gap-6 md:gap-12">
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