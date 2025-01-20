import { motion } from "framer-motion";

const ContactHeader = () => {
  return (
    <div className="container mx-auto px-4 text-center bg-gradient-to-r from-roofing-cream/80 to-roofing-orange/60 p-6 rounded-lg backdrop-blur-sm">
      <h1 className="text-4xl md:text-5xl font-bold text-roofing-charcoal mb-2 relative">
        <span className="relative inline-block pb-2">
          Contact Us
          <motion.div
            className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-roofing-cream via-roofing-orange-dark to-roofing-orange"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </span>
      </h1>
      <p className="text-sm text-gray-500 max-w-2xl mx-auto mb-8">
        Get in touch with our expert team today.
      </p>
    </div>
  );
};

export default ContactHeader;