import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const CallToAction = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.8, duration: 0.6 }}
    className="text-center bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/10"
  >
    <h2 className="text-2xl font-bold text-white mb-4">
      Ready to Start Your Roofing Project?
    </h2>
    <p className="text-gray-300 mb-6">
      Contact us today for a free consultation and estimate.
    </p>
    <Link
      to="/contact"
      className="inline-flex items-center space-x-2 bg-gradient-to-r from-roofing-orange to-orange-500 hover:from-roofing-orange-dark hover:to-orange-600 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
    >
      <span>Get Started Today</span>
      <ArrowRight className="w-5 h-5" />
    </Link>
  </motion.div>
);