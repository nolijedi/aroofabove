import { motion } from "framer-motion";
import { CloudHail, Wind, Trash2, TreePine, CloudRain, ArrowRight, Info } from "lucide-react";
import { useState } from "react";

const CommonDamagesSection = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  
  const damages = [
    {
      title: "Hail damage",
      icon: CloudHail,
      description: "Impact damage from hailstones",
      gradient: "from-orange-100 via-orange-200 to-orange-100",
      expandedDescription: "Hailstorms can create dents, cracks, and weaknesses in your roof's surface, leading to potential leaks and structural issues if left unaddressed."
    },
    {
      title: "Wind damage",
      icon: Wind,
      description: "Lifted or missing shingles",
      gradient: "from-roofing-cream via-roofing-beige to-roofing-cream",
      expandedDescription: "Strong winds can lift, tear, or completely remove shingles, exposing your roof's underlayment and creating vulnerable areas for water infiltration."
    },
    {
      title: "Storm-related debris",
      icon: Trash2,
      description: "Damage from flying debris",
      gradient: "from-roofing-beige via-orange-200 to-roofing-beige",
      expandedDescription: "During storms, flying debris can cause punctures, scratches, and other forms of impact damage that compromise your roof's protective layer."
    },
    {
      title: "Fallen tree limbs",
      icon: TreePine,
      description: "Impact from fallen branches",
      gradient: "from-orange-100 via-roofing-cream to-orange-100",
      expandedDescription: "Heavy branches and fallen trees can cause severe structural damage to your roof, requiring immediate professional attention to prevent further issues."
    },
    {
      title: "Leaks due to severe weather",
      icon: CloudRain,
      description: "Water infiltration issues",
      gradient: "from-roofing-cream via-orange-100 to-roofing-cream",
      expandedDescription: "Severe weather can expose vulnerabilities in your roof, leading to water infiltration that can damage your home's interior and compromise structural integrity."
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
              className="h-[250px] perspective"
              onMouseEnter={() => setFlippedCard(index)}
              onMouseLeave={() => setFlippedCard(null)}
            >
              <div 
                className="relative w-full h-full transition-all duration-500 preserve-3d"
                style={{
                  transform: `rotateY(${flippedCard === index ? '180deg' : '0deg'})`
                }}
              >
                {/* Front of card */}
                <div className={`absolute inset-0 bg-gradient-to-br ${damage.gradient} p-6 rounded-xl shadow-md backface-hidden border border-roofing-orange/20`}>
                  <div className="flex flex-col items-center text-center space-y-4">
                    <motion.div 
                      className="p-4 bg-white/80 rounded-full shadow-inner group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <damage.icon className="w-8 h-8 text-roofing-orange" />
                    </motion.div>
                    
                    <h3 className="text-lg font-semibold text-roofing-charcoal group-hover:text-roofing-orange transition-colors duration-300">
                      {damage.title}
                    </h3>
                    <p className="text-sm text-roofing-charcoal/70">
                      {damage.description}
                    </p>
                    
                    <motion.div
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-roofing-orange"
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Info className="w-5 h-5" />
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>

                {/* Back of card */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-roofing-orange via-roofing-orange-dark to-roofing-charcoal p-6 rounded-xl shadow-md backface-hidden"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <div className="flex flex-col h-full justify-center text-center">
                    <h3 className="text-xl font-semibold text-roofing-cream mb-4">{damage.title}</h3>
                    <p className="text-roofing-cream/90 text-sm leading-relaxed">
                      {damage.expandedDescription}
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