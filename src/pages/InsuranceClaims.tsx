import { motion } from "framer-motion";
import { Shield, Clock, DollarSign, FileCheck } from "lucide-react";
import { useState } from "react";
import InsuranceFeatureCard from "@/components/insurance/InsuranceFeatureCard";
import TestimonialCard from "@/components/insurance/TestimonialCard";
import CallToActionSection from "@/components/insurance/CallToActionSection";

const features = [
  {
    icon: Shield,
    title: "Expert Claims Advocacy",
    description: "Our team of insurance specialists works directly with your insurance company to maximize your claim.",
    expandedDescription: "We have years of experience dealing with insurance companies and know exactly what documentation they need to approve your claim quickly.",
    image: "/lovable-uploads/10a995fa-6759-4932-b918-b83c2dd741d7.png"
  },
  {
    icon: Clock,
    title: "Fast Claim Processing",
    description: "We expedite your claim process with thorough documentation and prompt responses.",
    expandedDescription: "Our streamlined process ensures your claim is processed as quickly as possible, often reducing wait times by weeks.",
    image: "/lovable-uploads/6e209d79-c584-48f2-9696-9aacf51e851d.png"
  },
  {
    icon: DollarSign,
    title: "Maximum Coverage",
    description: "We ensure you get every dollar you deserve from your insurance claim.",
    expandedDescription: "Our detailed damage assessments and documentation help secure the maximum coverage available under your policy.",
    image: "/lovable-uploads/16c50230-228c-4910-af52-24b168e003c9.png"
  },
  {
    icon: FileCheck,
    title: "Complete Documentation",
    description: "We handle all paperwork and provide comprehensive documentation.",
    expandedDescription: "Our thorough documentation process includes detailed photos, measurements, and damage assessments that insurance companies can't deny.",
    image: "/lovable-uploads/0731486e-2755-4069-b85d-d32667dca65c.png"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "Dallas, TX",
    quote: "A Roof Above helped me get $15,000 more on my claim than the insurance company initially offered. Their expertise in dealing with adjusters was invaluable!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070",
    saved: "$15,000",
    description: "Extensive storm damage left the roof severely compromised. Our team documented all damage points and successfully negotiated with the insurance company for full coverage.",
    damageImage: "/lovable-uploads/44396b47-f9e4-4da7-92f2-8401f6a62f24.png"
  },
  {
    name: "Michael Rodriguez",
    location: "Fort Worth, TX",
    quote: "When my insurance company denied my claim, A Roof Above stepped in and got it approved within a week. Their knowledge of the claims process is unmatched.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2070",
    saved: "$22,500",
    description: "Initial claim denial was overturned after our thorough documentation and professional assessment revealed significant hidden structural damage.",
    damageImage: "/lovable-uploads/e1bf4d7c-f4d0-4f90-92d9-901827a3ffb8.png"
  },
  {
    name: "Emily Chen",
    location: "Arlington, TX",
    quote: "The team at A Roof Above handled everything with my insurance company. They documented all the damage professionally and got me full replacement coverage!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2070",
    saved: "$18,750",
    description: "Multiple leaks and water damage required comprehensive roof replacement. Our team's detailed documentation ensured full coverage approval.",
    damageImage: "/lovable-uploads/b3f2bebb-a410-4988-a1c2-1bc7b719a0e8.png"
  },
  {
    name: "David Thompson",
    location: "Plano, TX",
    quote: "I was amazed at how smooth the insurance claim process was with A Roof Above. They knew exactly what documentation was needed and handled everything.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070",
    saved: "$20,000",
    description: "Hail damage compromised roof integrity extensively. Our comprehensive claim documentation resulted in complete roof replacement approval.",
    damageImage: "/lovable-uploads/2716a364-86b9-4b99-a288-6e3d9ed54e97.png"
  }
];

const InsuranceClaims = () => {
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
  const [shouldStayFlipped, setShouldStayFlipped] = useState<{ [key: number]: boolean }>({});

  const handleMouseEnter = (index: number) => {
    setFlippedCards(prev => ({ ...prev, [index]: true }));
    setShouldStayFlipped(prev => ({ ...prev, [index]: true }));
  };

  const handleMouseLeave = (index: number) => {
    setFlippedCards(prev => ({ ...prev, [index]: false }));
  };

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
              Insurance Claims Made Easy | A Roof Above
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-roofing-orange"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At <span className="font-semibold">A Roof Above</span>, we understand that dealing with roof damage is stressful enough—handling insurance claims shouldn't add to that burden. That's why we're here to help you every step of the way, ensuring you get the compensation you deserve and your roof back in top shape quickly.
          </p>
        </motion.div>

        {/* Why Choose Us Section */}
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
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-roofing-orange">Experienced Team</h3>
              <p className="text-gray-600">Our team has years of experience navigating insurance claims, ensuring nothing gets overlooked.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-roofing-orange">Advocacy for You</h3>
              <p className="text-gray-600">We work on your behalf to maximize your claim and ensure all covered damages are accounted for.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-roofing-orange">Stress-Free Process</h3>
              <p className="text-gray-600">From inspections to paperwork, we'll handle the heavy lifting while keeping you informed.</p>
            </div>
          </div>
        </motion.div>

        {/* Features Grid Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <InsuranceFeatureCard
              key={index}
              feature={feature}
              index={index}
              flippedCards={flippedCards}
              shouldStayFlipped={shouldStayFlipped}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </div>

        {/* Process Section */}
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

        {/* Common Damages Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-roofing-charcoal mb-8 text-center">
            Common Roof Damages Covered by Insurance
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              "Hail damage",
              "Wind damage",
              "Storm-related debris",
              "Fallen tree limbs",
              "Leaks due to severe weather"
            ].map((damage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-roofing-orange/10 p-4 rounded-lg text-center"
              >
                <p className="text-roofing-charcoal font-medium">{damage}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Act Now Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-roofing-beige p-8 rounded-xl"
        >
          <h2 className="text-3xl font-bold text-roofing-charcoal mb-6 text-center">
            Why Act Now?
          </h2>
          <p className="text-gray-700 text-center max-w-3xl mx-auto">
            Insurance policies often have strict deadlines for filing claims after damage occurs. 
            Delaying could mean missing out on the compensation you're entitled to. Plus, untreated 
            damage can lead to more costly repairs down the road. Don't wait—let us help you today!
          </p>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-roofing-charcoal text-center mb-12">
            Success Stories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        <CallToActionSection />
      </div>
    </main>
  );
};

export default InsuranceClaims;