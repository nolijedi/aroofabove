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
          <h1 className="text-4xl md:text-5xl font-bold text-roofing-charcoal mb-6">
            Why Choose A Roof Above?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the difference of working with a trusted roofing partner.
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