import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const faqItems: FAQItem[] = [
    // General Questions
    {
      category: "General",
      question: "How long has A Roof Above been in business?",
      answer: "A Roof Above has been serving the community for over 20 years, providing top-quality roofing services with a commitment to excellence and customer satisfaction."
    },
    {
      category: "General",
      question: "What areas do you service?",
      answer: "We service the entire metropolitan area and surrounding counties. Contact us to confirm if we cover your specific location."
    },
    // Technical Support
    {
      category: "Technical",
      question: "What types of roofs do you work with?",
      answer: "We work with all types of roofing materials including asphalt shingles, metal roofing, tile, slate, and flat roof systems."
    },
    {
      category: "Technical",
      question: "How long does a typical roof replacement take?",
      answer: "Most residential roof replacements can be completed in 1-3 days, depending on the size and complexity of the project."
    },
    // Account Management
    {
      category: "Account",
      question: "How do I schedule an inspection?",
      answer: "You can schedule an inspection through our website, by calling our office, or by using our chat feature. We'll respond within 24 hours to set up a convenient time."
    },
    {
      category: "Account",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, checks, and offer various financing options to suit your needs."
    },
    // Privacy and Security
    {
      category: "Privacy",
      question: "How do you protect customer information?",
      answer: "We use industry-standard encryption and security measures to protect all customer data. We never share your information with third parties without your consent."
    },
    {
      category: "Privacy",
      question: "What information do you collect from customers?",
      answer: "We collect only essential information needed to provide our services, including contact details and project specifications."
    }
  ];

  const categories = Array.from(new Set(faqItems.map(item => item.category)));

  return (
    <div className="container mx-auto px-4 py-16 mt-20">
      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600">
          Find answers to common questions about our services, processes, and policies.
        </p>
      </motion.div>

      {/* FAQ Categories */}
      <div className="max-w-4xl mx-auto">
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{category} Questions</h2>
            <div className="space-y-4">
              {faqItems
                .filter(item => item.category === category)
                .map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenItem(openItem === item.question ? null : item.question)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left"
                    >
                      <span className="font-medium text-gray-900">{item.question}</span>
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 text-gray-500 transition-transform",
                          openItem === item.question && "transform rotate-180"
                        )}
                      />
                    </button>
                    {openItem === item.question && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;