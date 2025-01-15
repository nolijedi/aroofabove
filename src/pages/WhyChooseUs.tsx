import { Shield, Award, Clock, Wrench, Users, ThumbsUp } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description: "We stand behind our work with industry-leading warranties and guarantees."
    },
    {
      icon: Award,
      title: "Award-Winning Service",
      description: "Recognized for excellence in roofing services and customer satisfaction."
    },
    {
      icon: Clock,
      title: "Timely Service",
      description: "We respect your time with prompt service and clear communication throughout your project."
    },
    {
      icon: Wrench,
      title: "Expert Team",
      description: "Our skilled professionals have years of experience in all aspects of roofing."
    },
    {
      icon: Users,
      title: "Customer Focused",
      description: "Your satisfaction is our priority. We listen to your needs and deliver results."
    },
    {
      icon: ThumbsUp,
      title: "Professional Standards",
      description: "We maintain the highest standards of professionalism and craftsmanship."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-roofing-charcoal via-gray-800 to-roofing-charcoal relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose A Roof Above?
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            With years of experience and a commitment to excellence, we deliver superior roofing solutions tailored to your needs.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300 border border-white/10"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-roofing-orange rounded-full text-white">
                  <reason.icon size={32} />
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3 bg-roofing-orange text-white rounded-full font-semibold hover:bg-roofing-orange-dark transition-colors duration-300"
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChooseUs;