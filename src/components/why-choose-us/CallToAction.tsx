import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const CallToAction = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.8, duration: 0.6 }}
    className="text-center bg-gradient-to-r from-roofing-orange to-roofing-orange-dark rounded-xl p-8 shadow-lg"
  >
    <h2 className="text-2xl font-bold text-white mb-4">
      Ready to Start Your Roofing Project?
    </h2>
    <p className="text-roofing-cream mb-6">
      Contact us today for a free consultation and estimate.
    </p>
    <Link
      to="/contact"
      className="inline-flex items-center space-x-2 bg-white text-roofing-charcoal px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-roofing-cream group"
    >
      <span>Get Started Today</span>
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </Link>
  </motion.div>
);