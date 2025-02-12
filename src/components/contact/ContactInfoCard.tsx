import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle } from "lucide-react";

const ContactInfoCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="section-gradient-separator backdrop-blur-sm bg-white/30 rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500 group"
    >
      <div className="flex items-center gap-3 mb-4">
        <MessageCircle className="w-7 h-7 text-roofing-orange group-hover:scale-110 transition-transform duration-300" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-roofing-orange to-roofing-orange-dark bg-clip-text text-transparent">
          Contact Information
        </h2>
      </div>
      <div className="space-y-4">
        <a 
          href="tel:+15094005911" 
          className="flex items-center gap-3 text-gray-800 hover:text-roofing-orange transition-colors group"
        >
          <Phone className="w-5 h-5 text-roofing-orange group-hover:scale-110 transition-transform duration-300" />
          <p className="group-hover:translate-x-1 transition-transform duration-300">(509) 400-5911</p>
        </a>
        <a 
          href="mailto:jc@aroofabove.co"
          className="flex items-center gap-3 text-gray-800 hover:text-roofing-orange transition-colors group"
        >
          <Mail className="w-5 h-5 text-roofing-orange group-hover:scale-110 transition-transform duration-300" />
          <p className="group-hover:translate-x-1 transition-transform duration-300">jc@aroofabove.co</p>
        </a>
        <Link 
          to="/contact-form"
          className="flex items-center gap-3 text-gray-800 hover:text-roofing-orange transition-colors group"
        >
          <MessageCircle className="w-5 h-5 text-roofing-orange group-hover:scale-110 transition-transform duration-300" />
          <p className="group-hover:translate-x-1 transition-transform duration-300">Message Us Here</p>
        </Link>
      </div>
    </motion.div>
  );
};

export default ContactInfoCard;