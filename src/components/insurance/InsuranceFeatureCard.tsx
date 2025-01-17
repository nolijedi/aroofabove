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
  const gradients = [
    "from-[#F97316] to-[#EA580C]",
    "from-[#8B5CF6] to-[#6D28D9]",
    "from-[#0EA5E9] to-[#0369A1]",
    "from-[#D946EF] to-[#A21CAF]"
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="group h-[400px] perspective"
    >
      <div 
        className="relative h-full w-full transition-all duration-500 preserve-3d shadow-xl hover:shadow-2xl"
        style={{
          transform: `rotateY(${(flippedCards[index] || shouldStayFlipped[index]) ? '180deg' : '0deg'})`
        }}
        onMouseEnter={() => onMouseEnter(index)}
        onMouseLeave={() => onMouseLeave(index)}
      >
        {/* Front of card */}
        <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 backface-hidden border border-gray-100">
          <div className="flex flex-col items-center text-center space-y-6">
            <motion.div 
              className={`p-4 bg-gradient-to-r ${gradients[index % gradients.length]} rounded-2xl text-white shadow-lg`}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon className="w-8 h-8" />
            </motion.div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-roofing-orange to-roofing-orange-dark bg-clip-text text-transparent">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-lg">{feature.description}</p>
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-sm text-roofing-orange font-medium">Hover to learn more</p>
            </motion.div>
          </div>
        </div>

        {/* Back of card */}
        <div 
          className="absolute inset-0 rounded-xl shadow-lg backface-hidden overflow-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="relative h-full">
            {/* Background image with overlay */}
            <div className="absolute inset-0">
              <img 
                src={feature.image} 
                alt={feature.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-90`} />
            </div>
            
            {/* Content */}
            <div className="relative h-full p-8 flex flex-col justify-between z-10">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">{feature.title}</h3>
                <p className="text-white/90 text-lg leading-relaxed">
                  {feature.expandedDescription}
                </p>
              </div>
              <motion.div
                className="mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Icon className="w-8 h-8 text-white/80" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InsuranceFeatureCard;