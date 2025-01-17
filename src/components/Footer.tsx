import { Link } from "react-router-dom";
import { Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const Footer = () => {
  return (
    <footer className="bg-roofing-charcoal py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Social Links */}
          <div className="space-y-6">
            <Link to="/" className="block">
              <img
                src="/lovable-uploads/c03dc4bd-7520-4829-aa3d-9b436d3d547c.png"
                alt="A Roof Above Logo"
                className="h-16 w-auto brightness-200"
              />
            </Link>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, href: "https://facebook.com/aroofabove", label: "Facebook" },
                { Icon: Instagram, href: "https://instagram.com/aroofabove", label: "Instagram" },
                { Icon: Twitter, href: "https://twitter.com/aroofabove", label: "Twitter" },
                { Icon: Youtube, href: "https://youtube.com/@aroofabove", label: "YouTube" }
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  <Icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-3">
              <a
                href="tel:509-400-5911"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group"
              >
                <Phone className="w-5 h-5 group-hover:text-roofing-orange transition-colors" />
                <span>(509) 400-5911</span>
              </a>
              <a
                href="mailto:jc@aroofabove.com"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group"
              >
                <Mail className="w-5 h-5 group-hover:text-roofing-orange transition-colors" />
                <span>jc@aroofabove.com</span>
              </a>
            </div>
          </div>

          {/* Site Map */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Site Map</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                Services
              </Link>
              <Link to="/why-choose-us" className="text-gray-300 hover:text-white transition-colors">
                Why Choose Us
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
              <Link to="/estimate" className="text-gray-300 hover:text-white transition-colors">
                Get Estimate
              </Link>
              <Link to="/insurance-claims" className="text-gray-300 hover:text-white transition-colors">
                Insurance Claims
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Legal</h3>
            <div className="space-y-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-gray-300 hover:text-white transition-colors p-0">
                    Privacy Policy
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Privacy Policy</DialogTitle>
                    <DialogDescription>
                      <div className="mt-4 space-y-4 text-left">
                        <h4 className="font-semibold">Information Collection and Use</h4>
                        <p>
                          We collect information to provide better services to our customers. This includes
                          contact information, project details, and communication preferences.
                        </p>
                        <h4 className="font-semibold">Data Protection</h4>
                        <p>
                          Your data is protected using industry-standard security measures. We never share
                          your personal information with third parties without your explicit consent.
                        </p>
                        <h4 className="font-semibold">Cookie Policy</h4>
                        <p>
                          We use cookies to enhance your browsing experience and analyze website traffic.
                          You can control cookie settings through your browser preferences.
                        </p>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-gray-300 hover:text-white transition-colors p-0">
                    Terms of Service
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Terms of Service</DialogTitle>
                    <DialogDescription>
                      <div className="mt-4 space-y-4 text-left">
                        <h4 className="font-semibold">Service Agreement</h4>
                        <p>
                          By using our services, you agree to these terms. We provide roofing services
                          according to industry standards and local regulations.
                        </p>
                        <h4 className="font-semibold">Warranty</h4>
                        <p>
                          Our work comes with a comprehensive warranty. Specific terms vary by service
                          type and materials used.
                        </p>
                        <h4 className="font-semibold">Payment Terms</h4>
                        <p>
                          Payment schedules and terms are established before work begins. We accept
                          multiple payment methods for your convenience.
                        </p>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} A Roof Above. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;