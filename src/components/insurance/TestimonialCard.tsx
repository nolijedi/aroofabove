import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  testimonial: {
    name: string;
    location: string;
    quote: string;
    image: string;
    saved: string;
    description?: string;
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
      className="h-[400px] perspective"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-full preserve-3d cursor-pointer"
        onHoverStart={() => setIsFlipped(true)}
        onHoverEnd={() => setIsFlipped(false)}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 h-full">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-roofing-charcoal">{testimonial.name}</h3>
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
              <p className="text-roofing-orange font-bold text-xl">Saved {testimonial.saved}</p>
              <p className="text-gray-600 italic">&ldquo;{testimonial.quote}&rdquo;</p>
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
              src="/lovable-uploads/5f0ba17d-ca48-4772-a374-1352c4e1d7dc.png"
              alt="Roof damage"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-roofing-cream text-lg leading-relaxed">
              {testimonial.description || "Severe roof damage caused by recent storms required immediate professional attention. Our team successfully restored the roof to pristine condition."}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TestimonialCard;