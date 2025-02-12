import { motion } from "framer-motion";
import { Briefcase, Heart, Star, Send, Building2, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface JobPosting {
  title: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
}

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);

  const jobPostings: JobPosting[] = [
    {
      title: "Roofing Technician",
      type: "Full-time",
      location: "Multiple Locations",
      description: "Join our team of skilled roofing technicians and work on residential and commercial projects.",
      requirements: [
        "2+ years of roofing experience",
        "Valid driver's license",
        "Physical ability to lift 50+ lbs",
        "Safety-oriented mindset"
      ]
    },
    {
      title: "Project Manager",
      type: "Full-time",
      location: "Main Office",
      description: "Lead and oversee multiple roofing projects while ensuring customer satisfaction.",
      requirements: [
        "5+ years of construction project management",
        "Strong communication skills",
        "Experience with project management software",
        "Bachelor's degree preferred"
      ]
    },
    {
      title: "Sales Representative",
      type: "Full-time",
      location: "Multiple Locations",
      description: "Help homeowners find the perfect roofing solutions while growing our business.",
      requirements: [
        "3+ years of sales experience",
        "Knowledge of construction/roofing preferred",
        "Excellent customer service skills",
        "Self-motivated with proven track record"
      ]
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health Benefits",
      description: "Comprehensive medical, dental, and vision coverage for you and your family"
    },
    {
      icon: Star,
      title: "Career Growth",
      description: "Ongoing training and advancement opportunities within the company"
    },
    {
      icon: Briefcase,
      title: "Work-Life Balance",
      description: "Paid time off, holidays, and flexible scheduling options"
    }
  ];

  const handleApply = (job: JobPosting) => {
    window.location.href = `/application?position=${encodeURIComponent(job.title)}`;
  };

  return (
    <main className="min-h-screen pt-32 pb-16 px-4 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-gradient-separator backdrop-blur-sm bg-white/30 rounded-xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 text-center"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-roofing-orange to-roofing-orange-dark bg-clip-text text-transparent mb-6">
            Join Our Team
          </h1>
          <p className="text-lg text-gray-800">
            Build your career with A Roof Above. We're always looking for talented individuals who share our commitment to excellence.
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="section-gradient-separator backdrop-blur-sm bg-white/30 rounded-xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Icon className="w-8 h-8 text-roofing-orange group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold bg-gradient-to-r from-roofing-orange to-roofing-orange-dark bg-clip-text text-transparent">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-gray-800">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Current Openings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-roofing-orange to-roofing-orange-dark bg-clip-text text-transparent">
              Current Openings
            </h2>
          </div>

          {jobPostings.map((job, index) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="section-gradient-separator backdrop-blur-sm bg-white/30 rounded-xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Building2 className="w-8 h-8 text-roofing-orange group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-roofing-orange to-roofing-orange-dark bg-clip-text text-transparent">
                      {job.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-6 text-gray-800">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-roofing-orange" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-roofing-orange" />
                      {job.location}
                    </div>
                  </div>

                  <p className="text-gray-800">{job.description}</p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800">Requirements:</h4>
                    <ul className="space-y-2">
                      {job.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-center gap-2 text-gray-800">
                          <CheckCircle2 className="w-5 h-5 text-roofing-orange flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button 
                  onClick={() => handleApply(job)}
                  className="bg-gradient-to-r from-roofing-orange to-roofing-orange-dark text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
                >
                  <Send className="w-5 h-5" />
                  Apply Now
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-gradient-separator backdrop-blur-sm bg-white/30 rounded-xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 text-center"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-roofing-orange to-roofing-orange-dark bg-clip-text text-transparent mb-4">
            Don't See the Right Fit?
          </h2>
          <p className="text-lg text-gray-800 mb-8">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <button 
            onClick={() => handleApply({ title: "General Application", type: "", location: "", description: "", requirements: [] })}
            className="bg-gradient-to-r from-roofing-orange to-roofing-orange-dark text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <Send className="w-5 h-5" />
            Submit Resume
          </button>
        </motion.div>
      </div>
    </main>
  );
};

export default Careers;