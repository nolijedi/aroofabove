import { motion } from "framer-motion";
import { ProjectsCarousel } from "@/components/why-choose-us/ProjectsCarousel";
import { CallToAction } from "@/components/why-choose-us/CallToAction";
import { ReasonsSection } from "@/components/why-choose-us/ReasonsSection";
import { CommitmentSection } from "@/components/why-choose-us/CommitmentSection";
import { projects } from "@/data/projects";

const WhyChooseUs = () => {
  return (
    <main className="min-h-screen pt-40 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-roofing-charcoal mb-2 relative">
            <span className="relative inline-block pb-2">
              Why Home Owners Choose Us
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-l from-roofing-orange via-roofing-orange-dark to-roofing-cream"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h1>
          <p className="text-sm text-roofing-charcoal/80 max-w-2xl mx-auto font-medium">
            Experience the difference with our expert roofing services.
          </p>
        </motion.div>

        <ReasonsSection />
        <ProjectsCarousel projects={projects} />
        <CommitmentSection />
        <CallToAction />
      </div>
    </main>
  );
};

export default WhyChooseUs;
