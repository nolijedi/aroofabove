import { motion } from "framer-motion";
import { ArrowRight, DollarSign, Clock, ThumbsUp, FileText } from "lucide-react";

const Financing = () => {
  return (
    <main className="min-h-screen pt-32 pb-16 px-4 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Introduction Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-gradient-separator backdrop-blur-sm bg-white/30 rounded-xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 text-center"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-roofing-orange to-roofing-orange-dark bg-clip-text text-transparent mb-6">
            Flexible Financing Solutions
          </h1>
          <p className="text-lg text-gray-800">
            We understand that roof repairs and replacements can be a significant investment. 
            That's why we offer flexible financing options to help make your roofing project more manageable.
          </p>
        </motion.div>

        {/* Financing Plans */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="section-gradient-separator backdrop-blur-sm bg-white/30 rounded-xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <DollarSign className="w-8 h-8 text-roofing-orange group-hover:scale-110 transition-transform duration-300" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-roofing-orange to-roofing-orange-dark bg-clip-text text-transparent">
                Standard Financing
              </h2>
            </div>
            <ul className="space-y-4 text-gray-800">
              <li className="flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-roofing-orange" />
                Low monthly payments
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-roofing-orange" />
                Competitive interest rates
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-roofing-orange" />
                Terms up to 120 months
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-roofing-orange" />
                No prepayment penalties
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="section-gradient-separator backdrop-blur-sm bg-white/30 rounded-xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <Clock className="w-8 h-8 text-roofing-orange group-hover:scale-110 transition-transform duration-300" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-roofing-orange to-roofing-orange-dark bg-clip-text text-transparent">
                Special Offers
              </h2>
            </div>
            <ul className="space-y-4 text-gray-800">
              <li className="flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-roofing-orange" />
                0% interest for 12 months
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-roofing-orange" />
                No payments for 90 days
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-roofing-orange" />
                Special rates for qualified buyers
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-roofing-orange" />
                Quick approval process
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Application Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-gradient-separator backdrop-blur-sm bg-white/30 rounded-xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500"
        >
          <div className="flex items-center gap-4 mb-6">
            <FileText className="w-8 h-8 text-roofing-orange" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-roofing-orange to-roofing-orange-dark bg-clip-text text-transparent">
              Simple Application Process
            </h2>
          </div>
          <ol className="space-y-6 text-gray-800">
            <li className="flex items-center gap-4 group">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-roofing-orange text-white font-bold group-hover:scale-110 transition-transform duration-300">1</span>
              <span>Complete our simple online application form</span>
            </li>
            <li className="flex items-center gap-4 group">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-roofing-orange text-white font-bold group-hover:scale-110 transition-transform duration-300">2</span>
              <span>Receive a decision within minutes</span>
            </li>
            <li className="flex items-center gap-4 group">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-roofing-orange text-white font-bold group-hover:scale-110 transition-transform duration-300">3</span>
              <span>Review and accept your financing terms</span>
            </li>
            <li className="flex items-center gap-4 group">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-roofing-orange text-white font-bold group-hover:scale-110 transition-transform duration-300">4</span>
              <span>Schedule your roofing project</span>
            </li>
          </ol>
        </motion.div>

        {/* Customer Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-gradient-separator backdrop-blur-sm bg-white/30 rounded-xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500"
        >
          <div className="flex items-center gap-4 mb-6">
            <ThumbsUp className="w-8 h-8 text-roofing-orange" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-roofing-orange to-roofing-orange-dark bg-clip-text text-transparent">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="backdrop-blur-sm bg-white/50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
              <p className="text-gray-800 italic mb-4">
                "The financing process was incredibly smooth. We got approved quickly and were able to get our new roof right away."
              </p>
              <p className="font-medium text-roofing-orange">- Sarah Johnson</p>
            </div>
            <div className="backdrop-blur-sm bg-white/50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
              <p className="text-gray-800 italic mb-4">
                "The monthly payments are very manageable, and the 0% interest offer saved us a lot of money."
              </p>
              <p className="font-medium text-roofing-orange">- Michael Smith</p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-gradient-separator backdrop-blur-sm bg-white/30 rounded-xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 text-center"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-roofing-orange to-roofing-orange-dark bg-clip-text text-transparent mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-800 mb-8">
            Apply now and get a decision within minutes. Our team is ready to help you with any questions.
          </p>
          <button className="bg-gradient-to-r from-roofing-orange to-roofing-orange-dark text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            Apply for Financing
          </button>
        </motion.div>
      </div>
    </main>
  );
};

export default Financing;