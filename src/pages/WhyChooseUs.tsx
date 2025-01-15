import { Shield, Award, Clock, Wrench, Users, ThumbsUp } from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Shield,
      title: "Licensed & Insured",
      description: "Fully licensed and insured for your peace of mind. We meet all local and state requirements."
    },
    {
      icon: Award,
      title: "Quality Workmanship",
      description: "Premium materials and expert installation techniques ensure lasting results."
    },
    {
      icon: Clock,
      title: "Timely Service",
      description: "We respect your time with prompt service and clear communication throughout your project."
    },
    {
      icon: Wrench,
      title: "Expert Team",
      description: "Our skilled professionals have years of experience in all aspects of roofing."
    },
    {
      icon: Users,
      title: "Customer Focused",
      description: "We prioritize customer satisfaction with transparent pricing and excellent service."
    },
    {
      icon: ThumbsUp,
      title: "Warranty Backed",
      description: "Our work is backed by comprehensive warranties for your protection."
    }
  ];

  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-roofing-charcoal mb-4">Why Choose Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          With years of experience and a commitment to excellence, we're your trusted choice for all roofing needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {reasons.map((reason, index) => {
          const IconComponent = reason.icon;
          return (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-roofing-beige rounded-full mb-4">
                <IconComponent className="h-6 w-6 text-roofing-orange" />
              </div>
              <h3 className="text-xl font-bold text-roofing-charcoal mb-2">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhyChooseUs;