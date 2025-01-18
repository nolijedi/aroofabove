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
      className="w-full flex flex-col items-center"
    >
      <div className="w-full max-w-[345px] mx-auto">
        <iframe
          src="https://book.instantroofer.com/?product=estimate&id=daa2d386-4f15-4067-ad79-233c14420642"
          className="w-full aspect-[0.53] h-[650px] border-none rounded-lg shadow-lg"
          title="Roof Estimate Calculator"
        />
        <div className="text-center mt-4 text-sm text-gray-600">
          Powered by <a href="https://www.instantroofer.com" className="text-roofing-orange hover:text-roofing-orange-dark transition-colors">Instant Roofer</a>
        </div>
      </div>
    </motion.div>
  );
};