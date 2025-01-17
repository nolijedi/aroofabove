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
        className="relative h-full w-full transition-all duration-500 preserve-3d"
        style={{
          transform: `rotateY(${(flippedCards[index] || shouldStayFlipped[index]) ? '180deg' : '0deg'})`
        }}
        onMouseEnter={() => onMouseEnter(index)}
        onMouseLeave={() => onMouseLeave(index)}
      >
        {/* Front of card */}
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 backface-hidden">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 bg-roofing-orange rounded-full text-white">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-roofing-charcoal">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        </div>

        {/* Back of card */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-roofing-orange/90 to-roofing-orange-dark/90 backdrop-blur-sm rounded-xl shadow-lg p-8 backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="flex flex-col h-full text-white">
            <h3 className="text-2xl font-semibold mb-6">{feature.title}</h3>
            {feature.image && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
            <p className="text-lg mb-8">{feature.expandedDescription}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InsuranceFeatureCard;