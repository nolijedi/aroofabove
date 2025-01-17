import { motion } from "framer-motion";

const DamagesSection = () => {
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
      
      <div className="mb-8">
        <img 
          src="/lovable-uploads/b40a570b-31d3-482a-bbb0-9198d1a952fe.png" 
          alt="Common roof damage types" 
          className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          "Streaking stains",
          "Buckled shingles",
          "Missing granules",
          "Rusted flashing",
          "Water stains",
          "Moss or mold growth",
          "Hail damage",
          "Wind damage",
          "Storm debris",
          "Fallen tree limbs",
          "Weather-related leaks",
          "Curling shingles"
        ].map((damage, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-roofing-orange/10 p-4 rounded-lg text-center hover:bg-roofing-orange/20 transition-colors"
          >
            <p className="text-roofing-charcoal font-medium">{damage}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DamagesSection;