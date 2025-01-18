import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { FormHeader } from "./FormHeader";
import { FormFields } from "./FormFields";
import { ReferralSection } from "./ReferralSection";
import { CalculatorSection } from "./CalculatorSection";
import { useEstimateForm } from "@/hooks/useEstimateForm";

interface IframeMessage {
  app?: string;
  event?: string;
  redirectUrl?: string;
}

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
  const formData = useEstimateForm();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        // Validate origin
        const expectedOrigin = "https://book.instantroofer.com";
        if (event.origin !== expectedOrigin) {
          console.log("Invalid origin:", event.origin);
          return;
        }

        // Parse message data safely
        let parsedData: IframeMessage | null = null;
        if (typeof event.data === 'string') {
          try {
            parsedData = JSON.parse(event.data);
          } catch (parseError) {
            console.error('Error parsing message data:', parseError);
            return;
          }
        } else if (typeof event.data === 'object') {
          parsedData = event.data;
        }

        if (!parsedData) {
          console.log('No valid data in message');
          return;
        }

        // Handle Google Analytics tracking
        if (parsedData.app === 'booking' && window.dataLayer) {
          window.dataLayer.push({
            'event': 'iframe_event',
            'iframe_app': parsedData.app,
            'iframe_event_name': parsedData.event
          });
        }

        // Handle redirect if URL is valid
        if (parsedData.redirectUrl && isValidURL(parsedData.redirectUrl)) {
          window.location.href = parsedData.redirectUrl;
        }
      } catch (e) {
        console.error('Error handling message:', e);
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

    timeoutId = window.setTimeout(loadScripts, 7000);

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
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

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