import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface InsuranceFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  expandedDescription: string;
  image: string;
  gradient: string;
  index: number;
}

const InsuranceFeatureCard = ({
  icon: Icon,
  title,
  description,
  expandedDescription,
  image,
  gradient,
  index
}: InsuranceFeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: `url(${image})`,
          opacity: title === "Expert Claims Advocacy" ? 1 : 0
        }}
      />
      <div className={`relative z-10 ${gradient} p-6 h-full backdrop-blur-sm`}>
        <div className="flex flex-col h-full">
          <div className="mb-4">
            <div className="p-3 bg-white/90 rounded-lg w-fit shadow-lg">
              <Icon className="w-6 h-6 text-roofing-orange" />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2 text-white drop-shadow-md">
            {title}
          </h3>
          <p className="text-roofing-cream mb-4">
            {description}
          </p>
          <p className="text-roofing-beige text-sm mt-auto">
            {expandedDescription}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default InsuranceFeatureCard;