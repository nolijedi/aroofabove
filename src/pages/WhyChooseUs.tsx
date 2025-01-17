import { motion } from "framer-motion";
import { ProjectsCarousel } from "@/components/why-choose-us/ProjectsCarousel";
import { CallToAction } from "@/components/why-choose-us/CallToAction";
import { ReasonsSection } from "@/components/why-choose-us/ReasonsSection";
import { CommitmentSection } from "@/components/why-choose-us/CommitmentSection";
import { projects } from "@/data/projects";

const WhyChooseUs = () => {
  return (
    <main className="min-h-screen pt-40 pb-20 px-4 bg-gradient-to-br from-[#F1F0FB] via-white to-[#F1F0FB]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1F2C] mb-2 relative">
            <span className="relative inline-block pb-2">
              Why Home Owners Choose Us
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB]"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h1>
          <p className="text-sm text-[#8E9196] max-w-2xl mx-auto">
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