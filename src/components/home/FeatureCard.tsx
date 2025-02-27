import { motion } from "framer-motion";
import { LucideIcon, Info, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface FeatureCardProps {
  feature: {
    icon: LucideIcon;
    title: string;
    description: string;
    expandedDescription: string;
    image: string;
  };
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isMobile = useIsMobile();
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="h-[400px] w-full [perspective:1000px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{ 
          duration: isMobile ? 0.2 : 0.8,
          type: isMobile ? "tween" : "spring",
          stiffness: isMobile ? 100 : 60,
          damping: isMobile ? 8 : 15
        }}
        className="relative w-full h-full [transform-style:preserve-3d]"
        style={{
          transformOrigin: "center"
        }}
      >
        {/* Front of card */}
        <div 
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-gradient-to-br from-roofing-cream via-white to-roofing-beige backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 border border-roofing-orange/20"
          style={{ transform: 'rotateY(0deg)' }}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-3 bg-gradient-to-r from-roofing-orange to-roofing-orange-dark rounded-full text-white shadow-lg"
            >
              <Icon className="w-6 h-6" />
            </motion.div>
            <h3 className="text-xl font-semibold bg-gradient-to-r from-roofing-charcoal to-roofing-orange-dark bg-clip-text text-transparent">
              {feature.title}
            </h3>
            <p className="text-roofing-charcoal/80 leading-relaxed font-medium">
              {feature.description}
            </p>
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Info className="w-5 h-5 text-roofing-orange animate-pulse" />
              <ArrowRight className="w-5 h-5 text-roofing-orange group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </div>
        </div>

        {/* Back of card */}
        <div 
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-gradient-to-br from-roofing-orange via-roofing-orange-dark to-roofing-charcoal backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="flex flex-col h-full">
            <h3 className="text-2xl font-semibold mb-4 text-roofing-cream">{feature.title}</h3>
            {feature.image && (
              <motion.div 
                className="relative mb-4 rounded-lg overflow-hidden shadow-xl h-40 sm:h-48"
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
            <p className="text-sm sm:text-base text-roofing-cream/90 leading-relaxed">
              {feature.expandedDescription}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FeatureCard;