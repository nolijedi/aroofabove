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

  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
  const [shouldStayFlipped, setShouldStayFlipped] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const timeouts: { [key: number]: NodeJS.Timeout } = {};
    
    Object.entries(flippedCards).forEach(([index, isFlipped]) => {
      if (!isFlipped && shouldStayFlipped[Number(index)]) {
        timeouts[Number(index)] = setTimeout(() => {
          setShouldStayFlipped(prev => ({
            ...prev,
            [Number(index)]: false
          }));
        }, 1000); // Changed from 5000 to 1000 milliseconds
      }
    });

    return () => {
      Object.values(timeouts).forEach(timeout => clearTimeout(timeout));
    };
  }, [flippedCards, shouldStayFlipped]);

  const handleMouseEnter = (index: number) => {
    setFlippedCards(prev => ({ ...prev, [index]: true }));
    setShouldStayFlipped(prev => ({ ...prev, [index]: true }));
  };

  const handleMouseLeave = (index: number) => {
    setFlippedCards(prev => ({ ...prev, [index]: false }));
  };

  return (
    <main className="min-h-screen">
      <EnhancedHero />
      
      {/* Features Section */}
      <section className="py-20 px-4 bg-white/80">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-roofing-charcoal mb-4">
              Why Choose A Roof Above?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We deliver excellence in every project with our experienced team and premium materials.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group h-[400px] perspective"
              >
                <div 
                  className="relative h-full w-full transition-all duration-500 preserve-3d"
                  style={{
                    transform: `rotateY(${(flippedCards[index] || shouldStayFlipped[index]) ? '180deg' : '0deg'})`
                  }}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  {/* Front of card */}
                  <div className="absolute inset-0 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl backface-hidden">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-3 bg-roofing-orange rounded-full text-white">
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-semibold text-roofing-charcoal">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div 
                    className="absolute inset-0 bg-white p-6 rounded-xl shadow-lg backface-hidden"
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    <div className="h-full flex flex-col">
                      <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                        <img 
                          src={feature.image} 
                          alt={feature.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-roofing-charcoal mb-2">{feature.title}</h3>
                      <p className="text-gray-600 flex-grow">{feature.expandedDescription}</p>
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