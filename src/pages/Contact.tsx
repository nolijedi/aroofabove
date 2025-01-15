import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const Contact = () => {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-roofing-charcoal mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with our team for all your roofing needs.
          </p>
          
          {/* Social Media Icons */}
          <div className="flex justify-center gap-12 mt-16">
            {[
              { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
              { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
              { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { Icon: Youtube, href: "https://youtube.com", label: "YouTube" }
            ].map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-roofing-orange/10 rounded-full text-roofing-orange hover:bg-roofing-orange hover:text-white transition-colors duration-300"
                whileHover={{ 
                  scale: 1.2,
                  rotate: 360,
                  transition: { duration: 0.5 }
                }}
                whileTap={{ scale: 0.9 }}
                aria-label={label}
              >
                <Icon className="w-12 h-12" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-roofing-charcoal mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Phone,
                    title: "Phone",
                    content: "509-218-4343",
                    link: "tel:509-218-4343"
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    content: "jc@aroofabove.com",
                    link: "mailto:jc@aroofabove.com"
                  },
                  {
                    icon: MapPin,
                    title: "Address",
                    content: "Spokane, WA"
                  },
                  {
                    icon: Clock,
                    title: "Business Hours",
                    content: "Mon-Fri: 8:00 AM - 6:00 PM"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-2 bg-roofing-orange/10 rounded-lg">
                      <item.icon className="w-5 h-5 text-roofing-orange" />
                    </div>
                    <div>
                      <h3 className="font-medium text-roofing-charcoal">
                        {item.title}
                      </h3>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-gray-600 hover:text-roofing-orange transition-colors"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-gray-600">{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-roofing-charcoal mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <Input
                    type="text"
                    placeholder="John"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Doe"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Phone
                </label>
                <Input
                  type="tel"
                  placeholder="(555) 123-4567"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <Textarea
                  placeholder="How can we help you?"
                  className="w-full min-h-[120px]"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-roofing-orange text-white hover:bg-roofing-orange-dark group"
              >
                Send Message
                <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Contact;