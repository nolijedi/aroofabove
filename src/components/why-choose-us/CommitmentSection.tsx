import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const CommitmentSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-16"
  >
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-roofing-charcoal mb-6">
        Our Commitment to Excellence
      </h2>
      <p className="text-gray-600 mb-8">
        With over 20 years of experience in the roofing industry, we've built our reputation on quality workmanship, exceptional customer service, and attention to detail. Our team of certified professionals is dedicated to providing you with the best roofing solutions tailored to your needs.
      </p>
      <Button
        asChild
        size="lg"
        className="bg-roofing-orange text-white hover:bg-roofing-orange-dark group"
      >
        <Link to="/estimate">
          Get Your Free Estimate
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </div>
  </motion.div>
);