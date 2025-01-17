import EnhancedHero from "@/components/EnhancedHero";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Wrench, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description: "We stand behind our work with industry-leading warranties.",
      expandedDescription: "Our comprehensive warranty coverage ensures your peace of mind. We use only premium materials and follow strict quality control processes to deliver roofing solutions that stand the test of time.",
      image: "/lovable-uploads/10a995fa-6759-4932-b918-b83c2dd741d7.png"
    },
    {
      icon: Wrench,
      title: "Expert Craftsmanship",
      description: "Our skilled team brings years of experience to every project.",
      expandedDescription: "Our team of certified professionals has decades of combined experience in residential and commercial roofing. We stay updated with the latest industry standards and techniques.",
      image: "/lovable-uploads/6e209d79-c584-48f2-9696-9aacf51e851d.png"
    },
    {
      icon: Clock,
      title: "Timely Service",
      description: "We respect your time and complete projects on schedule.",
      expandedDescription: "Our efficient project management ensures minimal disruption to your daily life. We provide detailed timelines and keep you informed throughout the entire process.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1920"
    }
  ];

  return (
    <main className="min-h-screen">
      <EnhancedHero />
      
      {/* Features Section */}
      <section className="py-20 px-4 bg-white/80">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="h-[400px] perspective"
              >
                <div className="relative w-full h-full preserve-3d cursor-pointer transition-transform duration-300">
                  <div className="absolute w-full h-full backface-hidden">
                    <div className="bg-gradient-to-br from-white via-roofing-cream to-roofing-beige backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 h-full flex flex-col justify-between border border-roofing-orange/20">
                      <div className="flex flex-col items-center text-center space-y-6">
                        <motion.div 
                          className="p-4 bg-gradient-to-r from-roofing-orange to-roofing-orange-dark rounded-full text-white shadow-lg"
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <feature.icon className="w-8 h-8" />
                        </motion.div>
                        
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-roofing-charcoal to-roofing-orange-dark bg-clip-text text-transparent">
                          {feature.title}
                        </h3>
                        
                        <p className="text-gray-600 italic text-lg leading-relaxed relative">
                          <span className="text-4xl text-roofing-orange/20 absolute -top-4 -left-2">"</span>
                          {feature.description}
                          <span className="text-4xl text-roofing-orange/20 absolute -bottom-4 -right-2">"</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
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
    </main>
  );
};

export default Index;