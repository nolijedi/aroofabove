import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ClipboardList } from "lucide-react";

const EstimateCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="section-gradient-separator backdrop-blur-sm bg-white/30 rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500 group"
    >
      <div className="flex items-center gap-3 mb-4">
        <ClipboardList className="w-7 h-7 text-roofing-orange group-hover:scale-110 transition-transform duration-300" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-roofing-orange to-roofing-orange-dark bg-clip-text text-transparent">
          Get a Free Estimate
        </h2>
      </div>
      <p className="text-gray-800 mb-4">
        Fill out the form below to receive a free estimate for your roofing project.
      </p>
      <Button asChild className="w-full bg-gradient-to-r from-roofing-orange to-roofing-orange-dark hover:shadow-lg transform hover:scale-105 transition-all duration-300 border-0">
        <Link to="/estimate" className="inline-flex items-center justify-center gap-2 py-2">
          Get Estimate
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            →
          </motion.span>
        </Link>
      </Button>
    </motion.div>
  );
};

export default EstimateCard;