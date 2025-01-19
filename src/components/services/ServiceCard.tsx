import { motion } from "framer-motion";
import { LucideIcon, Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  index: number;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  fact: string;
  image: string;
  flipped: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ServiceCard = ({
  index,
  icon: Icon,
  title,
  description,
  features,
  fact,
  image,
  flipped,
  onMouseEnter,
  onMouseLeave,
}: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="group h-[500px] sm:h-[450px] [perspective:1000px]"
    >
      <div 
        className="relative w-full h-full [transform-style:preserve-3d] transition-all duration-500 cursor-pointer"
        style={{
          transform: `rotateY(${flipped ? '180deg' : '0deg'})`,
          transformOrigin: "center"
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Front of card */}
        <div 
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-gradient-to-br from-white via-roofing-cream to-roofing-beige p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-roofing-orange/20 backdrop-blur-sm transition-all duration-300 group-hover:shadow-2xl rounded-xl"
          style={{ transform: 'rotateY(0deg)' }}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-gradient-to-br from-roofing-orange to-roofing-orange-dark rounded-xl text-white shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                <Icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-roofing-charcoal to-roofing-orange-dark bg-clip-text text-transparent">
                {title}
              </h3>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">{description}</p>
            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
              {features.map((feature, idx) => (
                <motion.li 
                  key={idx} 
                  className="flex items-center gap-3 text-gray-700 text-sm sm:text-base"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-roofing-orange to-roofing-orange-dark" />
                  {feature}
                </motion.li>
              ))}
            </ul>
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
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-gradient-to-br from-roofing-orange via-roofing-orange-dark to-roofing-charcoal p-6 sm:p-8 text-white shadow-2xl rounded-xl"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="flex flex-col h-full">
            <h3 className="text-xl sm:text-2xl font-bold mb-6">{title}</h3>
            {image && (
              <div className="relative mb-6 group/image">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
                <img 
                  src={image} 
                  alt={title}
                  className="w-full h-36 sm:h-48 object-cover rounded-lg shadow-lg transform transition-transform duration-300 group-hover/image:scale-105"
                />
              </div>
            )}
            <p className="text-base sm:text-lg mb-6 sm:mb-8 text-roofing-cream flex-grow">{fact}</p>
            <div className="mt-auto">
              <Button
                asChild
                variant="outline"
                className="w-full border-2 border-white bg-white/10 text-white hover:bg-white hover:text-roofing-orange transition-all duration-300 group"
              >
                <Link to="/estimate">
                  Get Estimate
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;