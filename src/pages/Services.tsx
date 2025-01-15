import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Shield, Home, Building2, Wrench, Clock, Phone } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Residential Roofing",
      description: "Expert installation and repair of asphalt shingles, metal roofing, and tile roofs for homes.",
      features: ["Asphalt Shingles", "Metal Roofing", "Tile Roofs", "Roof Repairs", "New Installations"],
      icon: Home,
    },
    {
      title: "Commercial Roofing",
      description: "Comprehensive commercial roofing solutions including TPO, EPDM, and metal systems.",
      features: ["TPO Roofing", "EPDM Systems", "Metal Roofs", "Flat Roof Repair", "Preventive Maintenance"],
      icon: Building2,
    },
    {
      title: "Emergency Services",
      description: "24/7 emergency roof repair services for storm damage, leaks, and urgent repairs.",
      features: ["Storm Damage", "Leak Repair", "Emergency Tarping", "Insurance Claims", "Quick Response"],
      icon: Phone,
    },
    {
      title: "Maintenance & Inspection",
      description: "Regular maintenance and detailed inspections to prevent costly repairs.",
      features: ["Annual Inspections", "Gutter Cleaning", "Preventive Care", "Roof Certification", "Maintenance Plans"],
      icon: Wrench,
    }
  ];

  const projectImages = [
    {
      url: "https://images.unsplash.com/photo-1632823471406-4c5c7e4c6f24",
      title: "Modern Residential Roof Installation"
    },
    {
      url: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099",
      title: "Solar Panel Roof Integration"
    },
    {
      url: "https://images.unsplash.com/photo-1605808978575-e73be210d160",
      title: "Commercial Flat Roof Systems"
    },
    {
      url: "https://images.unsplash.com/photo-1591588582259-e675bd2e6088",
      title: "Traditional Shingle Installation"
    },
    {
      url: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5",
      title: "Modern Architectural Roofing"
    },
    {
      url: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39",
      title: "Slate Roof Craftsmanship"
    }
  ];

  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12 bg-black/40 backdrop-blur-sm p-8 rounded-lg">
        <h1 className="text-4xl font-bold text-white mb-4">Professional Roofing Services</h1>
        <p className="text-lg text-gray-100 max-w-2xl mx-auto">
          We offer comprehensive roofing solutions for both residential and commercial properties.
          Our expert team ensures quality workmanship and lasting results.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-roofing-orange rounded-full">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-roofing-charcoal">{service.title}</h3>
              </div>
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
          );
        })}
      </div>

      {/* Project Showcase */}
      <div className="mb-16 bg-black/40 backdrop-blur-sm p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Our Recent Projects</h2>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {projectImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm text-white p-4">
                      <h3 className="text-xl font-semibold">{image.title}</h3>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-white border-white hover:bg-white/20" />
          <CarouselNext className="text-white border-white hover:bg-white/20" />
        </Carousel>
      </div>

      {/* Why Choose Us Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg text-center">
          <Shield className="w-12 h-12 text-roofing-orange mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Quality Guaranteed</h3>
          <p className="text-gray-600">We stand behind our work with industry-leading warranties</p>
        </div>
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg text-center">
          <Clock className="w-12 h-12 text-roofing-orange mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Timely Service</h3>
          <p className="text-gray-600">We complete projects on schedule without compromising quality</p>
        </div>
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg text-center">
          <Phone className="w-12 h-12 text-roofing-orange mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
          <p className="text-gray-600">Emergency service available around the clock</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center pb-12">
        <Button
          asChild
          size="lg"
          className="bg-roofing-orange text-white hover:bg-roofing-orange-dark"
        >
          <Link to="/estimate">Get Your Free Estimate Today</Link>
        </Button>
      </div>
    </div>
  );
};

export default Services;