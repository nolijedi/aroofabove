import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <main className="min-h-screen pt-40 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-roofing-charcoal mb-6 relative">
            <span className="relative inline-block">
              Contact Us
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-roofing-orange"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with our expert team today.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Get a Free Estimate</h2>
            <p className="text-gray-600 mb-4">
              Fill out the form below to receive a free estimate for your roofing project.
            </p>
            <Button asChild>
              <Link to="/estimate" className="text-white bg-roofing-orange hover:bg-roofing-orange-dark rounded-md px-4 py-2">
                Get Estimate
              </Link>
            </Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-gray-600 mb-2">Phone: (123) 456-7890</p>
            <p className="text-gray-600 mb-2">Email: info@roofabove.com</p>
            <p className="text-gray-600">Address: 123 Roofing St, Dallas, TX</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
