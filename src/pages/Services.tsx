import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      title: "Residential Roofing",
      description: "Expert installation and repair of asphalt shingles, metal roofing, and tile roofs for homes.",
      features: ["Asphalt Shingles", "Metal Roofing", "Tile Roofs", "Roof Repairs", "New Installations"]
    },
    {
      title: "Commercial Roofing",
      description: "Comprehensive commercial roofing solutions including TPO, EPDM, and metal systems.",
      features: ["TPO Roofing", "EPDM Systems", "Metal Roofs", "Flat Roof Repair", "Preventive Maintenance"]
    },
    {
      title: "Emergency Services",
      description: "24/7 emergency roof repair services for storm damage, leaks, and urgent repairs.",
      features: ["Storm Damage", "Leak Repair", "Emergency Tarping", "Insurance Claims", "Quick Response"]
    },
    {
      title: "Maintenance & Inspection",
      description: "Regular maintenance and detailed inspections to prevent costly repairs.",
      features: ["Annual Inspections", "Gutter Cleaning", "Preventive Care", "Roof Certification", "Maintenance Plans"]
    }
  ];

  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-roofing-charcoal mb-4">Our Services</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We offer comprehensive roofing solutions for both residential and commercial properties.
          Our expert team ensures quality workmanship and lasting results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {services.map((service, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold text-roofing-charcoal mb-4">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <ul className="space-y-2 mb-6">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-roofing-orange rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="text-center pb-12">
        <Button
          asChild
          size="lg"
          className="bg-roofing-orange text-white hover:bg-roofing-orange-dark"
        >
          <Link to="/estimate">Schedule a Free Estimate</Link>
        </Button>
      </div>
    </div>
  );
};

export default Services;