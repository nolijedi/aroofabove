import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

const Application = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    position: '',
    resume: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size must be less than 10MB",
          variant: "destructive",
        });
        return;
      }
      
      // Check file type
      const fileType = file.type;
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(fileType)) {
        toast({
          title: "Error",
          description: "File must be a PDF or Word document",
          variant: "destructive",
        });
        return;
      }

      setFormData(prev => ({
        ...prev,
        resume: file
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let resumeData = null;

      // Convert file to base64 if provided
      if (formData.resume) {
        const reader = new FileReader();
        resumeData = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(formData.resume);
        });
      }

      // Save application to database with resume data
      const { error: insertError } = await supabase
        .from('applications')
        .insert({
          first_name: formData.fullName.split(' ')[0],
          last_name: formData.fullName.split(' ').slice(1).join(' '),
          email: formData.email,
          position: formData.position,
          resume_text: resumeData, // Store base64 data directly
        });

      if (insertError) {
        console.error('Insert error:', insertError);
        throw new Error(`Database insert failed: ${insertError.message}`);
      }

      toast({
        title: "Application Submitted",
        description: "Thank you for your application. We'll be in touch soon!",
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        position: '',
        resume: null,
      });

      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-gradient-separator backdrop-blur-sm bg-white/30 rounded-xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-roofing-orange to-roofing-orange-dark bg-clip-text text-transparent text-center mb-8">
            Join Our Team
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-800 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-roofing-orange focus:border-transparent"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-roofing-orange focus:border-transparent"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-2">
                Position
              </label>
              <select
                value={formData.position}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-roofing-orange focus:border-transparent"
                required
                disabled={isSubmitting}
              >
                <option value="">Select a position</option>
                <option value="Roofing Technician">Roofing Technician</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Sales Representative">Sales Representative</option>
                <option value="Administrative Assistant">Administrative Assistant</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-2">
                Resume
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="resume"
                      className="relative cursor-pointer rounded-md font-medium text-roofing-orange hover:text-roofing-orange-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-roofing-orange"
                    >
                      <span>Upload a file</span>
                      <input
                        id="resume"
                        name="resume"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        disabled={isSubmitting}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, DOCX up to 10MB
                  </p>
                  {formData.resume && (
                    <p className="text-sm text-roofing-orange">
                      Selected: {formData.resume.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-roofing-orange to-roofing-orange-dark text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
};

export default Application;
