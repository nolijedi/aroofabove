import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, DollarSign, FileCheck } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "Dallas, TX",
    quote: "A Roof Above helped me get $15,000 more on my claim than the insurance company initially offered. Their expertise in dealing with adjusters was invaluable!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070",
    saved: "$15,000"
  },
  {
    name: "Michael Rodriguez",
    location: "Fort Worth, TX",
    quote: "When my insurance company denied my claim, A Roof Above stepped in and got it approved within a week. Their knowledge of the claims process is unmatched.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2070",
    saved: "$22,500"
  },
  {
    name: "Emily Chen",
    location: "Arlington, TX",
    quote: "The team at A Roof Above handled everything with my insurance company. They documented all the damage professionally and got me full replacement coverage!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2070",
    saved: "$18,750"
  },
  {
    name: "David Thompson",
    location: "Plano, TX",
    quote: "I was amazed at how smooth the insurance claim process was with A Roof Above. They knew exactly what documentation was needed and handled everything.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070",
    saved: "$20,000"
  }
];

const features = [
  {
    icon: Shield,
    title: "Expert Claims Advocacy",
    description: "Our team of insurance specialists works directly with your insurance company to maximize your claim.",
    expandedDescription: "We have years of experience dealing with insurance companies and know exactly what documentation they need to approve your claim quickly.",
    image: "/lovable-uploads/10a995fa-6759-4932-b918-b83c2dd741d7.png"
  },
  {
    icon: Clock,
    title: "Fast Claim Processing",
    description: "We expedite your claim process with thorough documentation and prompt responses.",
    expandedDescription: "Our streamlined process ensures your claim is processed as quickly as possible, often reducing wait times by weeks.",
    image: "/lovable-uploads/6e209d79-c584-48f2-9696-9aacf51e851d.png"
  },
  {
    icon: DollarSign,
    title: "Maximum Coverage",
    description: "We ensure you get every dollar you deserve from your insurance claim.",
    expandedDescription: "Our detailed damage assessments and documentation help secure the maximum coverage available under your policy.",
    image: "/lovable-uploads/16c50230-228c-4910-af52-24b168e003c9.png"
  },
  {
    icon: FileCheck,
    title: "Complete Documentation",
    description: "We handle all paperwork and provide comprehensive documentation.",
    expandedDescription: "Our thorough documentation process includes detailed photos, measurements, and damage assessments that insurance companies can't deny.",
    image: "/lovable-uploads/0731486e-2755-4069-b85d-d32667dca65c.png"
  }
];

const InsuranceClaims = () => {
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
    <main className="min-h-screen pt-40 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-roofing-charcoal mb-6">
            Insurance Claims Made Easy
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Let us handle your insurance claim process from start to finish.
          </p>
        </motion.div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
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
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 backface-hidden">
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
                  className="absolute inset-0 bg-gradient-to-br from-roofing-orange/90 to-roofing-orange-dark/90 backdrop-blur-sm rounded-xl shadow-lg p-8 backface-hidden"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <div className="flex flex-col h-full text-white">
                    <h3 className="text-2xl font-semibold mb-6">{feature.title}</h3>
                    {feature.image && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img 
                          src={feature.image} 
                          alt={feature.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    <p className="text-lg mb-8">{feature.expandedDescription}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-roofing-charcoal text-center mb-12">
            Success Stories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-roofing-charcoal">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                  <p className="text-roofing-orange font-bold text-xl">Saved {testimonial.saved}</p>
                  <p className="text-gray-600 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-roofing-orange/10 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-roofing-charcoal mb-4">
            Ready to Start Your Claim?
          </h2>
          <p className="text-gray-600 mb-6">
            Contact us today for a free consultation and claim assessment.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-roofing-orange text-white hover:bg-roofing-orange-dark group"
          >
            <Link to="/contact">
              Start Your Claim Now
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
};

export default InsuranceClaims;