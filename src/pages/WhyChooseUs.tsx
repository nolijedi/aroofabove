import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Clock, Shield, Wrench, Users, Zap } from "lucide-react";

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
    title: "Residential Roofing",
    description: "Quality roofing solutions for homes"
  },
  {
    image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099",
    title: "Commercial Projects",
    description: "Large-scale commercial roofing"
  },
  {
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843",
    title: "Roof Repairs",
    description: "Expert repair services"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
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
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose A Roof Above?
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            With years of experience and a commitment to excellence, we deliver superior roofing solutions tailored to your needs.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-roofing-orange rounded-full text-white">
                  <reason.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-roofing-charcoal">
                  {reason.title}
                </h3>
                <p className="text-gray-600">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Projects Showcase */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Our Recent Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="overflow-hidden rounded-xl shadow-lg"
              >
                <div className="relative h-64">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
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
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center bg-white/90 backdrop-blur-sm rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-roofing-charcoal mb-4">
            Ready to Start Your Roofing Project?
          </h2>
          <p className="text-gray-600 mb-6">
            Contact us today for a free consultation and estimate.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 bg-roofing-orange hover:bg-roofing-orange-dark text-white px-6 py-3 rounded-lg transition-colors"
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
