import { motion } from "framer-motion";
import ContactHeader from "@/components/contact/ContactHeader";
import SocialLinks from "@/components/contact/SocialLinks";
import EstimateCard from "@/components/contact/EstimateCard";
import ContactInfoCard from "@/components/contact/ContactInfoCard";

const Contact = () => {
  return (
    <main className="min-h-screen pt-32 pb-16 relative">
      {/* Background Image and Overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1632823471406-4c5c7e4c6f24?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-roofing-orange/60 to-roofing-cream/40" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-gradient-separator backdrop-blur-sm bg-white/30 rounded-xl shadow-xl p-8 mb-12"
        >
          <ContactHeader />
          <SocialLinks />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <EstimateCard />
          <ContactInfoCard />
        </div>
      </div>
    </main>
  );
};

export default Contact;