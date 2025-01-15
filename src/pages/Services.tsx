import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Shield, Wrench, Clock, Award, Users, Zap } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Roof Installation",
      description: "Expert installation of various roofing types.",
      icon: Wrench,
    },
    {
      title: "Roof Repair",
      description: "Quick and reliable roof repair services.",
      icon: Shield,
    },
    {
      title: "Maintenance",
      description: "Regular maintenance to extend the life of your roof.",
      icon: Clock,
    },
    {
      title: "Consultation",
      description: "Professional advice for your roofing needs.",
      icon: Award,
    },
    {
      title: "Emergency Services",
      description: "24/7 emergency roofing services.",
      icon: Users,
    },
    {
      title: "Energy Solutions",
      description: "Energy-efficient roofing options.",
      icon: Zap,
    },
  ];

  const projectImages = [
    {
      url: "https://images.unsplash.com/photo-1632823471406-4c5c7e4c6f24",
      title: "Modern Residential Roof Installation",
      description: "Complete roof replacement with premium materials"
    },
    {
      url: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099",
      title: "Solar Panel Roof Integration",
      description: "Eco-friendly roofing solutions"
    },
    {
      url: "https://images.unsplash.com/photo-1605808978575-e73be210d160",
      title: "Commercial Flat Roof Systems",
      description: "Durable commercial roofing"
    },
    {
      url: "https://images.unsplash.com/photo-1591588582259-e675bd2e6088",
      title: "Traditional Shingle Installation",
      description: "Classic and reliable roofing"
    },
    {
      url: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5",
      title: "Modern Architectural Roofing",
      description: "Contemporary design solutions"
    },
    {
      url: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39",
      title: "Slate Roof Craftsmanship",
      description: "Premium slate roofing"
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

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
            Our Roofing Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Professional roofing solutions for every need
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 transform transition-all duration-300 border border-white/10"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-gradient-to-r from-roofing-orange to-orange-500 rounded-full text-white">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {service.title}
                </h3>
                <p className="text-gray-300">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-16 bg-black/40 backdrop-blur-sm p-8 rounded-lg"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Our Recent Projects</h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {projectImages.map((image, index) => (
                <CarouselItem key={index}>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-1"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm text-white p-4">
                        <h3 className="text-xl font-semibold">{image.title}</h3>
                        <p className="text-sm text-gray-200">{image.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-white border-white hover:bg-white/20" />
            <CarouselNext className="text-white border-white hover:bg-white/20" />
          </Carousel>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
