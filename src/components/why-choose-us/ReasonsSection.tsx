import { motion } from "framer-motion";
import { Award, Users, Clock, Shield, ThumbsUp, Gem } from "lucide-react";
import { ReasonCard } from "./ReasonCard";

const reasons = [
  {
    Icon: Shield,
    title: "Quality Guaranteed",
    description: "Our comprehensive warranty coverage ensures your peace of mind. We use only premium materials and follow strict quality control processes."
  },
  {
    Icon: Users,
    title: "Expert Craftsmanship",
    description: "Our skilled team brings years of experience and expertise to every project, ensuring the highest quality workmanship."
  },
  {
    Icon: Clock,
    title: "Timely Service",
    description: "We respect your time and complete projects on schedule, minimizing disruption to your daily life."
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