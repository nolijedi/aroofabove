import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send, Building2, Home } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const contactInfo = [
    { icon: Phone, text: "509-218-4343", href: "tel:509-218-4343" },
    { icon: Mail, text: "jc@aroofabove.com", href: "mailto:jc@aroofabove.com" },
    { icon: MapPin, text: "Serving the Greater Spokane Area" },
    { icon: Clock, text: "Available 24/7 for Emergency Services" },
    { icon: Building2, text: "Commercial & Industrial Projects" },
    { icon: Home, text: "Residential Roofing Experts" }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(to bottom right, rgba(34,31,38,0.95), rgba(249,115,22,0.8))",
          backgroundBlendMode: "multiply"
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-roofing-orange to-orange-300">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We're here to help with all your roofing needs. Contact us today for expert solutions and professional service.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12"
        >
          <motion.div 
            variants={itemVariants}
            className="space-y-8 bg-black/40 backdrop-blur-sm p-8 rounded-lg border border-white/10"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="group"
                  >
                    {item.href ? (
                      <a 
                        href={item.href}
                        className="flex items-center gap-3 text-gray-300 hover:text-roofing-orange transition-colors p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-roofing-orange/50"
                      >
                        <item.icon className="h-6 w-6 group-hover:text-roofing-orange transition-colors" />
                        <span>{item.text}</span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 text-gray-300 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-roofing-orange/50">
                        <item.icon className="h-6 w-6 group-hover:text-roofing-orange transition-colors" />
                        <span>{item.text}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="space-y-2"
              >
                <Input 
                  placeholder="Your Name" 
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-roofing-orange/50" 
                />
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="space-y-2"
              >
                <Input 
                  type="email" 
                  placeholder="Your Email" 
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-roofing-orange/50" 
                />
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="space-y-2"
              >
                <Input 
                  type="tel" 
                  placeholder="Your Phone" 
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-roofing-orange/50" 
                />
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="space-y-2"
              >
                <Textarea 
                  placeholder="Your Message" 
                  className="min-h-[150px] bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-roofing-orange/50" 
                />
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-roofing-orange to-orange-500 hover:from-roofing-orange-dark hover:to-orange-600 text-white group"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;