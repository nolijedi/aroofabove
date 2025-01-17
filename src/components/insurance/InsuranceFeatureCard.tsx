import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface InsuranceFeatureCardProps {
  feature: {
    icon: LucideIcon;
    title: string;
    description: string;
    expandedDescription: string;
    image: string;
  };
  index: number;
  flippedCards: { [key: number]: boolean };
  shouldStayFlipped: { [key: number]: boolean };
  onMouseEnter: (index: number) => void;
  onMouseLeave: (index: number) => void;
}

const InsuranceFeatureCard = ({
  feature,
  index,
  flippedCards,
  shouldStayFlipped,
  onMouseEnter,
  onMouseLeave,
}: InsuranceFeatureCardProps) => {
  const Icon = feature.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="group h-[400px] perspective"
    >
      <div 
        className="relative h-full w-full transition-all duration-500 preserve-3d hover:scale-105"
        style={{
          transform: `rotateY(${(flippedCards[index] || shouldStayFlipped[index]) ? '180deg' : '0deg'})`
        }}
        onMouseEnter={() => onMouseEnter(index)}
        onMouseLeave={() => onMouseLeave(index)}
      >
        {/* Front of card */}
        <div className="absolute inset-0 bg-gradient-to-br from-roofing-cream via-white to-roofing-beige backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 backface-hidden border border-roofing-orange/20">
          <div className="flex flex-col items-center text-center space-y-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-3 bg-gradient-to-r from-roofing-orange to-roofing-orange-dark rounded-full text-white shadow-lg"
            >
              <Icon className="w-6 h-6" />
            </motion.div>
            <h3 className="text-xl font-semibold bg-gradient-to-r from-roofing-charcoal to-roofing-orange-dark bg-clip-text text-transparent">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-sm text-roofing-orange">Hover to learn more</p>
            </motion.div>
          </div>
        </div>

        {/* Back of card */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-roofing-orange via-roofing-orange-dark to-roofing-charcoal backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="flex flex-col h-full text-white">
            <h3 className="text-2xl font-semibold mb-6 text-roofing-cream">{feature.title}</h3>
            {feature.image && (
              <motion.div 
                className="mb-4 rounded-lg overflow-hidden shadow-xl"
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            )}
            <p className="text-lg mb-8 text-roofing-cream/90 leading-relaxed">{feature.expandedDescription}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InsuranceFeatureCard;