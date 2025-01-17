import { motion } from "framer-motion";
import { Clock, AlertTriangle, DollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WhyActNowSection = () => {
  const reasons = [
    {
      icon: Clock,
      title: "Time is Critical",
      description: "Insurance policies have strict deadlines"
    },
    {
      icon: AlertTriangle,
      title: "Prevent Further Damage",
      description: "Small issues can become costly problems"
    },
    {
      icon: DollarSign,
      title: "Maximize Coverage",
      description: "Get the compensation you deserve"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16 bg-gradient-to-br from-roofing-beige via-roofing-cream to-roofing-beige p-8 rounded-xl shadow-lg"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-roofing-charcoal mb-6 text-center">
          Why Act Now?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-roofing-orange/10 rounded-full">
                  <reason.icon className="w-8 h-8 text-roofing-orange" />
                </div>
                <h3 className="text-lg font-semibold text-roofing-charcoal mb-2">
                  {reason.title}
                </h3>
                <p className="text-gray-600">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center space-y-4">
          <p className="text-roofing-charcoal/80 max-w-3xl mx-auto mb-6 font-medium">
            Insurance policies often have strict deadlines for filing claims after damage occurs. 
            Delaying could mean missing out on the compensation you're entitled to. Plus, untreated 
            damage can lead to more costly repairs down the road. Don't wait—let us help you today!
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-roofing-orange text-white hover:bg-roofing-orange-dark group animate-bounce-pause"
            >
              <Link to="/contact" className="inline-flex items-center">
                Start Your Claim Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default WhyActNowSection;