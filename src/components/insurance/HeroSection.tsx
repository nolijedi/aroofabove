import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-16"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-roofing-charcoal mb-6 relative">
        <span className="relative inline-block">
          Insurance Claims Made Easy
          <motion.div
            className="absolute -bottom-2 left-0 w-full h-1 bg-roofing-orange"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </span>
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        At <span className="font-semibold">A Roof Above</span>, we understand that dealing with roof damage is stressful enough—handling insurance claims shouldn't add to that burden. That's why we're here to help you every step of the way, ensuring you get the compensation you deserve and your roof back in top shape quickly.
      </p>
    </motion.div>
  );
};

export default HeroSection;