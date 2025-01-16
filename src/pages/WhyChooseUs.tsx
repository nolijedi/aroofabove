import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, Clock, Shield, ThumbsUp, Gem } from "lucide-react";
import { ReasonCard } from "@/components/why-choose-us/ReasonCard";
import { ProjectsCarousel } from "@/components/why-choose-us/ProjectsCarousel";
import { CallToAction } from "@/components/why-choose-us/CallToAction";

const WhyChooseUs = () => {
  const reasons = [
    {
      Icon: Award,
      title: "Expert Craftsmanship",
      description: "Our team brings years of experience and expertise to every project."
    },
    {
      Icon: Users,
      title: "Customer-First Approach",
      description: "We prioritize your needs and ensure complete satisfaction."
    },
    {
      Icon: Clock,
      title: "Timely Completion",
      description: "We respect your time and deliver projects on schedule."
    },
    {
      Icon: Shield,
      title: "Quality Materials",
      description: "We use only premium materials for lasting results."
    },
    {
      Icon: ThumbsUp,
      title: "Licensed & Insured",
      description: "Full compliance and protection for your peace of mind."
    },
    {
      Icon: Gem,
      title: "Competitive Pricing",
      description: "Fair and transparent pricing for all our services."
    }
  ];

  const projects = [
    {
      image: "https://images.unsplash.com/photo-1632823471406-4c5c7e4c6f24",
      title: "Residential Roof Replacement",
      description: "Complete roof replacement with 30-year warranty shingles."
    },
    {
      image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099",
      title: "Commercial Flat Roof",
      description: "Installation of TPO roofing system for local business."
    },
    {
      image: "https://images.unsplash.com/photo-1605808357954-53ae0fe87d16",
      title: "Emergency Repair",
      description: "Quick response and repair after storm damage."
    },
    {
      image: "https://images.unsplash.com/photo-1635424710928-0544e8512eae",
      title: "Solar Roof Installation",
      description: "Modern solar panel integration with existing roofing."
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-roofing-charcoal mb-6">
            Why Choose A Roof Above?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the difference of working with a trusted roofing partner.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ReasonCard {...reason} />
            </motion.div>
          ))}
        </div>

        <ProjectsCarousel projects={projects} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-16"
        >
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-roofing-charcoal mb-6">
              Our Commitment to Excellence
            </h2>
            <p className="text-gray-600 mb-8">
              With over 20 years of experience in the roofing industry, we've built our reputation on quality workmanship, exceptional customer service, and attention to detail. Our team of certified professionals is dedicated to providing you with the best roofing solutions tailored to your needs.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-roofing-orange text-white hover:bg-roofing-orange-dark group"
            >
              <Link to="/estimate">
                Get Your Free Estimate
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <CallToAction />
      </div>
    </main>
  );
};

export default WhyChooseUs;