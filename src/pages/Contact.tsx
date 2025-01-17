import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const Contact = () => {
  return (
    <main className="min-h-screen pt-40 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-roofing-charcoal mb-2 relative">
            <span className="relative inline-block pb-2">
              Contact Us
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-roofing-orange"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h1>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto mb-8">
            Get in touch with our expert team today.
          </p>

          <div className="flex justify-center gap-6 mb-12">
            {[
              { Icon: Facebook, href: "https://facebook.com", label: "Facebook", delay: 0 },
              { Icon: Twitter, href: "https://twitter.com", label: "Twitter", delay: 0.1 },
              { Icon: Instagram, href: "https://instagram.com", label: "Instagram", delay: 0.2 },
              { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", delay: 0.3 },
              { Icon: Youtube, href: "https://youtube.com", label: "YouTube", delay: 0.4 }
            ].map(({ Icon, href, label, delay }, index) => (
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
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-br from-roofing-orange to-roofing-beige p-1">
              <div className="bg-white p-8 rounded-lg h-full transform transition-transform hover:scale-[0.99] duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-roofing-beige rounded-full flex items-center justify-center">
                    <span className="text-2xl">📋</span>
                  </div>
                  <h2 className="text-2xl font-bold text-roofing-charcoal">
                    Get a Free Estimate
                  </h2>
                </div>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Fill out the form below to receive a free estimate for your roofing project.
                </p>
                <Button asChild className="w-full bg-roofing-orange hover:bg-roofing-orange-dark transition-colors duration-300">
                  <Link to="/estimate" className="inline-flex items-center justify-center gap-2">
                    Get Estimate
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-lg shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-br from-roofing-orange to-roofing-beige p-1">
              <div className="bg-white p-8 rounded-lg h-full transform transition-transform hover:scale-[0.99] duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-roofing-beige rounded-full flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h2 className="text-2xl font-bold text-roofing-charcoal">
                    Contact Information
                  </h2>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-gray-600 hover:text-roofing-orange transition-colors">
                    <div className="w-10 h-10 bg-roofing-beige rounded-full flex items-center justify-center">
                      <span className="text-xl">📞</span>
                    </div>
                    <p>(123) 456-7890</p>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 hover:text-roofing-orange transition-colors">
                    <div className="w-10 h-10 bg-roofing-beige rounded-full flex items-center justify-center">
                      <span className="text-xl">✉️</span>
                    </div>
                    <p>info@roofabove.com</p>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 hover:text-roofing-orange transition-colors">
                    <div className="w-10 h-10 bg-roofing-beige rounded-full flex items-center justify-center">
                      <span className="text-xl">📍</span>
                    </div>
                    <p>123 Roofing St, Dallas, TX</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
