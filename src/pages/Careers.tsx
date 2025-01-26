import { motion } from "framer-motion";
import { Briefcase, Heart, Star, Send } from "lucide-react";

interface JobPosting {
  title: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
}

const Careers = () => {
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

  return (
    <div className="container mx-auto px-4 py-16 mt-20">
      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Join Our Team</h1>
        <p className="text-lg text-gray-600">
          Build your career with A Roof Above. We're always looking for talented individuals who share our commitment to excellence.
        </p>
      </motion.div>

      {/* Current Openings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Current Openings</h2>
        <div className="space-y-6">
          {jobPostings.map((job, index) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                    <div className="flex gap-4 mt-2">
                      <span className="text-sm text-gray-600">{job.type}</span>
                      <span className="text-sm text-gray-600">{job.location}</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-roofing-orange text-white rounded-lg hover:bg-roofing-orange-dark transition-colors">
                    Apply Now
                  </button>
                </div>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {job.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Employee Benefits</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <benefit.icon className="w-12 h-12 text-roofing-orange mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Application Process */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How to Apply</h2>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-roofing-orange text-white rounded-full flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Review Our Openings</h3>
                <p className="text-gray-600">Browse through our current job openings and find the position that matches your skills and experience.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-roofing-orange text-white rounded-full flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Prepare Your Application</h3>
                <p className="text-gray-600">Update your resume and prepare a cover letter explaining why you'd be a great fit for the role.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-roofing-orange text-white rounded-full flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Submit Your Application</h3>
                <p className="text-gray-600">Click the "Apply Now" button on the job posting and follow the submission instructions.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions?</h2>
        <p className="text-gray-600 mb-6">
          Contact our HR team for more information about careers at A Roof Above.
        </p>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-roofing-orange text-white rounded-lg hover:bg-roofing-orange-dark transition-colors">
          <Send className="w-5 h-5" />
          Contact HR
        </button>
      </motion.div>
    </div>
  );
};

export default Careers;