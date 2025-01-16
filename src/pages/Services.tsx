import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Home, Building2, Wrench, PaintBucket } from "lucide-react";
import PromoCountdown from "@/components/PromoCountdown";

const Services = () => {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-roofing-charcoal mb-6">
            Our Roofing Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
              image: "/lovable-uploads/daa7e114-eb17-4afb-945c-aae7a9cb7139.png"
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
              className="group perspective h-[400px]"
            >
              <div className="relative w-full h-full preserve-3d transition-all duration-500 group-hover:[transform:rotateY(180deg)]">
                {/* Front of card */}
                <div className="absolute w-full h-full backface-hidden bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-roofing-orange rounded-full text-white">
                        <service.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-semibold text-roofing-charcoal">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-600">
                          <ArrowRight className="w-4 h-4 text-roofing-orange" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Back of card */}
                <div className="absolute w-full h-full backface-hidden [transform:rotateY(180deg)] bg-gradient-to-br from-roofing-orange/90 to-roofing-orange-dark/90 backdrop-blur-sm rounded-xl shadow-lg p-8">
                  <div className="flex flex-col h-full text-white">
                    <h3 className="text-2xl font-semibold mb-6">{service.title}</h3>
                    {service.image && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    <p className="text-lg mb-8">{service.fact}</p>
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
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-roofing-orange/10 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-roofing-charcoal mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-600 mb-6">
            Contact us today for a free consultation and estimate.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-roofing-orange text-white hover:bg-roofing-orange-dark group"
          >
            <Link to="/contact">
              Contact Us Now
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
      <PromoCountdown />
    </main>
  );
};

export default Services;
