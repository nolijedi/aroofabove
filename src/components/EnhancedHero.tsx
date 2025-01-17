import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Phone, Mail } from "lucide-react";

const socialLinks = [
  { Icon: Facebook, href: "https://facebook.com/aroofabove", label: "Facebook", delay: 0 },
  { Icon: Instagram, href: "https://instagram.com/aroofabove", label: "Instagram", delay: 0.1 },
  { Icon: Twitter, href: "https://twitter.com/aroofabove", label: "Twitter", delay: 0.2 },
  { Icon: Linkedin, href: "https://linkedin.com/company/aroofabove", label: "LinkedIn", delay: 0.3 },
  { Icon: Youtube, href: "https://youtube.com/@aroofabove", label: "YouTube", delay: 0.4 }
];

const EnhancedHero = () => {
  return (
    <div className="relative min-h-screen pt-32">
      <div className="absolute inset-0 bg-roofing-charcoal/90">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center min-h-[calc(100vh-128px)]">
          <div className="text-center space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-roofing-cream mb-12"
            >
              Your Trusted Roofing Experts
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8"
            >
              Professional roofing services for residential and commercial properties. Quality workmanship guaranteed.
            </motion.p>

            <div className="flex justify-center gap-6">
              {socialLinks.map(({ Icon, href, label, delay }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: delay
                  }}
                  className="p-4 bg-roofing-beige rounded-full shadow-lg hover:bg-roofing-cream transition-all duration-300"
                >
                  <Icon className="w-6 h-6 text-roofing-charcoal" />
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12 text-white text-xl"
            >
              <a href="tel:509-400-5911" className="flex items-center gap-2 hover:text-roofing-cream transition-colors">
                <Phone className="w-6 h-6" />
                509-400-5911
              </a>
              <a href="mailto:jc@aroofabove.com" className="flex items-center gap-2 hover:text-roofing-cream transition-colors">
                <Mail className="w-6 h-6" />
                jc@aroofabove.com
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedHero;