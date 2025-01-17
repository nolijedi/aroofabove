import { motion } from "framer-motion";

const ServicesHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-16"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-roofing-charcoal mb-2 relative">
        <span className="relative inline-block pb-2">
          Our Roofing Services
          <motion.div
            className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-l from-roofing-orange via-roofing-orange-dark to-roofing-cream"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </span>
      </h1>
      <p className="text-sm text-gray-500 max-w-2xl mx-auto">
        Comprehensive roofing solutions for residential and commercial properties.
      </p>
    </motion.div>
  );
};

export default ServicesHeader;