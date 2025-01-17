import EnhancedHero from "@/components/EnhancedHero";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Wrench, Clock, Info } from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
  const [shouldStayFlipped, setShouldStayFlipped] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const timeouts: { [key: number]: NodeJS.Timeout } = {};
    
    return () => {
      Object.values(timeouts).forEach(timeout => clearTimeout(timeout));
    };
  }, []);

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

  const handleMouseEnter = (index: number) => {
    setFlippedCards(prev => ({ ...prev, [index]: true }));
    setShouldStayFlipped(prev => ({ ...prev, [index]: true }));
  };

  const handleMouseLeave = (index: number) => {
    // Add a longer delay before unflipping to make it smoother
    setTimeout(() => {
      if (!shouldStayFlipped[index]) return;
      setFlippedCards(prev => ({ ...prev, [index]: false }));
      setShouldStayFlipped(prev => ({ ...prev, [index]: false }));
    }, 300); // Increased delay for smoother transition
  };

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
                className="h-[400px] perspective group"
              >
                <motion.div 
                  className="relative h-full w-full preserve-3d cursor-pointer transition-all duration-500"
                  animate={{ 
                    rotateY: (flippedCards[index] || shouldStayFlipped[index]) ? 180 : 0,
                    scale: 1.02 // Slight scale up by default
                  }}
                  whileHover={{ scale: 1.05 }} // Additional scale on hover
                  transition={{ 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 70, // Reduced stiffness for smoother animation
                    damping: 25, // Increased damping for more stability
                    scale: { duration: 0.3 } // Separate transition for scale
                  }}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  {/* Front of card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-roofing-cream via-white to-roofing-beige backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 backface-hidden border border-roofing-orange/20">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="p-3 bg-gradient-to-r from-roofing-orange to-roofing-orange-dark rounded-full text-white shadow-lg"
                      >
                        <feature.icon className="w-6 h-6" />
                      </motion.div>
                      <h3 className="text-xl font-semibold bg-gradient-to-r from-roofing-charcoal to-roofing-orange-dark bg-clip-text text-transparent">
                        {feature.title}
                      </h3>
                      <p className="text-roofing-charcoal/80 leading-relaxed font-medium">{feature.description}</p>
                      <motion.div
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2"
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Info className="w-5 h-5 text-roofing-orange animate-pulse" />
                        <ArrowRight className="w-5 h-5 text-roofing-orange group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-roofing-orange via-roofing-orange-dark to-roofing-charcoal backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 backface-hidden"
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    <div className="flex flex-col h-full text-white">
                      <h3 className="text-2xl font-semibold mb-6 text-roofing-cream">{feature.title}</h3>
                      {feature.image && (
                        <motion.div 
                          className="mb-4 rounded-lg overflow-hidden shadow-xl"
                          whileHover={{ scale: 1.05 }}
                        >
                          <img 
                            src={feature.image} 
                            alt={feature.title}
                            className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-500"
                          />
                        </motion.div>
                      )}
                      <p className="text-lg mb-8 text-roofing-cream/90 leading-relaxed">
                        {feature.expandedDescription}
                      </p>
                    </div>
                  </div>
                </motion.div>
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