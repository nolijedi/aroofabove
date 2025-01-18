import { motion } from "framer-motion";

const ContactInfoCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500"
    >
      <div className="bg-gradient-to-br from-white via-roofing-cream to-roofing-beige backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 transform transition-all duration-300 hover:shadow-2xl h-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-roofing-orange to-roofing-orange-dark rounded-full flex items-center justify-center">
            <span className="text-2xl text-white">📱</span>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-roofing-charcoal to-roofing-orange-dark bg-clip-text text-transparent">
            Contact Information
          </h2>
        </div>
        <div className="space-y-6">
          <a 
            href="tel:+15094005911" 
            className="flex items-center gap-3 text-roofing-charcoal/80 hover:text-roofing-orange transition-colors"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-roofing-beige to-white rounded-full flex items-center justify-center">
              <span className="text-xl">📞</span>
            </div>
            <p>(509) 400-5911</p>
          </a>
          <a 
            href="mailto:info@roofabove.com"
            className="flex items-center gap-3 text-roofing-charcoal/80 hover:text-roofing-orange transition-colors"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-roofing-beige to-white rounded-full flex items-center justify-center">
              <span className="text-xl">✉️</span>
            </div>
            <p>info@roofabove.com</p>
          </a>
          <a 
            href="https://maps.google.com/?q=123+Roofing+St,+Dallas,+TX"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-roofing-charcoal/80 hover:text-roofing-orange transition-colors"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-roofing-beige to-white rounded-full flex items-center justify-center">
              <span className="text-xl">📍</span>
            </div>
            <p>123 Roofing St, Dallas, TX</p>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactInfoCard;