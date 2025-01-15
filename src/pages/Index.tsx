import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Tool, Clock } from "lucide-react";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 px-4 bg-white/80">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-roofing-charcoal mb-4">
              Why Choose A Roof Above?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We deliver excellence in every project with our experienced team and premium materials.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Quality Guaranteed",
                description: "We stand behind our work with industry-leading warranties."
              },
              {
                icon: Tool,
                title: "Expert Craftsmanship",
                description: "Our skilled team brings years of experience to every project."
              },
              {
                icon: Clock,
                title: "Timely Service",
                description: "We respect your time and complete projects on schedule."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-roofing-orange rounded-full text-white">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-roofing-charcoal">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              asChild
              size="lg"
              className="bg-roofing-orange text-white hover:bg-roofing-orange-dark group"
            >
              <Link to="/services">
                Explore Our Services
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Index;