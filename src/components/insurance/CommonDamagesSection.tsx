import { motion } from "framer-motion";
import { CloudHail, Wind, Trash2, TreePine, CloudRain } from "lucide-react";

const CommonDamagesSection = () => {
  const damages = [
    {
      title: "Hail damage",
      icon: CloudHail,
      description: "Impact damage from hailstones",
      gradient: "from-orange-100 via-orange-200 to-orange-100"
    },
    {
      title: "Wind damage",
      icon: Wind,
      description: "Lifted or missing shingles",
      gradient: "from-roofing-cream via-roofing-beige to-roofing-cream"
    },
    {
      title: "Storm-related debris",
      icon: Trash2,
      description: "Damage from flying debris",
      gradient: "from-roofing-beige via-orange-200 to-roofing-beige"
    },
    {
      title: "Fallen tree limbs",
      icon: TreePine,
      description: "Impact from fallen branches",
      gradient: "from-orange-100 via-roofing-cream to-orange-100"
    },
    {
      title: "Leaks due to severe weather",
      icon: CloudRain,
      description: "Water infiltration issues",
      gradient: "from-roofing-cream via-orange-100 to-roofing-cream"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="bg-gradient-to-br from-roofing-beige via-white to-roofing-cream p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-roofing-charcoal mb-8 text-center">
          Common Roof Damages Covered by Insurance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {damages.map((damage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${damage.gradient} p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group`}
            >
              <div className="relative overflow-hidden h-full">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-repeat opacity-20" 
                       style={{
                         backgroundImage: "url('/lovable-uploads/8fdcd4a0-314a-40b2-8e1d-adef06d5d101.png')",
                         backgroundSize: "100px"
                       }}
                  />
                </div>
                
                <div className="relative flex flex-col items-center gap-4 h-full">
                  <div className="p-4 bg-white/80 rounded-full shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <damage.icon className="w-8 h-8 text-roofing-orange" />
                  </div>
                  
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold text-roofing-charcoal group-hover:text-roofing-orange transition-colors duration-300">
                      {damage.title}
                    </h3>
                    <p className="text-sm text-roofing-charcoal/70">
                      {damage.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CommonDamagesSection;