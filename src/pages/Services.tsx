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
              image: "/lovable-uploads/21ad76c3-8063-4f80-8f8c-f62f64b10dad.png",
              extendedDescription: "Our residential roofing team specializes in both traditional and modern roofing solutions. We handle everything from classic asphalt shingles to premium materials, ensuring your home stays protected and beautiful for years to come."
            },
            {
              icon: Building2,
              title: "Commercial Roofing",
              description: "Professional solutions for businesses and commercial properties.",
              features: ["Flat Roofing", "TPO/EPDM Systems", "Preventive Maintenance", "24/7 Support"],
              image: "/lovable-uploads/22f501b9-a09c-4fa6-9516-78339018748b.png",
              extendedDescription: "Our commercial roofing services are designed to minimize business disruption while maximizing protection. We work with state-of-the-art materials and techniques to ensure your commercial property maintains its value and functionality."
            },
            {
              icon: Wrench,
              title: "Roof Repair",
              description: "Quick and reliable repair services to protect your property.",
              features: ["Storm Damage", "Leak Detection", "Gutter Repair", "Ventilation Fix"],
              image: "/lovable-uploads/3d690d1b-2e2b-4dc4-a54b-ee80c40f7d4c.png",
              extendedDescription: "Our repair experts are trained to quickly identify and fix any roofing issue. From emergency storm damage to routine maintenance, we ensure your roof remains in top condition through all seasons."
            },
            {
              icon: PaintBucket,
              title: "Roof Maintenance",
              description: "Regular maintenance to extend the life of your roof.",
              features: ["Inspections", "Cleaning", "Coating", "Preventive Care"],
              image: "/lovable-uploads/c14c4941-34e9-4747-840a-167e0fe92c76.png",
              extendedDescription: "Regular maintenance is key to a long-lasting roof. Our comprehensive maintenance programs include detailed inspections, professional cleaning, and preventive care to catch small issues before they become major problems."
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="perspective"
            >
              <div className="relative w-full h-[400px] preserve-3d group transition-transform duration-500 hover:rotate-y-180">
                {/* Front of card */}
                <div className="absolute w-full h-full backface-hidden bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-roofing-orange rounded-full text-white">
                        <service.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-semibold text-roofing-charcoal">{service.title}</h3>
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
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8">
                  <div className="flex flex-col h-full">
                    <div className="relative w-full h-48 mb-6 overflow-hidden rounded-lg">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <p className="text-gray-600 mb-6">{service.extendedDescription}</p>
                    <div className="mt-auto">
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-roofing-orange text-roofing-orange hover:bg-roofing-orange hover:text-white group"
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