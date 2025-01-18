import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { FormHeader } from "./FormHeader";
import { FormFields } from "./FormFields";
import { ReferralSection } from "./ReferralSection";
import { CalculatorSection } from "./CalculatorSection";

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
        instantRooferScript.crossOrigin = "anonymous";
        instantRooferScript.onerror = (error) => {
          console.error('Error loading InstantRoofer script:', error);
          toast({
            title: "Warning",
            description: "Some features might be limited. Please refresh the page.",
            variant: "destructive"
          });
        };
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
  }, [toast]);

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
          <FormHeader />

          {!showCalculator ? (
            <>
              <FormFields />
              <ReferralSection
                referralSource={referralSource}
                otherSource={otherSource}
                setReferralSource={setReferralSource}
                setOtherSource={setOtherSource}
                onSubmit={handleSubmit}
              />
            </>
          ) : (
            <CalculatorSection showCalculator={showCalculator} />
          )}
        </form>
      </div>
    </motion.div>
  );
};