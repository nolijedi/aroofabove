import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Home, Building2, Wrench, PaintBucket, Info } from "lucide-react";
import PromoCountdown from "@/components/PromoCountdown";
import { useState, useEffect } from "react";
import { ServiceTile } from "@/components/services/ServiceTile";

const Services = () => {
  const [showPromo, setShowPromo] = useState(true);

  useEffect(() => {
    const hasSeenPromo = localStorage.getItem("hasSeenPromo");
    if (hasSeenPromo) {
      setShowPromo(false);
    }
  }, []);

  const handleClosePromo = () => {
    localStorage.setItem("hasSeenPromo", "true");
    setShowPromo(false);
  };

  const services = [
    {
      Icon: Home,
      title: "Residential Roofing",
      description: "Expert roofing solutions for homes of all sizes. From repairs to complete replacements.",
      to: "/residential"
    },
    {
      Icon: Building2,
      title: "Commercial Roofing",
      description: "Comprehensive roofing services for businesses, ensuring minimal disruption to operations.",
      to: "/commercial"
    },
    {
      Icon: Wrench,
      title: "Roof Repair",
      description: "Quick and reliable repair services to fix leaks, damage, and wear.",
      to: "/repair"
    },
    {
      Icon: PaintBucket,
      title: "Roof Maintenance",
      description: "Regular maintenance programs to extend your roof's life and prevent issues.",
      to: "/maintenance"
    }
  ];

  return (
    <main className="min-h-screen pt-40 pb-20 px-4">
      {showPromo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <PromoCountdown onClose={handleClosePromo} />
        </div>
      )}
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-roofing-charcoal mb-6">
            Our Roofing Services
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We offer comprehensive roofing solutions tailored to your needs. From residential to commercial, repairs to maintenance, we've got you covered.
          </p>
          <Button asChild size="lg" className="bg-roofing-orange hover:bg-roofing-orange-dark group">
            <Link to="/estimate">
              Get Free Estimate
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ServiceTile {...service} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-roofing-orange to-roofing-orange-dark rounded-xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Start Your Roofing Project?
          </h2>
          <p className="text-roofing-cream mb-6">
            Contact us today for a free consultation and estimate.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-roofing-charcoal hover:bg-roofing-cream group"
          >
            <Link to="/contact">
              Contact Us Now
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
};

export default Services;