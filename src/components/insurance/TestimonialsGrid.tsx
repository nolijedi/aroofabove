import TestimonialCard from "./TestimonialCard";
import { testimonials } from "@/data/testimonials";

const TestimonialsGrid = () => {
  return (
    <div className="section-gradient-separator">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialsGrid;