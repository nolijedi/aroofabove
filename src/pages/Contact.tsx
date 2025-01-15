import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
  };

  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-roofing-charcoal mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get in touch with us for all your roofing needs. We're here to help with expert solutions and professional service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-roofing-charcoal mb-6">Get In Touch</h2>
            <div className="space-y-4">
              <a href="tel:509-218-4343" className="flex items-center gap-3 text-gray-700 hover:text-roofing-orange">
                <Phone className="h-5 w-5" />
                <span>509-218-4343</span>
              </a>
              <a href="mailto:jc@aroofabove.com" className="flex items-center gap-3 text-gray-700 hover:text-roofing-orange">
                <Mail className="h-5 w-5" />
                <span>jc@aroofabove.com</span>
              </a>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="h-5 w-5" />
                <span>Serving the Greater Spokane Area</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Clock className="h-5 w-5" />
                <span>Available 24/7 for Emergency Services</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-roofing-charcoal mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input placeholder="Your Name" />
            </div>
            <div>
              <Input type="email" placeholder="Your Email" />
            </div>
            <div>
              <Input type="tel" placeholder="Your Phone" />
            </div>
            <div>
              <Textarea placeholder="Your Message" className="min-h-[150px]" />
            </div>
            <Button type="submit" className="w-full bg-roofing-orange text-white hover:bg-roofing-orange-dark">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;