import { motion } from "framer-motion";
import { Info, ArrowRight } from "lucide-react";

const WhyChooseUsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="text-3xl font-bold text-roofing-charcoal mb-8 text-center">
        Why Choose Us for Insurance Claims Assistance?
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {/* House 1 */}
        <div className="relative group">
          {/* Roof */}
          <div className="absolute w-[120%] h-20 bg-roofing-orange -top-8 left-1/2 -translate-x-1/2 -z-10"
               style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}>
          </div>
          {/* House body */}
          <div className="bg-white p-6 rounded-xl shadow-lg mt-8 relative overflow-hidden">
            <h3 className="text-xl font-semibold mb-4 text-roofing-orange">Experienced Team</h3>
            <p className="text-gray-600">Our team has years of experience navigating insurance claims, ensuring nothing gets overlooked.</p>
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div
              className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 text-roofing-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Info className="w-5 h-5 animate-pulse" />
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </div>
        </div>

        {/* House 2 */}
        <div className="relative group">
          {/* Roof */}
          <div className="absolute w-[120%] h-20 bg-roofing-orange -top-8 left-1/2 -translate-x-1/2 -z-10"
               style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}>
          </div>
          {/* House body */}
          <div className="bg-white p-6 rounded-xl shadow-lg mt-8 relative overflow-hidden">
            <h3 className="text-xl font-semibold mb-4 text-roofing-orange">Advocacy for You</h3>
            <p className="text-gray-600">We work on your behalf to maximize your claim and ensure all covered damages are accounted for.</p>
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div
              className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 text-roofing-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Info className="w-5 h-5 animate-pulse" />
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </div>
        </div>

        {/* House 3 */}
        <div className="relative group">
          {/* Roof */}
          <div className="absolute w-[120%] h-20 bg-roofing-orange -top-8 left-1/2 -translate-x-1/2 -z-10"
               style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}>
          </div>
          {/* House body */}
          <div className="bg-white p-6 rounded-xl shadow-lg mt-8 relative overflow-hidden">
            <h3 className="text-xl font-semibold mb-4 text-roofing-orange">Stress-Free Process</h3>
            <p className="text-gray-600">From inspections to paperwork, we'll handle the heavy lifting while keeping you informed.</p>
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div
              className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 text-roofing-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Info className="w-5 h-5 animate-pulse" />
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WhyChooseUsSection;