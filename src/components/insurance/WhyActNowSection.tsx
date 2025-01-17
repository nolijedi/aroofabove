import { motion } from "framer-motion";

const WhyActNowSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16 bg-roofing-beige p-8 rounded-xl"
    >
      <h2 className="text-3xl font-bold text-roofing-charcoal mb-6 text-center">
        Why Act Now?
      </h2>
      <p className="text-gray-700 text-center max-w-3xl mx-auto">
        Insurance policies often have strict deadlines for filing claims after damage occurs. 
        Delaying could mean missing out on the compensation you're entitled to. Plus, untreated 
        damage can lead to more costly repairs down the road. Don't wait—let us help you today!
      </p>
    </motion.div>
  );
};

export default WhyActNowSection;