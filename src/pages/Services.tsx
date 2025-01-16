import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Home, Building2, Wrench, PaintBucket } from "lucide-react";
import PromoCountdown from "@/components/PromoCountdown";

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Residential Roofing",
      description: "Expert installation and repair services for homes of all sizes.",
      features: ["Shingle Installation", "Leak Repair", "Maintenance", "Emergency Services"],
      funFact: "Did you know? The average residential roof has about 10,000 individual shingles, and a skilled roofer can install up to 3,000 shingles in a single day!"
    },
    {
      icon: Building2,
      title: "Commercial Roofing",
      description: "Professional solutions for businesses and commercial properties.",
      features: ["Flat Roofing", "TPO/EPDM Systems", "Preventive Maintenance", "24/7 Support"],
      funFact: "Fun fact: The largest commercial roof in the world covers the Boeing Factory in Everett, Washington, spanning an incredible 472,370 square meters!"
    },
    {
      icon: Wrench,
      title: "Roof Repair",
      description: "Quick and reliable repair services to protect your property.",
      features: ["Storm Damage", "Leak Detection", "Gutter Repair", "Ventilation Fix"],
      funFact: "Interesting fact: Most roof leaks are actually found several feet away from where the water is entering the house, due to water traveling along roof panels or rafters!"
    },
    {
      icon: PaintBucket,
      title: "Roof Maintenance",
      description: "Regular maintenance to extend the life of your roof.",
      features: ["Inspections", "Cleaning", "Coating", "Preventive Care"],
      funFact: "Did you know? A well-maintained roof can last 25% longer than a neglected one, potentially saving thousands in replacement costs!"
    }
  ];

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
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="perspective"
            >
              <div className="relative h-[400px] w-full preserve-3d group transition-transform duration-500 hover:rotate-y-180">
                {/* Front of card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="h-full bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8">
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

                {/* Back of card */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden">
                  <div className="h-full bg-roofing-orange text-white rounded-xl shadow-lg p-8 flex flex-col justify-center items-center text-center">
                    <div className="mb-6">
                      <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                      <p className="text-lg leading-relaxed">{service.funFact}</p>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      className="mt-auto w-full border-white text-white hover:bg-white hover:text-roofing-orange group"
                    >
                      <Link to="/estimate">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
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