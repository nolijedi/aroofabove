import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
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

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-roofing-orange to-orange-300">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get in touch with us for all your roofing needs. We're here to help with expert solutions and professional service.
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
            className="space-y-8 bg-black/40 backdrop-blur-sm p-8 rounded-lg"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Get In Touch</h2>
              <div className="space-y-6">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  href="tel:509-218-4343" 
                  className="flex items-center gap-3 text-gray-300 hover:text-roofing-orange transition-colors"
                >
                  <Phone className="h-6 w-6" />
                  <span>509-218-4343</span>
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  href="mailto:jc@aroofabove.com" 
                  className="flex items-center gap-3 text-gray-300 hover:text-roofing-orange transition-colors"
                >
                  <Mail className="h-6 w-6" />
                  <span>jc@aroofabove.com</span>
                </motion.a>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <MapPin className="h-6 w-6" />
                  <span>Serving the Greater Spokane Area</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <Clock className="h-6 w-6" />
                  <span>Available 24/7 for Emergency Services</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input placeholder="Your Name" className="bg-white/5 border-white/10 text-white placeholder:text-gray-400" />
              </div>
              <div>
                <Input type="email" placeholder="Your Email" className="bg-white/5 border-white/10 text-white placeholder:text-gray-400" />
              </div>
              <div>
                <Input type="tel" placeholder="Your Phone" className="bg-white/5 border-white/10 text-white placeholder:text-gray-400" />
              </div>
              <div>
                <Textarea 
                  placeholder="Your Message" 
                  className="min-h-[150px] bg-white/5 border-white/10 text-white placeholder:text-gray-400" 
                />
              </div>
              <motion.div whileHover={{ scale: 1.02 }}>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-roofing-orange to-orange-500 hover:from-roofing-orange-dark hover:to-orange-600 text-white"
                >
                  Send Message
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