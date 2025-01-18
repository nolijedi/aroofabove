import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const EstimateCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500"
    >
      <div className="bg-gradient-to-br from-white via-roofing-cream to-roofing-beige backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 transform transition-all duration-300 hover:shadow-2xl h-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-roofing-orange to-roofing-orange-dark rounded-full flex items-center justify-center">
            <span className="text-2xl text-white">📋</span>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-roofing-charcoal to-roofing-orange-dark bg-clip-text text-transparent">
            Get a Free Estimate
          </h2>
        </div>
        <p className="text-roofing-charcoal/80 leading-relaxed mb-8">
          Fill out the form below to receive a free estimate for your roofing project.
        </p>
        <Button asChild className="w-full bg-roofing-orange hover:bg-roofing-orange-dark transition-colors duration-300">
          <Link to="/estimate" className="inline-flex items-center justify-center gap-2">
            Get Estimate
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default EstimateCard;