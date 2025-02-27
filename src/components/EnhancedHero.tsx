'use client';

import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";

const EnhancedHero = () => {
  const socialLinks = [
    { href: "https://facebook.com", label: "Facebook", Icon: Facebook },
    { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
    { href: "https://twitter.com", label: "Twitter", Icon: Twitter },
    { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
    { href: "https://youtube.com", label: "YouTube", Icon: Youtube },
  ];

  const handleSocialClick = (href: string) => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center relative z-10">
          {/* Main Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Heading with gradient text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-bold"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-roofing-cream to-roofing-beige">
                MANUAL TEST - Your Premier Roofing Specialists
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xl md:text-2xl text-roofing-beige/90 leading-relaxed"
            >
              MANUAL TEST - Professional roofing services for residential and commercial properties.
              <br />
              Quality workmanship guaranteed - Call us today!
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="flex justify-center space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              {socialLinks.map(({ href, label, Icon }, index) => (
                <motion.button
                  key={href}
                  onClick={() => handleSocialClick(href)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="text-roofing-beige/80 hover:text-roofing-cream transition-colors"
                  aria-label={label}
                >
                  <Icon size={28} />
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white"
          style={{
            transform: 'translateY(50%)'
          }}
        />
      </div>

      {/* GIF Section */}
      <div className="bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative w-full h-[500px]"
        >
          <Image
            src="/images/hero-roof.gif"
            alt="Roofing Process"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedHero;
