import { Shield, Wrench, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "We stand behind our work with industry-leading warranties.",
    expandedDescription: "Our comprehensive warranty coverage ensures your peace of mind. We use only premium materials and follow strict quality control processes to deliver roofing solutions that stand the test of time.",
    image: "/images/10a995fa-6759-4932-b918-b83c2dd741d7.png"
  },
  {
    icon: Wrench,
    title: "Expert Craftsmanship",
    description: "Our skilled team brings years of experience to every project.",
    expandedDescription: "Our team of certified professionals has decades of combined experience in residential and commercial roofing. We stay updated with the latest industry standards and techniques.",
    image: "/images/6e209d79-c584-48f2-9696-9aacf51e851d.png"
  },
  {
    icon: Clock,
    title: "Timely Service",
    description: "We respect your time and complete projects on schedule.",
    expandedDescription: "Our efficient project management ensures minimal disruption to your daily life. We provide detailed timelines and keep you informed throughout the entire process.",
    image: "/images/f1a0c45a-862b-4b13-adf5-442bf18e0a3f.png"
  }
];

const Features = () => {
  return (
    <section className="py-20 px-4 bg-white/80">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            asChild
            size="lg"
            className="bg-roofing-orange text-white hover:bg-roofing-orange-dark shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
          >
            <Link to="/services" className="flex items-center gap-2">
              Explore Our Services
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform text-white" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;