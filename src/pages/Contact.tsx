import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Contact = () => {
  return (
    <main className="min-h-screen pt-40 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-roofing-charcoal mb-6 relative">
            <span className="relative inline-block">
              Contact Us
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-roofing-orange"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with our expert team today.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Get a Free Estimate</h2>
            <p className="text-gray-600 mb-4">
              Fill out the form below to receive a free estimate for your roofing project.
            </p>
            <Button asChild>
              <Link to="/estimate" className="text-white bg-roofing-orange hover:bg-roofing-orange-dark rounded-md px-4 py-2">
                Get Estimate
              </Link>
            </Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-gray-600 mb-2">Phone: (123) 456-7890</p>
            <p className="text-gray-600 mb-2">Email: info@roofabove.com</p>
            <p className="text-gray-600">Address: 123 Roofing St, Dallas, TX</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">Connect With Us</h2>
          <div className="flex justify-center gap-6">
            {[
              { Icon: Facebook, href: "https://facebook.com", label: "Facebook", delay: 0 },
              { Icon: Twitter, href: "https://twitter.com", label: "Twitter", delay: 0.1 },
              { Icon: Instagram, href: "https://instagram.com", label: "Instagram", delay: 0.2 },
              { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", delay: 0.3 }
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
        </div>
      </div>
    </main>
  );
};

export default Contact;