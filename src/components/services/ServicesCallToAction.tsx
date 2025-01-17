import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ServicesCallToAction = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center rounded-xl overflow-hidden relative bg-white/80 backdrop-blur-sm shadow-lg"
    >
      <div className="p-12">
        <h2 className="text-3xl font-bold text-roofing-charcoal mb-4">
          Ready to Start Your Project?
        </h2>
        <p className="text-gray-600 mb-8">
          Contact us today for a free consultation and estimate.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-roofing-orange to-roofing-orange-dark text-white hover:from-roofing-orange-dark hover:to-roofing-orange transition-all duration-300 transform hover:scale-105 group shadow-lg"
        >
          <Link to="/contact">
            Contact Us Now
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default ServicesCallToAction;