import { motion } from "framer-motion";
import { Shield, Wrench, Clock } from "lucide-react";
import { ReasonCard } from "./ReasonCard";

const reasons = [
  {
    Icon: Shield,
    title: "Quality Guaranteed",
    description: "We stand behind our work with industry-leading warranties."
  },
  {
    Icon: Wrench,
    title: "Expert Craftsmanship",
    description: "Our skilled team brings years of experience to every project."
  },
  {
    Icon: Clock,
    title: "Timely Service",
    description: "We respect your time and complete projects on schedule."
  }
];

export const ReasonsSection = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 px-4">
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