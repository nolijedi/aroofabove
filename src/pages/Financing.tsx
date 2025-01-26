import { motion } from "framer-motion";

const Financing = () => {
  return (
    <div className="container mx-auto px-4 py-16 mt-20">
      {/* Introduction Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Financing Options</h1>
        <p className="text-lg text-gray-600">
          We understand that roof repairs and replacements can be a significant investment. 
          That's why we offer flexible financing options to help make your roofing project more manageable.
        </p>
      </motion.div>

      {/* Financing Plans */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Standard Financing</h2>
          <ul className="space-y-4 text-gray-600">
            <li>• Low monthly payments</li>
            <li>• Competitive interest rates</li>
            <li>• Terms up to 120 months</li>
            <li>• No prepayment penalties</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Special Offers</h2>
          <ul className="space-y-4 text-gray-600">
            <li>• 0% interest for 12 months</li>
            <li>• No payments for 90 days</li>
            <li>• Special rates for qualified buyers</li>
            <li>• Quick approval process</li>
          </ul>
        </motion.div>
      </div>

      {/* Application Process */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Application Process</h2>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <ol className="space-y-6 text-gray-600">
            <li className="flex gap-4">
              <span className="font-bold text-roofing-orange">1.</span>
              <span>Complete our simple online application form</span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-roofing-orange">2.</span>
              <span>Receive a decision within minutes</span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-roofing-orange">3.</span>
              <span>Review and accept your financing terms</span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-roofing-orange">4.</span>
              <span>Schedule your roofing project</span>
            </li>
          </ol>
        </div>
      </motion.div>

      {/* Customer Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Customer Testimonials</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600 italic mb-4">
              "The financing process was incredibly smooth. We got approved quickly and were able to get our new roof right away."
            </p>
            <p className="font-medium text-gray-900">- Sarah Johnson</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600 italic mb-4">
              "The monthly payments are very manageable, and the 0% interest offer saved us a lot of money."
            </p>
            <p className="font-medium text-gray-900">- Michael Smith</p>
          </div>
        </div>
      </motion.div>

      {/* FAQs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
        <div className="bg-white p-8 rounded-lg shadow-lg space-y-6">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">What credit score do I need?</h3>
            <p className="text-gray-600">We work with multiple lenders to accommodate various credit scores and situations.</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">How long does approval take?</h3>
            <p className="text-gray-600">Most applications receive an instant decision. Some may require additional review.</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Is there a prepayment penalty?</h3>
            <p className="text-gray-600">No, you can pay off your loan early without any penalties.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Financing;