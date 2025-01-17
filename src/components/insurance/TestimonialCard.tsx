import { motion } from "framer-motion";

interface TestimonialCardProps {
  testimonial: {
    name: string;
    location: string;
    quote: string;
    image: string;
    saved: string;
  };
  index: number;
}

const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
    >
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
        <p className="text-roofing-orange font-bold text-xl">Saved {testimonial.saved}</p>
        <p className="text-gray-600 italic">&ldquo;{testimonial.quote}&rdquo;</p>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;