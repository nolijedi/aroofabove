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
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
        className="relative w-full h-full preserve-3d cursor-pointer"
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-roofing-charcoal">
                {testimonial.name}
              </h3>
              <p className="text-sm text-gray-500">{testimonial.location}</p>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className="w-4 h-4 fill-roofing-orange text-roofing-orange" 
                  />
                ))}
              </div>
              <p className="text-roofing-orange font-bold text-lg">
                {testimonial.saved}
              </p>
              <p className="text-gray-600 italic text-sm leading-tight">
                "{testimonial.quote}"
              </p>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div 
          className="absolute w-full h-full backface-hidden rounded-xl shadow-lg bg-roofing-orange p-6 flex items-center justify-center"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-4">Damage Details</h3>
            <img 
              src={testimonial.damageImage}
              alt="Roof damage"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <p className="text-roofing-cream text-sm leading-relaxed">
              {testimonial.description || "Severe roof damage caused by recent storms required immediate professional attention. Our team successfully restored the roof to pristine condition."}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TestimonialCard;