import { motion } from "framer-motion";

const CommonDamagesSection = () => {
  const damages = [
    "Hail damage",
    "Wind damage",
    "Storm-related debris",
    "Fallen tree limbs",
    "Leaks due to severe weather"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="text-3xl font-bold text-roofing-charcoal mb-8 text-center">
        Common Roof Damages Covered by Insurance
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {damages.map((damage, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-roofing-orange/10 p-4 rounded-lg text-center"
          >
            <p className="text-roofing-charcoal font-medium">{damage}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CommonDamagesSection;