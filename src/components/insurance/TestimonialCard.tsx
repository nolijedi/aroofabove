import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState } from "react";

interface TestimonialCardProps {
  testimonial: {
    name: string;
    location: string;
    quote: string;
    image: string;
    saved: string;
    description?: string;
    damageImage: string;
  };
  index: number;
}

const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

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
      className="h-[450px] perspective"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ 
          duration: 0.6,
          type: "spring",
          stiffness: 100,
          damping: 20
        }}
        className="relative w-full h-full preserve-3d cursor-pointer"
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between p-8 border border-gray-100">
            <div className="flex flex-col items-center text-center space-y-4">
              <motion.div 
                className="relative w-20 h-20"
                whileHover={{ scale: 1.1 }}
              >
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${gradients[index % gradients.length]} blur-lg opacity-50`} />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.location}</p>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star className="w-5 h-5 fill-roofing-orange text-roofing-orange" />
                  </motion.div>
                ))}
              </div>
              <motion.div
                className={`px-4 py-2 rounded-full bg-gradient-to-r ${gradients[index % gradients.length]}`}
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-white font-bold text-lg">{testimonial.saved}</p>
              </motion.div>
              <p className="text-gray-600 italic text-lg leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div 
          className="absolute w-full h-full backface-hidden rounded-xl shadow-xl overflow-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="relative h-full">
            {/* Background image with overlay */}
            <div className="absolute inset-0">
              <img 
                src={testimonial.damageImage}
                alt="Roof damage"
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-90`} />
            </div>
            
            {/* Content */}
            <div className="relative h-full p-8 flex flex-col justify-between z-10 text-white">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Damage Details</h3>
                <p className="text-lg leading-relaxed">
                  {testimonial.description || "Severe roof damage caused by recent storms required immediate professional attention. Our team successfully restored the roof to pristine condition."}
                </p>
              </div>
              <motion.div
                className="text-white/80 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Click to view before & after
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TestimonialCard;