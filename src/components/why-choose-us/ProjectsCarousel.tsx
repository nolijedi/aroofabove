import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { ProjectCard } from "./ProjectCard";
import { motion } from "framer-motion";

interface Project {
  image: string;
  title: string;
  description: string;
}

interface ProjectsCarouselProps {
  projects: Project[];
}

export const ProjectsCarousel = ({ projects }: ProjectsCarouselProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.4 }}
    className="mb-16"
  >
    <h2 className="text-3xl font-bold text-roofing-charcoal text-center mb-12">
      Our Recent Projects
    </h2>
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {projects.map((project, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <ProjectCard {...project} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-roofing-charcoal border-roofing-orange hover:bg-roofing-orange/20" />
      <CarouselNext className="text-roofing-charcoal border-roofing-orange hover:bg-roofing-orange/20" />
    </Carousel>
  </motion.div>
);