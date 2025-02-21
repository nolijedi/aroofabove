'use client';

import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";
import Features from "@/components/home/Features";

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
          <motion.div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-roofing-cream to-roofing-beige">
                INLINE TEST - Your Premier Roofing Specialists
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-roofing-beige/90 leading-relaxed">
              INLINE TEST - Professional roofing services.
              <br />
              This text is directly in page.tsx
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <EnhancedHero />
      <Features />
    </main>
  );
}
