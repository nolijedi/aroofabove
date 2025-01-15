import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1632823471406-4c5c7e4c6f24?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-roofing-charcoal/80 to-roofing-orange-dark/60" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <div className="text-center space-y-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Your Trusted Roofing Experts
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Professional roofing services for residential and commercial properties.
            Quality workmanship guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-white text-roofing-charcoal hover:bg-roofing-beige hover:scale-105 transform transition-all duration-300"
            >
              <Link to="/estimate">Get Free Estimate</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10 hover:scale-105 transform transition-all duration-300"
            >
              <Link to="/services">Our Services</Link>
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white">
            <a 
              href="tel:509-218-4343" 
              className="flex items-center gap-2 hover:text-roofing-beige transition-colors hover:scale-105 transform transition-all duration-300"
            >
              <Phone className="h-5 w-5 animate-bounce" />
              <span className="text-lg">509-218-4343</span>
            </a>
            <a 
              href="mailto:jc@aroofabove.com" 
              className="flex items-center gap-2 hover:text-roofing-beige transition-colors hover:scale-105 transform transition-all duration-300"
            >
              <Mail className="h-5 w-5 animate-pulse" />
              <span className="text-lg">jc@aroofabove.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-white">
          <path fill="currentColor" fillOpacity="0.2" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;