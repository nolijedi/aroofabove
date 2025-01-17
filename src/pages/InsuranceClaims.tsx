import { Shield, Clock, DollarSign, FileCheck } from "lucide-react";
import { useState } from "react";
import InsuranceFeatureCard from "@/components/insurance/InsuranceFeatureCard";
import TestimonialCard from "@/components/insurance/TestimonialCard";
import CallToActionSection from "@/components/insurance/CallToActionSection";
import InsuranceHeader from "@/components/insurance/InsuranceHeader";
import WhyChooseUsSection from "@/components/insurance/WhyChooseUsSection";
import ProcessSection from "@/components/insurance/ProcessSection";
import CommonDamagesSection from "@/components/insurance/CommonDamagesSection";
import WhyActNowSection from "@/components/insurance/WhyActNowSection";

const features = [
  {
    icon: Shield,
    title: "Expert Claims Advocacy",
    description: "Our team of insurance specialists works directly with your insurance company to maximize your claim.",
    expandedDescription: "We have years of experience dealing with insurance companies and know exactly what documentation they need to approve your claim quickly.",
    image: "/lovable-uploads/4bce1ec0-41ca-4e43-ae3b-8d433eb8d962.png"
  },
  {
    icon: Clock,
    title: "Fast Claim Processing",
    description: "We expedite your claim process with thorough documentation and prompt responses.",
    expandedDescription: "Our streamlined process ensures your claim is processed as quickly as possible, often reducing wait times by weeks.",
    image: "/lovable-uploads/6078425e-d51c-41d8-8d89-3d5b72f34172.png"
  },
  {
    icon: DollarSign,
    title: "Maximum Coverage",
    description: "We ensure you get every dollar you deserve from your insurance claim.",
    expandedDescription: "Our detailed damage assessments and documentation help secure the maximum coverage available under your policy.",
    image: "/lovable-uploads/a380c8bc-eea5-477d-8fbe-67c4422d0e71.png"
  },
  {
    icon: FileCheck,
    title: "Complete Documentation",
    description: "We handle all paperwork and provide comprehensive documentation.",
    expandedDescription: "Our thorough documentation process includes detailed photos, measurements, and damage assessments that insurance companies can't deny.",
    image: "/lovable-uploads/a069e4f1-5af7-4ebd-bcc0-36435570855d.png"
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
        <div className="section-gradient-separator mb-24">
          <InsuranceHeader />
        </div>
        
        <div className="section-gradient-separator mb-24">
          <WhyChooseUsSection />
        </div>
        
        <div className="section-gradient-separator mb-24">
          <div className="grid md:grid-cols-2 gap-8">
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
        </div>

        <div className="section-gradient-separator mb-24">
          <ProcessSection />
        </div>

        <div className="section-gradient-separator mb-24">
          <CommonDamagesSection />
        </div>

        <div className="section-gradient-separator mb-24">
          <WhyActNowSection />
        </div>

        <div className="section-gradient-separator mb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>

        <CallToActionSection />
      </div>
    </main>
  );
};

export default InsuranceClaims;