import { motion } from "framer-motion";
import { ClipboardCheck, Camera, FileText, Users, Wrench } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      title: "Free Roof Inspection",
      description: "Our certified roofing experts will conduct a thorough inspection to assess the damage. We'll document everything with photos and a detailed report—essential tools for your insurance claim.",
      icon: Camera,
      gradient: "from-roofing-beige via-orange-200 to-roofing-cream"
    },
    {
      title: "Damage Documentation",
      description: "We provide professional documentation of all damages, including descriptions and visual evidence, to support your insurance claim.",
      icon: ClipboardCheck,
      gradient: "from-orange-100 via-roofing-cream to-orange-100"
    },
    {
      title: "Insurance Claim Filing",
      description: "Need help with filing? No problem. Our team will guide you through the paperwork and ensure all necessary details are included for a smooth process.",
      icon: FileText,
      gradient: "from-roofing-cream via-orange-200 to-roofing-beige"
    },
    {
      title: "Adjuster Coordination",
      description: "When the insurance adjuster visits, we'll be there to represent your best interests and ensure they don't miss a thing.",
      icon: Users,
      gradient: "from-orange-200 via-roofing-cream to-orange-100"
    },
    {
      title: "Expert Repairs or Replacement",
      description: "Once your claim is approved, our skilled team gets to work restoring your roof. We use only high-quality materials to ensure long-lasting results.",
      icon: Wrench,
      gradient: "from-roofing-beige via-orange-100 to-roofing-cream"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="bg-gradient-to-br from-roofing-beige via-white to-roofing-cream p-4 sm:p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-roofing-charcoal mb-8 text-center">
          Our Step-by-Step Process
        </h2>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`bg-gradient-to-br ${step.gradient} p-4 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group relative overflow-hidden`}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div 
                  className="absolute inset-0 bg-repeat opacity-20" 
                  style={{
                    backgroundImage: "url('/lovable-uploads/8fdcd4a0-314a-40b2-8e1d-adef06d5d101.png')",
                    backgroundSize: "100px"
                  }}
                />
              </div>

              <div className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="p-3 sm:p-4 bg-white/80 rounded-full shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-6 h-6 sm:w-8 sm:h-8 text-roofing-orange" />
                  </div>
                </div>

                <div className="space-y-2 w-full">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-roofing-orange text-white rounded-full font-bold text-sm sm:text-base">
                      {index + 1}
                    </span>
                    <h3 className="text-lg sm:text-xl font-semibold text-roofing-charcoal group-hover:text-roofing-orange transition-colors duration-300">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-roofing-charcoal/80 sm:ml-11 font-medium">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Decorative elements */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "2rem" }}
                  className="absolute left-7 sm:left-11 bottom-0 w-0.5 bg-gradient-to-b from-roofing-orange to-transparent"
                  style={{ transform: "translateY(100%)" }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProcessSection;