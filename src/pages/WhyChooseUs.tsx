import { motion } from "framer-motion";
import { Award, Clock, Shield, Wrench, Users, Zap } from "lucide-react";
import { ReasonCard } from "@/components/why-choose-us/ReasonCard";
import { ProjectsCarousel } from "@/components/why-choose-us/ProjectsCarousel";
import { CallToAction } from "@/components/why-choose-us/CallToAction";

const reasons = [
  {
    title: "Expert Craftsmanship",
    description: "Our team of skilled professionals brings years of experience and dedication to every project.",
    icon: Wrench,
  },
  {
    title: "Quality Materials",
    description: "We use only the highest quality roofing materials to ensure durability and longevity.",
    icon: Shield,
  },
  {
    title: "Customer Satisfaction",
    description: "Your satisfaction is our priority. We work closely with you throughout the entire process.",
    icon: Users,
  },
  {
    title: "Fast Turnaround",
    description: "We complete projects efficiently without compromising on quality.",
    icon: Clock,
  },
  {
    title: "Licensed & Insured",
    description: "Full peace of mind with our comprehensive insurance coverage and proper licensing.",
    icon: Award,
  },
  {
    title: "Energy Efficient",
    description: "We specialize in energy-efficient roofing solutions that save you money.",
    icon: Zap,
  },
];

const projects = [
  {
    image: "https://images.unsplash.com/photo-1632823471406-4c5c7e4c6f24",
    title: "Modern Residential Roofing",
    description: "Complete roof installations"
  },
  {
    image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099",
    title: "Luxury Home Roofing",
    description: "Premium materials and design"
  },
  {
    image: "https://images.unsplash.com/photo-1605808978575-e73be210d160",
    title: "Traditional Home Roofing",
    description: "Classic style and durability"
  },
  {
    image: "https://images.unsplash.com/photo-1591588582259-e675bd2e6088",
    title: "Emergency Repairs",
    description: "24/7 emergency response"
  },
  {
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f",
    title: "Sustainable Roofing",
    description: "Eco-friendly solutions"
  },
  {
    image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5",
    title: "Custom Design",
    description: "Tailored to your style"
  }
];

const WhyChooseUs = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-roofing-cream via-white to-roofing-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-roofing-orange to-roofing-orange-dark bg-clip-text text-transparent">
            Why Choose A Roof Above?
          </h1>
          <p className="text-xl text-roofing-charcoal max-w-3xl mx-auto">
            With years of experience and a commitment to excellence, we deliver superior roofing solutions tailored to your needs.
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {reasons.map((reason, index) => (
            <ReasonCard
              key={index}
              title={reason.title}
              description={reason.description}
              Icon={reason.icon}
            />
          ))}
        </motion.div>

        <ProjectsCarousel projects={projects} />
        <CallToAction />
      </div>
    </div>
  );
};

export default WhyChooseUs;