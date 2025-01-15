import { motion } from "framer-motion";

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
}

export const ProjectCard = ({ image, title, description }: ProjectCardProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="relative overflow-hidden rounded-xl shadow-lg aspect-video"
  >
    <img
      src={image}
      alt={title}
      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
      <div className="absolute bottom-0 p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-200">{description}</p>
      </div>
    </div>
  </motion.div>
);