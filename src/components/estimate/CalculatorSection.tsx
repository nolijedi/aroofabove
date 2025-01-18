import { motion } from "framer-motion";

interface CalculatorSectionProps {
  showCalculator: boolean;
}

export const CalculatorSection = ({ showCalculator }: CalculatorSectionProps) => {
  if (!showCalculator) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex flex-col items-center relative px-4 sm:px-0"
    >
      <div className="w-full sm:max-w-[400px] mx-auto relative">
        {/* Decorative elements */}
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-roofing-orange/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-roofing-cream/20 rounded-full blur-2xl animate-pulse" />
        
        {/* Main content wrapper */}
        <motion.div
          className="relative bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 min-w-[344px] overflow-hidden"
          whileHover={{ scale: 1.02 }}
        >
          {/* Header */}
          <div className="mb-6 text-center">
            <h3 className="text-xl font-bold text-roofing-charcoal">
              Instant Roof Estimate
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Get your detailed roofing estimate in minutes
            </p>
          </div>

          {/* Calculator iframe with enhanced styling */}
          <div className="relative w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-roofing-cream via-roofing-beige to-roofing-orange/20 opacity-30 rounded-lg" />
            <div className="w-full min-w-[344px] overflow-hidden">
              <iframe
                src="https://book.instantroofer.com/?product=estimate&id=daa2d386-4f15-4067-ad79-233c14420642"
                className="w-full h-[650px] border-none rounded-lg shadow-lg relative z-10"
                style={{ minWidth: '344px' }}
                title="Roof Estimate Calculator"
              />
            </div>
          </div>

          {/* Bottom decorative line */}
          <div className="mt-6">
            <div className="h-1 w-full bg-gradient-to-r from-roofing-orange via-roofing-beige to-transparent rounded-full" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};