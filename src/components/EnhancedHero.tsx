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
  return (
    <div className="relative">
      <Hero />
      <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center gap-8">
        {socialLinks.map(({ Icon, href, label, delay }, index) => (
          <motion.a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
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
            className="p-4 bg-roofing-beige rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group active:bg-roofing-orange/20"
          >
            <Icon className="w-8 h-8 text-roofing-charcoal group-hover:text-roofing-orange transition-colors" />
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default EnhancedHero;