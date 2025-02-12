import FeaturesGrid from "@/components/insurance/FeaturesGrid";
import TestimonialsGrid from "@/components/insurance/TestimonialsGrid";
import CallToActionSection from "@/components/insurance/CallToActionSection";
import InsuranceHeader from "@/components/insurance/InsuranceHeader";
import WhyChooseUsSection from "@/components/insurance/WhyChooseUsSection";
import ProcessSection from "@/components/insurance/ProcessSection";
import WhyActNowSection from "@/components/insurance/WhyActNowSection";

const InsuranceClaims = () => {
  return (
    <main className="min-h-screen pt-32 pb-16 px-4 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="section-gradient-separator transform hover:scale-105 transition-all duration-500">
          <InsuranceHeader />
        </div>
        
        <div className="section-gradient-separator backdrop-blur-sm bg-white/30 rounded-xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 scale-y-[-1]">
          <div className="scale-y-[-1]">
            <WhyChooseUsSection />
          </div>
        </div>
        
        <FeaturesGrid />

        <div className="section-gradient-separator backdrop-blur-sm bg-white/30 rounded-xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500">
          <ProcessSection />
        </div>

        <div className="section-gradient-separator backdrop-blur-sm bg-white/30 rounded-xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500">
          <WhyActNowSection />
        </div>

        <TestimonialsGrid />

        <div className="transform hover:scale-105 transition-all duration-500">
          <CallToActionSection />
        </div>
      </div>
    </main>
  );
};

export default InsuranceClaims;