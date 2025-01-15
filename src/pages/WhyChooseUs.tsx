import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Clock, Shield, Wrench, Users, Zap } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const WhyChooseUs = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-roofing-orange to-orange-300">
            Why Choose A Roof Above?
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            With years of experience and a commitment to excellence, we deliver superior roofing solutions tailored to your needs.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-2xl border border-white/10"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-gradient-to-r from-roofing-orange to-orange-500 rounded-full text-white">
                  <reason.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {reason.title}
                </h3>
                <p className="text-gray-300">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our Recent Projects
          </h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {projects.map((project, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative overflow-hidden rounded-xl shadow-lg aspect-video"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                      <div className="absolute bottom-0 p-6">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-200">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/10"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Start Your Roofing Project?
          </h2>
          <p className="text-gray-300 mb-6">
            Contact us today for a free consultation and estimate.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-roofing-orange to-orange-500 hover:from-roofing-orange-dark hover:to-orange-600 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <span>Get Started Today</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChooseUs;