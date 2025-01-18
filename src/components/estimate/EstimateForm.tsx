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

// Add type declaration for window.dataLayer
declare global {
  interface Window {
    dataLayer?: any[];
  }
}

export const EstimateForm = () => {
  const [referralSource, setReferralSource] = useState<string>("");
  const [otherSource, setOtherSource] = useState<string>("");
  const [showCalculator, setShowCalculator] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Handle messages from iframe
    const handleMessage = (event: MessageEvent) => {
      const expectedOrigin = "https://book.instantroofer.com";
      if (event.origin !== expectedOrigin) return;

      try {
        const data = JSON.parse(event.data);
        if (data) {
          if (data.app === 'booking' && window.dataLayer) {
            window.dataLayer.push({
              'event': 'iframe_event',
              'iframe_app': data.app,
              'iframe_event_name': data.event
            });
          }
          if (isValidURL(data?.redirectUrl)) {
            window.location.href = data.redirectUrl;
          }
        }
      } catch (e) {
        console.error('Error processing message:', e);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    let isScriptsLoaded = false;
    let timeoutId: number;

    const loadScripts = () => {
      if (!isScriptsLoaded) {
        const instantRooferScript = document.createElement('script');
        instantRooferScript.type = 'text/javascript';
        instantRooferScript.async = true;
        instantRooferScript.src = "https://book.instantroofer.com/js/instant-roofer-google-ads-integration.min.js";
        document.body.appendChild(instantRooferScript);
        isScriptsLoaded = true;
      }
    };

    // Load script after 7000ms
    timeoutId = window.setTimeout(loadScripts, 7000);

    // Load script on user scroll
    const scrollHandler = () => loadScripts();
    window.addEventListener('scroll', scrollHandler, { once: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const isValidURL = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCalculator(true);
    toast({
      title: "Form submitted successfully!",
      description: "Please use the calculator below for an instant estimate.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="lg:col-span-2 relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 w-full"
    >
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

          {!showCalculator ? (
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
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col items-center"
            >
              <div className="w-full max-w-[345px] mx-auto">
                <iframe
                  src="https://book.instantroofer.com/?product=estimate&id=daa2d386-4f15-4067-ad79-233c14420642"
                  className="w-full aspect-[0.53] h-[650px] border-none rounded-lg shadow-lg"
                  title="Roof Estimate Calculator"
                />
                <div className="text-center mt-4 text-sm text-gray-600">
                  Powered by <a href="https://www.instantroofer.com" className="text-roofing-orange hover:text-roofing-orange-dark transition-colors">Instant Roofer</a>
                </div>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </motion.div>
  );
};