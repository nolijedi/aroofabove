import { motion } from "framer-motion";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "Los Angeles, CA",
    quote: "After the storm damaged our roof, we were worried about the insurance claim process. This team made it seamless!",
    image: "/lovable-uploads/1ed3c427-6ca8-454e-adf5-d25edcf467a5.png",
    saved: "Saved $12,500",
    description: "Severe hail damage required complete roof replacement. Our team handled the entire insurance claim process.",
    damageImage: "/lovable-uploads/44396b47-f9e4-4da7-92f2-8401f6a62f24.png"
  },
  {
    name: "Michael Chen",
    location: "San Francisco, CA",
    quote: "Professional service from start to finish. They handled everything with our insurance company.",
    image: "/lovable-uploads/6c125ef0-61d1-44fe-bf06-589a6cbe53de.png",
    saved: "Saved $15,750",
    description: "Wind damage caused multiple leaks. We coordinated with insurance for full coverage of repairs.",
    damageImage: "/lovable-uploads/daa7e114-eb17-4afb-945c-aae7a9cb7139.png"
  },
  {
    name: "Emily Rodriguez",
    location: "San Diego, CA",
    quote: "Couldn't be happier with the results. They made the insurance claim process stress-free!",
    image: "/lovable-uploads/c03dc4bd-7520-4829-aa3d-9b436d3d547c.png",
    saved: "Saved $18,200",
    description: "Storm damage required emergency repairs. We expedited the insurance claim for quick resolution.",
    damageImage: "/lovable-uploads/f16aa9d7-ecba-42b3-937b-e83c914719c8.png"
  }
];

const TestimonialsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mb-20"
    >
      <h2 className="text-3xl font-bold text-roofing-charcoal text-center mb-12">
        Success Stories
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default TestimonialsSection;