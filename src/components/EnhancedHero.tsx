import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import Hero from "./Hero";

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
      <Hero />
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[22rem] pb-12">
          <div className="text-center space-y-8">
            <div className="mb-6" />
            <div className="mb-8" />
            <div className="flex justify-center gap-4 md:gap-8 mb-12 pointer-events-auto">
              {socialLinks.map(({ Icon, href, label, delay }, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleSocialClick(href)}
                  aria-label={label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360,
                    transition: { duration: 0.5 }
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.5 + delay
                  }}
                  className="p-2 md:p-3 bg-roofing-beige rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group active:bg-roofing-orange/20"
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-roofing-charcoal group-hover:text-roofing-orange transition-colors" />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedHero;