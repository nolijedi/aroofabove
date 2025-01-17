import { useState, useEffect } from "react";
import { Home, Building2, Wrench, PaintBucket } from "lucide-react";
import PromoCountdown from "@/components/PromoCountdown";
import ServicesHeader from "@/components/services/ServicesHeader";
import ServiceCard from "@/components/services/ServiceCard";
import ServicesCallToAction from "@/components/services/ServicesCallToAction";

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

  const services = [
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
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <ServicesHeader />
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              index={index}
              {...service}
              flipped={flippedCards[index] || shouldStayFlipped[index]}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            />
          ))}
        </div>

        <ServicesCallToAction />
      </div>
      <PromoCountdown />
    </main>
  );
};

export default Services;