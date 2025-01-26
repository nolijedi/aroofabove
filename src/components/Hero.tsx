import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SocialLinks from "@/components/contact/SocialLinks";
import { useEffect, useState } from "react";

const Hero = () => {
  return (
    <div className="w-full bg-roofing-charcoal flex flex-col">
      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="px-4 sm:px-6 lg:px-8 pt-48 text-center space-y-8 max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold text-roofing-cream mb-6 drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] tracking-tight"
          >
            Your Trusted Roofing Experts
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-roofing-beige mb-8 max-w-2xl mx-auto font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
          >
            Professional roofing services for residential and commercial properties.
            Quality workmanship guaranteed.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mb-24"
          >
            <SocialLinks />
          </motion.div>
        </div>
        
        {/* GIF Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative w-full"
        >
          <img
            src="/images/hero-roof.gif"
            alt="Roofing Process"
            className="w-full block"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
