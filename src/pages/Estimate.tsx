import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Home, Calculator } from "lucide-react";

const Estimate = () => {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-roofing-charcoal mb-6">
            Get Your Free Estimate
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Fill out the form below and we'll provide you with a detailed estimate for your roofing project.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8"
          >
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <Input
                    type="text"
                    placeholder="John"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Doe"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Phone
                </label>
                <Input
                  type="tel"
                  placeholder="(555) 123-4567"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Address
                </label>
                <Input
                  type="text"
                  placeholder="123 Main St"
                  className="w-full"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    City
                  </label>
                  <Input
                    type="text"
                    placeholder="Spokane"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <Input
                    type="text"
                    placeholder="99201"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Service Type
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential Roofing</SelectItem>
                    <SelectItem value="commercial">Commercial Roofing</SelectItem>
                    <SelectItem value="repair">Roof Repair</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Project Details
                </label>
                <Textarea
                  placeholder="Please describe your roofing needs..."
                  className="w-full min-h-[120px]"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-roofing-orange text-white hover:bg-roofing-orange-dark group"
              >
                Get Estimate
                <Calculator className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-roofing-orange rounded-full text-white">
                  <Home className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-roofing-charcoal">
                  Why Choose Us
                </h2>
              </div>
              <ul className="space-y-4">
                {[
                  "Free, no-obligation estimates",
                  "Licensed and insured professionals",
                  "Premium quality materials",
                  "Competitive pricing",
                  "Excellent warranty coverage",
                  "Financing options available"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <ArrowRight className="w-4 h-4 text-roofing-orange flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-roofing-orange text-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold mb-4">
                Limited Time Offer!
              </h3>
              <p className="mb-6">
                Get 10% off your roofing project when you schedule your estimate this month.
              </p>
              <p className="text-sm">
                *Terms and conditions apply
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Estimate;