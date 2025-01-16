import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Home, Calculator } from "lucide-react";
import { useEffect } from "react";

const Estimate = () => {
  // Add reduced motion hook for accessibility
  const shouldReduceMotion = useReducedMotion();

  // Add resize observer controller
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      // Batch DOM reads and writes
      window.requestAnimationFrame(() => {
        for (const entry of entries) {
          if (entry.target) {
            // Handle resize if needed
          }
        }
      });
    });

    // Get all animated elements
    const animatedElements = document.querySelectorAll('.animate-resize');
    animatedElements.forEach(element => resizeObserver.observe(element));

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Animation variants with reduced motion support
  const hoverAnimation = shouldReduceMotion
    ? {}
    : {
        scale: 1.02,
        transition: { type: "spring", stiffness: 300 }
      };

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 bg-gradient-to-br from-roofing-cream to-roofing-beige">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-roofing-charcoal mb-6 relative">
            <span className="relative inline-block">
              Get Your Free Estimate
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-roofing-orange"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Fill out the form below and we'll provide you with a detailed estimate for your roofing project.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 animate-resize"
          >
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <motion.div 
                  className="space-y-2 animate-resize"
                  whileHover={hoverAnimation}
                >
                  <label className="text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <Input
                    type="text"
                    placeholder="John"
                    className="w-full border-roofing-orange/20 focus:border-roofing-orange"
                  />
                </motion.div>
                <motion.div 
                  className="space-y-2 animate-resize"
                  whileHover={hoverAnimation}
                >
                  <label className="text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Doe"
                    className="w-full border-roofing-orange/20 focus:border-roofing-orange"
                  />
                </motion.div>
              </div>

              <motion.div 
                className="space-y-2 animate-resize"
                whileHover={hoverAnimation}
              >
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full border-roofing-orange/20 focus:border-roofing-orange"
                />
              </motion.div>

              <motion.div 
                className="space-y-2 animate-resize"
                whileHover={hoverAnimation}
              >
                <label className="text-sm font-medium text-gray-700">
                  Phone
                </label>
                <Input
                  type="tel"
                  placeholder="(555) 123-4567"
                  className="w-full border-roofing-orange/20 focus:border-roofing-orange"
                />
              </motion.div>

              <motion.div 
                className="space-y-2 animate-resize"
                whileHover={hoverAnimation}
              >
                <label className="text-sm font-medium text-gray-700">
                  Address
                </label>
                <Input
                  type="text"
                  placeholder="123 Main St"
                  className="w-full border-roofing-orange/20 focus:border-roofing-orange"
                />
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-4">
                <motion.div 
                  className="space-y-2 animate-resize"
                  whileHover={hoverAnimation}
                >
                  <label className="text-sm font-medium text-gray-700">
                    City
                  </label>
                  <Input
                    type="text"
                    placeholder="Spokane"
                    className="w-full border-roofing-orange/20 focus:border-roofing-orange"
                  />
                </motion.div>
                <motion.div 
                  className="space-y-2 animate-resize"
                  whileHover={hoverAnimation}
                >
                  <label className="text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <Input
                    type="text"
                    placeholder="99201"
                    className="w-full border-roofing-orange/20 focus:border-roofing-orange"
                  />
                </motion.div>
              </div>

              <motion.div 
                className="space-y-2 animate-resize"
                whileHover={hoverAnimation}
              >
                <label className="text-sm font-medium text-gray-700">
                  Service Type
                </label>
                <Select>
                  <SelectTrigger className="w-full border-roofing-orange/20 focus:border-roofing-orange">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential Roofing</SelectItem>
                    <SelectItem value="commercial">Commercial Roofing</SelectItem>
                    <SelectItem value="repair">Roof Repair</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div 
                className="space-y-2 animate-resize"
                whileHover={hoverAnimation}
              >
                <label className="text-sm font-medium text-gray-700">
                  Project Details
                </label>
                <Textarea
                  placeholder="Please describe your roofing needs..."
                  className="w-full min-h-[120px] border-roofing-orange/20 focus:border-roofing-orange"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-roofing-orange to-roofing-orange-dark text-white hover:opacity-90 group"
                >
                  Get Estimate
                  <Calculator className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                </Button>
              </motion.div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6 animate-resize"
          >
            <motion.div 
              className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-roofing-orange to-roofing-orange-dark rounded-full text-white">
                  <Home className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-roofing-charcoal">
                  Why Choose Us
                </h2>
              </div>
              <ul className="space-y-4">
                {[
                  "Free, no-obligation estimates",
                  "Licensed and insured professionals",
                  "Premium quality materials",
                  "Competitive pricing",
                  "Excellent warranty coverage",
                  "Financing options available"
                ].map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-center gap-2 text-gray-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <ArrowRight className="w-4 h-4 text-roofing-orange flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-roofing-orange to-roofing-orange-dark text-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-bold mb-4">
                Limited Time Offer!
              </h3>
              <p className="mb-6">
                Get 10% off your roofing project when you schedule your estimate this month.
              </p>
              <p className="text-sm opacity-90">
                *Terms and conditions apply
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Estimate;
