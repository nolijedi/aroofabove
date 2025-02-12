import { Home, Building2, Wrench, PaintBucket } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ServiceCard from "@/components/services/ServiceCard";

const services = [
  {
    icon: Home,
    title: "Residential Roofing",
    description: "Expert installation and repair services for homes of all sizes.",
    features: ["Shingle Installation", "Leak Repair", "Maintenance", "Emergency Services"],
    fact: "Did you know? The average residential roof has over 10,000 individual shingles!",
    image: "/images/1ed3c427-6ca8-454e-adf5-d25edcf467a5.png"
  },
  {
    icon: Building2,
    title: "Commercial Roofing",
    description: "Professional solutions for businesses and commercial properties.",
    features: ["Flat Roofing", "TPO/EPDM Systems", "Preventive Maintenance", "24/7 Support"],
    fact: "Fun fact: Commercial roofs can last up to 50 years with proper maintenance!",
    image: "/images/f1a0c45a-862b-4b13-adf5-442bf18e0a3f.png"
  },
  {
    icon: Wrench,
    title: "Roof Repair",
    description: "Quick and reliable repair services to protect your property.",
    features: ["Storm Damage", "Leak Detection", "Gutter Repair", "Ventilation Fix"],
    fact: "Interesting fact: Most roof leaks are found around chimneys and vents, not in the open areas!",
    image: "/images/16c50230-228c-4910-af52-24b168e003c9.png"
  },
  {
    icon: PaintBucket,
    title: "Roof Maintenance",
    description: "Regular maintenance to extend the life of your roof.",
    features: ["Inspections", "Cleaning", "Coating", "Preventive Care"],
    fact: "Pro tip: Regular maintenance can double the lifespan of your roof!",
    image: "/images/0731486e-2755-4069-b85d-d32667dca65c.png"
  }
];

const Services = () => {
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});
  const [shouldStayFlipped, setShouldStayFlipped] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const timeouts: { [key: string]: NodeJS.Timeout } = {};
    
    Object.entries(flippedCards).forEach(([title, isFlipped]) => {
      if (!isFlipped && shouldStayFlipped[title]) {
        timeouts[title] = setTimeout(() => {
          setShouldStayFlipped(prev => ({
            ...prev,
            [title]: false
          }));
        }, 1000);
      }
    });

    return () => {
      Object.values(timeouts).forEach(timeout => clearTimeout(timeout));
    };
  }, [flippedCards, shouldStayFlipped]);

  const handleMouseEnter = (title: string) => {
    setFlippedCards(prev => ({ ...prev, [title]: true }));
    setShouldStayFlipped(prev => ({ ...prev, [title]: true }));
  };

  const handleMouseLeave = (title: string) => {
    setFlippedCards(prev => ({ ...prev, [title]: false }));
  };

  return (
    <main className="min-h-screen pt-32 pb-16 px-4 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 mt-[-2rem] section-gradient-separator transform hover:scale-105 transition-all duration-500"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-roofing-charcoal mb-2 relative">
            <span className="relative inline-block pb-2">
              Professional Roofing Services
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-l from-roofing-orange via-roofing-orange-dark to-roofing-cream"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h1>
          <p className="text-sm text-roofing-charcoal/80 max-w-xl mx-auto font-medium">
            Quality workmanship and exceptional service for all your roofing needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              index={index}
              {...service}
              flipped={flippedCards[service.title] || shouldStayFlipped[service.title] || false}
              onMouseEnter={() => handleMouseEnter(service.title)}
              onMouseLeave={() => handleMouseLeave(service.title)}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 transform hover:scale-105 transition-all duration-500"
        >
          <Link
            to="/estimate"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-roofing-orange to-roofing-orange-dark text-white rounded-lg font-medium hover:from-roofing-orange-dark hover:to-roofing-orange transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Free Estimate
          </Link>
        </motion.div>
      </div>
    </main>
  );
};

export default Services;