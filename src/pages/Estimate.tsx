import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { RoofIcon, PhoneCall, Mail, MapPin, Clock } from "lucide-react";

const Estimate = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <RoofIcon className="h-16 w-16 text-roofing-orange" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#1a2b4b] leading-tight">
            Get Your Free Roofing Estimate
          </h1>
          <p className="text-lg md:text-xl text-[#1a2b4b]/80 max-w-2xl mx-auto leading-relaxed">
            Fill out the form below and our experts will provide you with a detailed estimate for your roofing project within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-roofing-orange/20"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#1a2b4b] mb-2">First Name</label>
                  <Input 
                    placeholder="First Name" 
                    className="bg-white border-roofing-orange/20 focus:border-roofing-orange transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1a2b4b] mb-2">Last Name</label>
                  <Input 
                    placeholder="Last Name" 
                    className="bg-white border-roofing-orange/20 focus:border-roofing-orange transition-colors" 
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#1a2b4b] mb-2">Email</label>
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    className="bg-white border-roofing-orange/20 focus:border-roofing-orange transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1a2b4b] mb-2">Phone</label>
                  <Input 
                    type="tel" 
                    placeholder="Phone" 
                    className="bg-white border-roofing-orange/20 focus:border-roofing-orange transition-colors" 
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-[#1a2b4b] mb-2">Address</label>
                <Input 
                  placeholder="Street Address" 
                  className="bg-white border-roofing-orange/20 focus:border-roofing-orange transition-colors" 
                />
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#1a2b4b] mb-2">City</label>
                  <Input 
                    placeholder="City" 
                    className="bg-white border-roofing-orange/20 focus:border-roofing-orange transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1a2b4b] mb-2">State</label>
                  <Input 
                    placeholder="State" 
                    className="bg-white border-roofing-orange/20 focus:border-roofing-orange transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1a2b4b] mb-2">ZIP</label>
                  <Input 
                    placeholder="ZIP Code" 
                    className="bg-white border-roofing-orange/20 focus:border-roofing-orange transition-colors" 
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-[#1a2b4b] mb-2">Project Type</label>
                <select className="w-full rounded-md border border-roofing-orange/20 bg-white px-3 py-2 text-[#1a2b4b] focus:border-roofing-orange transition-colors">
                  <option value="">Select Project Type</option>
                  <option value="repair">Roof Repair</option>
                  <option value="replacement">Roof Replacement</option>
                  <option value="new">New Roof Installation</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="inspection">Inspection</option>
                </select>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-[#1a2b4b] mb-2">Project Details</label>
                <Textarea 
                  placeholder="Please describe your roofing needs in detail"
                  className="min-h-[150px] bg-white border-roofing-orange/20 focus:border-roofing-orange transition-colors"
                />
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-roofing-orange to-orange-500 hover:from-roofing-orange-dark hover:to-orange-600 text-white relative py-6 text-lg font-semibold"
                >
                  Request Free Estimate
                </Button>
              </motion.div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-roofing-orange/20 space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold text-[#1a2b4b] mb-4">Why Choose Us?</h3>
              <ul className="space-y-4 text-[#1a2b4b]/80">
                <li className="flex items-start gap-3">
                  <span className="bg-roofing-orange/10 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-roofing-orange" />
                  </span>
                  <span>24-hour response time guaranteed</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-roofing-orange/10 p-2 rounded-full">
                    <PhoneCall className="h-5 w-5 text-roofing-orange" />
                  </span>
                  <span>Free consultation and inspection</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-roofing-orange/10 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-roofing-orange" />
                  </span>
                  <span>Detailed written estimates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-roofing-orange/10 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-roofing-orange" />
                  </span>
                  <span>Local experts in your area</span>
                </li>
              </ul>
            </div>

            <div className="bg-roofing-orange/10 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-[#1a2b4b] mb-2">Emergency Service</h4>
              <p className="text-[#1a2b4b]/80 mb-4">
                Need immediate assistance? We offer 24/7 emergency roofing services.
              </p>
              <Button className="w-full bg-roofing-orange hover:bg-roofing-orange-dark text-white">
                Call Now
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Estimate;