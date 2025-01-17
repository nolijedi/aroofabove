import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  fact: string;
}

export const ProjectCard = ({ image, title, description, fact }: ProjectCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [shouldStayFlipped, setShouldStayFlipped] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!isFlipped && shouldStayFlipped) {
      timeout = setTimeout(() => {
        setShouldStayFlipped(false);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [isFlipped, shouldStayFlipped]);

  const handleMouseEnter = () => {
    setIsFlipped(true);
    setShouldStayFlipped(true);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
  };

  return (
    <div className="perspective h-full">
      <motion.div
        animate={{ rotateY: isFlipped || shouldStayFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-full preserve-3d cursor-pointer"
        onHoverStart={handleMouseEnter}
        onHoverEnd={handleMouseLeave}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="relative overflow-hidden rounded-xl shadow-lg aspect-video group h-full">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-roofing-charcoal/90 to-transparent">
              <div className="absolute bottom-0 p-6">
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-roofing-cream">{description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div 
          className="absolute w-full h-full backface-hidden rounded-xl shadow-lg bg-roofing-orange p-6 flex items-center justify-center"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-4">Did You Know?</h3>
            <p className="text-roofing-cream text-lg leading-relaxed">{fact}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};