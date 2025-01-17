import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

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
    className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-2xl border border-[#9b87f5]/20 group"
  >
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="p-4 bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] rounded-full text-white shadow-lg transform transition-all duration-300 group-hover:scale-110">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-[#1A1F2C]">{title}</h3>
      <p className="text-[#8E9196] leading-relaxed">{description}</p>
    </div>
  </motion.div>
);