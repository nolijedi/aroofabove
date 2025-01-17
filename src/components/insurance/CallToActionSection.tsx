import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CallToActionSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center bg-roofing-orange/10 rounded-xl p-8"
    >
      <h2 className="text-2xl font-bold text-roofing-charcoal mb-4">
        Ready to Start Your Claim?
      </h2>
      <p className="text-gray-600 mb-6">
        Contact us today for a free consultation and claim assessment.
      </p>
      <Button
        asChild
        size="lg"
        className="bg-roofing-orange text-white hover:bg-roofing-orange-dark group"
      >
        <Link to="/contact">
          Start Your Claim Now
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </motion.div>
  );
};

export default CallToActionSection;