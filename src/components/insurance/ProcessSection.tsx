import { motion } from "framer-motion";

const ProcessSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="text-3xl font-bold text-roofing-charcoal mb-8 text-center">
        Our Step-by-Step Process
      </h2>
      <div className="space-y-6">
        {[
          {
            title: "Free Roof Inspection",
            description: "Our certified roofing experts will conduct a thorough inspection to assess the damage. We'll document everything with photos and a detailed report—essential tools for your insurance claim."
          },
          {
            title: "Damage Documentation",
            description: "We provide professional documentation of all damages, including descriptions and visual evidence, to support your insurance claim."
          },
          {
            title: "Insurance Claim Filing",
            description: "Need help with filing? No problem. Our team will guide you through the paperwork and ensure all necessary details are included for a smooth process."
          },
          {
            title: "Adjuster Coordination",
            description: "When the insurance adjuster visits, we'll be there to represent your best interests and ensure they don't miss a thing."
          },
          {
            title: "Expert Repairs or Replacement",
            description: "Once your claim is approved, our skilled team gets to work restoring your roof. We use only high-quality materials to ensure long-lasting results."
          }
        ].map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2 text-roofing-orange">
              {index + 1}. {step.title}
            </h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProcessSection;