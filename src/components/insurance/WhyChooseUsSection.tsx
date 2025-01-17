import { motion } from "framer-motion";

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
        <div className="relative">
          {/* Roof */}
          <div className="w-full h-16 bg-gradient-to-r from-roofing-orange to-roofing-orange-dark transform -skew-x-12 rounded-t-xl" />
          {/* Body */}
          <div className="bg-white p-6 rounded-xl shadow-lg -mt-4">
            <h3 className="text-xl font-semibold mb-4 text-roofing-orange">Experienced Team</h3>
            <p className="text-gray-600">Our team has years of experience navigating insurance claims, ensuring nothing gets overlooked.</p>
          </div>
        </div>

        {/* House 2 */}
        <div className="relative">
          {/* Roof */}
          <div className="w-full h-16 bg-gradient-to-r from-roofing-orange to-roofing-orange-dark transform -skew-x-12 rounded-t-xl" />
          {/* Body */}
          <div className="bg-white p-6 rounded-xl shadow-lg -mt-4">
            <h3 className="text-xl font-semibold mb-4 text-roofing-orange">Advocacy for You</h3>
            <p className="text-gray-600">We work on your behalf to maximize your claim and ensure all covered damages are accounted for.</p>
          </div>
        </div>

        {/* House 3 */}
        <div className="relative">
          {/* Roof */}
          <div className="w-full h-16 bg-gradient-to-r from-roofing-orange to-roofing-orange-dark transform -skew-x-12 rounded-t-xl" />
          {/* Body */}
          <div className="bg-white p-6 rounded-xl shadow-lg -mt-4">
            <h3 className="text-xl font-semibold mb-4 text-roofing-orange">Stress-Free Process</h3>
            <p className="text-gray-600">From inspections to paperwork, we'll handle the heavy lifting while keeping you informed.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WhyChooseUsSection;