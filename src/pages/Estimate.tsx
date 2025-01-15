import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import PromoCountdown from "@/components/PromoCountdown";

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
    <div className="min-h-screen pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-roofing-charcoal via-roofing-charcoal to-roofing-orange-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,255,134,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.05),transparent_50%)]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-green-200 to-roofing-beige bg-clip-text text-transparent">
            Get a Free Estimate
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Fill out the form below to request a free estimate for your roofing project.
            We'll get back to you within 24 hours.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto bg-white/5 backdrop-blur-md p-8 rounded-lg border border-white/10 mb-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
                <Input 
                  placeholder="First Name" 
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-green-500/30 transition-colors" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
                <Input 
                  placeholder="Last Name" 
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-green-500/30 transition-colors" 
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <Input 
                  type="email" 
                  placeholder="Email" 
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-green-500/30 transition-colors" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                <Input 
                  type="tel" 
                  placeholder="Phone" 
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-green-500/30 transition-colors" 
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
              <Input 
                placeholder="Street Address" 
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-green-500/30 transition-colors" 
              />
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">City</label>
                <Input 
                  placeholder="City" 
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-green-500/30 transition-colors" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">State</label>
                <Input 
                  placeholder="State" 
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-green-500/30 transition-colors" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">ZIP</label>
                <Input 
                  placeholder="ZIP Code" 
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-green-500/30 transition-colors" 
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-1">Project Type</label>
              <select className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-green-500/30 transition-colors">
                <option value="" className="bg-gray-900">Select Project Type</option>
                <option value="repair" className="bg-gray-900">Roof Repair</option>
                <option value="replacement" className="bg-gray-900">Roof Replacement</option>
                <option value="new" className="bg-gray-900">New Roof Installation</option>
                <option value="maintenance" className="bg-gray-900">Maintenance</option>
                <option value="inspection" className="bg-gray-900">Inspection</option>
              </select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-1">Project Details</label>
              <Textarea 
                placeholder="Please describe your roofing needs in detail"
                className="min-h-[150px] bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-green-500/30 transition-colors"
              />
            </motion.div>

            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-orange-500/20 to-green-500/20 blur-xl" />
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-roofing-orange via-green-500/80 to-orange-500 hover:from-roofing-orange-dark hover:via-green-600/80 hover:to-orange-600 text-white relative"
              >
                Request Estimate
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
      <PromoCountdown />
    </div>
  );
};

export default Estimate;