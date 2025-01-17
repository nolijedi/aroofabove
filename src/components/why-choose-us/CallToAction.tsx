import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const CallToAction = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.8, duration: 0.6 }}
    className="text-center bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] rounded-xl p-8 shadow-lg transform hover:scale-[1.02] transition-all duration-300"
  >
    <h2 className="text-2xl font-bold text-white mb-4">
      Ready to Start Your Roofing Project?
    </h2>
    <p className="text-[#F1F0FB] mb-6">
      Contact us today for a free consultation and estimate.
    </p>
    <Link
      to="/contact"
      className="inline-flex items-center space-x-2 bg-white text-[#1A1F2C] px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-[#F1F0FB] group shadow-md hover:shadow-xl"
    >
      <span>Get Estimate Now</span>
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </Link>
  </motion.div>
);