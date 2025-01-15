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
    className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-2xl border border-white/10"
  >
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="p-4 bg-gradient-to-r from-roofing-orange to-orange-500 rounded-full text-white">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  </motion.div>
);