import { motion } from "framer-motion";

const InsuranceHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-16"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-roofing-charcoal mb-4 relative">
        <span className="relative inline-block pb-2">
          Insurance Claims Made Easy
          <motion.div
            className="absolute -bottom-2 left-0 w-full h-1 bg-roofing-orange"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </span>
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Let us guide you through the insurance claims process with ease and expertise.
      </p>
    </motion.div>
  );
};

export default InsuranceHeader;