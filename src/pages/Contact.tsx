import { motion } from "framer-motion";
import ContactHeader from "@/components/contact/ContactHeader";
import SocialLinks from "@/components/contact/SocialLinks";
import EstimateCard from "@/components/contact/EstimateCard";
import ContactInfoCard from "@/components/contact/ContactInfoCard";

const Contact = () => {
  return (
    <main className="min-h-screen flex flex-col pt-48 pb-16 px-4 relative">
      {/* Background Image and Overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1632823471406-4c5c7e4c6f24?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-roofing-orange/60 to-roofing-cream/40" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-gradient-separator backdrop-blur-sm bg-white/30 rounded-xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500"
        >
          <ContactHeader />
          <div className="mt-8">
            <SocialLinks />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <EstimateCard />
          <ContactInfoCard />
        </div>
      </div>
    </main>
  );
};

export default Contact;