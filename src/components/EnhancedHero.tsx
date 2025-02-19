'use client';

import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

const socialLinks = [
  { Icon: Facebook, href: "https://facebook.com/aroofabove", label: "Facebook", delay: 0 },
  { Icon: Instagram, href: "https://instagram.com/aroofabove", label: "Instagram", delay: 0.1 },
  { Icon: Twitter, href: "https://twitter.com/aroofabove", label: "Twitter", delay: 0.2 },
  { Icon: Linkedin, href: "https://linkedin.com/company/aroofabove", label: "LinkedIn", delay: 0.3 },
  { Icon: Youtube, href: "https://youtube.com/@aroofabove", label: "YouTube", delay: 0.4 }
];

const EnhancedHero = () => {
  const handleSocialClick = (href: string) => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative">
      {/* Dark Hero Section */}
      <div className="relative bg-gradient-to-b from-roofing-charcoal to-roofing-charcoal/95 pb-32">
        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          {/* Text Content */}
          <div className="text-center max-w-3xl mx-auto space-y-8 relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-bold"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-roofing-cream to-roofing-beige">
                Your Trusted Roofing Experts
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xl md:text-2xl text-roofing-beige/90 leading-relaxed"
            >
              Professional roofing services for residential and commercial properties.
              <br />
              Quality workmanship guaranteed.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex justify-center gap-8 pt-4"
            >
              {socialLinks.map(({ Icon, href, label, delay }) => (
                <motion.button
                  key={href}
                  onClick={() => handleSocialClick(href)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4, delay: 0.4 + delay }}
                  className="text-roofing-beige/80 hover:text-roofing-cream transition-all transform"
                  aria-label={label}
                >
                  <Icon size={28} />
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Curved Transition */}
        <div className="absolute -bottom-1 left-0 w-full overflow-hidden">
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className="relative block w-full h-[120px]"
            style={{
              transform: 'rotate(180deg)',
              filter: 'drop-shadow(0 -4px 4px rgba(0,0,0,0.1))'
            }}
          >
            <path 
              d="M600,112C400,112 200,96 0,96L0,120L1200,120L1200,96C1000,96 800,112 600,112Z" 
              className="fill-white"
            />
          </svg>
        </div>
      </div>

      {/* GIF Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative w-full bg-white"
      >
        <img
          src="/images/hero-roof.gif"
          alt="Roofing Process"
          className="w-full h-[500px] object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.4))'
          }}
        />
      </motion.div>
    </div>
  );
};

export default EnhancedHero;