import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PersonalInfoFields } from "./PersonalInfoFields";
import { AddressFields } from "./AddressFields";
import { ProjectFields } from "./ProjectFields";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const EstimateForm = () => {
  const [referralSource, setReferralSource] = useState<string>("");
  const [otherSource, setOtherSource] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    // Load Roof Quote PRO™ script
    const script = document.createElement('script');
    script.src = "https://app.roofle.com/roof-quote-pro-widget.js?id=XXX-YOUR-TOOL-ID-HERE";
    script.async = true;
    script.onload = () => console.log('Loaded Roof Quote PRO™');
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const existingScript = document.querySelector('script[src*="roof-quote-pro-widget.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show loading toast
    toast({
      title: "Processing Estimate",
      description: "Please wait while we calculate your estimate...",
    });

    // Trigger Roof Quote PRO™ widget
    try {
      // @ts-ignore - RoofQuotePro is added by the external script
      if (window.RoofQuotePro && typeof window.RoofQuotePro.openWidget === 'function') {
        // @ts-ignore
        window.RoofQuotePro.openWidget();
      } else {
        toast({
          title: "Error",
          description: "Estimate calculator is not ready. Please try again in a moment.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error opening Roof Quote PRO™:', error);
      toast({
        title: "Error",
        description: "There was an error calculating your estimate. Please try again.",
        variant: "destructive",
      });
    }
  };

  // ... keep existing code (JSX structure and other component logic)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="lg:col-span-2 relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 w-full"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-roofing-cream via-roofing-beige to-roofing-orange/20 opacity-90" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-roofing-orange/10 rounded-full -translate-y-32 translate-x-32 blur-3xl animate-spin-slow" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-roofing-orange/10 rounded-full translate-y-32 -translate-x-32 blur-3xl animate-spin-slow" />
      
      <div className="relative p-4 sm:p-6 md:p-8 backdrop-blur-sm w-full">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-roofing-orange/20 to-roofing-orange-dark/20 rounded-bl-full" />
        
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div className="space-y-2 mb-8 text-center w-full">
            <h2 className="text-3xl font-bold text-roofing-charcoal text-center w-full">
              Get Your Free Estimate
            </h2>
            <p className="text-gray-600">
              Fill out the form below and we'll get back to you shortly
            </p>
          </div>

          <div className="space-y-8">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <PersonalInfoFields />
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <AddressFields />
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ProjectFields />
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="space-y-4">
                <label className="text-lg font-semibold text-roofing-charcoal block">
                  How did you hear about us?
                </label>
                <Select value={referralSource} onValueChange={setReferralSource}>
                  <SelectTrigger className="w-full bg-white/70">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google Search</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="friend">Friend or Family</SelectItem>
                    <SelectItem value="neighbor">Neighbor</SelectItem>
                    <SelectItem value="drive_by">Saw our work in the neighborhood</SelectItem>
                    <SelectItem value="yelp">Yelp</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>

                {referralSource === "other" && (
                  <div className="mt-4">
                    <Input
                      type="text"
                      placeholder="Please specify"
                      value={otherSource}
                      onChange={(e) => setOtherSource(e.target.value)}
                      className="w-full bg-white/70"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="pt-4"
          >
            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-roofing-orange to-roofing-orange-dark text-white hover:opacity-90 group h-14 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Estimate Now
              <Calculator className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            </Button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};
