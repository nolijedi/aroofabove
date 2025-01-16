import { motion } from "framer-motion";
import { Award, Users, Clock, Shield, ThumbsUp, Gem } from "lucide-react";
import { ReasonCard } from "./ReasonCard";

const reasons = [
  {
    Icon: Award,
    title: "Expert Craftsmanship",
    description: "Our team brings years of experience and expertise to every project."
  },
  {
    Icon: Users,
    title: "Customer-First Approach",
    description: "We prioritize your needs and ensure complete satisfaction."
  },
  {
    Icon: Clock,
    title: "Timely Completion",
    description: "We respect your time and deliver projects on schedule."
  },
  {
    Icon: Shield,
    title: "Quality Materials",
    description: "We use only premium materials for lasting results."
  },
  {
    Icon: ThumbsUp,
    title: "Licensed & Insured",
    description: "Full compliance and protection for your peace of mind."
  },
  {
    Icon: Gem,
    title: "Competitive Pricing",
    description: "Fair and transparent pricing for all our services."
  }
];

export const ReasonsSection = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
    {reasons.map((reason, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
      >
        <ReasonCard {...reason} />
      </motion.div>
    ))}
  </div>
);