import HeroSection from "@/components/insurance/HeroSection";
import WhyChooseUsSection from "@/components/insurance/WhyChooseUsSection";
import ProcessSection from "@/components/insurance/ProcessSection";
import DamagesSection from "@/components/insurance/DamagesSection";
import WhyActNowSection from "@/components/insurance/WhyActNowSection";
import CallToActionSection from "@/components/insurance/CallToActionSection";
import TestimonialsSection from "@/components/insurance/TestimonialsSection";

const InsuranceClaims = () => {
  return (
    <main className="min-h-screen pt-40 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <HeroSection />
        <WhyChooseUsSection />
        <ProcessSection />
        <DamagesSection />
        <TestimonialsSection />
        <WhyActNowSection />
        <CallToActionSection />
      </div>
    </main>
  );
};

export default InsuranceClaims;