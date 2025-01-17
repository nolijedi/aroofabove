import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const CommitmentSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-gradient-to-br from-[#F1F0FB] to-white backdrop-blur-sm rounded-xl shadow-lg p-8 mb-16 border border-[#9b87f5]/20"
  >
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-[#1A1F2C] mb-6">
        Our Commitment to Excellence
      </h2>
      <p className="text-[#8E9196] mb-8">
        With over 20 years of experience in the roofing industry, we've built our reputation on quality workmanship, exceptional customer service, and attention to detail. Our team of certified professionals is dedicated to providing you with the best roofing solutions tailored to your needs.
      </p>
      <Button
        asChild
        size="lg"
        className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-white hover:from-[#7E69AB] hover:to-[#6E59A5] group shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Link to="/estimate">
          Get Estimate Now
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </div>
  </motion.div>
);