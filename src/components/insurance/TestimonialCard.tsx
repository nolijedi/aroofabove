import { motion } from "framer-motion";
import { Star, Info, ArrowRight } from "lucide-react";
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
      className="h-[450px] [perspective:1000px]"
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
        className="relative w-full h-full [transform-style:preserve-3d] cursor-pointer hover:scale-105 transition-transform duration-300"
        style={{ transformOrigin: "center" }}
      >
        {/* Front of card */}
        <div 
          className="absolute w-full h-full [backface-visibility:hidden] rounded-xl"
          style={{ transform: 'rotateY(0deg)' }}
        >
          <div className="bg-gradient-to-br from-white via-roofing-cream to-roofing-beige backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 h-full flex flex-col justify-between border border-roofing-orange/20">
            <div className="flex flex-col items-center text-center space-y-3">
              <motion.div 
                className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-roofing-orange ring-offset-2"
                whileHover={{ scale: 1.1 }}
              >
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-roofing-charcoal to-roofing-orange-dark bg-clip-text text-transparent">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.location}</p>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star className="w-4 h-4 fill-roofing-orange text-roofing-orange" />
                  </motion.div>
                ))}
              </div>
              <p className="text-roofing-orange font-bold text-2xl bg-gradient-to-r from-roofing-orange to-roofing-orange-dark bg-clip-text text-transparent">{testimonial.saved}</p>
              <p className="text-gray-600 italic text-sm leading-tight relative">
                <span className="text-4xl text-roofing-orange/20 absolute -top-4 -left-2">"</span>
                {testimonial.quote}
                <span className="text-4xl text-roofing-orange/20 absolute -bottom-4 -right-2">"</span>
              </p>
            </div>
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
          className="absolute w-full h-full [backface-visibility:hidden] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-gradient-to-br from-roofing-orange via-roofing-orange-dark to-roofing-charcoal p-6 flex items-center justify-center"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-4">Damage Details</h3>
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src={testimonial.damageImage}
                alt="Roof damage"
                className="w-full h-40 object-cover rounded-lg mb-4 shadow-xl transform transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
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