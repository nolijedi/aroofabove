import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const socialLinks = [
  { Icon: Facebook, href: "https://www.facebook.com/aroofabovellc/", label: "Facebook", delay: 0 },
  { Icon: Instagram, href: "https://instagram.com/a_roof_above_llc", label: "Instagram", delay: 0.1 },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/aroofabove/", label: "LinkedIn", delay: 0.2 }
];

const SocialLinks = () => {
  return (
    <div className="flex justify-center gap-2 sm:gap-6 mb-8">
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
          className="p-2 sm:p-4 bg-gradient-to-br from-roofing-beige to-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer z-0"
          onClick={(e) => {
            e.preventDefault();
            window.open(href, '_blank', 'noopener,noreferrer');
          }}
        >
          <Icon className="w-5 h-5 sm:w-8 sm:h-8 text-roofing-orange group-hover:text-roofing-orange-dark transition-colors" />
        </motion.a>
      ))}
    </div>
  );
};

export default SocialLinks;