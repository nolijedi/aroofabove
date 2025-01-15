import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-roofing-orange to-roofing-orange-dark pt-20">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Your Trusted Roofing Experts
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
            Professional roofing services for residential and commercial properties.
            Quality workmanship guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-roofing-charcoal hover:bg-roofing-beige"
            >
              <Link to="/estimate">Get Free Estimate</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10"
            >
              <Link to="/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;