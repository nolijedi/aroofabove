import { motion } from "framer-motion";

const WhyChooseUsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16 pt-12"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-roofing-charcoal mb-16 text-center max-w-4xl mx-auto leading-tight">
        Why Choose Us for Insurance Claims Assistance?
      </h2>
      <div className="grid md:grid-cols-3 gap-12 px-4">
        {/* House 1 */}
        <div className="relative group">
          {/* Roof */}
          <div className="absolute w-[140%] h-24 -top-12 left-1/2 -translate-x-1/2 -z-10 overflow-hidden">
            <div 
              className="w-full h-full bg-gradient-to-b from-roofing-orange-dark to-roofing-orange"
              style={{ 
                clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                boxShadow: 'inset 0 -4px 6px rgba(0,0,0,0.1)'
              }}
            >
              {/* Roof texture */}
              <div className="absolute inset-0 opacity-20"
                   style={{
                     backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)'
                   }}
              />
            </div>
          </div>
          {/* House body */}
          <div className="bg-white p-8 rounded-xl shadow-lg mt-8 relative overflow-hidden hover:shadow-xl transition-shadow duration-300 min-h-[200px] flex flex-col justify-between">
            <h3 className="text-2xl font-semibold mb-4 text-roofing-orange">Experienced Team</h3>
            <p className="text-roofing-charcoal/80 leading-relaxed font-medium max-w-xs">Our team has years of experience navigating insurance claims, ensuring nothing gets overlooked.</p>
          </div>
        </div>

        {/* House 2 */}
        <div className="relative group">
          {/* Roof */}
          <div className="absolute w-[140%] h-24 -top-12 left-1/2 -translate-x-1/2 -z-10 overflow-hidden">
            <div 
              className="w-full h-full bg-gradient-to-b from-roofing-orange-dark to-roofing-orange"
              style={{ 
                clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                boxShadow: 'inset 0 -4px 6px rgba(0,0,0,0.1)'
              }}
            >
              {/* Roof texture */}
              <div className="absolute inset-0 opacity-20"
                   style={{
                     backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)'
                   }}
              />
            </div>
          </div>
          {/* House body */}
          <div className="bg-white p-8 rounded-xl shadow-lg mt-8 relative overflow-hidden hover:shadow-xl transition-shadow duration-300 min-h-[200px] flex flex-col justify-between">
            <h3 className="text-2xl font-semibold mb-4 text-roofing-orange">Advocacy for You</h3>
            <p className="text-roofing-charcoal/80 leading-relaxed font-medium max-w-xs">We work on your behalf to maximize your claim and ensure all covered damages are accounted for.</p>
          </div>
        </div>

        {/* House 3 */}
        <div className="relative group">
          {/* Roof */}
          <div className="absolute w-[140%] h-24 -top-12 left-1/2 -translate-x-1/2 -z-10 overflow-hidden">
            <div 
              className="w-full h-full bg-gradient-to-b from-roofing-orange-dark to-roofing-orange"
              style={{ 
                clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                boxShadow: 'inset 0 -4px 6px rgba(0,0,0,0.1)'
              }}
            >
              {/* Roof texture */}
              <div className="absolute inset-0 opacity-20"
                   style={{
                     backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)'
                   }}
              />
            </div>
          </div>
          {/* House body */}
          <div className="bg-white p-8 rounded-xl shadow-lg mt-8 relative overflow-hidden hover:shadow-xl transition-shadow duration-300 min-h-[200px] flex flex-col justify-between">
            <h3 className="text-2xl font-semibold mb-4 text-roofing-orange">Stress-Free Process</h3>
            <p className="text-roofing-charcoal/80 leading-relaxed font-medium max-w-xs">From inspections to paperwork, we'll handle the heavy lifting while keeping you informed.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WhyChooseUsSection;