import { motion } from "framer-motion";
import { LucideIcon, Info, ArrowRight } from "lucide-react";

interface ReasonCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export const ReasonCard = ({ title, description, Icon }: ReasonCardProps) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
        },
      },
    }}
    whileHover={{ scale: 1.05 }}
    className="bg-gradient-to-br from-white via-roofing-cream to-roofing-beige backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 transform transition-all duration-300 hover:shadow-2xl border border-roofing-orange/20 relative group"
  >
    <div className="flex flex-col items-center text-center space-y-4">
      <motion.div 
        className="p-4 bg-gradient-to-r from-roofing-orange to-roofing-orange-dark rounded-full text-white shadow-lg"
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="w-8 h-8" />
      </motion.div>
      <h3 className="text-xl font-bold bg-gradient-to-r from-roofing-charcoal to-roofing-orange-dark bg-clip-text text-transparent">{title}</h3>
      <p className="text-roofing-charcoal/80 leading-relaxed">{description}</p>
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-roofing-orange"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Info className="w-5 h-5 animate-pulse" />
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </motion.div>
    </div>
  </motion.div>
);