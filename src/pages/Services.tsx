import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Home, Building2, Wrench, PaintBucket } from "lucide-react";
import PromoCountdown from "@/components/PromoCountdown";
import { useState, useEffect } from "react";

const Services = () => {
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
        }, 1000);
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
    <main className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-roofing-charcoal mb-2 relative">
            <span className="relative inline-block pb-2">
              Our Roofing Services
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-l from-roofing-orange via-roofing-orange-dark to-roofing-cream"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h1>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Comprehensive roofing solutions for residential and commercial properties.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {[
            {
              icon: Home,
              title: "Residential Roofing",
              description: "Expert installation and repair services for homes of all sizes.",
              features: ["Shingle Installation", "Leak Repair", "Maintenance", "Emergency Services"],
              fact: "Did you know? The average residential roof has over 10,000 individual shingles!",
              image: "/lovable-uploads/1ed3c427-6ca8-454e-adf5-d25edcf467a5.png"
            },
            {
              icon: Building2,
              title: "Commercial Roofing",
              description: "Professional solutions for businesses and commercial properties.",
              features: ["Flat Roofing", "TPO/EPDM Systems", "Preventive Maintenance", "24/7 Support"],
              fact: "Fun fact: Commercial roofs can last up to 50 years with proper maintenance!",
              image: "/lovable-uploads/f1a0c45a-862b-4b13-adf5-442bf18e0a3f.png"
            },
            {
              icon: Wrench,
              title: "Roof Repair",
              description: "Quick and reliable repair services to protect your property.",
              features: ["Storm Damage", "Leak Detection", "Gutter Repair", "Ventilation Fix"],
              fact: "Interesting fact: Most roof leaks are found around chimneys and vents, not in the open areas!",
              image: "/lovable-uploads/16c50230-228c-4910-af52-24b168e003c9.png"
            },
            {
              icon: PaintBucket,
              title: "Roof Maintenance",
              description: "Regular maintenance to extend the life of your roof.",
              features: ["Inspections", "Cleaning", "Coating", "Preventive Care"],
              fact: "Pro tip: Regular maintenance can double the lifespan of your roof!",
              image: "/lovable-uploads/0731486e-2755-4069-b85d-d32667dca65c.png"
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group perspective h-[450px]"
            >
              <div 
                className="relative w-full h-full preserve-3d transition-all duration-500 cursor-pointer"
                style={{
                  transform: `rotateY(${(flippedCards[index] || shouldStayFlipped[index]) ? '180deg' : '0deg'})`
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {/* Front of card */}
                <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden">
                  <div className="h-full bg-gradient-to-br from-white via-roofing-cream to-roofing-beige p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-roofing-orange/20 backdrop-blur-sm transition-all duration-300 group-hover:shadow-2xl">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-4 bg-gradient-to-br from-roofing-orange to-roofing-orange-dark rounded-xl text-white shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                          <service.icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-roofing-charcoal to-roofing-orange-dark bg-clip-text text-transparent">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                      <ul className="space-y-4 mb-8">
                        {service.features.map((feature, idx) => (
                          <motion.li 
                            key={idx} 
                            className="flex items-center gap-3 text-gray-700"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-roofing-orange to-roofing-orange-dark" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                      <motion.div
                        className="mt-auto text-sm text-roofing-orange text-center"
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Hover to learn more
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div 
                  className="absolute w-full h-full backface-hidden [transform:rotateY(180deg)] rounded-xl overflow-hidden"
                >
                  <div className="h-full bg-gradient-to-br from-roofing-orange via-roofing-orange-dark to-roofing-charcoal p-8 text-white shadow-2xl">
                    <div className="flex flex-col h-full">
                      <h3 className="text-2xl font-bold mb-6">{service.title}</h3>
                      {service.image && (
                        <div className="relative mb-6 group/image">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
                          <img 
                            src={service.image} 
                            alt={service.title}
                            className="w-full h-48 object-cover rounded-lg shadow-lg transform transition-transform duration-300 group-hover/image:scale-105"
                          />
                        </div>
                      )}
                      <p className="text-lg mb-8 text-roofing-cream">{service.fact}</p>
                      <div className="mt-auto">
                        <Button
                          asChild
                          variant="outline"
                          className="w-full border-2 border-white bg-white/10 text-white hover:bg-white hover:text-roofing-orange transition-all duration-300 group"
                        >
                          <Link to="/estimate">
                            Get Estimate
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
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
          className="text-center rounded-xl overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-roofing-orange/20 to-roofing-cream/20 backdrop-blur-sm" />
          <div className="relative p-12">
            <h2 className="text-3xl font-bold text-roofing-charcoal mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-600 mb-8">
              Contact us today for a free consultation and estimate.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-roofing-orange to-roofing-orange-dark text-white hover:from-roofing-orange-dark hover:to-roofing-orange transition-all duration-300 transform hover:scale-105 group shadow-lg"
            >
              <Link to="/contact">
                Contact Us Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
      <PromoCountdown />
    </main>
  );
};

export default Services;
