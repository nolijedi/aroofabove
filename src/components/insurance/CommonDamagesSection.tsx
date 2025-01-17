import { motion } from "framer-motion";
import { Cloud, Wind, Trash2, TreePine, CloudRain } from "lucide-react";

const CommonDamagesSection = () => {
  const damages = [
    {
      title: "Hail damage",
      icon: Cloud,
      description: "Impact damage from hailstones"
    },
    {
      title: "Wind damage",
      icon: Wind,
      description: "Lifted or missing shingles"
    },
    {
      title: "Storm-related debris",
      icon: Trash2,
      description: "Damage from flying debris"
    },
    {
      title: "Fallen tree limbs",
      icon: TreePine,
      description: "Impact from fallen branches"
    },
    {
      title: "Leaks due to severe weather",
      icon: CloudRain,
      description: "Water infiltration issues"
    }
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
            className="bg-roofing-orange/10 p-6 rounded-lg text-center flex flex-col items-center gap-3 hover:bg-roofing-orange/20 transition-colors duration-300"
          >
            <div className="p-3 bg-roofing-orange/20 rounded-full">
              {<damage.icon className="w-6 h-6 text-roofing-orange" />}
            </div>
            <h3 className="text-roofing-charcoal font-semibold">{damage.title}</h3>
            <p className="text-sm text-roofing-charcoal/70">{damage.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CommonDamagesSection;